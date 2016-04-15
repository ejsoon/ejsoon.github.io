var piece = document.getElementsByClassName("piece");
for (var each_p= 0; each_p < piece.length; each_p++) {
	piece[each_p].onclick = piece_onclick;
}



function piece_onclick() {
	if (this.className == "piece empty_piece") {
		var selected = document.getElementsByClassName("selected");
		if (selected.length == 1) {
			exchange_piece(this, selected[0]);
		}
	} else {
		var selected = document.getElementsByClassName("selected");
		if (selected.length == 0) {
			this.className += " selected";
		} else if (this.className == selected[0].className) {
			this.className = selected[0].className.replace(" selected", "");
		} else if (this.className != selected[0].className.replace(" selected", "")) {
			exchange_piece(this, selected[0]);
		} else if (this.className == selected[0].className.replace(" selected", "")) {
			selected[0].className = selected[0].className.replace(" selected", "");
			this.className += " selected";
		}
	}
}

function exchange_piece(current_piece, forward_piece) {
	current_piece.innerHTML = forward_piece.innerHTML;
	current_piece.className = forward_piece.className.replace(" selected", "");
	forward_piece.innerHTML = "";
	forward_piece.className = "piece empty_piece";
}
