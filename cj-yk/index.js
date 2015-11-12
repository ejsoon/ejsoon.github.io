var light_effection = document.getElementById("light_effection");
var six_detail_class = document.getElementsByClassName("six_detail");
var six_big = document.getElementById("six_big");

var sixTimerOut;

function clear_six(six_detail_num) {
	six_big.innerHTML = "六書";
	six_detail_class[six_detail_num].style.display = "none";
}

function hvno_onmouseout() {
	light_effection.style.display = "inline";
	setTimeout("light_effection.style.display = 'none';", 80);
}

function show_six(the_six_single) {
	var six_detail_num = the_six_single.id.substr(10);
	six_big.innerHTML = the_six_single.innerHTML;
	six_detail_num = parseInt(the_six_single.id.substr(10)) - 1;
	for (var x = 0; x < 6; x++) {
		if (x == six_detail_num) {
			six_detail_class[x].style.display = "block";
		} else {
			six_detail_class[x].style.display = "none";
		}
	}
	clearInterval(sixTimerOut);
	sixTimerOut = setTimeout(function(){clear_six(six_detail_num)}, 1000);
}
