var light_effection = document.getElementById("light_effection");
var six_detail_class = document.getElementsByClassName("six_detail");
var six_big = document.getElementById("six_big");
var head_main_in = document.getElementById("head_main_in");

var sixTimerOut;

function flash_six(count_down) {
	var the_time = 0;
	if (count_down % 2) {
		the_time = 200;
		six_big.style.display = "block";
	} else {
		the_time = 70;
		six_big.style.display = "none";
	}
	count_down--;
	if (count_down > 0) {
		setTimeout(function(){flash_six(count_down)}, the_time);
	}
}
function clear_six(six_detail_num) {
	six_big.innerHTML = "六書";
	six_detail_class[six_detail_num].style.display = "none";
	document.getElementById("six_single" + String(six_detail_num + 1)).className = "six_single";
}

function hvno_onmouseout() {
	light_effection.style.display = "inline";
	setTimeout("light_effection.style.display = 'none';", 80);
}

function show_six(the_six_single) {
	var six_detail_num = the_six_single.id.substr(10);
	six_big.innerHTML = the_six_single.innerHTML;
	flash_six(7);
	six_detail_num = parseInt(the_six_single.id.substr(10)) - 1;
	for (var x = 0; x < 6; x++) {
		if (x == six_detail_num) {
			six_detail_class[x].style.display = "block";
			document.getElementById("six_single" + String(x + 1)).className = "six_single_selected";
		} else {
			six_detail_class[x].style.display = "none";
			document.getElementById("six_single" + String(x + 1)).className = "six_single";
		}
	}
	clearInterval(sixTimerOut);
	sixTimerOut = setTimeout(function(){clear_six(six_detail_num)}, 9000);
}
