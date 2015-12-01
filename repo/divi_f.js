function divi_f_i(the_id, font_size, cha_length, margin, color_bg) {
	var divi_f_content = document.getElementById(the_id);
	divi_f_go(divi_f_content, font_size, cha_length, margin, color_bg);
}
function divi_f_c(the_class, font_size, cha_length, margin, color_bg) {
	var divi_f_content = document.getElementsByClassName(the_class);
	var content_num = divi_f_content.length;
	for (var num = 0; num < content_num; num++) {
		divi_f_go(divi_f_content[num], font_size, cha_length, margin, color_bg);
	}
}

function divi_f_go(the_content, font_size, cha_length, margin, color_bg) {
	var in_str_replace = "";
	var in_str_arr = [];
	var in_str = "";
	var sub_str = ""; //use many times 
	var app_str = ""; //use many times 
	var divi_f_min = [];//divi_f_min is the float text
	var divi_f_min_n = 0;
	var br_n = 0; //use many times 

	var insert_str_arr = [];//below is operating the <span> insert innerHTML
	var insert_index_arr = [];

	var insert_index = [];
	var insert_name = [];
	var insert_length = [];
	var insert_lasting = [];

	var insert_li = 0;
	var insert_p = 0;
	var insert_x = 0;
	var insert_y = 0;

	if (margin == undefined) {
		margin = "20px 10px";
	}
	if (color_bg == undefined) {
		color_bg = "white";
	}
	
	in_str_replace = the_content.innerHTML;
	in_str_replace = in_str_replace.replace(/「/g, "﹁");
	in_str_replace = in_str_replace.replace(/」/g, "﹂");
	in_str_replace = in_str_replace.replace(/『/g, "﹃");
	in_str_replace = in_str_replace.replace(/』/g, "﹄");
	in_str_replace = in_str_replace.replace(/《/g, "︽");
	in_str_replace = in_str_replace.replace(/》/g, "︾");
	in_str_replace = in_str_replace.replace(/（/g, "︵");
	in_str_replace = in_str_replace.replace(/）/g, "︶");

	in_str_arr = in_str_replace.split("\n");
	the_content.innerHTML = "";
	for (var arr_n = 0; arr_n < in_str_arr.length; arr_n++) {
		in_str = in_str_arr[arr_n];
		if ("<" == in_str.substr(0, 1)) { //a whole paragragh corld with <>
			the_content.innerHTML += in_str;
			continue;
		}

		insert_str_arr = in_str.match(/<.*?>{1}/g);
		if (insert_str_arr.length) {
			insert_index_arr = [];
			insert_li = 0;
			for (insert_p = 0; insert_p < insert_str_arr.length; insert_p++) {
				insert_index_arr.push(in_str.indexOf("<", insert_li));
				insert_li = insert_index_arr[insert_p] + 1;
			}
			alert(insert_str_arr);
			alert(insert_index_arr);
			for (insert_p = 0; insert_p < insert_str_arr.length; insert_p++) {
				if (insert_str_arr[insert_p].substr(1, 1) != "/") {
					insert_index.push(insert_index_arr[insert_p]);
					insert_name.push(insert_str_arr[insert_p].match(/[^< >]+/)[0]);
					insert_length.push(insert_str_arr[insert_p].length);

					insert_x = insert_y = insert_p + 1;
					while (insert_x < insert_str_arr.length) {
						if (insert_str_arr[insert_x].substr(1, 1) != "/") {
							insert_x += 1;
							insert_y += 2;
						} else {
							break;
						}
					}
					insert_lasting.push(insert_index_arr[insert_y]);
				}
			}
			alert(insert_index);
			alert(insert_name);
			alert(insert_length);
			alert(insert_lasting);
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
					app_str += "<span style='color:" + color_bg + "'>_</span>";
				}
			}

			divi_f_min.push(document.createElement("div"));
			divi_f_min[divi_f_min_n].innerHTML = app_str;
			divi_f_min[divi_f_min_n].style.margin = margin;
			divi_f_min[divi_f_min_n].style.cssFloat = "right";
			the_content.appendChild(divi_f_min[divi_f_min_n]);
			n++;
			divi_f_min_n++;
		}
		divi_f_min.push(document.createElement("div"));
		for (br_n = 1; br_n < cha_length; br_n++) {
			divi_f_min[divi_f_min_n].innerHTML += "<br>";
		}
		divi_f_min[divi_f_min_n].innerHTML += "<span style='color:" + color_bg + "'>_</span>";
		divi_f_min[divi_f_min_n].style.margin = margin;
		divi_f_min[divi_f_min_n].style.cssFloat = "right";
		the_content.appendChild(divi_f_min[divi_f_min_n]);
		divi_f_min_n++;
	}
}
