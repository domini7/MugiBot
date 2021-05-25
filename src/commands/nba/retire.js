const NBA = require("nba");
const stringSimilarity = require("string-similarity");
const { rnd, seasonString } = require("../../util/Utils.js");

module.exports = {
	name: "retire",
	aliases: ["ret"],
	description: "Guesses the chance of a player retiring",
	cooldown: 40,
	async execute(client, message, args) {
		if (!args.length)
			return message.reply(
				"You need to search a player name. Example: `;retire JJ Redick`"
			);

		// Takes in arg and seaches for that player
		let player = args.join(" ");

		let season = "2020-21";

		let lastArg = args[args.length - 1];
		// Check if a player is searching for a season
		if (!isNaN(lastArg)) {
			// Seperate searched player from year
			const nameOnly = player.length - lastArg.length - 1;
			player = player.slice(0, nameOnly);

			if (lastArg < 1999)
				return message.reply("Can't search for years before 1999");
			// String because it's not detected as int
			if (lastArg === "2000")
				return message.reply("Can't search for stats in 2000");
			if (lastArg > 2021) lastArg = "2021";

			season = seasonString(lastArg);
		}

		try {
			const stats = await NBA.stats.playerStats({ Season: season });

			const pName = stats["leagueDashPlayerStats"].map(
				(a) => a.playerName
			);

			const search = stringSimilarity.findBestMatch(player, pName);

			const p = stats["leagueDashPlayerStats"].find(
				(x) => x.playerName === search["bestMatch"].target
			);

			let altWs =
				p.pts +
				0.7 * p.oreb +
				0.3 * p.dreb +
				p.stl +
				0.5 * p.blk +
				0.5 * p.ast -
				0.7 * (p.fga - p.fgm) -
				p.fgm -
				0.35 * (p.fta - p.ftm) -
				0.5 * p.ftm -
				p.tov -
				0.5 * p.pf;

			const retire =
				0.3 +
				(1 / 146.35) * Math.max(p.age - 18, 0) ** 2 -
				0.961 * altWs;

			const retireChance = Math.min(
				Math.max((retire + 0.1) * 1.5, 0.01),
				0.99
			);

			message.channel.send(
				`${p.playerName} in ${season} has a ${rnd(
					retireChance * 100
				)}% chance of retiring!`
			);
		} catch (error) {
			message.channel.send(
				"Error searching for that player and/or season!"
			);
		}
	},
};
