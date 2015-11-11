var yk_switch_pic = document.getElementById("yk_switch_pic");
var yk_switch_up = document.getElementById("yk_switch_up");
var yk_switch_down = document.getElementById("yk_switch_down");
var yk_pic = document.getElementById("yk_pic");

var currentNum = 1;
var currentMarginTop = "";
var timerSwitch;
var timerUpOut;
var timerDownOut;

yk_pic.style.marginTop = "0px";
yk_pic.className = "yk_pic_switch1";
yk_switch_up.className = "yk_switch_start";
yk_switch_down.className = "yk_switch";
timerDownOut = setTimeout("yk_switch_down.className = 'yk_switch_ease-out';", 1000);
set_timer();


//below is switching pic module
//set_timer();timer_switch_pic();goto_num(theNum);	switch_pic(theNum);switch_div(theNum);timeout_change_left()
//up_down_click(getLitDiv);clear_timer();goto_num(theNum);	switch_pic(theNum);switch_div(theNum);timeout_change_left()

function goto_num(theNum) {
	switch_pic(theNum);
	switch_div();
}

function switch_div() {
	if(1 != currentNum) {
		yk_switch_up.className = "yk_switch";
		clearInterval(timerUpOut);
		timerUpOut = setTimeout("yk_switch_up.className = 'yk_switch_ease-out';", 1000);
	} else {
		clearInterval(timerUpOut);
		yk_switch_up.className = "yk_switch_start";
	}
	if(7 != currentNum) {
		yk_switch_down.className = "yk_switch";
		clearInterval(timerDownOut);
		timerDownOut = setTimeout("yk_switch_down.className = 'yk_switch_ease-out';", 1000);
	} else {
		clearInterval(timerDownOut);
		yk_switch_down.className = "yk_switch_start";
	}
}

function switch_pic(thePicNum) {
	yk_pic.className = "yk_pic_switch" + String(thePicNum);
	currentMarginTop = yk_pic.style.marginTop;
	yk_switch_pic.className = "yk_switch_bgp" + String(thePicNum);
	setTimeout(function(){timeout_change_top(thePicNum)}, 1000);
}

function timeout_change_top(thePicNum) {
	yk_pic.style.marginTop = "-" + String((thePicNum - 1) * 413) + "px";
	yk_switch_pic.style.backgroundPosition = String(-(thePicNum - 1) * 20) + "px " + String((thePicNum - 1) * 100 - 800) + "px";
}

function timer_switch_pic() {
	currentNum = currentNum % 7 + 1;
	goto_num(currentNum);
}

function up_down_click(getLitDiv) {
	clear_timer();
	if (currentMarginTop != yk_pic.style.marginTop) {
		var isDownUp;
		if ("yk_switch_down" == getLitDiv.id) {
			isDownUp = 1;
		} else if ("yk_switch_up" == getLitDiv.id) {
			isDownUp = -1;
		}
		if ("yk_switch_down" == getLitDiv.id && currentNum != 7 || "yk_switch_up" == getLitDiv.id && currentNum != 1) {
			currentNum = currentNum + isDownUp;
			goto_num(currentNum);
			set_timer();
		}
	}
}

function lit_div_out() {
	set_timer();
}

function set_timer() {
	timerSwitch=setInterval("timer_switch_pic()",7100);
}

function clear_timer() {
	clearInterval(timerSwitch);
	timerSwitch = 0;
}
