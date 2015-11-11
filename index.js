var light_effection = document.getElementById("light_effection");
var hqm_hvno = document.getElementById("hqm_hvno");
var pt_hvno = document.getElementById("pt_hvno");

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
