//词性——语法
var config = [
    { "myApp": "" }
];
var gramma_str = [
    { "id": ".n.", "a": ".m.$.f.$.nt.", "b": ".sg.$.pl.", "c": ".nom.$.acc.$.inst.$.dat.$.abl.$.gen.$.loc.$.voc." },
    { "id": ".ti.", "a": ".m.$.f.$.nt.", "b": ".sg.$.pl.", "c": ".nom.$.acc.$.inst.$.dat.$.abl.$.gen.$.loc.$.voc." },
    { "id": ".v.", "a": ".1p.$.2p.$.3p.$.ind.", "b": ".sg.$.pl.", "c": ".pres.$.opt.$.imp.$.cond.$.aor.$.fut." },
    { "id": ".v:ind.", "a": ".inf.$.abs.$.ger.", "b": "", "c": "" },
    { "id": ".v:base.", "a": ".pass.$.caus.$.desid.$.intens.$.denom.$_un_auto_factormean_", "b": "", "c": "" },
    { "id": ".ind.", "a": ".adv.$.conj.$.prep.$.interj.", "b": "", "c": "" },
    { "id": ".pron.", "a": ".m.$.f.$.nt.$.1p.$.2p.", "b": ".sg.$.pl.", "c": ".nom.$.acc.$.inst.$.dat.$.abl.$.gen.$.loc.$.voc." },
    { "id": ".num.", "a": "", "b": ".pl.", "c": ".nom.$.acc.$.inst.$.dat.$.abl.$.gen.$.loc.$.voc." },
    { "id": ".note.", "a": "", "b": "", "c": "" },
    { "id": ".ti:base.", "a": ".pp.$.fpp.$.grd.$.prp.$.adj.$_un_auto_factormean_", "b": "", "c": "" },
    { "id": ".n:base.", "a": ".m.$.f.$.nt.$.m./.f.$.m./.nt.$.nt./.f.", "b": "", "c": "" },
    { "id": ".pron:base.", "a": ".1p.$.2p.$.3p.", "b": "", "c": "" },
    { "id": ".num:base.", "a": "", "b": "", "c": "" },
    { "id": ".adj:base.", "a": ".m.$.f.$.nt.", "b": "", "c": "" },
    { "id": ".root.", "a": "", "b": "", "c": "" },
    { "id": ".suf.", "a": ".m.$.f.$.nt.", "b": "", "c": "" },
    { "id": ".pre.", "a": "", "b": "", "c": "" },
    { "id": ".end.", "a": ".m.$.f.$.nt.", "b": ".sg.$.pl.", "c": ".nom.$.acc.$.inst.$.dat.$.abl.$.gen.$.loc.$.voc." },
    { "id": ".adj.", "a": ".m.$.f.$.nt.", "b": ".sg.$.pl.", "c": ".nom.$.acc.$.inst.$.dat.$.abl.$.gen.$.loc.$.voc." },
    { "id": ".comp.", "a": ".ti.$.n.$.ind.$_un_auto_factormean_", "b": "", "c": "" },
    { "id": ".un.", "a": "", "b": "", "c": "" }
];

var dict_language_enable = "en,tc,sc";//
var language_gui = "en";//
var language_script = "en";//
var language_translation = "en";//

var wordmap_child_type = [
    { "type": "null", "value": ".v.$.n.$.adj.$.ti.$.ind." },
    { "type": ".v.", "value": ".v:base.$.suf.$.root.$.v:root.$.pre." },
    { "type": ".n.", "value": ".n:base.$.suf.$.root.$.pre.$.suf.$.n:base.$.adj:base.$.ti:base." },
    { "type": ".adj.", "value": ".adj:base.$.suf.$.pre.$.root.$.suf.$.n:base.$.adj:base.$.ti:base." },
    { "type": ".ti.", "value": ".ti:base.$.suf.$.pre.$.root.$.suf.$.n:base.$.adj:base.$.ti:base." },
    { "type": ".ind.", "value": "" },
    { "type": ".conj.", "value": "" },
    { "type": ".adv.", "value": "" },
    { "type": ".v:ind.", "value": ".root.$.v:root.$.v:base.$.suf." },
    { "type": ".comp.", "value": ".n:base.$.adj:base.$.ti:base.$.n.$.adj.$.ti.$.suf." },
    { "type": ".pre.", "value": "" },
    { "type": ".suf.", "value": "" },
    { "type": ".root.", "value": "" },
    { "type": ".v:root.", "value": ".pre.$.suf.$.root." },
    { "type": ".v:base.", "value": ".pre.$.suf.$.root.$.v:root." },
    { "type": ".n:base.", "value": ".pre.$.suf.$.root.$.n:base.$.adj:base.$.ti:base.$.v:ind." },
    { "type": ".adj:base.", "value": ".pre.$.suf.$.root.$.n:base.$.adj:base.$.ti:base." },
    { "type": ".ti:base.", "value": ".pre.$.suf.$.root.$.n:base.$.adj:base.$.ti:base." },
    { "type": ".part.", "value": "" }
];

var local_sign_str = [
    { "id": ",", "value": "" },
    { "id": "‘", "value": "" },
    { "id": "’", "value": "" },
    { "id": ".", "value": "" },
    { "id": "-", "value": "" },
    { "id": "[", "value": "" },
    { "id": "]", "value": "" },
    { "id": "?", "value": "" },
    { "id": "!", "value": "" },
    { "id": "1", "value": "" },
    { "id": "2", "value": "" },
    { "id": "3", "value": "" },
    { "id": "4", "value": "" },
    { "id": "5", "value": "" },
    { "id": "6", "value": "" },
    { "id": "7", "value": "" },
    { "id": "8", "value": "" },
    { "id": "9", "value": "" },
    { "id": "0", "value": "" }

];

var local_letter_str = [
    { "id": "k", "value": "" },
    { "id": "g", "value": "" },
    { "id": "d", "value": "" },
    { "id": "t", "value": "" },
    { "id": "ṭ", "value": "" },
    { "id": "ḍ", "value": "" },
    { "id": "c", "value": "" },
    { "id": "j", "value": "" },
    { "id": "b", "value": "" },
    { "id": "p", "value": "" },
    { "id": "ṇ", "value": "" },
    { "id": "ñ", "value": "" },
    { "id": "ṅ", "value": "" },
    { "id": "n", "value": "" },
    { "id": "ṃ", "value": "" },
    { "id": "s", "value": "" },
    { "id": "v", "value": "" },
    { "id": "h", "value": "" },
    { "id": "r", "value": "" },
    { "id": "l", "value": "" },
    { "id": "ḷ", "value": "" },
    { "id": "a", "value": "" },
    { "id": "i", "value": "" },
    { "id": "u", "value": "" },
    { "id": "ā", "value": "" },
    { "id": "ī", "value": "" },
    { "id": "ū", "value": "" },
    { "id": "e", "value": "" },
    { "id": "o", "value": "" },
    { "id": "y", "value": "" }

];

var local_code_str = [
    { "id": "aa", "value": "ā" },
    { "id": "ii", "value": "ī" },
    { "id": "uu", "value": "ū" },
    { "id": "a:", "value": "ā" },
    { "id": "i:", "value": "ī" },
    { "id": "u:", "value": "ū" },
    /*{ "id":"a-" , "value":"ā" },*/
    { "id": "a-ā", "value": "aā" },
    { "id": "i-", "value": "ī" },
    { "id": "u-", "value": "ū" },
    /*{ "id":"tt" , "value":"ṭ" },
    //{ "id":"dd" , "value":"ḍ" },
    //{ "id":"ll" , "value":"ḷ" },*/
    { "id": "tx", "value": "ṭ" },
    { "id": "dx", "value": "ḍ" },
    { "id": "lx", "value": "ḷ" },
    { "id": "nx", "value": "ṇ" },
    { "id": "nz", "value": "ṅ" },
    { "id": "mx", "value": "ṃ" },
    { "id": "n-", "value": "ñ" },
    { "id": "n~", "value": "ñ" },
    { "id": "t.", "value": "ṭ" },
    { "id": "d.", "value": "ḍ" },
    { "id": "l.", "value": "ḷ" },
    { "id": "n.", "value": "ṇ" },
    { "id": "m.", "value": "ṃ" },

    { "id": ".t", "value": "ṭ" },
    { "id": ".d", "value": "ḍ" },
    { "id": ".l", "value": "ḷ" },
    { "id": ".n", "value": "ṇ" },
    { "id": ".m", "value": "ṃ" },

    { "id": ".r", "value": "ṛ" },
    { "id": "r.", "value": "ṛ" },
    { "id": ".h", "value": "ḥ" },
    { "id": "h.", "value": "ḥ" },
    { "id": ".s", "value": "ṣ" },
    { "id": "s.", "value": "ṣ" },
    { "id": "'s", "value": "ś" },
    { "id": "s'", "value": "ś" },
    { "id": "''s", "value": "ś" },


    { "id": "t-", "value": "	" },
    { "id": "lr", "value": "ḷ" },
    { "id": "nr", "value": "ṇ" },
    { "id": "ny", "value": "ñ" },
    /*{ "id":"mm" , "value":"ṃ" },
    //{ "id":"nn" , "value":"ṅ" },
    //{ "id":"ng" , "value":"ŋ" },
    //{ "id":"mz" , "value":"ṁ" },*/
    { "id": "lḷ", "value": "ḷḷ" },
    { "id": "ḷl", "value": "ḷḷ" },
    { "id": "ṃm", "value": "mm" },
    { "id": "mṃ", "value": "mm" },
    { "id": "ṃa", "value": "ma" },
    { "id": "ṃi", "value": "mi" },
    { "id": "ṃe", "value": "me" },
    { "id": "ṃo", "value": "mo" },
    { "id": "ṃu", "value": "mu" },
    { "id": "ṃā", "value": "mā" },



    { "id": "ng", "value": "ṅg" },
    { "id": "nk", "value": "ṅk" },
    { "id": "ṃg", "value": "ṅg" },
    { "id": "ṃk", "value": "ṅk" },
    { "id": "mg", "value": "ṅg" },
    { "id": "mk", "value": "ṅk" },
    { "id": "ṇg", "value": "ṅg" },
    { "id": "ṇk", "value": "ṅk" },

    { "id": "ṇt", "value": "ṇṭ" },
    { "id": "ṇd", "value": "ṇḍ" },
    { "id": "ṇn", "value": "ṇṇ" },
    { "id": "nṇ", "value": "ṇṇ" },
    { "id": "nṭ", "value": "ṇṭ" },
    { "id": "nḍ", "value": "ṇḍ" },
    { "id": "ṅt", "value": "ṇṭ" },
    { "id": "ṅd", "value": "ṇḍ" },
    { "id": "mṭ", "value": "ṇṭ" },
    { "id": "mḍ", "value": "ṇḍ" },
    { "id": "tṭ", "value": "ṭṭ" },
    { "id": "dḍ", "value": "ḍḍ" },
    { "id": "ṭt", "value": "ṭṭ" },
    { "id": "ḍd", "value": "ḍḍ" },


    { "id": "nc", "value": "ñc" },
    { "id": "nj", "value": "ñj" },
    { "id": "ñn", "value": "ññ" },
    { "id": "nñ", "value": "ññ" },
    { "id": "mc", "value": "ñc" },
    { "id": "mj", "value": "ñj" },
    { "id": "ṃc", "value": "ñc" },
    { "id": "ṃj", "value": "ñj" },
    { "id": "ṅc", "value": "ñc" },
    { "id": "ṅj", "value": "ñj" },

    { "id": "mt", "value": "nt" },
    { "id": "md", "value": "nd" },
    { "id": "ṃt", "value": "nt" },
    { "id": "ṃd", "value": "nd" },
    { "id": "ñt", "value": "nt" },
    { "id": "ñd", "value": "nd" },
    { "id": "ṅt", "value": "nt" },
    { "id": "ṅd", "value": "nd" },

    { "id": "ṃp", "value": "mp" },
    { "id": "ṃb", "value": "mb" },
    { "id": "np", "value": "mp" },
    { "id": "nb", "value": "mb" },
    { "id": "ñp", "value": "mp" },
    { "id": "ñb", "value": "mb" },
    { "id": "ṅp", "value": "mp" },
    { "id": "ṅb", "value": "mb" },

    { "id": "ia", "value": "ya" },//test
    { "id": "iu", "value": "yu" },//test
    { "id": "ie", "value": "ye" },//test
    { "id": "io", "value": "yo" },//test

    { "id": "ua", "value": "va" },//test
    { "id": "uu", "value": "vu" },//test
    { "id": "ue", "value": "ve" },//test
    { "id": "uo", "value": "vo" },//test

    { "id": "'ti'", "value": "’ti" },//test
    //{ "id":"+ti" , "value":"+’ti" },//test
    { "id": "‘ti", "value": "’ti" },//test
    //{ "id":"+nti" , "value":"ṃ+’ti" },//test

    { "id": "Aa", "value": "Ā" },
    { "id": "Ii", "value": "Ī" },
    { "id": "Uu", "value": "Ū" },
    { "id": "AA", "value": "Ā" },
    { "id": "II", "value": "Ī" },
    { "id": "UU", "value": "Ū" },
    { "id": "A:", "value": "Ā" },
    { "id": "I:", "value": "Ī" },
    { "id": "U:", "value": "Ū" },
    { "id": "Tx", "value": "Ṭ" },
    { "id": "Dx", "value": "Ḍ" },
    { "id": "Lx", "value": "Ḷ" },
    { "id": "Nx", "value": "Ṇ" },
    { "id": "Mx", "value": "Ṃ" },
    { "id": "Nz", "value": "Ṅ" },
    { "id": "TX", "value": "Ṭ" },
    { "id": "DX", "value": "Ḍ" },
    { "id": "LX", "value": "Ḷ" },
    { "id": "NX", "value": "Ṇ" },
    { "id": "MX", "value": "Ṃ" },
    { "id": "NZ", "value": "Ṅ" },
    { "id": "N-", "value": "Ñ" }
];
var local_codestr_sinhala = [
    { "id": "bbhr", "value": "බ‍්භ්‍ර්" },
    { "id": "bbhv", "value": "බ‍්භ්‍ව්" },
    { "id": "bbhy", "value": "බ‍්භ්‍ය්" },
    { "id": "cchr", "value": "ච‍්ඡ්‍ර්" },
    { "id": "cchv", "value": "ච‍්ඡ්‍ව්" },
    { "id": "cchy", "value": "ච‍්ඡ්‍ය්" },
    { "id": "ddhr", "value": "ද‍්ධ්‍ර්" },
    { "id": "ddhv", "value": "ද‍්ධ්‍ව්" },
    { "id": "ddhy", "value": "ද‍්ධ්‍ය්" },
    { "id": "ḍḍhr", "value": "ඩ‍්ඪ්‍ර්" },
    { "id": "ḍḍhv", "value": "ඩ‍්ඪ්‍ව්" },
    { "id": "ḍḍhy", "value": "ඩ‍්ඪ්‍ය්" },
    { "id": "gghr", "value": "ග‍්ඝ්‍ර්" },
    { "id": "gghv", "value": "ග‍්ඝ්‍ව්" },
    { "id": "gghy", "value": "ග‍්ඝ්‍ය්" },
    { "id": "ṅkhr", "value": "ඞ‍්ඛ්‍ර්" },
    { "id": "ṅkhv", "value": "ඞ‍්ඛ්‍ව්" },
    { "id": "ṅkhy", "value": "ඞ‍්ඛ්‍ය්" },
    { "id": "ṅghr", "value": "ඞ‍්ඝ්‍ර්" },
    { "id": "ṅghv", "value": "ඞ‍්ඝ්‍ව්" },
    { "id": "ṅghy", "value": "ඞ‍්ඝ්‍ය්" },
    { "id": "jjhr", "value": "ජ‍්ඣ්‍ර්" },
    { "id": "jjhv", "value": "ජ‍්ඣ්‍ව්" },
    { "id": "jjhy", "value": "ජ‍්ඣ්‍ය්" },
    { "id": "kkhr", "value": "ක‍්ඛ්‍ර්" },
    { "id": "kkhv", "value": "ක‍්ඛ්‍ව්" },
    { "id": "kkhy", "value": "ක‍්ඛ්‍ය්" },
    { "id": "ñchr", "value": "ඤ‍්ඡ්‍ර්" },
    { "id": "ñchv", "value": "ඤ‍්ඡ්‍ව්" },
    { "id": "ñchy", "value": "ඤ‍්ඡ්‍ය්" },
    { "id": "ñjhr", "value": "ඤ‍්ඣ්‍ර්" },
    { "id": "ñjhv", "value": "ඤ‍්ඣ්‍ව්" },
    { "id": "ñjhy", "value": "ඤ‍්ඣ්‍ය්" },
    { "id": "ṇṭhr", "value": "ණ‍්ඨ්‍ර්" },
    { "id": "ṇṭhv", "value": "ණ‍්ඨ්‍ව්" },
    { "id": "ṇṭhy", "value": "ණ‍්ඨ්‍ය්" },
    { "id": "ṇḍhr", "value": "ණ‍්ඪ්‍ර්" },
    { "id": "ṇḍhv", "value": "ණ‍්ඪ්‍ව්" },
    { "id": "ṇḍhy", "value": "ණ‍්ඪ්‍ය්" },
    { "id": "nthr", "value": "න්‍ථ්‍ර්" },
    { "id": "nthv", "value": "න්‍ථ්‍ව්" },
    { "id": "nthy", "value": "න්‍ථ්‍ය්" },
    { "id": "ndhr", "value": "න්‍ධ්‍ර්" },
    { "id": "ndhv", "value": "න්‍ධ්‍ව්" },
    { "id": "ndhy", "value": "න්‍ධ්‍ය්" },
    { "id": "pphr", "value": "ප‍්ඵ්‍ර්" },
    { "id": "pphv", "value": "ප‍්ඵ්‍ව්" },
    { "id": "pphy", "value": "ප‍්ඵ්‍ය්" },
    { "id": "mphr", "value": "ම‍්ඵ්‍ර්" },
    { "id": "mphv", "value": "ම‍්ඵ්‍ව්" },
    { "id": "mphy", "value": "ම‍්ඵ්‍ය්" },
    { "id": "mbhr", "value": "ම‍්භ්‍ර්" },
    { "id": "mbhv", "value": "ම‍්භ්‍ව්" },
    { "id": "mbhy", "value": "ම‍්භ්‍ය්" },
    { "id": "tthr", "value": "ත්‍ථ්‍ර්" },
    { "id": "tthv", "value": "ත්‍ථ්‍ව්" },
    { "id": "tthy", "value": "ත්‍ථ්‍ය්" },
    { "id": "ṭṭhr", "value": "ට‍්ඨ්‍ර්" },
    { "id": "ṭṭhv", "value": "ට‍්ඨ්‍ව්" },
    { "id": "ṭṭhy", "value": "ට‍්ඨ්‍ය්" },
    { "id": "bbh", "value": "බ‍්භ්" },
    { "id": "cch", "value": "ච‍්ඡ්" },
    { "id": "ddh", "value": "ද‍්ධ්" },
    { "id": "ḍḍh", "value": "ඩ‍්ඪ්" },
    { "id": "ggh", "value": "ග‍්ඝ්" },
    { "id": "ṅkh", "value": "ඞ‍්ඛ්" },
    { "id": "ṅgh", "value": "ඞ‍්ඝ්" },
    { "id": "jjh", "value": "ජ‍්ඣ්" },
    { "id": "kkh", "value": "ක‍්ඛ්" },
    { "id": "ñch", "value": "ඤ‍්ඡ්" },
    { "id": "ñjh", "value": "ඤ‍්ඣ්" },
    { "id": "ṇṭh", "value": "ණ‍්ඨ්" },
    { "id": "ṇḍh", "value": "ණ‍්ඪ්" },
    { "id": "nth", "value": "න්‍ථ්" },
    { "id": "ndh", "value": "න්‍ධ්" },
    { "id": "pph", "value": "ප‍්ඵ්" },
    { "id": "mph", "value": "ම‍්ඵ්" },
    { "id": "mbh", "value": "ම‍්භ්" },
    { "id": "tth", "value": "ත්‍ථ්" },
    { "id": "ṭṭh", "value": "ට‍්ඨ්" },
    { "id": "bhr", "value": "භ්‍ර්" },
    { "id": "bhv", "value": "භ්‍ව්" },
    { "id": "bhy", "value": "භ්‍ය්" },
    { "id": "chr", "value": "ඡ්‍ර්" },
    { "id": "chv", "value": "ඡ්‍ව්" },
    { "id": "chy", "value": "ඡ්‍ය්" },
    { "id": "dhr", "value": "ධ්‍ර්" },
    { "id": "dhv", "value": "ධ්‍ව්" },
    { "id": "dhy", "value": "ධ්‍ය්" },
    { "id": "ḍhr", "value": "ඪ්‍ර්" },
    { "id": "ḍhv", "value": "ඪ්‍ව්" },
    { "id": "ḍhy", "value": "ඪ්‍ය්" },
    { "id": "ghr", "value": "ඝ්‍ර්" },
    { "id": "ghv", "value": "ඝ්‍ව්" },
    { "id": "ghy", "value": "ඝ්‍ය්" },
    { "id": "jhr", "value": "ඣ්‍ර්" },
    { "id": "jhv", "value": "ඣ්‍ව්" },
    { "id": "jhy", "value": "ඣ්‍ය්" },
    { "id": "khr", "value": "ඛ්‍ර්" },
    { "id": "khv", "value": "ඛ්‍ව්" },
    { "id": "khy", "value": "ඛ්‍ය්" },
    { "id": "phr", "value": "ඵ්‍ර්" },
    { "id": "phv", "value": "ඵ්‍ව්" },
    { "id": "phy", "value": "ඵ්‍ය්" },
    { "id": "thr", "value": "ථ්‍ර්" },
    { "id": "thv", "value": "ථ්‍ව්" },
    { "id": "thy", "value": "ථ්‍ය්" },
    { "id": "ṭhr", "value": "ඨ්‍ර්" },
    { "id": "ṭhv", "value": "ඨ්‍ව්" },
    { "id": "ṭhy", "value": "ඨ්‍ය්" },
    { "id": "bbr", "value": "බ‍්බ්‍ර්" },
    { "id": "bbv", "value": "බ‍්බ්‍ව්" },
    { "id": "bby", "value": "බ‍්බ්‍ය්" },
    { "id": "ccr", "value": "ච‍්ච්‍ර්" },
    { "id": "ccv", "value": "ච‍්ච්‍ව්" },
    { "id": "ccy", "value": "ච‍්ච්‍ය්" },
    { "id": "ddr", "value": "ද‍්ද්‍ර්" },
    { "id": "ddv", "value": "ද‍්ද්‍ව්" },
    { "id": "ddy", "value": "ද‍්ද්‍ය්" },
    { "id": "ḍḍr", "value": "ඩ‍්ඩ්‍ර්" },
    { "id": "ḍḍv", "value": "ඩ‍්ඩ්‍ව්" },
    { "id": "ḍḍy", "value": "ඩ‍්ඩ්‍ය්" },
    { "id": "ggr", "value": "ග‍්ග්‍ර්" },
    { "id": "ggv", "value": "ග‍්ග්‍ව්" },
    { "id": "ggy", "value": "ග‍්ග්‍ය්" },
    { "id": "ṅkr", "value": "ඞ‍්ක්‍ර්" },
    { "id": "ṅkv", "value": "ඞ‍්ක්‍ව්" },
    { "id": "ṅky", "value": "ඞ‍්ක්‍ය්" },
    { "id": "ṅgr", "value": "ඞ‍්ග්‍ර්" },
    { "id": "ṅgv", "value": "ඞ‍්ග්‍ව්" },
    { "id": "ṅgy", "value": "ඞ‍්ග්‍ය්" },
    { "id": "jjr", "value": "ජ‍්ජ්‍ර්" },
    { "id": "jjv", "value": "ජ‍්ජ්‍ව්" },
    { "id": "jjy", "value": "ජ‍්ජ්‍ය්" },
    { "id": "kkr", "value": "ක‍්ක්‍ර්" },
    { "id": "kkv", "value": "ක‍්ක්‍ව්" },
    { "id": "kky", "value": "ක‍්ක්‍ය්" },
    { "id": "ñcr", "value": "ඤ‍්ච්‍ර්" },
    { "id": "ñcv", "value": "ඤ‍්ච්‍ව්" },
    { "id": "ñcy", "value": "ඤ‍්ච්‍ය්" },
    { "id": "ñjr", "value": "ඤ‍්ජ්‍ර්" },
    { "id": "ñjv", "value": "ඤ‍්ජ්‍ව්" },
    { "id": "ñjy", "value": "ඤ‍්ජ්‍ය්" },
    { "id": "mmr", "value": "ම‍්ම්‍ර්" },
    { "id": "mmv", "value": "ම‍්ම්‍ව්" },
    { "id": "mmy", "value": "ම‍්ම්‍ය්" },
    { "id": "nnr", "value": "න‍්න්‍ර්" },
    { "id": "nnv", "value": "න‍්න්‍ව්" },
    { "id": "nny", "value": "න‍්න්‍ය්" },
    { "id": "ṇṭr", "value": "ණ‍්ට්‍ර්" },
    { "id": "ṇṭv", "value": "ණ‍්ට්‍ව්" },
    { "id": "ṇṭy", "value": "ණ‍්ට්‍ය්" },
    { "id": "ṇḍr", "value": "ණ‍්ඩ්‍ර්" },
    { "id": "ṇḍv", "value": "ණ‍්ඩ්‍ව්" },
    { "id": "ṇḍy", "value": "ණ‍්ඩ්‍ය්" },
    { "id": "ññr", "value": "ඤ‍්ඤ්‍ර්" },
    { "id": "ññv", "value": "ඤ‍්ඤ්‍ව්" },
    { "id": "ññy", "value": "ඤ‍්ඤ්‍ය්" },
    { "id": "ṇṇr", "value": "ණ‍්ණ්‍ර්" },
    { "id": "ṇṇv", "value": "ණ‍්ණ්‍ව්" },
    { "id": "ṇṇy", "value": "ණ‍්ණ්‍ය්" },
    { "id": "ppr", "value": "ප‍්ප්‍ර්" },
    { "id": "ppv", "value": "ප‍්ප්‍ව්" },
    { "id": "ppy", "value": "ප‍්ප්‍ය්" },
    { "id": "ntr", "value": "න්‍ත්‍ර්" },
    { "id": "ntv", "value": "න්‍ත්‍ව්" },
    { "id": "nty", "value": "න්‍ත්‍ය්" },
    { "id": "ndr", "value": "න්‍ද්‍ර්" },
    { "id": "ndv", "value": "න්‍ද්‍ව්" },
    { "id": "ndy", "value": "න්‍ද්‍ය්" },
    { "id": "ttr", "value": "ත‍්ත්‍ර්" },
    { "id": "ttv", "value": "ත‍්ත්‍ව්" },
    { "id": "tty", "value": "ත‍්ත්‍ය්" },
    { "id": "mpr", "value": "ම‍්ප්‍ර්" },
    { "id": "mpv", "value": "ම‍්ප්‍ව්" },
    { "id": "mpy", "value": "ම‍්ප්‍ය්" },
    { "id": "mbr", "value": "ම‍්බ්‍ර්" },
    { "id": "mbv", "value": "ම‍්බ්‍ව්" },
    { "id": "mby", "value": "ම‍්බ්‍ය්" },
    { "id": "ṭṭr", "value": "ට‍්ට්‍ර්" },
    { "id": "ṭṭv", "value": "ට‍්ට්‍ව්" },
    { "id": "ṭṭy", "value": "ට‍්ට්‍ය්" },
    { "id": "llr", "value": "ල‍්ල්‍ර්" },
    { "id": "llv", "value": "ල‍්ල්‍ව්" },
    { "id": "lly", "value": "ල‍්ල්‍ය්" },
    { "id": "ssr", "value": "ස‍්ස්‍ර්" },
    { "id": "ssv", "value": "ස‍්ස්‍ව්" },
    { "id": "ssy", "value": "ස‍්ස්‍ය්" },
    { "id": "yyr", "value": "ය්‍ය්‍ර්" },
    { "id": "yyv", "value": "ය්‍ය්‍ව්" },
    { "id": "yyy", "value": "ය්‍ය්‍ය්" },
    { "id": "bb", "value": "බ‍්බ්" },
    { "id": "cc", "value": "ච‍්ච්" },
    { "id": "dd", "value": "ද‍්ද්" },
    { "id": "ḍḍ", "value": "ඩ‍්ඩ්" },
    { "id": "gg", "value": "ග‍්ග්" },
    { "id": "ṅk", "value": "ඞ‍්ක්" },
    { "id": "ṅg", "value": "ඞ‍්ග්" },
    { "id": "jj", "value": "ජ‍්ජ්" },
    { "id": "kk", "value": "ක‍්ක්" },
    { "id": "ñc", "value": "ඤ‍්ච්" },
    { "id": "ñj", "value": "ඤ‍්ජ්" },
    { "id": "mm", "value": "ම‍්ම්" },
    { "id": "nn", "value": "න‍්න්" },
    { "id": "ṇṭ", "value": "ණ‍්ට්" },
    { "id": "ṇḍ", "value": "ණ‍්ඩ්" },
    { "id": "ññ", "value": "ඤ‍්ඤ්" },
    { "id": "ṇṇ", "value": "ණ‍්ණ්" },
    { "id": "pp", "value": "ප‍්ප්" },
    { "id": "nt", "value": "න්‍ත්" },
    { "id": "nd", "value": "න්‍ද්" },
    { "id": "tt", "value": "ත‍්ත්" },
    { "id": "mp", "value": "ම‍්ප්" },
    { "id": "mb", "value": "ම‍්බ්" },
    { "id": "ṭṭ", "value": "ට‍්ට්" },
    { "id": "bh", "value": "භ්" },
    { "id": "ch", "value": "ඡ්" },
    { "id": "dh", "value": "ධ්" },
    { "id": "ḍh", "value": "ඪ්" },
    { "id": "gh", "value": "ඝ්" },
    { "id": "jh", "value": "ඣ්" },
    { "id": "kh", "value": "ඛ්" },
    { "id": "ph", "value": "ඵ්" },
    { "id": "th", "value": "ථ්" },
    { "id": "ṭh", "value": "ඨ්" },
    { "id": "ll", "value": "ල‍්ල්" },
    { "id": "ss", "value": "ස‍්ස්" },
    { "id": "yy", "value": "ය්‍ය්" },
    { "id": "br", "value": "බ්‍ර්" },
    { "id": "bv", "value": "බ්‍ව්" },
    { "id": "by", "value": "බ්‍ය්" },
    { "id": "cr", "value": "ච්‍ර්" },
    { "id": "cv", "value": "ච්‍ව්" },
    { "id": "cy", "value": "ච්‍ය්" },
    { "id": "dr", "value": "ද්‍ර්" },
    { "id": "dv", "value": "ද්‍ව්" },
    { "id": "dy", "value": "ද්‍ය්" },
    { "id": "ḍr", "value": "ඩ්‍ර්" },
    { "id": "ḍv", "value": "ඩ්‍ව්" },
    { "id": "ḍy", "value": "ඩ්‍ය්" },
    { "id": "gr", "value": "ග්‍ර්" },
    { "id": "gv", "value": "ග්‍ව්" },
    { "id": "gy", "value": "ග්‍ය්" },
    { "id": "jr", "value": "ජ්‍ර්" },
    { "id": "jv", "value": "ජ්‍ව්" },
    { "id": "jy", "value": "ජ්‍ය්" },
    { "id": "kr", "value": "ක්‍ර්" },
    { "id": "kv", "value": "ක්‍ව්" },
    { "id": "ky", "value": "ක්‍ය්" },
    { "id": "pr", "value": "ප්‍ර්" },
    { "id": "pv", "value": "ප්‍ව්" },
    { "id": "py", "value": "ප්‍ය්" },
    { "id": "tr", "value": "ත්‍ර්" },
    { "id": "tv", "value": "ත්‍ව්" },
    { "id": "ty", "value": "ත්‍ය්" },
    { "id": "ṭr", "value": "ට්‍ර්" },
    { "id": "ṭv", "value": "ට්‍ව්" },
    { "id": "ṭy", "value": "ට්‍ය්" },
    { "id": "ñh", "value": "ඤ‍්හ්" },
    { "id": "ṇh", "value": "ණ‍්හ්" },
    { "id": "nh", "value": "න‍්හ්" },
    { "id": "mh", "value": "ම‍්හ්" },
    { "id": "yh", "value": "ය‍්හ්" },
    { "id": "ly", "value": "ල්‍ය්" },
    { "id": "lh", "value": "ල‍්හ්" },
    { "id": "vh", "value": "ව‍්හ්" },
    { "id": "sm", "value": "ස‍්ම්" },
    { "id": "sv", "value": "ස‍්ව්" },
    { "id": "hm", "value": "හ‍්ම්" },
    { "id": "hv", "value": "හ‍්ව්" },
    { "id": "ḷh", "value": "ළ‍්හ්" },
    { "id": "m", "value": "ම්" },
    { "id": "n", "value": "න්" },
    { "id": "ṅ", "value": "ඞ්" },
    { "id": "ñ", "value": "ඤ්" },
    { "id": "ṇ", "value": "ණ්" },
    { "id": "b", "value": "බ්" },
    { "id": "c", "value": "ච්" },
    { "id": "d", "value": "ද්" },
    { "id": "ḍ", "value": "ඩ්" },
    { "id": "g", "value": "ග්" },
    { "id": "j", "value": "ජ්" },
    { "id": "k", "value": "ක්" },
    { "id": "p", "value": "ප්" },
    { "id": "t", "value": "ත්" },
    { "id": "ṭ", "value": "ට්" },
    { "id": "y", "value": "‍ය්" },
    { "id": "r", "value": "‍ර්" },
    { "id": "l", "value": "ල්" },
    { "id": "v", "value": "ව්" },
    { "id": "s", "value": "ස්" },
    { "id": "h", "value": "හ්" },
    { "id": "ḷ", "value": "ළ්" },
    { "id": "්iṃ", "value": "ිං" },
    { "id": "්uṃ", "value": "ුං" },
    { "id": "්aṃ", "value": "ං" },
    { "id": "්ā", "value": "ා" },
    { "id": "්i", "value": "ි" },
    { "id": "්ī", "value": "ී" },
    { "id": "්u", "value": "ු" },
    { "id": "්ū", "value": "ූ" },
    { "id": "්e", "value": "ෙ" },
    { "id": "්ē", "value": "ේ" },
    { "id": "්o", "value": "ො" },
    { "id": "්ō", "value": "ෝ" },
    { "id": "්a", "value": "" },
    { "id": "්", "value": "්" },
    { "id": "aṃ", "value": "අං" },
    { "id": "iṃ", "value": "ඉං" },
    { "id": "uṃ", "value": "උං" },
    { "id": "a", "value": "අ" },
    { "id": "ā", "value": "ආ" },
    { "id": "i", "value": "ඉ" },
    { "id": "ī", "value": "ඊ" },
    { "id": "u", "value": "උ" },
    { "id": "ū", "value": "ඌ" },
    { "id": "e", "value": "එ" },
    { "id": "o", "value": "ඔ" },
    { "id": "්අ", "value": "" }

];
var cn_transplit = [
    "/;/g,'；'",
    "/ /g,''",
    "/。/g,'。#'",
    "/；/g,'；#'",
    "/？/g,'？#'",
    "/”“/g,'”#“'",
    "/’‘/g,'’#‘'",
    "/。#”/g,'。”#'",
    "/？#”/g,'？”#'",
    "/？“/g,'？#“'",
    "/：“/g,'：#“'",
    "/：「/g,'：#「'",
    "/！#’/g,'！’#'",
    "/。#’/g,'。’#'",
    "/？#’/g,'？’#'",
    "/？‘/g,'？#‘'",
    "/：‘/g,'：#‘'",
    "/##/g,'#'"

];
var en_transplit = [
    "/\./g,'\.#'",
    "/;/g,'；'",
    "/；/g,'；#'",
    "/\?/g,'？#'",
    "/\"\"/g,'”#“'",
    "/.\'\'/g,'.”'",
    "/.#\"/g,'.”#'",
    "/\?#\"/g,'？”#'",
    "/\?“/g,'？#“'",
    "/,\"/g,',#“'",
    "/!#\'/g,'！’#'",
    "/.#\'/g,'.’#'",
    "/？#’/g,'？’#'",
    "/？‘/g,'？#‘'",
    "/##/g,'#'"
];

