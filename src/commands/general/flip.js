// Needed for betting points in a specific server
const bbgmDiscord = require("../../../assets/json/bbgm");
const { rnd } = require("../../util/Utils.js");
const fs = require("fs");

const flipCooldown = new Set();

module.exports = {
	name: "flip",
	cooldown: 20,
	execute(client, message, args) {
		let coin;
		Math.random() <= bbgmDiscord["coinFlipChance"]
			? (coin = "Heads")
			: (coin = "Tails");

		// pseudorandom
		if (coin === "Tails") {
			bbgmDiscord["coinFlipChance"] += 0.01;
		} else {
			bbgmDiscord["coinFlipChance"] -= 0.01;
		}
		console.log(rnd(bbgmDiscord["coinFlipChance"], 2));

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

		if (flipCooldown.has(message.author.id)) {
			message.reply("wait before betting on a coinflip again.");
			return;
		}

		const bbgm = bbgmDiscord["bbgmDiscord"];
		let bet = args[1];
		const player = message.author.username;
		const coinResult = coin[coin.length - 1];

		if (bbgm[player] <= 0)
			return message.reply("you don't have points to bet!");

		if (!isNaN(bet)) {
			if (bet > bbgm[player]) {
				return message.reply(
					`you can't bet more than your current **${rnd(
						bbgm[player],
						2
					)}** points!`
				);
			}

			if (bet > 15) {
				return message.reply("you can't bet more than 15 points!");
			}

			if (bet <= 0) {
				return message.reply("you can't bet 0 points!");
			}

			let result;

			// ! is the last index of a winning bet
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
				)}, try again in ${bet / 2} seconds`
			);
		} else {
			message.reply("please enter a valid gamble `;flip <coin> 15`");
		}

		if (bbgm[player] < 1) {
			message.reply("use `;buyin` to reset back to 1 point");
		}

		flipCooldown.add(message.author.id);
		setTimeout(() => {
			flipCooldown.delete(message.author.id);
		}, (bet / 2) * 1000);

		fs.writeFile(
			"../MugiBot/assets/json/bbgm.json",
			JSON.stringify(bbgmDiscord),
			(error) => {
				if (error) console.log(error);
			}
		);
	},
};
