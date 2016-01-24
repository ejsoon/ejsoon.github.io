function count_date_i(the_id, the_date) {
	var count_date = document.getElementById(the_id);
	count_date_go(count_date, the_date);
}
function count_date_c(the_class, the_date) {
	var count_date_class = document.getElementsByClassName(the_class);
	var max_num = count_date_class.length;
	for (var num = 0; num < max_num; num++) {
		count_date_go(count_date_class[num], the_date);
	}
}

function count_date_go(count_date, the_date) {
	var num = "〇一二三四五六七八九";
	var unit = "十百千萬";

	if (the_date == null) {
		the_date = "2015-11-02";
	}
	var msec = Date.parse(the_date);
	var today = new Date().getTime();
	var sum = Math.floor((today - msec) / 1000 / 60 / 60 / 24);

	var result = "";
	var point = 0;

	for (var ten = 5; ten > 0; ten--) {
		point = Math.floor(sum  % (Math.pow(10, ten)) / (Math.pow(10, ten - 1)));
		if (point >= 1) {
			result += num.substr(point, 1);
			if (ten > 1) {
				result += unit.substr(ten - 2, 1);
			}
		} else if (result.length && ten > 1) {
			result += num.substr(0, 1);
		}
	}
	count_date.innerHTML = result;
}
