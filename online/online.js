var the_body = document.getElementById("the_body");
var whole_board = document.getElementById("whole_board");
var welcome = document.getElementById("welcome");
var input_area = document.getElementById("input_area");
var cc_code = document.getElementById("cc_code");
var select_idiom = document.getElementById("select_idiom");
var input_mode_button = document.getElementById("input_mode_button");
var help = document.getElementById("help");

var help_content_inner = document.getElementById("help_content_inner");
var space_mode_false = document.getElementById("space_mode_false");
var space_mode_true = document.getElementById("space_mode_true");
var search_mode_false = document.getElementById("search_mode_false");
var search_mode_true = document.getElementById("search_mode_true");
var punc_mode_false = document.getElementById("punc_mode_false");
var punc_mode_true = document.getElementById("punc_mode_true");
var span_pgup = document.getElementById("span_pgup");
var span_pgdn = document.getElementById("span_pgdn");

//to initial the textarea's width and height
input_area.style.width = "400px";
input_area.style.height = "200px";

//read the cin file
var yahooCJ_e = [];
var yahooCJ_c = [];

//the var below is must remember to be reset
var input_letter = "";
var cin_point = 0;
var idiom_count = 0;
var page_point = 0;

//saveral mode switch
var input_mode = true; //chinese or english
var space_mode = false; //space manner when no cc matched
var punc_mode = false; //,.to two width
var font_mode = false; //TW-Sung or HanaMin
var search_mode = false; //search the e cha from cc
var help_mode = false; //help button is clicked

//search the e cha from cc
var e_storage = []; //store the matched e-cha
var e_point = 0; //which e-cha is to be showed

//is used to cancel the forward timeout
var vision_timeout;

//if only shift down, the input_mode should be changed
var key_down_count = 0;
var key_up_count = 0;

//read cin file and set focus
function body_onload() {
	vision_inform("請稍候...", "正在導入倉頡碼表", 0);
	input_area.focus();
	read_cin();
}

function key_down(evn) {
	key_down_count += evn.keyCode;
	//Let shift available everytime when it is inputed
	if (16 == evn.keyCode) {
		key_down_count = evn.keyCode;
		key_up_count = 0;
	}
	if (evn.ctrlKey) {
		//{'}switch space mode
		if (222 == evn.keyCode && yahooCJ_e.length > 0) {
			if (space_mode) {
				space_mode = false;
				vision_inform("空格模式", "空碼無效", 1000);
				space_mode_false.checked = true;
			}
			else {
				space_mode = true;
				vision_inform("空格模式", "空碼清空", 1000);
				space_mode_true.checked = true;
			}
		}
		//{,}switch punctuation mode
		else if (190 == evn.keyCode && yahooCJ_e.length > 0) {
			if (punc_mode) {
				punc_mode = false;
				vision_inform("切換標點", "英文標點", 1000);
				punc_mode_false.checked = true;
			}
			else {
				punc_mode = true;
				vision_inform("切換標點", "中文標點", 1000);
				punc_mode_true.checked = true;
			}
		}
		//{.}switch font
		else if (188 == evn.keyCode && yahooCJ_e.length > 0) {
			if (font_mode) {
				font_mode = false;
				change_font("font_TWSung");
				vision_inform("切換字體", "TW-Sung", 1000);
			}
			else {
				font_mode = true;
				change_font("font_HanaMin");
				vision_inform("切換字體", "HanaMin", 1000);
			}
		}
		//{Ctrl}+{12345}ajust input_area's width and height
		else if (53 == evn.keyCode && yahooCJ_e.length > 0) {
			input_area.style.width = "400px";
			input_area.style.height = "200px";
			vision_inform("原始大小", input_area.style.width + "," + input_area.style.height, 1000);
		}
		else if ((49 == evn.keyCode || 51 == evn.keyCode) && yahooCJ_e.length > 0) {
			if (parseInt(input_area.style.width) + 40 * (50 - evn.keyCode) < 400) {
				input_area.style.width = "400px";
				vision_inform("最小寬度", input_area.style.width + "," + input_area.style.height, 1000);
			}
			else {
				input_area.style.width = String(parseInt(input_area.style.width) + 40 * (50 - evn.keyCode)) + "px";
				vision_inform("寬度" + (50 - evn.keyCode > 0 ? "+" : "-") + "40px", input_area.style.width + "," + input_area.style.height, 1000);
			}
		}
		else if ((50 == evn.keyCode || 52 == evn.keyCode) && yahooCJ_e.length > 0) {
			if (parseInt(input_area.style.height) + 40 * (51 - evn.keyCode) < 200) {
				input_area.style.height = "200px";
				vision_inform("最小高度", input_area.style.width + "," + input_area.style.height, 1000);
			}
			else {
				input_area.style.height = String(parseInt(input_area.style.height) + 40 * (51 - evn.keyCode)) + "px";
				vision_inform("高度" + (51 - evn.keyCode > 0 ? "+" : "-") + "40px", input_area.style.width + "," + input_area.style.height, 1000);
			}
		}
		//{Ctrl}+{6789} ajust input_area's location
		else if (54 == evn.keyCode && yahooCJ_e.length > 0) {
			whole_board.style.marginTop = "0px";
			vision_inform("位置調整", "上移頂端", 1000);
		}
		else if (55 == evn.keyCode && yahooCJ_e.length > 0) {
			the_body.style.textAlign = "left";
			vision_inform("位置調整", "移至左端", 1000);
		}
		else if (56 == evn.keyCode && yahooCJ_e.length > 0) {
			whole_board.style.marginTop = "40px";
			vision_inform("位置調整", "下移原位", 1000);
		}
		else if (57 == evn.keyCode && yahooCJ_e.length > 0) {
			the_body.style.textAlign = "center";
			vision_inform("位置調整", "保持居中", 1000);
		}
		//search e frome cc
		else if (!input_area.readOnly && (59 == evn.keyCode || 186 == evn.keyCode) && yahooCJ_e.length > 0) {
			search_mode = true;
			input_letter = "";
			idiom_count = 0;
			page_point = 0;

			e_storage = [];
			e_point = 0;

			vision_inform("", "<-輸入漢字查詢", 0);
			input_area.disabled = true;
			input_mode_button.disabled = true;
			cc_code.readOnly = false;
			cc_code.focus();
			search_mode_true.checked = true;
		}
		else {
			return true;
		}
		return false;
	}
	if (input_mode || evn.shiftKey && input_letter == "" ||  evn.altKey) {
		return true;
	}
	//letters
	if (evn.keyCode >= 65 && evn.keyCode <= 90) {
		if (input_letter.length < 5) {
			input_letter += (String.fromCharCode(evn.keyCode)).toLowerCase();
			cin_idiom();
			vision_select();
		}
		return false;
	}
	//Space
	else if (evn.keyCode == 32 && input_letter != "") {
		if (idiom_count > 0) {
			insert_cc(yahooCJ_c[cin_point + 4 * page_point]);
			input_letter = "";
			idiom_count = 0;
			page_point = 0;
			vision_select();
		}
		else if (space_mode) {
			input_letter = "";
			idiom_count = 0;
			page_point = 0;
			vision_select();
		}
		return false;
	}
	//select 2,3,4
	else if (evn.keyCode >= 50 && evn.keyCode <= 52 && input_letter != "") {
		if (idiom_count > evn.keyCode - 49) {
			insert_cc(yahooCJ_c[cin_point + 4 * page_point + evn.keyCode - 49]);
			input_letter = "";
			idiom_count = 0;
			page_point = 0;
			vision_select();
		}
		return false;
	}
	//page plus
	else if ((evn.keyCode == 34 || evn.keyCode == 53) && input_letter != "") {
		if (idiom_count > 4 * (page_point + 1)) {
			page_point += 1;
			vision_select();
		}
		return false;
	}
	//page reduce
	else if ((evn.keyCode == 33 || evn.keyCode == 49) && input_letter != "") {
		if (0 < page_point) {
			page_point -= 1;
			vision_select();
		}
		return false;
	}
	//Esc or Enter
	else if ((evn.keyCode == 27 || evn.keyCode == 13) && input_letter != "") {
		input_letter = "";
		idiom_count = 0;
		page_point = 0;
		vision_select();
		return false;
	}
	//Backspace
	else if (evn.keyCode == 8 && input_letter != "") {
		input_letter = input_letter.substr(0, input_letter.length - 1);
		cin_idiom();
		vision_select();
		return false;
	}
	//disable punctuation when cc would be inputed
	else if (input_letter != "" && ((evn.keyCode >= 186 && evn.keyCode <= 192) || (evn.keyCode >= 219 && evn.keyCode <= 222) || (evn.keyCode >= 54 && evn.keyCode <= 57) || evn.keyCode == 48 || evn.keyCode == 59 || evn.keyCode == 61 || evn.keyCode == 173)) {
		return false;
	}
	//Punctuation {,.}
	else if (input_letter == "" && punc_mode && (evn.keyCode == 188 || evn.keyCode == 190)) {
		insert_cc(yahooCJ_c[match_cin("zxa" + String.fromCharCode(evn.keyCode - 122).toLowerCase())]);
		return false;
	}
	return true;
}

function key_up(evn) {
	key_up_count += evn.keyCode;
	//key Shift to switch input cc or e
	if (key_down_count == 16 && key_up_count == 16 && yahooCJ_c.length > 0 && !space_mode) {
		change_input_mode();
	}
	if(key_down_count <= key_up_count) {
		key_down_count = 0;
		key_up_count = 0;
	}
	return;
}

function search_input(evn) {
	//ctrl function
	if (evn.ctrlKey) {
		//switch to input function
		if (59 == evn.keyCode || 186 == evn.keyCode) {
			search_mode = false;
			e_storage = [];
			e_point = 0;
			vision_inform("", "", 0);
			input_area.disabled = false;
			input_mode_button.disabled = false;
			cc_code.readOnly = true;
			input_area.focus();
			search_mode_false.checked = true;
			span_pgup.style.display = "none";
			span_pgdn.style.display = "none";
			return false;
		}
		//switch font
		else if (190 == evn.keyCode) {
			if (font_mode) {
				font_mode = false;
				change_font("font_TWSung");
			}
			else {
				font_mode = true;
				change_font("font_HanaMin");
			}
			return false;
		}
	}
	//e_point plus
	if ((evn.keyCode == 34 || evn.keyCode == 53) && e_storage.length > 0) {
		if (e_storage.length > e_point + 1) {
			e_point += 1;
			if (e_storage.length > e_point + 1) {
				vision_inform(cc_code.value, e_storage[e_point] + "    < >", 0);
				span_pgup.style.display = "inline";
				span_pgdn.style.display = "inline";
			}
			else {
				vision_inform(cc_code.value, e_storage[e_point] + "    <  ", 0);
				span_pgup.style.display = "inline";
				span_pgdn.style.display = "none";
			}
		}
		return false;
	}
	//e_point reduce
	else if ((evn.keyCode == 33 || evn.keyCode == 49) && e_storage.length > 0) {
		if (e_point > 0) {
			e_point -= 1;
			if (e_point > 0) {
				vision_inform(cc_code.value, e_storage[e_point] + "    < >", 0);
				span_pgup.style.display = "inline";
				span_pgdn.style.display = "inline";
			}
			else {
				vision_inform(cc_code.value, e_storage[e_point] + "      >", 0);
				span_pgup.style.display = "none";
				span_pgdn.style.display = "inline";
			}
		}
		return false;
	}
	//enter to execute searching cc from e(for IE)
	else if (evn.keyCode == 13) {
		cc_e();
	}
	return true;
}

function change_font(the_font) {
	welcome.className = the_font;
	input_area.className = the_font;
	cc_code.className = the_font;
	select_idiom.className = the_font;
	input_mode_button.className = the_font;
	help.className = the_font;
	help_content_inner.className = the_font;
	return;
}

function change_input_mode() {
	if (input_mode) {
		input_mode = false;
		input_mode_button.innerHTML = "中";
	}
	else {
		input_mode = true;
		input_mode_button.innerHTML = "英";
	}
	key_down_count = 0;
	key_up_count = 0;
	input_letter = "";
	idiom_count = 0;
	page_point = 0;
	vision_select();
	input_area.focus();
	vision_inform("切換中/英", input_mode_button.innerHTML, 1000);
	return;
}

function change_help(the_botton) {
	if (help_mode) {
		help_mode = false;
		help_content_inner.style.display = "none";
		the_botton.innerHTML = "〉";
	} else {
		help_mode = true;
		the_botton.innerHTML = "〈";
		help_content_inner.style.display = "inline";
	}
	input_area.focus();
}

function change_search_mode(the_value) {
	if (String(search_mode) != the_value) {
		if (search_mode) {
			search_mode = false;
			e_storage = [];
			e_point = 0;
			vision_inform("", "", 0);
			input_area.disabled = false;
			input_mode_button.disabled = false;
			cc_code.readOnly = true;
			input_area.focus();
			span_pgup.style.display = "none";
			span_pgdn.style.display = "none";
		} else {
			search_mode = true;
			input_letter = "";
			idiom_count = 0;
			page_point = 0;

			e_storage = [];
			e_point = 0;

			vision_inform("", "<-輸入漢字查詢", 0);
			input_area.disabled = true;
			input_mode_button.disabled = true;
			cc_code.readOnly = false;
			cc_code.focus();
		}
	}
}

function change_space_mode(the_value) {
	if (String(space_mode) != the_value) {
		if (space_mode) {
			space_mode = false;
			vision_inform("空格模式", "空碼無效", 1000);
		}
		else {
			space_mode = true;
			vision_inform("空格模式", "空碼清空", 1000);
		}
		input_area.focus();
	}
}

function change_punc_mode(the_value) {
	if (String(punc_mode) != the_value) {
		if (punc_mode) {
			punc_mode = false;
			vision_inform("切換標點", "英文標點", 1000);
		}
		else {
			punc_mode = true;
			vision_inform("切換標點", "中文標點", 1000);
		}
		input_area.focus();
	}
}

function change_page(the_value) {
	//e_point plus
	if (the_value == "span_pgdn") {
		if (e_storage.length > e_point + 1) {
			e_point += 1;
			if (e_storage.length > e_point + 1) {
				vision_inform(cc_code.value, e_storage[e_point] + "    < >", 0);
				span_pgup.style.display = "inline";
				span_pgdn.style.display = "inline";
			}
			else {
				vision_inform(cc_code.value, e_storage[e_point] + "    <  ", 0);
				span_pgup.style.display = "inline";
				span_pgdn.style.display = "none";
			}
		}
	}
	//e_point reduce
	else if (the_value == "span_pgup") {
		if (e_point > 0) {
			e_point -= 1;
			if (e_point > 0) {
				vision_inform(cc_code.value, e_storage[e_point] + "    < >", 0);
				span_pgup.style.display = "inline";
				span_pgdn.style.display = "inline";
			}
			else {
				vision_inform(cc_code.value, e_storage[e_point] + "      >", 0);
				span_pgup.style.display = "none";
				span_pgdn.style.display = "inline";
			}
		}
	}
	cc_code.focus();
	return;
}

function match_e(search_cc) {
	var search_point = 0;
	var single_letter = "";
	var cc_carriage = "";
	var letter_point = 0;
	while (yahooCJ_c.length > search_point) {
		if (yahooCJ_c[search_point] == search_cc) {
			cc_carriage = "";
			letter_point = 0;
			while (yahooCJ_e[search_point].length > letter_point) {
				single_letter = yahooCJ_e[search_point].substr(letter_point,1);
				if ("x" == single_letter) {
					single_letter = "toog";
				}
				else if ("z" == single_letter) {
					single_letter = "hjwg";
				}
				cc_carriage += yahooCJ_c[match_cin(single_letter)];
				letter_point += 1;
			}
			while (5 > letter_point) {
				cc_carriage += yahooCJ_c[match_cin("zxaa")];
				letter_point += 1;
			}
			e_storage.push(cc_carriage);
		}
		search_point += 1;
	}
	return;
}

function match_cin(search_code) {
	var start_point = 0;
	var end_point = yahooCJ_e.length;
	var search_point = Math.floor((start_point + end_point) / 2);

	if ("" == search_code) {
		return yahooCJ_e.length;
	}
	while (search_point > start_point) {
		if (yahooCJ_e[search_point] > search_code) {
			end_point = search_point;
			search_point = Math.floor((start_point + end_point) / 2);
		}
		else if (yahooCJ_e[search_point] < search_code) {
			start_point = search_point;
			search_point = Math.floor((start_point + end_point) / 2);
		}
		else {
			while (yahooCJ_e[search_point] == yahooCJ_e[search_point - 1]) {
				search_point -= 1;
			}
			return search_point;
		}
	}
	if (0 == search_point) {
		return 0;
	}
	else {
		return yahooCJ_e.length;
	}
}

function cc_e() {
	e_storage = [];
	e_point = 0;
	if (cc_code.value == "") {
		vision_inform("", "<-請輸入漢字查詢", 0);
		span_pgup.style.display = "none";
		span_pgdn.style.display = "none";
	}
	else {
		match_e(cc_code.value);
 		if (e_storage.length > 0) {
 			if (e_storage.length > 1) {
				vision_inform(cc_code.value, e_storage[e_point] + "      >", 0);
				span_pgup.style.display = "none";
				span_pgdn.style.display = "inline";
 			}
 			else {
				vision_inform(cc_code.value, e_storage[e_point] + "       ", 0);
				span_pgup.style.display = "none";
				span_pgdn.style.display = "none";
 			}
		} else {
			vision_inform(cc_code.value, "？查無此字", 0);
			span_pgup.style.display = "none";
			span_pgdn.style.display = "none";
		}
	}
	return;
}

function cin_idiom() {
	cin_point = 0;
	idiom_count = 0;
	cin_point = match_cin(input_letter);
	if (yahooCJ_e.length > cin_point) {
		idiom_count = 1;
		if (yahooCJ_e.length > cin_point + 1) {
			while (yahooCJ_e[cin_point] == yahooCJ_e[cin_point + idiom_count]) {
				idiom_count += 1;
			}
		}
	}
	return;
}

function vision_inform(cc_carriage, select_carriage, timeout) {
	cc_code.value = cc_carriage;
	select_idiom.value = select_carriage;
	if (timeout > 0) {
		clearTimeout(vision_timeout);
		vision_timeout = setTimeout(vision_select, timeout);
	}
	return;
}

function vision_select() {
	var single_letter = "";
	var letter_point = 0;
	var cc_carriage = "";
	var select_point = 0;
	var select_carriage = "";
	while (input_letter.length > letter_point) {
		single_letter = input_letter.substr(letter_point,1);
		if ("x" == single_letter) {
			single_letter = "toog";
		}
		else if ("z" == single_letter) {
			single_letter = "hjwg";
		}
		cc_carriage += yahooCJ_c[match_cin(single_letter)];
		letter_point += 1;
	}
	cc_code.value = cc_carriage;
	if (idiom_count > 0) {
		while (4 > select_point) {
			if (idiom_count - page_point * 4 > select_point) {
				select_carriage += yahooCJ_c[cin_point + select_point + page_point * 4];
			}
			else {
				select_carriage += yahooCJ_c[match_cin("zxaa")];
			}
				if (3 > select_point) {
					select_carriage += yahooCJ_c[match_cin("zxaa")];
				}
			select_point += 1;
		}
		if (page_point > 0) {
			select_carriage += " <";
		}
		else {
			select_carriage += "  ";
		}
		if (idiom_count > (page_point + 1) * 4) {
			select_carriage += ">";
		}
	}
	select_idiom.value = select_carriage;
	return;
}

/* read the cin file */
function read_cin() {
	var cin_file;
	var cin_n = [];
	var cin_n_point = 0;
	if (window.XMLHttpRequest) {
		cin_file = new XMLHttpRequest();
		cin_file.onreadystatechange = function() {
			if (cin_file.readyState == 4 && cin_file.status == 200)
			//if (cin_file.readyState == 4)
			{
				cin_n = cin_file.responseText.split("\n");
				while (cin_n.length - 1 > cin_n_point) {
					yahooCJ_e[cin_n_point] = cin_n[cin_n_point].split("\t")[0];
					yahooCJ_c[cin_n_point] = cin_n[cin_n_point].split("\t")[1];
					cin_n_point += 1;
				}
				input_mode_button.disabled = false;
				help.disabled = false;
				change_input_mode();
				vision_inform("開始使用", "", 1000);
			}
		}
		cin_file.open("GET","yahooCJ.cin",true);
		cin_file.send();
	}
	return;
}

function insert_cc(myValue) {
	//IE support
	if (document.selection) {
		input_area.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		sel.select();
	}
	//MOZILLA/NETSCAPE support
	else if (input_area.selectionStart || input_area.selectionStart == '0') {
		var startPos = input_area.selectionStart;
		var endPos = input_area.selectionEnd;
		// save scrollTop before insert chinese Cha
		var restoreTop = input_area.scrollTop;
		input_area.value = input_area.value.substring(0, startPos) + myValue + input_area.value.substring(endPos, input_area.value.length);
		if (restoreTop > 0) {
			input_area.scrollTop = restoreTop;
		}
		input_area.focus();
		input_area.selectionStart = startPos + myValue.length;
		input_area.selectionEnd = startPos + myValue.length;
	} else {
		input_area.value += myValue;
		input_area.focus();
	}
	return;
}
