var the_navi = document.getElementsByClassName("navi_div_min");
var the_child = document.getElementsByClassName("navi_div_child");
var navi_num = 0;

function navi_onclick(that) {
	var the_id = that.id;
	var the_num = the_id.substr(the_id.length - 1);
	var add_x = 1;
	if (the_num == 4) {
		alert("friends");
	} else if (navi_num == 0) {
		while (add_x <= 3) {
			if (add_x != the_num) {
				the_navi[add_x - 1].style.visibility = "hidden";
			} else {
				navi_num = the_num;
				the_child[navi_num * 2 - 2].style.display = "block";
				the_child[navi_num * 2 - 1].style.display = "block";
			}
			add_x++;
		}
	} else {
		the_child[navi_num * 2 - 2].style.display = "none";
		the_child[navi_num * 2 - 1].style.display = "none";
		while (add_x <= 3) {
			if (add_x != navi_num) {
				the_navi[add_x - 1].style.visibility = "visible";
			}
			add_x++;
		}
		navi_num = 0;
	}
}

function the_template(route) {
	var clear_float_div = document.createElement("div");
	var head_div = document.getElementById("head_div");
	var navi_div = document.getElementById("navi_div");
	var content_div = document.getElementById("content_div");
	var body01 = document.getElementsByTagName("body");
	var bottom_div = document.getElementById("bottom_div");

	var p = 0;

	clear_float_div.className = "clear_float";

	//head_div
	var head_out = document.createElement("div");
	var head_in = document.createElement("div");
	var head_in_img = document.createElement("img");
	var head_title_out = document.createElement("div");
	var head_title_link = document.createElement("a");
	var title_img = document.createElement("img");

	head_out.id = "head_out";
	head_in.id = "head_in";
	head_in_img.id = "head_in_img";
	head_title_out.id = "head_title_out";
	head_title_link.id = "head_title_link";
	title_img.id = "title_img";

	head_in.style.backgroundImage = "url(" + route + "/pictures/head_bg.png)";
	head_in_img.src = route + "/pictures/head_img_photo.png";
	title_img.src = route + "/pictures/title6.png";
	title_img.style.backgroundImage = "url(" + route + "/pictures/real_title_bg.png)";
	head_title_link.href = route + "/index.html";

	head_in.appendChild(head_in_img);
	head_out.appendChild(head_in);
	head_div.appendChild(head_out);
	head_title_link.appendChild(title_img);
	head_title_out.appendChild(head_title_link);
	head_div.appendChild(head_title_out);

	//navi_div
	var navi_div_min = [];
	var navi_div_min_bg = [];
	var navi_div_min_inner = [];
	var navi_div_min_innerHTML = ["文", "行", "忠", "信"];
	var navi_link = [];
	var navi_link_href = ["/blog", "/cc", "/world", "/live", "/online", "/learn"];
	var navi_div_child = [];
	var navi_div_child_bg = [];
	var navi_div_child_inner = [];
	var navi_div_child_innerHTML = ["言", "字", "棊", "道", "用", "學"];

	for (p = 0; p < 4; p++) {
		navi_div_min.push(document.createElement("div"));
		navi_div_min[p].id = "navi_div_min" + String(p + 1);
		navi_div_min[p].className = "navi_div_min";
		navi_div_min[p].onclick = function(){navi_onclick(this)};
	
		navi_div_min_bg.push(document.createElement("img"));
		navi_div_min_bg[p].className = "navi_div_min_bg";
		navi_div_min_bg[p].src = route + "/pictures/index/navi_bg.png";
	
		navi_div_min_inner.push(document.createElement("div"));
		navi_div_min_inner[p].className = "navi_div_min_inner";
		navi_div_min_inner[p].innerHTML = navi_div_min_innerHTML[p];
	
		navi_div_min[p].appendChild(navi_div_min_bg[p]);
		navi_div_min[p].appendChild(navi_div_min_inner[p]);
	
		navi_div.appendChild(navi_div_min[p]);
	}
	for (p = 0; p < 6; p++) {
		navi_link.push(document.createElement("a"));
		navi_link[p].className = "navi_link";
		navi_link[p].href = route + navi_link_href[p] + "/index.html";
		navi_link[p].target = "__blank";

		navi_div_child.push(document.createElement("div"));
		navi_div_child[p].id = "navi_div_child" + String(p + 1);
		navi_div_child[p].className = "navi_div_child";

		navi_div_child_bg.push(document.createElement("img"));
		navi_div_child_bg[p].className = "navi_div_min_bg";
		navi_div_child_bg[p].src = route + "/pictures/star.png";

		navi_div_child_inner.push(document.createElement("div"));
		navi_div_child_inner[p].className = "navi_div_min_inner";
		navi_div_child_inner[p].innerHTML = navi_div_child_innerHTML[p];

		navi_div_child[p].appendChild(navi_div_child_bg[p]);
		navi_div_child[p].appendChild(navi_div_child_inner[p]);
		navi_link[p].appendChild(navi_div_child[p]);
		navi_div.appendChild(navi_link[p]);
	}

	//bottom_icon
	var bottom_icon = document.createElement("img");
	var bottom_link = document.createElement("a");
	bottom_icon.id = "bottom_icon";
	bottom_icon.src = route + "/pictures/icon.png";
	bottom_link.href = "http://ejsoon.win/phpbb/index.php";
	bottom_link.target = "__blank";
	bottom_link.appendChild(bottom_icon);
	bottom_div.appendChild(bottom_link);

	//content bg
	body01[0].style.backgroundImage = "url(" + route + "/pictures/index/content_bg.png)";
}
