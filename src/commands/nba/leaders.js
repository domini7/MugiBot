const NBA = require("nba");
const { seasonString } = require("../../util/Utils.js");

module.exports = {
	name: "leaders",
	aliases: ["leaders-playoffs"],
	description: "Displays NBA league leaders",
	cooldown: 40,
	async execute(client, message, args, Discord, cmd) {
		let season = "2020-21";
		let searchedSeason = args[0];
		// Check if a player is searching for a season
		if (!isNaN(searchedSeason)) {
			if (searchedSeason < 1999)
				return message.reply("Can't search for years before 1999");
			// String because it's not detected as int
			if (searchedSeason === "2000")
				return message.reply("Can't search for stats in 2000");
			if (searchedSeason > 2021) searchedSeason = "2021";

			season = seasonString(searchedSeason);
		}

		try {
			const seasonType =
				cmd === "leaders" ? "Regular Season" : "Playoffs";
			const stats = await NBA.stats.playerStats({
				Season: season,
				SeasonType: seasonType,
			});
			let leaders = stats["leagueDashPlayerStats"];

			const numLeaders = 3;
			const categories = ["pts", "reb", "ast", "stl", "blk"];
			const p = {};
			// Should fix this by sorting by each category then pushing the top three
			for (const category of categories) {
				p[category] = [];
				leaders.sort(function (a, b) {
					return b[category] - a[category];
				});
				for (let i = 0; i < numLeaders; i++) {
					p[category].push(leaders[i]);
				}
			}

			const newEmbed = new Discord.MessageEmbed()
				.setThumbnail(
					`https://cdn.nba.com/headshots/nba/latest/1040x760/${p.pts[0].playerId}.png`
				)
				.setURL(
					`https://www.nba.com/stats/leaders/?Season=${season}&SeasonType=Regular%20Season`
				)
				.setColor("#C0C0C0")
				.setTitle("League Leaders")
				.addFields(
					{
						name: "Points",
						value: `${p.pts[0].playerName} - **${p.pts[0].pts}**\n${p.pts[1].playerName} - **${p.pts[1].pts}**\n${p.pts[2].playerName} - **${p.pts[2].pts}**`,
					},
					{
						name: "Rebounds",
						value: `${p.reb[0].playerName} - **${p.reb[0].reb}**\n${p.reb[1].playerName} - **${p.reb[1].reb}**\n${p.reb[2].playerName} - **${p.reb[2].reb}**`,
					},
					{
						name: "Assists",
						value: `${p.ast[0].playerName} - **${p.ast[0].ast}**\n${p.ast[1].playerName} - **${p.ast[1].ast}**\n${p.ast[2].playerName} - **${p.ast[2].ast}**`,
					},
					{
						name: "Steals",
						value: `${p.stl[0].playerName} - **${p.stl[0].stl}**\n${p.stl[1].playerName} - **${p.stl[1].stl}**\n${p.stl[2].playerName} - **${p.stl[2].stl}**`,
					},
					{
						name: "Blocks",
						value: `${p.blk[0].playerName} - **${p.blk[0].blk}**\n${p.blk[1].playerName} - **${p.blk[1].blk}**\n${p.blk[2].playerName} - **${p.blk[2].blk}**`,
					}
				)
				.setFooter(`${season} ${seasonType} Leaders`);
			message.channel.send(newEmbed);
		} catch (error) {
			console.error(error);
			message.reply(`Error searching for ${season}`);
		}
	},
};
