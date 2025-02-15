/*!
 * jquery.fancytree.dnd.js
 * Drag'n'drop extension for jquery.fancytree.js.
 *
 * Copyright (c) 2013, Martin Wendt (http://wwWendt.de)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://code.google.com/p/fancytree/wiki/LicenseInfo
 *
 * A current version and some documentation is available at
 *	https://github.com/mar10/fancytree/
 */

 ;(function($, window, document, undefined) {

	"use strict";
	
	/* *****************************************************************************
	 * Private functions and variables
	 */
	var logMsg = $.ui.fancytree.debug,
		didRegisterDnd = false;
	
	/* Convert number to string and prepend +/-; return empty string for 0.*/
	function offsetString(n){
		return n === 0 ? "" : (( n > 0 ) ? ("+" + n) : ("" + n));
	}
	
	/* *****************************************************************************
	 * Drag and drop support
	 */
	function _initDragAndDrop(tree) {
		var dnd = tree.options.dnd || null;
		// Register 'connectToFancytree' option with ui.draggable
		if(dnd /*&& (dnd.onDragStart || dnd.onDrop)*/) {
			_registerDnd();
		}
		// Attach ui.draggable to this Fancytree instance
		if(dnd && dnd.onDragStart ) {
			tree.widget.element.draggable({
				addClasses: false,
				appendTo: "body",
				containment: false,
				delay: 0,
				distance: 4,
				// TODO: merge Dynatree issue 419
				revert: false,
				scroll: true, // issue 244: enable scrolling (if ul.fancytree-container)
				scrollSpeed: 7,
				scrollSensitivity: 10,
				// Delegate draggable.start, drag, and stop events to our handler
				connectToFancytree: true,
				// Let source tree create the helper element
				helper: function(event) {
					var sourceNode = $.ui.fancytree.getNode(event.target);
					if(!sourceNode){ // issue 211
						// TODO: remove this hint, when we understand when it happens
						return "<div>ERROR?: helper requested but sourceNode not found</div>";
					}
					return sourceNode.tree.dnd._onDragEvent("helper", sourceNode, null, event, null, null);
				},
				start: function(event, ui) {
	//              var sourceNode = $.ui.fancytree.getNode(event.target);
					// don't return false if sourceNode == null (see issue 268)
				}
			});
		}
		// Attach ui.droppable to this Fancytree instance
		if(dnd && dnd.onDrop) {
			tree.widget.element.droppable({
				addClasses: false,
				tolerance: "intersect",
				greedy: false
				/*
				,
				activate: function(event, ui) {
					logMsg("droppable - activate", event, ui, this);
				},
				create: function(event, ui) {
					logMsg("droppable - create", event, ui);
				},
				deactivate: function(event, ui) {
					logMsg("droppable - deactivate", event, ui);
				},
				drop: function(event, ui) {
					logMsg("droppable - drop", event, ui);
				},
				out: function(event, ui) {
					logMsg("droppable - out", event, ui);
				},
				over: function(event, ui) {
					logMsg("droppable - over", event, ui);
				}
	*/
			});
		}
	}
	
	//--- Extend ui.draggable event handling --------------------------------------
	
	function _registerDnd() {
		if(didRegisterDnd){
			return;
		}
	
		// Register proxy-functions for draggable.start/drag/stop
	
		$.ui.plugin.add("draggable", "connectToFancytree", {
			start: function(event, ui) {
				// 'draggable' was renamed to 'ui-draggable' since jQueryUI 1.10
				var draggable = $(this).data("ui-draggable") || $(this).data("draggable"),
					sourceNode = ui.helper.data("ftSourceNode") || null;
	//          logMsg("draggable-connectToFancytree.start, %s", sourceNode);
	//          logMsg("    this: %o", this);
	//          logMsg("    event: %o", event);
	//          logMsg("    draggable: %o", draggable);
	//          logMsg("    ui: %o", ui);
	
				if(sourceNode) {
					// Adjust helper offset, so cursor is slightly outside top/left corner
					draggable.offset.click.top = -2;
					draggable.offset.click.left = + 16;
	//              logMsg("    draggable2: %o", draggable);
	//              logMsg("    draggable.offset.click FIXED: %s/%s", draggable.offset.click.left, draggable.offset.click.top);
					// Trigger onDragStart event
					// TODO: when called as connectTo..., the return value is ignored(?)
					return sourceNode.tree.dnd._onDragEvent("start", sourceNode, null, event, ui, draggable);
				}
			},
			drag: function(event, ui) {
				// 'draggable' was renamed to 'ui-draggable' since jQueryUI 1.10
				var isHelper,
					draggable = $(this).data("ui-draggable") || $(this).data("draggable"),
					sourceNode = ui.helper.data("ftSourceNode") || null,
					prevTargetNode = ui.helper.data("ftTargetNode") || null,
					targetNode = $.ui.fancytree.getNode(event.target);
	//            logMsg("$.ui.fancytree.getNode(%o): %s", event.target, targetNode);
	//            logMsg("connectToFancytree.drag: helper: %o", ui.helper[0]);
				if(event.target && !targetNode){
					// We got a drag event, but the targetNode could not be found
					// at the event location. This may happen,
					// 1. if the mouse jumped over the drag helper,
					// 2. or if a non-fancytree element is dragged
					// We ignore it:
					isHelper = $(event.target).closest("div.fancytree-drag-helper,#fancytree-drop-marker").length > 0;
					if(isHelper){
						logMsg("Drag event over helper: ignored.");
						return;
					}
				}
	//            logMsg("draggable-connectToFancytree.drag: targetNode(from event): %s, ftTargetNode: %s", targetNode, ui.helper.data("ftTargetNode"));
				ui.helper.data("ftTargetNode", targetNode);
				// Leaving a tree node
				if(prevTargetNode && prevTargetNode !== targetNode ) {
					prevTargetNode.tree.dnd._onDragEvent("leave", prevTargetNode, sourceNode, event, ui, draggable);
				}
				if(targetNode){
					if(!targetNode.tree.options.dnd.onDrop) {
						// not enabled as drop target
					} else if(targetNode === prevTargetNode) {
						// Moving over same node
						targetNode.tree.dnd._onDragEvent("over", targetNode, sourceNode, event, ui, draggable);
					}else{
						// Entering this node first time
						targetNode.tree.dnd._onDragEvent("enter", targetNode, sourceNode, event, ui, draggable);
					}
				}
				// else go ahead with standard event handling
			},
			stop: function(event, ui) {
				// 'draggable' was renamed to 'ui-draggable' since jQueryUI 1.10
				var draggable = $(this).data("ui-draggable") || $(this).data("draggable"),
					sourceNode = ui.helper.data("ftSourceNode") || null,
					targetNode = ui.helper.data("ftTargetNode") || null,
	//				mouseDownEvent = draggable._mouseDownEvent,
					eventType = event.type,
					dropped = (eventType === "mouseup" && event.which === 1);
	//            logMsg("draggable-connectToFancytree.stop: targetNode(from event): %s, ftTargetNode: %s", targetNode, ui.helper.data("ftTargetNode"));
	//            logMsg("draggable-connectToFancytree.stop, %s", sourceNode);
	//            logMsg("    type: %o, downEvent: %o, upEvent: %o", eventType, mouseDownEvent, event);
	//            logMsg("    targetNode: %o", targetNode);
				if(!dropped){
					logMsg("Drag was cancelled");
				}
				if(targetNode) {
					if(dropped){
						targetNode.tree.dnd._onDragEvent("drop", targetNode, sourceNode, event, ui, draggable);
					}
					targetNode.tree.dnd._onDragEvent("leave", targetNode, sourceNode, event, ui, draggable);
				}
				if(sourceNode){
					sourceNode.tree.dnd._onDragEvent("stop", sourceNode, null, event, ui, draggable);
				}
			}
		});
	
		didRegisterDnd = true;
	}
	
	
	/* *****************************************************************************
	 *
	 */
	/** @namespace $.ui.fancytree.dnd */
	$.ui.fancytree.registerExtension("dnd",
		/** @scope ui_fancytree
		 * @lends $.ui.fancytree.dnd.prototype
		 */
		{
		// Default options for this extension.
		options: {
			// Make tree nodes draggable:
			onDragStart: null, // Callback(sourceNode), return true, to enable dnd
			onDragStop: null, // Callback(sourceNode)
	//      helper: null,
			// Make tree nodes accept draggables
			autoExpandMS: 1000, // Expand nodes after n milliseconds of hovering.
			preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
			preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
			onDragEnter: null, // Callback(targetNode, sourceNode)
			onDragOver: null, // Callback(targetNode, sourceNode, hitMode)
			onDrop: null, // Callback(targetNode, sourceNode, hitMode)
			onDragLeave: null // Callback(targetNode, sourceNode)
		},
		// Override virtual methods for this extension.
		// `this`       : Fancytree instance
		// `this._super`: the virtual function that was overriden (member of prev. extension or Fancytree)
		treeInit: function(ctx){
			var tree = ctx.tree;
			this._super(ctx);
			_initDragAndDrop(tree);
		},
		/* Override key handler in order to cancel dnd on escape.*/
		nodeKeydown: function(ctx) {
			var event = ctx.originalEvent;
			if( event.which === $.ui.keyCode.ESCAPE) {
				this.dnd._cancelDrag();
			}
			this._super(ctx);
		},
		/* Display drop marker according to hitMode ('after', 'before', 'over', 'out', 'start', 'stop'). */
		_setDndStatus: function(sourceNode, targetNode, helper, hitMode, accept) {
			var posOpts,
				markerOffsetX = 0,
				markerAt = "center",
				instData = this.dnd,
				$source = sourceNode ? $(sourceNode.span) : null,
				$target = $(targetNode.span);
	
			if( !instData.$dropMarker ) {
				instData.$dropMarker = $("<div id='fancytree-drop-marker'></div>")
					.hide()
					.css({"z-index": 1000})
					.prependTo($(this.$div).parent());
	//                .prependTo("body");
	//          logMsg("Creating marker: %o", this.$dropMarker);
			}
	/*
			if(hitMode === "start"){
			}
			if(hitMode === "stop"){
	//          sourceNode.removeClass("fancytree-drop-target");
			}
	*/
	//      this.$dropMarker.attr("class", hitMode);
			if(hitMode === "after" || hitMode === "before" || hitMode === "over"){
	//          $source && $source.addClass("fancytree-drag-source");
	
	//          $target.addClass("fancytree-drop-target");
	
				switch(hitMode){
				case "before":
					instData.$dropMarker.removeClass("fancytree-drop-after fancytree-drop-over");
					instData.$dropMarker.addClass("fancytree-drop-before");
					markerAt = "top";
					break;
				case "after":
					instData.$dropMarker.removeClass("fancytree-drop-before fancytree-drop-over");
					instData.$dropMarker.addClass("fancytree-drop-after");
					markerAt = "bottom";
					break;
				default:
					instData.$dropMarker.removeClass("fancytree-drop-after fancytree-drop-before");
					instData.$dropMarker.addClass("fancytree-drop-over");
					$target.addClass("fancytree-drop-target");
					markerOffsetX = 8;
				}
	
				if( $.ui.fancytree.jquerySupports.positionMyOfs ){
					posOpts = {
						my: "left" + offsetString(markerOffsetX) + " center",
						at: "left " + markerAt,
						of: $target
					};
				} else {
					posOpts = {
						my: "left center",
						at: "left " + markerAt,
						of: $target,
						offset: "" + markerOffsetX + " 0"
					};
				}
				instData.$dropMarker
					.show()
					.position(posOpts);
	//          helper.addClass("fancytree-drop-hover");
			} else {
	//          $source && $source.removeClass("fancytree-drag-source");
				$target.removeClass("fancytree-drop-target");
				instData.$dropMarker.hide();
	//          helper.removeClass("fancytree-drop-hover");
			}
			if(hitMode === "after"){
				$target.addClass("fancytree-drop-after");
			} else {
				$target.removeClass("fancytree-drop-after");
			}
			if(hitMode === "before"){
				$target.addClass("fancytree-drop-before");
			} else {
				$target.removeClass("fancytree-drop-before");
			}
			if(accept === true){
				if($source){
					$source.addClass("fancytree-drop-accept");
				}
				$target.addClass("fancytree-drop-accept");
				helper.addClass("fancytree-drop-accept");
			}else{
				if($source){
					$source.removeClass("fancytree-drop-accept");
				}
				$target.removeClass("fancytree-drop-accept");
				helper.removeClass("fancytree-drop-accept");
			}
			if(accept === false){
				if($source){
					$source.addClass("fancytree-drop-reject");
				}
				$target.addClass("fancytree-drop-reject");
				helper.addClass("fancytree-drop-reject");
			}else{
				if($source){
					$source.removeClass("fancytree-drop-reject");
				}
				$target.removeClass("fancytree-drop-reject");
				helper.removeClass("fancytree-drop-reject");
			}
		},
	
		/*
		 * Handles drag'n'drop functionality.
		 *
		 * A standard jQuery drag-and-drop process may generate these calls:
		 *
		 * draggable helper():
		 *     _onDragEvent("helper", sourceNode, null, event, null, null);
		 * start:
		 *     _onDragEvent("start", sourceNode, null, event, ui, draggable);
		 * drag:
		 *     _onDragEvent("leave", prevTargetNode, sourceNode, event, ui, draggable);
		 *     _onDragEvent("over", targetNode, sourceNode, event, ui, draggable);
		 *     _onDragEvent("enter", targetNode, sourceNode, event, ui, draggable);
		 * stop:
		 *     _onDragEvent("drop", targetNode, sourceNode, event, ui, draggable);
		 *     _onDragEvent("leave", targetNode, sourceNode, event, ui, draggable);
		 *     _onDragEvent("stop", sourceNode, null, event, ui, draggable);
		 */
		_onDragEvent: function(eventName, node, otherNode, event, ui, draggable) {
			if(eventName !== "over"){
				logMsg("tree.dnd._onDragEvent(%s, %o, %o) - %o", eventName, node, otherNode, this);
			}
			var $helper, nodeOfs, relPos, relPos2,
				enterResponse, hitMode, r,
				opts = this.options,
				dnd = opts.dnd,
				res = null,
				nodeTag = $(node.span);
	
			switch (eventName) {
			case "helper":
				// Only event and node argument is available
				$helper = $("<div class='fancytree-drag-helper'><span class='fancytree-drag-helper-img' /></div>")
	//                .append($(event.target).closest("a").clone());
					.append($(event.target).closest("span.fancytree-title").clone());
				// issue 244: helper should be child of scrollParent
				$("ul.fancytree-container", node.tree.$div).append($helper);
	//          $(node.tree.divTree).append($helper);
				// Attach node reference to helper object
				$helper.data("ftSourceNode", node);
				logMsg("helper=%o", $helper);
				logMsg("helper.sourceNode=%o", $helper.data("ftSourceNode"));
				res = $helper;
				break;
			case "start":
				if( node.isStatusNode ) {
					res = false;
				} else if(dnd.onDragStart) {
					res = dnd.onDragStart(node);
				}
				if(res === false) {
					this.debug("tree.onDragStart() cancelled");
					//draggable._clear();
					// NOTE: the return value seems to be ignored (drag is not canceled, when false is returned)
					// TODO: call this._cancelDrag()?
					ui.helper.trigger("mouseup");
					ui.helper.hide();
				} else {
					nodeTag.addClass("fancytree-drag-source");
				}
				break;
			case "enter":
				if(dnd.preventRecursiveMoves && node.isDescendantOf(otherNode)){
					r = false;
				}else{
					r = dnd.onDragEnter ? dnd.onDragEnter(node, otherNode, ui, draggable) : null;
				}
				if(!r){
					// convert null, undefined, false to false
					res = false;
				}else if ( $.isArray(r) ) {
					// TODO: also accept passing an object of this format directly
					res = {
						over: ($.inArray("over", r) >= 0),
						before: ($.inArray("before", r) >= 0),
						after: ($.inArray("after", r) >= 0)
					};
				}else{
					res = {
						over: ((r === true) || (r === "over")),
						before: ((r === true) || (r === "before")),
						after: ((r === true) || (r === "after"))
					};
				}
				ui.helper.data("enterResponse", res);
				logMsg("helper.enterResponse: %o", res);
				break;
			case "over":
				enterResponse = ui.helper.data("enterResponse");
				hitMode = null;
				if(enterResponse === false){
					// Don't call onDragOver if onEnter returned false.
	//                break;
				} else if(typeof enterResponse === "string") {
					// Use hitMode from onEnter if provided.
					hitMode = enterResponse;
				} else {
					// Calculate hitMode from relative cursor position.
					nodeOfs = nodeTag.offset();
					relPos = { x: event.pageX - nodeOfs.left,
							   y: event.pageY - nodeOfs.top };
					relPos2 = { x: relPos.x / nodeTag.width(),
								y: relPos.y / nodeTag.height() };
	
					if( enterResponse.after && relPos2.y > 0.75 ){
						hitMode = "after";
					} else if(!enterResponse.over && enterResponse.after && relPos2.y > 0.5 ){
						hitMode = "after";
					} else if(enterResponse.before && relPos2.y <= 0.25) {
						hitMode = "before";
					} else if(!enterResponse.over && enterResponse.before && relPos2.y <= 0.5) {
						hitMode = "before";
					} else if(enterResponse.over) {
						hitMode = "over";
					}
					// Prevent no-ops like 'before source node'
					// TODO: these are no-ops when moving nodes, but not in copy mode
					if( dnd.preventVoidMoves ){
						if(node === otherNode){
							logMsg("    drop over source node prevented");
							hitMode = null;
						}else if(hitMode === "before" && otherNode && node === otherNode.getNextSibling()){
							logMsg("    drop after source node prevented");
							hitMode = null;
						}else if(hitMode === "after" && otherNode && node === otherNode.getPrevSibling()){
							logMsg("    drop before source node prevented");
							hitMode = null;
						}else if(hitMode === "over" && otherNode && otherNode.parent === node && otherNode.isLastSibling() ){
							logMsg("    drop last child over own parent prevented");
							hitMode = null;
						}
					}
	//                logMsg("hitMode: %s - %s - %s", hitMode, (node.parent === otherNode), node.isLastSibling());
					ui.helper.data("hitMode", hitMode);
				}
				// Auto-expand node (only when 'over' the node, not 'before', or 'after')
				if(hitMode === "over" && dnd.autoExpandMS && node.hasChildren() !== false && !node.expanded) {
					node.scheduleAction("expand", dnd.autoExpandMS);
				}
				if(hitMode && dnd.onDragOver){
					// TODO: http://code.google.com/p/dynatree/source/detail?r=625
					res = dnd.onDragOver(node, otherNode, hitMode, ui, draggable);
				}
				// issue 332
	//			this._setDndStatus(otherNode, node, ui.helper, hitMode, res!==false);
				this.dnd._setDndStatus(otherNode, node, ui.helper, hitMode, res!==false && hitMode !== null);
				break;
			case "drop":
				hitMode = ui.helper.data("hitMode");
				if(hitMode && dnd.onDrop){
					dnd.onDrop(node, otherNode, hitMode, ui, draggable);
				}
				break;
			case "leave":
				// Cancel pending expand request
				node.scheduleAction("cancel");
				ui.helper.data("enterResponse", null);
				ui.helper.data("hitMode", null);
				this.dnd._setDndStatus(otherNode, node, ui.helper, "out", undefined);
				if(dnd.onDragLeave){
					dnd.onDragLeave(node, otherNode, ui, draggable);
				}
				break;
			case "stop":
				nodeTag.removeClass("fancytree-drag-source");
				if(dnd.onDragStop){
					dnd.onDragStop(node);
				}
				break;
			default:
				throw "Unsupported drag event: " + eventName;
			}
			return res;
		},
	
		_cancelDrag: function() {
			 var dd = $.ui.ddmanager.current;
			 if(dd){
				 dd.cancel();
			 }
		}
	});
	}(jQuery, window, document));