Translate = {
	date: (day, month, year) => {
		return day + " " + Translate.monthGenitive(month) + " " + year;
	},
	monthGenitive: month => {
		return [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		][month] || "";
	},

	place: (place, demoparty) => {
		return (
			(place === null
				? ""
				: place + Translate.ordinal(place) + " at "
			) +
			(demoparty === null
				? ""
				: demoparty
			)
		);
	},
	ordinal: num => {
		if(Math.floor(Math.abs(num) / 10) % 10 == 1) { // 1x
			return "th";
		}

		return ["st", "nd", "rd"][num % 10 - 1] || "th";
	},

	likes: likes => {
		return likes == 1 ? "1 like" : likes + " likes";
	},
	comments: comments => {
		return comments == 1 ? "1 comment" : comments + " comments";
	}
};