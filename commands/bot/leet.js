module.exports = {
	name: "leet",
	description: "Converts what you say into leet speech",
	cooldown: 20,
	execute(client, message, args, Discord) {
		if (!args.length)
			return message.reply(
				"Y0u n33d 70 54y 50m37hing idi07. `m-leet text`"
			);

		let text = args.join(" ");
		text = text.replace(/@/g, "");
		text = text.replace(/a/gi, "4");
		text = text.replace(/e/gi, "3");
		text = text.replace(/l/gi, "1");
		text = text.replace(/o/gi, "0");
		text = text.replace(/s/gi, "5");
		text = text.replace(/t/gi, "7");

		message.channel.send(text);
	},
};
