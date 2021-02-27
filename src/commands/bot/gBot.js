const gBot = require("../../../assets/json/gBot");

module.exports = {
	name: "gBot",
	execute(client, message) {
		message.channel.send(
			gBot[Math.floor(Math.random() * gBot.length)]
		);
	},
};
