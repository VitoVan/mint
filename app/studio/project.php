<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link type="text/css" rel="stylesheet" href="css/style.css"/>
	<link type="text/css" rel="stylesheet" href="css/color_day.css" id="colorchange" />
	<link type="text/css" rel="stylesheet" href="css/style_mobile.css" media="screen and (max-width:800px)">

</head>
<body>
<?php
//工程文件操作
//建立，
require_once '../config.php';
require_once "../public/_pdo.php";
require_once "../public/function.php";
require_once "../public/load_lang.php";
require_once "./book_list_en.inc";
require_once "../ucenter/function.php";
require_once "../ucenter/setting_function.php";
require_once "../lang/function.php";

$user_setting = get_setting();

$sLang["1"] = "pali";
$sLang["2"] = "en";
$sLang["3"] = "sc";
$sLang["4"] = "tc";

if (isset($_POST["op"])) {
    $op = $_POST["op"];
}
if (isset($_GET["op"])) {
    $op = $_GET["op"];
}
if (isset($_POST["data"])) {
    $data = $_POST["data"];
} else if (isset($_GET["data"])) {
    $data = $_GET["data"];
}
if ($_COOKIE["uid"]) {
    $uid = $_COOKIE["uid"];
    $USER_ID = $_COOKIE["userid"];
    $USER_NAME = $_COOKIE["username"];
} else {
    echo '<a href="../ucenter/index.php" target="_blank">' . $_local->gui->not_login . '</a>';
    exit;
}
switch ($op) {
    case "create":
        //判断单词数量 太大的不能加载
        $res = json_decode($data);
        $res_book = $res[0]->book;
        $paraList = $res[0]->parlist;
        $paraList = rtrim($paraList, ",");
        $strQueryParaList = str_replace(",", "','", $paraList);
        $strQueryParaList = "('" . $strQueryParaList . "')";
        PDO_Connect(_FILE_DB_PALITEXT_);
        $query = "SELECT sum(lenght) as sum_str FROM "._TABLE_PALI_TEXT_." WHERE book = " . $PDO->quote($res_book) . " AND (paragraph in {$strQueryParaList} ) ";
        $Fetch = PDO_FetchAll($query);
        if (count($Fetch) > 0) {
            if ($Fetch[0]["sum_str"] > 15000) {
                echo $_local->gui->oversize_to_load;
                exit;
            }
        }
        //判断单词数量 结束

        if (isset($_POST["format"]) && $_POST["format"] == "db") {
            $res = json_decode($data);

            $title = $res[0]->title;
            $title_en = pali2english($title);
            $book = $res[0]->book;
            if (substr($book, 0, 1) == "p") {
                $book = substr($book, 1);
            }
            $paragraph = $res[0]->parNum;
            $tag = "[$title]";
            $paraList = $res[0]->parlist;
            $paraList = rtrim($paraList, ",");
            $strQueryParaList = str_replace(",", "','", $paraList);
            $strQueryParaList = "('" . $strQueryParaList . "')";
            $aParaList = str_getcsv($paraList);
            $create_para = $aParaList[0];
            echo $strQueryParaList;
            echo "<textarea>";
            print_r($res);
            echo "</textarea>";
            $user_title = $_POST["title"];
            $doc_head = "    <head>\n";
            $doc_head .= "        <type>pcdsset</type>\n";
            $doc_head .= "        <mode>package</mode>\n";
            $doc_head .= "        <ver>1</ver>\n";
            $doc_head .= "        <toc></toc>\n";
            $doc_head .= "        <style></style>\n";
            $doc_head .= "        <doc_title>$user_title</doc_title>\n";
            $doc_head .= "        <tag>$tag</tag>\n";
            $doc_head .= "        <lang>{$_POST["lang"]}</lang>\n";
            $doc_head .= "        <book>$book</book>\n";
            $doc_head .= "        <paragraph>$paragraph</paragraph>\n";
            $doc_head .= "    </head>\n";
            for ($iRes = 0; $iRes < count($res); $iRes++) {
                $get_res_type = $res[$iRes]->type;
                echo "iRes: $iRes,type:$get_res_type<br/>";
                $res_album_id = $res[$iRes]->album_id;
                $res_book = $res[$iRes]->book;
                $get_par_begin = $res[$iRes]->parNum;
                $language = $res[$iRes]->language;
                $author = $res[$iRes]->author;

                $res_album_guid = UUID::v4();
                $res_album_owner = 0;

                switch ($get_res_type) {
                    case "6": //逐词译模板
                        {
                            $album_guid = UUID::v4();
                            $album_title = "title";
                            $album_author = "VRI";
                            $album_type = $get_res_type;
                            //获取段落层级和标题
                            $para_title = array();
                            PDO_Connect(_FILE_DB_PALITEXT_);
                            $query = "SELECT * FROM "._TABLE_PALI_TEXT_." WHERE  book  = " . $PDO->quote($res_book) . " AND ( paragraph  in {$strQueryParaList} ) AND level>0 AND level<9";
                            $sth = $PDO->prepare($query);
                            $sth->execute();
                            while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
                                $paragraph = $result["paragraph"];
                                $para_title["{$paragraph}"][0] = $result["level"];
                                $para_title["{$paragraph}"][1] = $result["text"];
                            }

                            $db_file = _DIR_PALICANON_TEMPLET_ . "/p" . $res_book . "_tpl.db3";
                            PDO_Connect(_FILE_DB_PALICANON_TEMPLET_);
                            foreach ($aParaList as $iPar) {
                                $query = "SELECT * FROM "._TABLE_PALICANON_TEMPLET_." WHERE ( book = ".$PDO->quote($res_book)." AND  paragraph  = " . $PDO->quote($iPar) . " ) ";

                                $sth = $PDO->prepare($query);
                                $sth->execute();
                                {
                                    if (isset($para_title["{$iPar}"])) {
                                        $level = $para_title["{$iPar}"][0];
                                        $title = $para_title["{$iPar}"][1];
                                    } else {
                                        $level = 100;
                                        $title = "";
                                    }
                                    $block_id = UUID::v4();
                                    $trans_block_id = UUID::v4();
                                    $block_data[] = array($block_id, "", $_POST["channal"], $USER_ID, $book, $iPar, "_none_", $_POST["lang"], 1);
                                    $block_list[] = array("channal" => $_POST["channal"],
                                        "type" => 6, //word by word
                                        "book" => $res_book,
                                        "paragraph" => $iPar,
                                        "block_id" => $block_id,
                                        "readonly" => false,
                                    );
                                    /*
                                    $block_list[] = array("channal"=>$_POST["channal"],
                                    "type"=>2,//translation
                                    "book"=>$res_book,
                                    "paragraph"=>$iPar,
                                    "readonly"=>false
                                    );*/
                                    while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
                                        if ($result["gramma"] == "?") {
                                            $wGrammar = "";
                                        } else {
                                            $wGrammar = $result["gramma"];
                                        }

                                        $strXml = "<word>";
                                        $strXml .= "<pali>{$result["word"]}</pali>";
                                        $strXml .= "<real>{$result["real"]}</real>";
                                        $wordid = "p{$result["book"]}-{$result["paragraph"]}-{$result["wid"]}";
                                        $strXml .= "<id>{$wordid}</id>";
                                        $strXml .= "<type s=\"0\">{$result["type"]}</type>";
                                        $strXml .= "<gramma s=\"0\">{$wGrammar}</gramma>";
                                        $strXml .= "<mean s=\"0\"></mean>";
                                        $strXml .= "<org s=\"0\">" . mb_strtolower($result["part"], 'UTF-8') . "</org>";
                                        $strXml .= "<om s=\"0\"></om>";
                                        $strXml .= "<case s=\"0\">{$result["type"]}#{$wGrammar}</case>";
                                        $strXml .= "<style>{$result["style"]}</style>";
                                        $strXml .= "<status>0</status>";
                                        $strXml .= "</word>";
                                        $wbw_data[] = array(UUID::v4(), $block_id, $book, $iPar, $result["wid"], $result["real"], $strXml, mTime(), mTime(), 1, $_COOKIE['userid']);
                                    }
                                }
                            }

                            //写入数据库
                            // 开始一个事务，关闭自动提交

                            PDO_Connect(_FILE_DB_USER_WBW_);
                            $PDO->beginTransaction();
                            $query = "INSERT INTO "._TABLE_USER_WBW_BLOCK_." ('id','parent_id','channal','owner','book','paragraph','style','lang','status','modify_time','receive_time') VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                            $stmt = $PDO->prepare($query);
                            foreach ($block_data as $oneParam) {
                                $stmt->execute($oneParam);
                            }
                            // 提交更改
                            $PDO->commit();
                            if (!$stmt || ($stmt && $stmt->errorCode() != 0)) {
                                $error = PDO_ErrorInfo();
                                echo "error - $error[2] <br>";
                            } else {
                                $count = count($block_data);
                                echo "updata $count recorders.";
                            }

                            // 开始一个事务，关闭自动提交

                            $PDO->beginTransaction();
                            $query = "INSERT INTO "._TABLE_USER_WBW_." ('id','block_id','book','paragraph','wid','word','data','modify_time','receive_time','status','owner') VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                            $stmt = $PDO->prepare($query);
                            foreach ($wbw_data as $oneParam) {
                                $stmt->execute($oneParam);
                            }
                            // 提交更改
                            $PDO->commit();
                            if (!$stmt || ($stmt && $stmt->errorCode() != 0)) {
                                $error = PDO_ErrorInfo();
                                echo "error - $error[2] <br>";
                            } else {
                                $count = count($block_data);
                                echo "updata $count recorders.";
                            }

                            //服务器端文件列表
                            PDO_Connect(_FILE_DB_FILEINDEX_);
                            $query = "INSERT INTO fileindex ('id',
												'parent_id',
												'channal',
												'user_id',
												'book',
												'paragraph',
												'file_name',
												'title',
												'tag',
												'status',
												'create_time',
												'modify_time',
												'accese_time',
												'file_size',
												'share',
												'doc_info',
												'doc_block',
												'receive_time'
												)
									VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                            $stmt = $PDO->prepare($query);
                            $doc_id = UUID::v4();
                            $file_name = $book . '_' . $create_para . '_' . time();
                            $newData = array(
                                $doc_id,
                                "",
                                $_POST["channal"],
                                $uid,
                                $book,
                                $create_para,
                                $file_name,
                                $user_title,
                                $tag,
                                1,
                                mTime(),
                                mTime(),
                                mTime(),
                                0,
                                0,
                                $doc_head,
                                json_encode($block_list, JSON_UNESCAPED_UNICODE),
                                mTime(),
                            );
                            $stmt->execute($newData);
                            if (!$stmt || ($stmt && $stmt->errorCode() != 0)) {
                                $error = PDO_ErrorInfo();
                                echo "error - $error[2] <br>";
                            } else {
                                echo "成功新建一个文件.";
                            }

                            echo "<a href=\"editor.php?op=opendb&doc_id={$doc_id}\">{$_local->gui->open}</a>";
                        }
                        break;
                }
            }

        } else {
            if (!isset($data)) {
                $dl_file_name = $dir_user_base . $USER_ID . "/dl.json";
                $data = file_get_contents($dl_file_name);
            }
            $res = json_decode($data);

            $title = $res[0]->title;
            $title_en = pali2english($title);
            $book = $res[0]->book;
            if (substr($book, 0, 1) == "p") {
                $book = substr($book, 1);
            }
            $paragraph = $res[0]->parNum;
            $tag = "[$title]";
            $paraList = $res[0]->parlist;
            $paraList = rtrim($paraList, ",");
            $strQueryParaList = str_replace(",", "','", $paraList);
            $strQueryParaList = "('" . $strQueryParaList . "')";
            $aParaList = str_getcsv($paraList);
            echo "<div style='display:none;'>";
            echo $strQueryParaList;
            echo "<textarea>";
            print_r($res);
            echo "</textarea>";
            echo "</div>";
            if (!isset($_POST["title"])) {
                $thisFileName = basename(__FILE__);
                echo "<div class='fun_block'>";
                echo "<h2>{$_local->gui->new_project}</h2>";
                echo "<form action=\"{$thisFileName}\" method=\"post\">";
                echo "<input type='hidden' name='op' value='{$op}'/>";
                echo "<input type='hidden' name='data' value='{$data}'/>";

                echo "<fieldset>";
                echo "<legend>{$_local->gui->title} ({$_local->gui->required})</legend>";
                echo "<div>";
                echo "<input type='input' name='title' value='{$title}'/>";
                echo "</div>";
                echo "</fieldset>";
                echo "<fieldset>";
                echo "<legend>{$_local->gui->channel} ({$_local->gui->required})</legend>";
                echo "<div>";
                PDO_Connect(_FILE_DB_CHANNAL_);
                $query = "select * from channal where owner = '{$_COOKIE["userid"]}'   limit 0,100";
                $Fetch = PDO_FetchAll($query);
                $i = 0;
                foreach ($Fetch as $row) {
                    echo '<div class="file_list_row" style="padding:5px;">';

                    echo '<div class="pd-10"  style="max-width:2em;flex:1;">';
                    echo '<input name="channal" value="' . $row["id"] . '" ';
                    if ($i == 0) {
                        echo "checked";
                    }
                    echo ' type="radio" />';
                    echo '</div>';
                    echo '<div class="title" style="flex:3;padding-bottom:5px;">' . $row["name"] . '</div>';
                    echo '<div class="title" style="flex:3;padding-bottom:5px;">' . $row["lang"] . '</div>';
                    echo '<div class="title" style="flex:2;padding-bottom:5px;">';
                    PDO_Connect( _FILE_DB_USER_WBW_);
                    $query = "select count(*) from "._TABLE_USER_WBW_BLOCK_." where channal = '{$row["id"]}' and book='{$book}' and paragraph in {$strQueryParaList}  limit 0,100";
                    $FetchWBW = PDO_FetchOne($query);
                    echo '</div>';
                    echo '<div class="title" style="flex:2;padding-bottom:5px;">';
                    if ($FetchWBW == 0) {
                        echo $_local->gui->blank;
                        echo "&nbsp;<a></a>";//快捷编辑？
                    } else {
                        echo $FetchWBW . $_local->gui->para;
                        echo "&nbsp;<a href='../studio/editor.php?op=openchannal&book=$book&para={$paraList}&channal={$row["id"]}'>{$_local->gui->open}</a>";
                    }
                    echo '</div>';

                    echo '<div class="title" style="flex:2;padding-bottom:5px;">';
                    PDO_Connect( _FILE_DB_SENTENCE_);
                    $query = "select count(*) from sentence where channal = '{$row["id"]}' and book='{$book}' and paragraph in {$strQueryParaList}  limit 0,100";
                    $FetchWBW = PDO_FetchOne($query);
                    echo '</div>';
                    echo '<div class="title" style="flex:2;padding-bottom:5px;">';
                    if ($FetchWBW == 0) {
                        echo $_local->gui->blank;
                    } else {
                        echo $FetchWBW . $_local->gui->para;
                    }
                    echo '</div>';

                    echo '<div class="summary"  style="flex:1;padding-bottom:5px;">' . $row["status"] . '</div>';
                    echo '<div class="author"  style="flex:1;padding-bottom:5px;">' . $row["create_time"] . '</div>';

                    echo '</div>';
                    $i++;
                }
                echo '<div class="file_list_row" style="padding:5px;">';

                echo '<div class="pd-10"  style="max-width:7em;flex:1;">'.$_local->gui->new.'&nbsp;'.$_local->gui->channel.'</div>';
                echo '<div class="title" style="flex:3;padding-bottom:5px;display:none;">';
                echo '在studio中新建版本风格</div>';
                echo '<div class="author"  style="flex:1;padding-bottom:5px;"><button>'.$_local->gui->new.'</button></div>';

                echo '</div>';
                echo "</div>";
                echo "</fieldset>";
                echo "<fieldset>";
                echo "<legend>{$_local->gui->language}</legend>";
                echo "<select name='lang'>";
                $lang_list = new lang_enum;
                foreach ($user_setting['studio.translation.lang'] as $key => $value) {
                    echo "<option value='{$value}'>" . $lang_list->getName($value)["name"] . "</option>";
                }

                echo "</select>";
                echo "</fieldset>";
                echo "<input type=\"submit\" value='{$_local->gui->create_now}'>";
                echo "<input type='hidden' name='format' value='db'>";
                echo "</form>";
                echo "</div>";
                echo "</body>";
                exit;
            }
            $user_title = $_POST["title"];
            $create_para = $paragraph;

            $FileName = $book . "_" . $paragraph . "_" . time() . ".pcs";
            $sFullFileName = _DIR_USER_DOC_ . "/" . $USER_ID . _DIR_MYDOCUMENT_ . "/" . $FileName;
            echo "filename:" . $sFullFileName;
            $myfile = fopen($sFullFileName, "w") or die("Unable to open file!");

            $strXml = "<set>\n";

            $doc_head = "    <head>\n";
            $doc_head .= "        <type>pcdsset</type>\n";
            $doc_head .= "        <mode>package</mode>\n";
            $doc_head .= "        <ver>1</ver>\n";
            $doc_head .= "        <toc></toc>\n";
            $doc_head .= "        <style></style>\n";
            $doc_head .= "        <doc_title>$user_title</doc_title>\n";
            $doc_head .= "        <tag>$tag</tag>\n";
            $doc_head .= "        <book>$book</book>\n";
            $doc_head .= "        <paragraph>$paragraph</paragraph>\n";
            $doc_head .= "    </head>\n";

            $strXml .= $doc_head;
            $strXml .= "    <dict></dict>\n";
            $strXml .= "    <message></message>\n";
            $strXml .= "    <body>\n";
            fwrite($myfile, $strXml);
            echo "count res:" . count($res) . "<br>";
            for ($iRes = 0; $iRes < count($res); $iRes++) {
                $get_res_type = $res[$iRes]->type;
                echo "iRes: $iRes,type:$get_res_type<br/>";
                $res_album_id = $res[$iRes]->album_id;
                $res_book = $res[$iRes]->book;
                $get_par_begin = $res[$iRes]->parNum;
                $language = $res[$iRes]->language;
                $author = $res[$iRes]->author;

                $res_album_guid = UUID::v4();
                $res_album_owner = 0;

                switch ($get_res_type) {
                    case "1": //pali text
                        {
                            PDO_Connect(_FILE_DB_PALITEXT_);
                            $query = "SELECT * FROM "._TABLE_PALI_TEXT_." WHERE \"book\" = " . $PDO->quote($res_book) . " AND (\"paragraph\" in {$strQueryParaList} ) ";

                            $sth = $PDO->prepare($query);
                            $sth->execute();
                            echo $query . "<br/>";
                            {

                                while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
                                    $text = $result["text"];
                                    $paragraph = $result["paragraph"];
                                    $strXml = "<block>";
                                    $strXml .= "<info>";
                                    $strXml .= "<type>palitext</type>";
                                    $strXml .= "<book>{$book}</book>";
                                    $strXml .= "<paragraph>{$result["paragraph"]}</paragraph>";
                                    $strXml .= "<album_id>{$result["album_index"]}</album_id>";
                                    $strXml .= "<album_guid>{$res_album_guid}</album_guid>";
                                    $strXml .= "<author>VRI</author>";
                                    $strXml .= "<language>pali</language>";
                                    $strXml .= "<version>4</version>";
                                    $strXml .= "<edition>CSCD4</edition>";
                                    $strXml .= "<level>{$result["level"]}</level>";
                                    $strXml .= "<id>" . UUID::v4() . "</id>";
                                    $strXml .= "</info>";
                                    $strXml .= "<data><text>{$result["text"]}</text></data>";
                                    $strXml .= "</block>";
                                    fwrite($myfile, $strXml);

                                    if ($result["level"] > 0 && $result["level"] < 9) {
                                        $strXml = "<block>";
                                        $strXml .= "<info>";
                                        $strXml .= "<type>heading</type>";
                                        $strXml .= "<book>{$book}</book>";
                                        $strXml .= "<paragraph>{$result["paragraph"]}</paragraph>";
                                        $strXml .= "<album_id>{$result["album_index"]}</album_id>";
                                        $strXml .= "<album_guid>{$res_album_guid}</album_guid>";
                                        $strXml .= "<author>VRI</author>";
                                        $strXml .= "<language>pali</language>";
                                        $strXml .= "<version>4</version>";
                                        $strXml .= "<edition>CSCD4</edition>";
                                        $strXml .= "<level>{$result["level"]}</level>";
                                        $strXml .= "<id>" . UUID::v4() . "</id>";
                                        $strXml .= "</info>";
                                        $strXml .= "<data><text>{$result["text"]}</text></data>";
                                        $strXml .= "</block>";
                                        fwrite($myfile, $strXml);
                                    } else {

                                    }
                                }
                            }
                            break;
                        }
                    case "2": //wbw逐词解析
                        {
                            //$res_album_id;
                            $album_title = "title";
                            $album_author = $author;
                            $album_type = $get_res_type;
                            $db_file = _DIR_PALICANON_WBW_ . "/p{$res_book}_wbw.db3";
                            $table_info = "p{$res_book}_wbw_info";
                            $table_data = "p{$res_book}_wbw_data";
                            PDO_Connect("$db_file");
                            foreach ($aParaList as $iPar) {
                                $query = "SELECT * FROM '{$table_info}' WHERE paragraph = " . $PDO->quote($iPar) . " and album_id=" . $PDO->quote($res_album_id);
                                //$FetchInfo = PDO_FetchAll($query);
                                echo $query . "<br>";
                                $sth = $PDO->prepare($query);
                                $sth->execute();
                                echo "para:{$iPar} row:" . $sth->rowCount();

                                if ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
                                    $lang = $sLang["{$result["language"]}"];
                                    $info_id = $result["id"];
                                    $strXml = "<block>";
                                    $strXml .= "<info>";
                                    $strXml .= "<type>wbw</type>";
                                    $strXml .= "<book>{$res_book}</book>";
                                    $strXml .= "<paragraph>{$iPar}</paragraph>";
                                    $strXml .= "<level>{$result["level"]}</level>";
                                    $strXml .= "<title>{$result["title"]}</title>";
                                    $strXml .= "<album_id>{$res_album_id}</album_id>";
                                    $strXml .= "<album_guid>{$res_album_guid}</album_guid>";
                                    $strXml .= "<author>{$result["author"]}</author>";
                                    $strXml .= "<language>{$lang}</language>";
                                    $strXml .= "<version>{$result["version"]}</version>";
                                    $strXml .= "<edition>{$result["edition"]}</edition>";
                                    $strXml .= "<id>" . UUID::v4() . "</id>";
                                    $strXml .= "</info>\n";
                                    $strXml .= "<data>";
                                    fwrite($myfile, $strXml);
                                    $query = "SELECT * FROM \"{$table_data}\" WHERE info_id=" . $PDO->quote($info_id);
                                    $sth = $PDO->prepare($query);
                                    $sth->execute();
                                    while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
                                        $wid = "p{$res_book}-{$iPar}-{$result["sn"]}";
                                        $strXml = "<word>";
                                        $strXml .= "<pali>{$result["word"]}</pali>";
                                        $strXml .= "<real>{$result["real"]}</real>";
                                        $strXml .= "<id>{$wid}</id>";
                                        $strXml .= "<type>{$result["type"]}</type>";
                                        $strXml .= "<gramma>{$result["gramma"]}</gramma>";
                                        $strXml .= "<mean>{$result["mean"]}</mean>";
                                        $strXml .= "<note>{$result["note"]}</note>";
                                        $strXml .= "<org>{$result["part"]}</org>";
                                        $strXml .= "<om>{$result["partmean"]}</om>";
                                        $strXml .= "<case>{$result["type"]}#{$result["gramma"]}</case>";
                                        $strXml .= "<style>{$result["style"]}</style>";
                                        $strXml .= "<enter>{$result["enter"]}</enter>";
                                        $strXml .= "<status>0</status>";
                                        $strXml .= "</word>\n";
                                        fwrite($myfile, $strXml);
                                    }

                                    $strXml = "</data>\n</block>";
                                    fwrite($myfile, $strXml);
                                }

                            }
                            break;
                        }
                    case "3": //translate
                        {
							#已经废弃
                            //打开翻译数据文件
                            $db_file = _DIR_PALICANON_TRAN_ . "/p{$book}_translate.db3";
                            PDO_Connect("$db_file");
                            $table = "p{$book}_translate_info";
                            //部分段落
                            $query = "SELECT * FROM {$table} WHERE paragraph in {$strQueryParaList}  and album_id=$res_album_id";
                            echo $query . "<br/>";
                            //查询翻译经文内容
                            $FetchText = PDO_FetchAll($query);
                            $iFetchText = count($FetchText);
                            echo "iFetchText:{$iFetchText}<br/>";
                            if ($iFetchText > 0) {
                                for ($i = 0; $i < $iFetchText; $i++) {
                                    $currParNo = $FetchText[$i]["paragraph"];
                                    $language = $FetchText[$i]["language"];
                                    $language = $sLang["{$language}"];
                                    if ($res_album_owner == $UID) {
                                        $power = "write";
                                    } else {
                                        $power = "read";
                                    }
                                    //输出数据头

                                    $strXml = "<block>";
                                    $strXml .= "<info>";
                                    $strXml .= "<type>translate</type>";
                                    $strXml .= "<book>{$res_book}</book>";
                                    $strXml .= "<paragraph>{$currParNo}</paragraph>";
                                    $strXml .= "<album_id>{$res_album_id}</album_id>";
                                    $strXml .= "<album_guid>{$res_album_guid}</album_guid>";
                                    $strXml .= "<author>{$FetchText[$i]["author"]}</author>";
                                    $strXml .= "<editor>{$FetchText[$i]["editor"]}</editor>";
                                    $strXml .= "<language>{$language}</language>";
                                    $strXml .= "<version>{$FetchText[$i]["version"]}</version>";
                                    $strXml .= "<edition>{$FetchText[$i]["edition"]}</edition>";
                                    $strXml .= "<level>{$FetchText[$i]["level"]}</level>";
                                    $strXml .= "<readonly>0</readonly>";
                                    $strXml .= "<power>{$power}</power>";
                                    $strXml .= "<id>" . UUID::v4() . "</id>";
                                    $strXml .= "</info>";
                                    $strXml .= "<data>";
                                    fwrite($myfile, $strXml);
                                    //查另一个表，获取段落文本。一句一条记录。有些是一段一条记录
                                    $table_data = "p{$book}_translate_data";
                                    $query = "SELECT * FROM '{$table_data}' WHERE info_id={$FetchText[$i]["id"]}";
                                    $aParaText = PDO_FetchAll($query);

                                    //输出数据内容
                                    $par_text = "";
                                    foreach ($aParaText as $sent) {
                                        $par_text .= "<sen><begin>{$sent["begin"]}</begin><end>{$sent["end"]}</end><text>{$sent["text"]}</text></sen>";
                                    }
                                    fwrite($myfile, $par_text);
                                    //段落块结束
                                    $strXml = "</data></block>";
                                    fwrite($myfile, $strXml);
                                    //获取段落文本结束。
                                }
                            }
                            break;
                        }
                    case "4": //note
                        break;
                    case "5":
                        break;
                    case "6": //逐词译模板
                        {
                            $album_guid = UUID::v4();
                            $album_title = "title";
                            $album_author = "VRI";
                            $album_type = $get_res_type;
                            //获取段落层级和标题
                            $para_title = array();
                            PDO_Connect(_FILE_DB_PALITEXT_);
                            $query = "SELECT * FROM "._TABLE_PALI_TEXT_." WHERE  book\" = " . $PDO->quote($res_book) . " AND (\"paragraph\" in {$strQueryParaList} ) AND level>0 AND level<9";
                            $sth = $PDO->prepare($query);
                            $sth->execute();
                            while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
                                $paragraph = $result["paragraph"];
                                $para_title["{$paragraph}"][0] = $result["level"];
                                $para_title["{$paragraph}"][1] = $result["text"];
                            }

                            $db_file = _DIR_PALICANON_TEMPLET_ . "/p" . $res_book . "_tpl.db3";
                            PDO_Connect(_FILE_DB_PALICANON_TEMPLET_);
                            foreach ($aParaList as $iPar) {
                                $query = "SELECT * FROM "._TABLE_PALICANON_TEMPLET_." WHERE ( book = ".$PDO->quote($res_book)." AND   paragraph  = " . $PDO->quote($iPar) . " ) ";

                                $sth = $PDO->prepare($query);
                                $sth->execute();
                                {
                                    if (isset($para_title["{$iPar}"])) {
                                        $level = $para_title["{$iPar}"][0];
                                        $title = $para_title["{$iPar}"][1];
                                    } else {
                                        $level = 100;
                                        $title = "";
                                    }
                                    $strXml = "<block>";
                                    $strXml .= "<info>";
                                    $strXml .= "<type>wbw</type>";
                                    $strXml .= "<book>{$book}</book>";
                                    $strXml .= "<paragraph>{$iPar}</paragraph>";
                                    $strXml .= "<level>{$level}</level>";
                                    $strXml .= "<title>{$title}</title>";
                                    $strXml .= "<album_id>-1</album_id>";
                                    $strXml .= "<album_guid>{$album_guid}</album_guid>";
                                    $strXml .= "<author>{$USER_NAME}</author>";
                                    $strXml .= "<editor>{$USER_NAME}</editor>";
                                    $strXml .= "<language>en</language>";
                                    $strXml .= "<version>1</version>";
                                    $strXml .= "<edition></edition>";
                                    $strXml .= "<splited>0</splited>";
                                    $strXml .= "<id>" . UUID::v4() . "</id>";
                                    $strXml .= "</info>\n";
                                    $strXml .= "<data>";
                                    fwrite($myfile, $strXml);
                                    while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
                                        if ($result["gramma"] == "?") {
                                            $wGrammar = "";
                                        } else {
                                            $wGrammar = $result["gramma"];
                                        }
                                        $strXml = "<word>";
                                        $strXml .= "<pali>{$result["word"]}</pali>";
                                        $strXml .= "<real>{$result["real"]}</real>";
                                        $strXml .= "<id>{$result["wid"]}</id>";
                                        $strXml .= "<type status=\"0\">{$result["type"]}</type>";
                                        $strXml .= "<gramma status=\"0\">{$wGrammar}</gramma>";
                                        $strXml .= "<mean status=\"0\">?</mean>";
                                        $strXml .= "<org status=\"0\">" . mb_strtolower($result["part"], 'UTF-8') . "</org>";
                                        $strXml .= "<om status=\"0\">?</om>";
                                        $strXml .= "<case status=\"0\">{$result["type"]}#{$wGrammar}</case>";
                                        $strXml .= "<style>{$result["style"]}</style>";
                                        $strXml .= "<status>0</status>";
                                        $strXml .= "</word>";
                                        fwrite($myfile, $strXml);
                                    }

                                    $strXml = "</data>\n</block>";
                                    fwrite($myfile, $strXml);
                                }

                            }
                            break;
                        }

                }
                /*查询结束*/
            }
            /*
            自动新建译文
             */
            if (isset($_POST["new_tran"])) {
                $new_tran = $_POST["new_tran"];
                if ($new_tran == "on") {
                    $album_guid = UUID::v4();
                    foreach ($aParaList as $iPar) {
                        $strXml = "<block>";
                        $strXml .= "<info>";
                        $strXml .= "<album_id>-1</album_id>";
                        $strXml .= "<album_guid>{$album_guid}</album_guid>";
                        $strXml .= "<type>translate</type>";
                        $strXml .= "<paragraph>{$iPar}</paragraph>";
                        $strXml .= "<book>{$book}</book>";
                        $strXml .= "<author>{$author}</author>";
                        $strXml .= "<language>en</language>";
                        $strXml .= "<version>0</version>";
                        $strXml .= "<edition>0</edition>";
                        $strXml .= "<id>" . UUID()::v4 . "</id>";
                        $strXml .= "</info>";
                        $strXml .= "<data>";
                        $strXml .= "<sen><begin></begin><end></end><text>new translate</text></sen>";
                        $strXml .= "</data>";
                        $strXml .= "</block>\n";
                        fwrite($myfile, $strXml);
                    }
                }
            }
            $strXml = "    </body>\n";
            $strXml .= "</set>\n";
            fwrite($myfile, $strXml);
            fclose($myfile);
            echo "<p>save ok</p>";
            $filesize = filesize($sFullFileName);
            //服务器端文件列表
            PDO_Connect(_FILE_DB_FILEINDEX_);

            $query = "INSERT INTO fileindex ('id',
												'parent_id',
												'user_id',
												'book',
												'paragraph',
												'file_name',
												'title',
												'tag',
												'status',
												'create_time',
												'modify_time',
												'accese_time',
												'file_size',
												'share',
												'doc_info',
												'doc_block',
												'receive_time'
												)
									VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            $stmt = $PDO->prepare($query);
            $doc_id = UUID::v4();
            $newData = array($doc_id,
                "",
                $uid,
                $book,
                $create_para,
                $FileName,
                $user_title,
                $tag,
                1,
                mTime(),
                mTime(),
                mTime(),
                $filesize,
                0,
                "",
                "",
                mTime(),
            );
            $stmt->execute($newData);
            if (!$stmt || ($stmt && $stmt->errorCode() != 0)) {
                $error = PDO_ErrorInfo();
                echo "error - $error[2] <br>";
            } else {
                echo "updata 1 recorders.";
            }
            echo "<a href=\"editor.php?op=open&fileid={$doc_id}\">正在跳转</a>";
            echo "<script>";
            echo "window.location.assign(\"editor.php?op=open&fileid={$doc_id}\");";
            echo "</script>";
            break;
        }
    case "open":
        {
            /*打开工程文件
            三种情况
            1.自己的文档
            2.别人的共享文档，自己以前没有打开过。复制到自己的空间，再打开。
            3.别人的共享文档，自己以前打开过。直接打开
             */
            if ($_COOKIE["uid"]) {
                $uid = $_COOKIE["uid"];
            } else {
                echo "<h3><a href='../ucenter/index.php?op=login'>{$_local->gui->login}</a>后才可以打开文档</h3>";
                exit;
            }
            PDO_Connect(_FILE_DB_FILEINDEX_);
            if (isset($_GET["doc_id"])) {
                $doc_id = $_GET["doc_id"];
                $query = "select * from fileindex where id='$doc_id' ";
                $Fetch = PDO_FetchAll($query);
                $iFetch = count($Fetch);
                if ($iFetch > 0) {
                    //文档信息
                    $owner = $Fetch[0]["user_id"];
                    $filename = $Fetch[0]["file_name"];
                    $title = $Fetch[0]["title"];
                    $tag = $Fetch[0]["tag"];
                    $mbook = $Fetch[0]["book"];
                    $paragraph = $Fetch[0]["paragraph"];
                    $doc_head = $Fetch[0]["doc_info"];

                    if ($owner == $uid) {
                        //自己的文档
                        echo "<h3>{$_local->gui->my_document}</h3>";
                        $my_doc_id = $doc_id;
                        echo "<a href=\"editor.php?op=opendb&fileid={$doc_id}\">{$_local->gui->open_doc}</a>";
                        echo "<script>";
                        echo "window.location.assign(\"editor.php?op=opendb&fileid={$doc_id}\");";
                        echo "</script>";
                    } else {
                        //别人的文档
                        //查询自己是否以前打开过
                        $query = "select * from fileindex where parent_id='$doc_id' and user_id='$uid' ";
                        $FetchSelf = PDO_FetchAll($query);
                        $iFetchSelf = count($FetchSelf);
                        if ($iFetchSelf > 0) {
                            //以前打开过
                            echo "已经复制的文档 Already Copy";
                            $my_doc_id = $FetchSelf[0]["id"];
                            echo "<a href='../studio/editor.php?op=opendb&fileid={$doc_id}'>{$_local->gui->edit_now}</a>";
                            echo "<script>";
                            echo "window.location.assign(\"editor.php?op=opendb&fileid={$doc_id}\");";
                            echo "</script>";
                        } else {
                            //以前没打开过
                            //询问是否打开
                            if (isset($_GET["openin"])) {
                                $open_in = $_GET["openin"];
                            } else {
                                ?>
						<p><?php echo $_local->gui->co_doc ?>，<?php echo $_local->gui->open ?>？</p>
						<div>
						文档信息：
						<ul>
						<?php
$book_name = $book["p" . $mbook];
                                echo "<li>Owner：" . ucenter_get($owner) . "</li>";
                                echo "<li>Title：{$title}</li>";
                                echo "<li>Book：{$book_name}</li>";
                                ?>
						</ul>
						</div>
						<p><?php echo $_local->gui->open_with ?>：</p>
						<ul>
						<li style="display:none;">
							<a href="../reader/?file=<?php echo $doc_id; ?>"><?php echo $_local->gui->reader; ?>（<?php echo $_local->gui->read_only; ?>）</a>
						</li>
						<?php
if (empty($doc_head)) {
                                    echo '<li><a href="../studio/project.php?op=open&doc_id=' . $doc_id . '&openin=editor">复制到我的空间用编辑器打开</a></li>';
                                } else {
                                    echo '<li>' . $_local->gui->pcd_studio . '<a href="../doc/fork.php?doc_id=' . $doc_id . '">' . $_local->gui->folk . $_local->gui->and . $_local->gui->edit . '</a></li>';
                                }
                                ?>

						</ul>
						<?php
exit;
                            }
                            if ($open_in == "editor") {
                                //获取文件路径
                                echo "共享的文档，复制并打开...";
                                PDO_Connect(_FILE_DB_USERINFO_);
                                $query = "select userid from user where id='$owner'";
                                $FetchUid = PDO_FetchOne($query);
                                if ($FetchUid) {
                                    $source = _DIR_USER_DOC_ . "/" . $FetchUid . _DIR_MYDOCUMENT_ . "/" . $filename;
                                    $dest = _DIR_USER_DOC_ . "/" . $_COOKIE["userid"] . _DIR_MYDOCUMENT_ . "/" . $filename;
                                }
                                echo "<div>源文件{$source}</div>";
                                echo "<div>目标文件{$dest}</div>";
                                if (copy($source, $dest)) {
                                    echo "复制文件成功";
                                    $my_file_name = $filename;
                                    //插入记录到文件索引
                                    $filesize = filesize($dest);
                                    //服务器端文件列表
                                    PDO_Connect(_FILE_DB_FILEINDEX_);

                                    //$query="INSERT INTO fileindex ('id','userid','parent_id','doc_id','book','paragraph','file_name','title','tag','create_time','modify_time','accese_time','file_size')
                                    //                VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?)";
                                    //$stmt = $PDO->prepare($query);
                                    //$newData=array($uid,$doc_id,UUID::v4(),$mbook,$paragraph,$filename,$title,$tag,time(),time(),time(),$filesize);

                                    $query = "INSERT INTO fileindex ('id',
												'parent_id',
												'user_id',
												'book',
												'paragraph',
												'file_name',
												'title',
												'tag',
												'status',
												'create_time',
												'modify_time',
												'accese_time',
												'file_size',
												'share',
												'doc_info',
												'doc_block',
												'receive_time'
												)
									VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                                    $stmt = $PDO->prepare($query);
                                    $newdoc_id = UUID::v4();
                                    $newData = array(
                                        $newdoc_id,
                                        $doc_id,
                                        $uid,
                                        $mbook,
                                        $paragraph,
                                        $filename,
                                        $title,
                                        $tag,
                                        1,
                                        mTime(),
                                        mTime(),
                                        mTime(),
                                        $filesize,
                                        0,
                                        "",
                                        "",
                                        mTime(),
                                    );

                                    $stmt->execute($newData);
                                    if (!$stmt || ($stmt && $stmt->errorCode() != 0)) {
                                        $error = PDO_ErrorInfo();
                                        echo "error - $error[2] <br>";
                                        $my_doc_id = "";
                                    } else {
                                        $my_doc_id = newdoc_id;
                                        echo "updata 1 recorders.";
                                    }

                                } else {
                                    echo "复制文件失败";
                                    $my_doc_id = "";
                                }
                            } else {
                                echo "错误-无法识别的操作：open in:{$open_in}";
                                $my_doc_id = "";
                            }
                        }

                    }
                    /*
                if($my_doc_id!=""){
                echo "<script>";
                echo "window.location.assign(\"editor.php?op=open&fileid={$my_doc_id}\");";
                echo "</script>";

                }
                 */
                } else {
                    echo "未知的文档。可能该文件已经被删除。";
                }
            }
        }
        break;
    case "openfile":
        break;
    case "save":
        break;
}
?>
</body>