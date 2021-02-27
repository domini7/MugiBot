const fs = require("fs");
const images = fs.readdirSync("../MugiBot/assets/images/dumbball");
module.exports = {
	name: "dumbball",
	cooldown: 20,
	execute(client, message, args) {
		if (!args.length) return message.channel.send("Ask something or gtfo.");

		const answer = images[Math.floor(Math.random() * images.length)];

		message.channel.send({files: [`./assets/images/dumbball/${answer}`]});
	},
};
