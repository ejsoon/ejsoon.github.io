function count_date_span_function(count_date_span_id) {
	var count_date_span = document.getElementById(count_date_span_id);
	count_date_span.innerHTML = count_date();
}

function count_date() {
	var num = "〇一二三四五六七八九";
	var unit = "十百千萬";

	var msec = Date.parse("2015-11-02")
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
	return result;
}
