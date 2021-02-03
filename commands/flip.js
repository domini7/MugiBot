const doHT = () => {
	const rand = ["Heads", "Tails"];
	return rand[Math.floor(Math.random() * rand.length)];
};

module.exports = {
	name: "flip",
	cooldown: 20,
	execute(client, message, args, Discord) {
		const result = doHT();
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
