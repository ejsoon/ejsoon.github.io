var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");
var button5 = document.getElementById("button5");
var topical1 = document.getElementById("topical1");
var topical2 = document.getElementById("topical2");
var topical3 = document.getElementById("topical3");
var topical4 = document.getElementById("topical4");
var topical5 = document.getElementById("topical5");

function button_topical(message) {
	topical1.style.display = "none";
	topical2.style.display = "none";
	topical3.style.display = "none";
	topical4.style.display = "none";
	topical5.style.display = "none";
	document.getElementById(message.substr(8)).style.display = "block";

	button1.className = "mid2";
	button2.className = "mid2";
	button3.className = "mid2";
	button4.className = "mid2";
	button5.className = "mid2";
	document.getElementById("button" + message.substr(15)).className = "mid1";
	return;
}

function body_onload() {
	var w_hash = window.location.hash;
	if ("#switch_topical1" == w_hash || "#switch_topical2" == w_hash || "#switch_topical3" == w_hash || "#switch_topical4" == w_hash || "#switch_topical5" == w_hash) {
		button_topical(w_hash);
	}
	return;
}
