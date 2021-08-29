module.exports = {
	name: "cyrillic",
	description: "Changes key letters to cyrillic",
	execute(client, message, args) {
		if (!args.length)
			return message.reply(
				"Say something `;cyrillic word`"
			);

		let text = args.join(" ");
		text = text.replace(/a/g, "а");
		text = text.replace(/o/g, "о");
		text = text.replace(/c/g, "с");
		text = text.replace(/j/g, "ј");
		text = text.replace(/p/g, "р");
		text = text.replace(/e/g, "е");
		text = text.replace(/A/g, "А");
		text = text.replace(/O/g, "О");
		text = text.replace(/M/g, "М");
		text = text.replace(/H/g, "Н");
		text = text.replace(/C/g, "С");
		text = text.replace(/J/g, "Ј");
		text = text.replace(/T/g, "Т");
		text = text.replace(/P/g, "Р");
		text = text.replace(/E/g, "Е");
		text = text.replace(/B/g, "В");

		message.channel.send(text);
	},
};
