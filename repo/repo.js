function the_template(route) {
	var clear_float_div = document.createElement("div");
	var head_div = document.getElementById("head_div");
	var navi_div = document.getElementById("navi_div");
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

	head_div.style.backgroundImage = "url(" + route + "/pictures/real_title_bg.png)";
	head_in.style.backgroundImage = "url(" + route + "/pictures/head_bg.png)";
	head_in_img.src = route + "/pictures/head_img_photo.png";
	title_img.src = route + "/pictures/title6.png";
	head_title_link.href = route + "/index.html";

	head_in.appendChild(head_in_img);
	head_out.appendChild(head_in);
	head_div.appendChild(head_out);
	head_title_link.appendChild(title_img);
	head_title_out.appendChild(head_title_link);
	head_div.appendChild(head_title_out);

	//navi_div
//<div id="navi_div_min1" class="navi_div_min" onclick="navi_onclick(this)"><img 
	var navi_div_min = [];
	var navi_div_min_bg = [];
	var navi_div_min_inner = [];
	var navi_div_min_innerHTML = ["文", "言", "忠", "信"];
	var navi_link = [];
	var navi_div_child = [];
	var navi_div_child_bg = [];

	for (p = 0; p < 4; p++) {
		navi_div_min.push(document.createElement("div"));
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

 //class="navi_link" href="blog/index.html" target="__blank"

	//bottom_icon
	var bottom_icon = document.createElement("img");
	var bottom_link = document.createElement("a");
	bottom_icon.id = "bottom_icon";
	bottom_icon.src = route + "/pictures/icon.png";
	bottom_link.href = "http://ejsoon.jlljxcx.com/phpbb/index.php";
	bottom_link.target = "__blank";
	bottom_link.appendChild(bottom_icon);
	bottom_div.appendChild(bottom_link);
/*
                    newSpan[dataPoint] = document.createElement("span");
                    dataPath[dataPoint] = dataSplit[dataPoint].split(":")[0];
                    newText[dataPoint] = dataSplit[dataPoint].split(":")[1];
                    dataTitle[dataPoint] = document.createTextNode(newText[dataPoint]);
                    newSpan[dataPoint].appendChild(document.createTextNode(" "));
                    newTag_a[dataPoint].href = dataPath[dataPoint];
                    newTag_a[dataPoint].onclick = function(){change_html(this.hash)};
                    newTag_a[dataPoint].className = "a_index";
                    newTag_a[dataPoint].appendChild(dataTitle[dataPoint]);

*/

}

