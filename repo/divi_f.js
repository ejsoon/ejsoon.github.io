function divi_f_c(the_id, cha_length) {
	var divi_f_content = document.getElementById(the_id);
	divi_f_go(divi_f_content, cha_length);
}
function divi_f_c(cha_length) {
	var divi_f_content = document.getElementsByClassName("divi_f_content");
	var content_num = divi_f_content.length;
	for (var num = 0; num < content_num; num++) {
		divi_f_go(divi_f_content[num], cha_length);
	}
}

function divi_f_go(the_content, cha_length) {
	var in_str = "";
	var sub_str = ""; //use many times 
	var app_str = ""; //use many times 
	var divi_f_min = [];//divi_f_min is the float text
	var divi_f_min_n = 0;
	var br_n = 0; //use many times 
	
	in_str_arr = the_content.innerHTML.split("\n");
	the_content.innerHTML = "";
	for (var arr_n = 0; arr_n < in_str_arr.length; arr_n++) {
		in_str = in_str_arr[arr_n];
		if ("<" == in_str.substr(0, 1)) { //a whole paragragh corld with <>
			the_content.innerHTML += in_str;
			continue;
		}
		var n = 0;
		while (n * cha_length < in_str.length) {
			sub_str = in_str.substr(n * cha_length, cha_length);
			app_str = "";
			for (br_n = 0; br_n < cha_length; br_n++) {
				if (br_n < sub_str.length) {
					app_str += sub_str.substr(br_n, 1);
				}
				if (br_n < cha_length - 1) {
					app_str += "<br>";
				} else if (sub_str.length < cha_length) {
					app_str += "<span class='color_bg'>_</span>";
				}
			}
			app_str = app_str.replace(/「/g, "﹁");
			app_str = app_str.replace(/」/g, "﹂");
			app_str = app_str.replace(/《/g, "︽");
			app_str = app_str.replace(/》/g, "︾");
			app_str = app_str.replace(/（/g, "︵");
			app_str = app_str.replace(/）/g, "︶");

			divi_f_min.push(document.createElement("div"));
			divi_f_min[divi_f_min_n].innerHTML = app_str;
			divi_f_min[divi_f_min_n].className = "divi_f_min";
			the_content.appendChild(divi_f_min[divi_f_min_n]);
			n++;
			divi_f_min_n++;
		}
		divi_f_min.push(document.createElement("div"));
		for (br_n = 1; br_n < cha_length; br_n++) {
			divi_f_min[divi_f_min_n].innerHTML += "<br>";
		}
		divi_f_min[divi_f_min_n].innerHTML += "<span class='color_bg'>_</span>";
		divi_f_min[divi_f_min_n].className = "divi_f_min";
		the_content.appendChild(divi_f_min[divi_f_min_n]);
		divi_f_min_n++;
	}
}
