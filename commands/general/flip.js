// Needed for betting points in a specific server
const bbgmDiscord = require("../../assets/json/bbgm");
const { rnd } = require("../../util/Utils.js");
const fs = require("fs");

module.exports = {
	name: "flip",
	cooldown: 20,
	execute(client, message, args, Discord) {
		let coin = ["Heads", "Tails"];

		coin = coin[Math.floor(Math.random() * coin.length)];

		if (args.length) {
			const guess = args[0];

			if (coin.toLowerCase() === guess.toLowerCase()) {
				coin += ", you win!";
			} else {
				coin += ", you suck";
			}
		}
		message.channel.send(coin);

		if (
			!args[1] ||
			message.guild.id != "290013534023057409" ||
			message.channel.name != "bot-spam"
		)
			return;

		const bbgm = bbgmDiscord["bbgmDiscord"];
		let bet = args[1];
		const player = message.author.username;
		const coinResult = coin[coin.length - 1];

		let result = "doubled";

		if (bbgm[player] <= 0)
			return message.reply("You don't have points to bet!");

		if (bet === "all") {
			if (coinResult != "!") {
				bbgm[player] -= bbgm[player];
				result = "lost";
			} else {
				bbgm[player] += bbgm[player];
			}
			message.reply(
				`You've ${result} your points! New amount: ${rnd(bbgm[player])}`
			);
		} else if (!isNaN(bet)) {
			if (bet > bbgm[player]) {
				return message.reply(
					`You can't bet more than your current **${rnd(
						bbgm[player]
					)}** points!`
				);
			}

			if (coinResult != "!") {
				bbgm[player] -= bet;
				result = "lose";
			} else {
				bbgm[player] += +bet;
				result = "win";
			}

			message.reply(
				`you ${result} **${bet}** points! New amount: ${rnd(
					bbgm[player]
				)}`
			);
		} else {
			message.reply(
				"please enter a valid gamble `m-flip all` or `m-flip 20`"
			);
		}

		fs.writeFile(
			"../MugiBot/assets/json/bbgm.json",
			JSON.stringify(bbgmDiscord),
			(error) => {
				if (error) console.log(error);
			}
		);
	},
};
