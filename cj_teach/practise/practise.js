var whole_div = document.getElementById("whole_div");
var cc_code = document.getElementById("cc_code");
var timer_cancel = document.getElementById("timer_cancel");

var the_body = document.getElementById("the_body");

var font_size = "100px";

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
	whole_div.style.fontSize = font_size;
	var w_hash = window.location.hash;
	if ("" == w_hash) {
		read_cin("cj_1.cin");
	} else {
		w_hash += ".cin";
		w_hash = w_hash.substr(1);
		read_cin(w_hash);
	}
	return;
}
function body_key_down() {
	cc_code.focus();
}

function set_clear() {
	clearInterval(timer_cancel);
	timer_cancel = setTimeout("whole_div.innerHTML = '';", 3000);
}

function key_down(evn) {
	//letters
	if (evn.keyCode >= 65 && evn.keyCode <= 90) {
		whole_div.innerHTML = yahooCJ_c[match_cin((String.fromCharCode(evn.keyCode)).toLowerCase())];
		set_clear();
	}
	//Space
	else if (evn.keyCode == 32) {
		font_size = String(parseInt(font_size.substr(0, font_size.length - 2)) - 20) + "px";
		set_clear();
		whole_div.style.fontSize = font_size;
	}
	//Esc or Enter
	else if (evn.keyCode == 27 || evn.keyCode == 13)  {
		font_size = String(parseInt(font_size.substr(0, font_size.length - 2)) + 20) + "px";
		set_clear();
		whole_div.style.fontSize = font_size;
	}
	return true;
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

/* read the cin file */
function read_cin(w_hash) {
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
				cc_code.focus();
				whole_div.innerHTML = '開始練習';
			}
		}
		cin_file.open("GET", w_hash,true);
		cin_file.send();
	}
	return;
}

