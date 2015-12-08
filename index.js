var light_effection = document.getElementById("light_effection");
var hqm_hvno = document.getElementById("hqm_hvno");
var pt_hvno = document.getElementById("pt_hvno");
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
		while (add_x <= 4) {
			if (add_x < the_num) {
				the_navi[add_x - 1].style.visibility = "hidden";
			} else if (add_x > the_num) {
				the_navi[add_x - 1].style.display = "none";
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
		while (add_x <= 4) {
			if (add_x > navi_num) {
				the_navi[add_x - 1].style.display = "block";
			} else if (add_x < navi_num) {
				the_navi[add_x - 1].style.visibility = "visible";
			}
			add_x++;
		}
		navi_num = 0;
	}
}

function hvno_onmouseout() {
	light_effection.style.display = "inline";
	setTimeout("light_effection.style.display = 'none';", 80);
}

function oymr_onclick() {
	if (hqm_hvno.className != "oymr_hvno_anim") {
		hqm_hvno.className = "oymr_hvno_anim";
		pt_hvno.className = "oymr_hvno_anim";
		mg_hvno.className = "oymr_hvno_anim";
	} else {
		hqm_hvno.className = "oymr_hvno_none";
		pt_hvno.className = "oymr_hvno_none";
		mg_hvno.className = "oymr_hvno_none";
	}
}
