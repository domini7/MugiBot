module.exports = {
	name: "flip",
	cooldown: 20,
	execute(client, message, args) {
		let coin;
		Math.random() <= 0.5
			? (coin = "Heads")
			: (coin = "Tails");

		if (args.length) {
			const guess = args[0];

			if (coin.toLowerCase() === guess.toLowerCase()) {
				coin += ", you win!";
			} else {
				coin += ", you suck";
			}
		}
		message.channel.send(coin);
	},
};
