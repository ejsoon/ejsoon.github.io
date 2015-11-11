var light_effection = document.getElementById("light_effection");

function hvno_onmouseout() {
	light_effection.style.display = "inline";
	setTimeout("light_effection.style.display = 'none';", 80);
}
