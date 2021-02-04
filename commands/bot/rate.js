const reaction = require("../../assets/json/looks");

module.exports = {
	name: "rate",
	description: "Rates you/someone on a 0-10 scale",
	cooldown: 20,
	async execute(client, message, args) {
		if (!args.length) {
			return message.reply("Rate something! `m-rate me`");
		}

		const user = args.join(" ");

		const rtg = Math.floor(Math.random() * 10) + 0;

		let react = "";

		const hottie = reaction.hot[Math.floor(Math.random() * reaction.hot.length)];

		if (rtg < 4) {
			react =
				reaction.ugly[Math.floor(Math.random() * reaction.ugly.length)];
		} else if (rtg < 8) {
			react =
				reaction.average[
					Math.floor(Math.random() * reaction.average.length)
				];
		} else {
			react = hottie;
		}

		if (
			user.toLowerCase().startsWith("dooby") ||
			user.toLowerCase().startsWith(`<@!188530356394131456`) ||
			user.toLowerCase().startsWith("mugibot") ||
			user.toLowerCase().startsWith(`<@!776681738654580746`)
		)
			return message.channel.send(`${user} looks like a 10/10${hottie}`);

		if (user.toLowerCase() === "me")
			return message.channel.send(`You look like a ${rtg}/10${react}`);

		message.channel.send(`${user} looks like a ${rtg}/10${react}`);
	},
};
