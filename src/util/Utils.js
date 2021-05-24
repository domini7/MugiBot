const answer = require("../../assets/json/yes-no");

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

	static firstUpperCase(text, split = " ") {
		return text
			.split(split)
			.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
			.join(" ");
	}

	static async verify(
		channel,
		user,
		{ time = 30000, extraYes = [], extraNo = [] } = {}
	) {
		const filter = (res) => {
			const value = res.content.toLowerCase();
			return (
				(user ? res.author.id === user.id : true) &&
				(answer.yes.includes(value) ||
					answer.no.includes(value) ||
					extraYes.includes(value) ||
					extraNo.includes(value))
			);
		};

		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time,
		});
		if (!verify.size) return 0;

		const choice = verify.first().content.toLowerCase();
		if (answer.yes.includes(choice) || extraYes.includes(choice))
			return true;

		if (answer.no.includes(choice) || extraNo.includes(choice))
			return false;

		return false;
	}

	// Example: "2020" to "2019-20"
	static seasonString(searchedSeason) {
		const input = parseInt(searchedSeason);
		return (
			input - 1 + "-" + searchedSeason.slice(searchedSeason.length - 2)
		);
	}
}

module.exports = Utils;
