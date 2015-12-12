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
	var cha_n = 0; //use many times 

	var insert_str_arr = [];//below is operating the <span> insert innerHTML
	var insert_index_arr = [];

	var insert_index = [];
	var insert_str = [];
	var insert_name = [];
	var insert_length = [];
	var insert_lasting = [];

	var insert_li = 0;
	var insert_p = 0;
	var insert_x = 0;
	var insert_y = 0;

	var pre_add = 0;
	var this_add = 0;
	var count_add = [];
	var sum_add = 0;

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

		insert_str_arr = in_str.match(/<.*?>/g);
		if (insert_str_arr != null) {// insert_index_arr is the <> sumerise
			insert_index_arr = [];
			insert_index = [];
			insert_str = [];
			insert_name = [];
			insert_length = [];
			insert_lasting = [];
			insert_li = 0;
			for (insert_p = 0; insert_p < insert_str_arr.length; insert_p++) {
				insert_index_arr.push(in_str.indexOf("<", insert_li));
				insert_li = insert_index_arr[insert_p] + 1;
			}
			for (insert_p = 0; insert_p < insert_str_arr.length; insert_p++) {
				if (insert_str_arr[insert_p].substr(1, 1) != "/") {
					insert_index.push(insert_index_arr[insert_p]);
					insert_name.push(insert_str_arr[insert_p].match(/[^< >]+/)[0]);
					insert_str.push(insert_str_arr[insert_p]);
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
		}

		pre_add = 0;
		this_add = 0;
		count_add = [];
		sum_add = 0;
		insert_x = 0;
		insert_y = 0;

		cha_n = 0;
		while (cha_n * cha_length + pre_add < in_str.length) {
			if (insert_str_arr != null) {
				//here count <>
				while (insert_x < insert_index_arr.length &&
					insert_index_arr[insert_x] >= cha_n * cha_length + pre_add &&
					insert_index_arr[insert_x] < cha_n * cha_length + this_add + cha_length) {
					this_add += insert_str_arr[insert_x].length;
					insert_x++;
				}
				//here count <>, not include </ >
				while (insert_y < insert_index.length &&
					insert_index[insert_y] >= cha_n * cha_length + pre_add &&
					insert_index[insert_y] < cha_n * cha_length + this_add + cha_length) {
					count_add.push(insert_y);
					insert_y++;
				}
			}
			sub_str = in_str.substr(cha_n * cha_length + pre_add, cha_length + (this_add - pre_add));

			app_str = "";
			sum_add = 0;
			for (br_n = 0; br_n < cha_length; br_n++) {
				if (count_add.length) {
					insert_p = 0;
					while (insert_p < count_add.length) {
						if (br_n == insert_index[count_add[insert_p]] - 
							(cha_n * cha_length + pre_add) - sum_add) {
							sum_add += insert_length[count_add[insert_p]];
							app_str += insert_str[count_add[insert_p]];
						} else if (br_n == insert_lasting[count_add[count_add.length - insert_p - 1]] - 
							(cha_n * cha_length + pre_add) - sum_add) {
							if (br_n > 0) {
								app_str += "</" + insert_name[count_add[count_add.length - insert_p - 1]] + ">";
							}
							sum_add += insert_name[count_add[count_add.length - insert_p - 1]].length + 3;
							count_add.splice(count_add.length - insert_p - 1, 1);
						} else if (br_n == 0 &&
							cha_n * cha_length + pre_add >
							insert_index[count_add[insert_p]] &&
							cha_n * cha_length + pre_add <
							insert_lasting[count_add[insert_p]]) {
							app_str += insert_str[count_add[insert_p]];
						}
						insert_p++;
					}
				}
				if (br_n < sub_str.length - sum_add) {
					app_str += sub_str.substr(br_n + sum_add, 1);
				}
				if (br_n < cha_length - 1) {
					app_str += "<br>";
				//} else if (sub_str.length < cha_length) {
					//app_str += "<span style='color:" + color_bg + "'>_</span>";
				}
				if (count_add.length && br_n == cha_length - 1) {
					insert_p = 0;
					while (insert_p < count_add.length) {
						if (br_n < insert_lasting[count_add[insert_p]] - 
							(cha_n * cha_length + pre_add) - sum_add) {
							app_str += "</" + insert_name[count_add[insert_p]] + ">";
						}
						insert_p++;
					}
				}
			}

			divi_f_min.push(document.createElement("div"));
			divi_f_min[divi_f_min_n].innerHTML = app_str;
			divi_f_min[divi_f_min_n].style.margin = margin;
			divi_f_min[divi_f_min_n].style.cssFloat = "right";
			divi_f_min[divi_f_min_n].style.fontSize = font_size;
			divi_f_min[divi_f_min_n].style.height = String(parseInt(font_size) * (cha_length + 2)) + "px";
			the_content.appendChild(divi_f_min[divi_f_min_n]);
			cha_n++;
			divi_f_min_n++;
			pre_add = this_add;
		}
		if (0 == in_str.length) {
			divi_f_min.push(document.createElement("div"));
			divi_f_min[divi_f_min_n].style.margin = margin;
			divi_f_min[divi_f_min_n].style.cssFloat = "right";
			divi_f_min[divi_f_min_n].style.fontSize = font_size;
			divi_f_min[divi_f_min_n].style.height = String(parseInt(font_size) * (cha_length + 2)) + "px";
			the_content.appendChild(divi_f_min[divi_f_min_n]);
			divi_f_min_n++;
		}
	}
}
