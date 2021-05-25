const NBA = require("nba");
const stringSimilarity = require("string-similarity");
const { rnd, seasonString } = require("../../util/Utils.js");

module.exports = {
	name: "pstats",
	aliases: [
		// Reg season
		"ps",
		"ps36",
		"pstats-per36",
		"pstats-simple",
		"ps-simple",
		// Playoffs
		"pstats-playoffs",
		"ps-playoffs",
		"ps36-playoffs",
		"pstats-per36-playoffs",
		"pstats-simple-playoffs",
		"ps-simple-playoffs",
	],
	description: "Displays basic NBA player stats",
	cooldown: 40,
	async execute(client, message, args, Discord, cmd) {
		if (!args.length)
			return message.reply(
				"You need to search a player name. Example: `;pstats lillard`"
			);

		// Takes in arg and seaches for that player
		let player = args.join(" ");

		let season = "2020-21";

		const playoffCommands = [
			"pstats-playoffs",
			"ps-playoffs",
			"ps36-playoffs",
			"pstats-per36-playoffs",
			"pstats-simple-playoffs",
			"ps-simple-playoffs",
		];
		const seasonType = playoffCommands.includes(cmd)
			? "Playoffs"
			: "Regular Season";

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
			const stats = await NBA.stats.playerStats({
				Season: season,
				SeasonType: seasonType,
			});

			const pName = stats["leagueDashPlayerStats"].map(
				(a) => a.playerName
			);

			const search = stringSimilarity.findBestMatch(player, pName);

			const p = stats["leagueDashPlayerStats"].find(
				(x) => x.playerName === search["bestMatch"].target
			);
			console.log(p);

			const efg = (p.fgm + 0.5 * p.fG3M) / p.fga;
			const ts = p.pts / (2 * (p.fga + 0.44 * p.fta));

			const playerImage = `https://cdn.nba.com/headshots/nba/latest/1040x760/${p.playerId}.png`;
			const playerLink = `https://www.nba.com/player/${p.playerId}`;

			// Send basic, per36, or simple stats
			if (
				["pstats", "ps", "pstats-playoffs", "ps-playoffs"].includes(cmd)
			) {
				const basicStats = new Discord.MessageEmbed()
					.setThumbnail(playerImage)
					.setColor("#FF0000")
					.setTitle(`${p.playerName}`)
					.setURL(playerLink)
					.setDescription(`${p.teamAbbreviation}`)
					.addFields(
						{
							name: "GP / MPG / WIN%",
							value: `${p.gp} / ${p.min} / ${rnd(p.wPct * 100)}%`,
						},
						{
							name: "PPG / TRB / AST",
							value: `${p.pts} / ${p.reb} / ${p.ast}`,
						},
						{
							name: "STL / BLK / TOV",
							value: `${p.stl} / ${p.blk} / ${p.tov}`,
						},
						{
							name: "FG / 3P / FT",
							value: `(${p.fgm} | ${p.fga})/(${p.fG3M} | ${p.fG3A})/(${p.ftm} | ${p.fta})`,
						},
						{
							name: "FG% / 3P% / FT%",
							value: `${rnd(p.fgPct * 100)}% / ${rnd(
								p.fg3Pct * 100
							)}% / ${rnd(p.ftPct * 100)}%`,
						},
						{
							name: "eFG% | TS%",
							value: `${rnd(efg * 100)}% | ${rnd(ts * 100)}%`,
						}
					)
					.setFooter(`${season} ${seasonType}`);

				message.channel.send(basicStats);
			} else if (
				[
					"pstats-per36",
					"ps36",
					"ps36-playoffs",
					"pstats-per36-playoffs",
				].includes(cmd)
			) {
				const per36Stats = new Discord.MessageEmbed()
					.setThumbnail(playerImage)
					.setColor("#FF0000")
					.setTitle(`${p.playerName}`)
					.setURL(playerLink)
					.setDescription(`${p.teamAbbreviation}`)
					.addFields(
						{
							name: "GP / MPG / WIN%",
							value: `${p.gp} / ${p.min} / ${rnd(p.wPct * 100)}%`,
						},
						{
							name: "PPG / TRB / AST",
							value: `${rnd((p.pts * 36) / p.min)} / ${rnd(
								(p.reb * 36) / p.min
							)} / ${rnd((p.ast * 36) / p.min)}`,
						},
						{
							name: "STL / BLK / TOV",
							value: `${rnd((p.stl * 36) / p.min)} / ${rnd(
								(p.blk * 36) / p.min
							)} / ${rnd((p.tov * 36) / p.min)}`,
						},
						{
							name: "FG / 3P / FT",
							value: `(${rnd((p.fgm * 36) / p.min)} | ${rnd(
								(p.fga * 36) / p.min
							)})/(${rnd((p.fG3M * 36) / p.min)} | ${rnd(
								(p.fG3A * 36) / p.min
							)})/(${rnd((p.ftm * 36) / p.min)} | ${rnd(
								(p.fta * 36) / p.min
							)})`,
						},
						{
							name: "FG% / 3P% / FT%",
							value: `${rnd(p.fgPct * 100)}% / ${rnd(
								p.fg3Pct * 100
							)}% / ${rnd(p.ftPct * 100)}%`,
						},
						{
							name: "eFG% | TS%",
							value: `${rnd(efg * 100)}% | ${rnd(ts * 100)}%`,
						}
					)
					.setFooter(`${season} ${seasonType} PER36`);

				message.channel.send(per36Stats);
			} else {
				const simpleStats = new Discord.MessageEmbed()
					.setThumbnail(playerImage)
					.setColor("#FF0000")
					.setTitle(`${p.playerName}`)
					.setURL(playerLink)
					.setDescription(`${p.teamAbbreviation}`)
					.addFields(
						{
							name: "PPG / TRB / AST",
							value: `${p.pts} / ${p.reb} / ${p.ast}`,
						},
						{
							name: "FG% / 3P% / FT%",
							value: `${rnd(p.fgPct * 100)}% / ${rnd(
								p.fg3Pct * 100
							)}% / ${rnd(p.ftPct * 100)}%`,
						}
					)
					.setFooter(`${season} ${seasonType}`);

				message.channel.send(simpleStats);
			}
		} catch (error) {
			message.channel.send(
				"Error searching for that player and/or season!"
			);
		}
	},
};
