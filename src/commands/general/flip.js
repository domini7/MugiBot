// Needed for betting points in a specific server
const bbgmDiscord = require("../../../assets/json/bbgm");
const { rnd } = require("../../util/Utils.js");
const fs = require("fs");

module.exports = {
	name: "flip",
	cooldown: 20,
	execute(client, message, args) {
		let coin;
		Math.random() > 0.5 ? coin = "Heads" : coin = "Tails";

		if (args.length) {
			const guess = args[0];

			if (coin.toLowerCase() === guess.toLowerCase()) {
				coin += ", you win!";
			} else {
				coin += ", you suck";
			}
		}
		message.channel.send(coin);

		// This is for a specific server
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

		let result = "tripled";

		if (bbgm[player] <= 0)
			return message.reply("you don't have points to bet!");

		if (bet === "all") {
			// ! is the last index of a winning guess
			if (coinResult != "!") {
				bbgm[player] -= bbgm[player];
				result = "lost";
			} else {
				bbgm[player] += bbgm[player] * 2;
			}
			message.reply(
				`you've ${result} your points! New amount: ${rnd(bbgm[player])}`
			);
		} else if (!isNaN(bet)) {
			if (bet > bbgm[player]) {
				return message.reply(
					`you can't bet more than your current **${rnd(
						bbgm[player]
					)}** points!`
				);
			}

			if (bet <= 0) {
				return message.reply("you can't bet 0 points!");
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
				"please enter a valid gamble `m-flip <coin> all` or `m-flip <coin> 20`"
			);
		}

		if (bbgm[player] < 5) {
			message.reply("use `m-buyin` to reset back to 5 points");
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
