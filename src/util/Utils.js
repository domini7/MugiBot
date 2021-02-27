class Utils {
	// turns birthdate into age
	static birth(dob) {
		const birthday = new Date(dob);
		const diff = Date.now() - birthday.getTime();
		const ageDate = new Date(diff);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	// rounds a number to nearest tenth
	static rnd(a, b = 1) {
		return Number.parseFloat(a).toFixed(b);
	}

	// cuts off text if too long
	static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

	// capitalizes the first letter of every word
	static toTitleCase(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
}

module.exports = Utils;
