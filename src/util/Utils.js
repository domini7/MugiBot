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

	// commas when you need it
	static formatNumber(number, minimumFractionDigits = 0) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			minimumFractionDigits,
			maximumFractionDigits: 2,
		});
	}

	// shuffle array
	static shuffle(array) {
		const arr = array.slice(0);
		for (let i = arr.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	}

	static list(arr, conj = "and") {
		const len = arr.length;
		if (len === 0) return "";
		if (len === 1) return arr[0];
		return `${arr.slice(0, -1).join(", ")}${
			len > 1 ? `${len > 2 ? "," : ""} ${conj} ` : ""
		}${arr.slice(-1)}`;
	}
}

module.exports = Utils;
