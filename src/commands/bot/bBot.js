const bBot = require("../../assets/json/bBot");

module.exports = {
	name: "bBot",
	execute(client, message) {
		message.channel.send(
			bBot.half1[Math.floor(Math.random() * bBot.half1.length)] + " " +
			message.author.username +
			bBot.half2[Math.floor(Math.random() * bBot.half2.length)]
		);
	},
};
