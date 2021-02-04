module.exports = {
	name: "flip",
	cooldown: 20,
	execute(client, message, args, Discord) {
		let result = ["Heads", "Tails"];

		result = result[Math.floor(Math.random() * result.length)];

		message.channel.send(result);

		if (args.length) {
			guess = args[0];

			if (result.toLowerCase() === guess.toLowerCase()) {
				message.reply("You win!");
			} else {
				message.reply("You suck!");
			}
		}
	},
};
