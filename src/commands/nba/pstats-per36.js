const NBA = require("nba");
const stringSimilarity = require("string-similarity");
const { rnd } = require("../../util/Utils.js");

module.exports = {
	name: "pstats-per36",
	aliases: ["ps36", "per36"],
	description: "Displays pstats per 36",
	cooldown: 40,
	async execute(client, message, args, Discord) {
		if (!args.length)
			return message.reply(
				"You need to search a player name. Example: `;pstats-per36 lillard`"
			);

		// Takes in arg and seaches for that player
		let player = args.join(" ");

		let lastArg = args[args.length - 1];

		let season = "2020-21";

		// This is all for a season search, takes last arg if its a number and converts it into proper seasonId
		if (!isNaN(lastArg)) {
			// nameOnly will be used to seperate the arg searching for a name from the year
			let nameOnly = player.length - lastArg.length - 1;

			player = player.slice(0, nameOnly);

			// convert season arg into a number to subtract from
			let num0 = parseInt(lastArg);

			if (num0 < 1999)
				return message.reply(
					"Cant search for years before 1999, sorry!"
				);

			if (num0 === 2000)
				return message.reply("Cant search for stats in 2000, sorry!");

			if (num0 > 2021)
				return message.reply("That season hasn't happened yet!");

			const num1 = lastArg;

			let num2 = num0 - 1;

			toString(num2);

			season = num2 + "-" + num1.slice(num1.length - 2);
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

			const efg = (p.fgm + 0.5 * p.fG3M) / p.fga;
			const ts = p.pts / (2 * (p.fga + 0.44 * p.fta));

			const newEmbed = new Discord.MessageEmbed()
				.setThumbnail(
					"https://cdn.nba.com/headshots/nba/latest/1040x760/" +
						p.playerId +
						".png"
				)
				.setColor("#FF0000")
				.setTitle(`${p.playerName}`)
				.setURL("https://www.nba.com/player/" + p.playerId)
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
						)})/(${rnd((p.fG3M * 36) / p.min)} | ${rnd((p.fG3A * 36) / p.min)})/(${rnd(
							(p.ftm * 36) / p.min
						)} | ${rnd((p.fta * 36) / p.min)})`,
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
				.setFooter(`${season} PER36 stats`);
			message.channel.send(newEmbed);
		} catch (error) {
			message.channel.send(
				"Error searching for that player and/or season!"
			);
		}
	},
};