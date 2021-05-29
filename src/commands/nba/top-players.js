const NBA = require("nba");
const { stripIndents } = require("common-tags");
const { seasonString } = require("../../util/Utils.js");

module.exports = {
	name: "top-players",
	aliases: ["top-players-playoffs", "stats"],
	description: "Get top 12 players by stat",
	cooldown: 40,
	async execute(client, message, args, Discord, cmd) {
		// Users can search with different names, 3p% instead of fg3Pct
		const searchableStats = {
			age: "age",
			gp: "gp",
			wins: "w",
			losses: "l",
			"win%": "wPct",
			min: "min",
			fgm: "fgm",
			fga: "fga",
			"fg%": "fgPct",
			"3pm": "fG3M",
			"3pa": "fG3A",
			"3p%": "fg3Pct",
			ftm: "ftm",
			fta: "fta",
			"ft%": "ftPct",
			oreb: "oreb",
			dreb: "dreb",
			reb: "reb",
			ast: "ast",
			tov: "tov",
			stl: "stl",
			blk: "blk",
			pf: "pf",
			pts: "pts",
			"+/-": "plusMinus",
			dd: "dD2",
			td: "tD3",
		};

		// Get full stat name by searched stat, also used in stats command
		const statNames = [
			{ stat: "age", name: "Player Age" },
			{ stat: "gp", name: "Games Played" },
			{ stat: "wins", name: "Wins" },
			{ stat: "losses", name: "Losses" },
			{ stat: "win%", name: "Win Percentage" },
			{ stat: "min", name: "Minutes Per Game" },
			{ stat: "fgm", name: "Field Goals Made" },
			{ stat: "fga", name: "Field Goals Attempted" },
			{ stat: "fg%", name: "Field Goal Percentage" },
			{ stat: "3pm", name: "Three Pointers Made" },
			{ stat: "3pa", name: "Three Pointers Attempted" },
			{ stat: "3p%", name: "Three Point Percentage" },
			{ stat: "ftm", name: "Free Throws Made" },
			{ stat: "fta", name: "Free Throws Attempted" },
			{ stat: "ft%", name: "Free Throw Percentage" },
			{ stat: "oreb", name: "Offensive Rebounds" },
			{ stat: "dreb", name: "Defensive Rebounds" },
			{ stat: "reb", name: "Rebounds Per Game" },
			{ stat: "ast", name: "Assist Per Game" },
			{ stat: "tov", name: "Turnovers Per Game" },
			{ stat: "stl", name: "Steals Per Game" },
			{ stat: "blk", name: "Blocks Per Game" },
			{ stat: "pf", name: "Fouls Per Game" },
			{ stat: "pts", name: "Points Per Game" },
			{ stat: "+/-", name: "Avg. Plus/Minus" },
			{ stat: "dd", name: "Double Doubles" },
			{ stat: "td", name: "Triple Doubles" },
		];

		if (cmd === "stats") {
			let statArray = [];
			for (const s of statNames) {
				statArray.push(`${s.stat}: ${s.name}`);
			}
			const availableStats = new Discord.MessageEmbed()
				.setColor("RANDOM")
				.setTitle("Searchable Stats")
				.setDescription(statArray)
				.setFooter("Search using abbreviated stat names");

			if (message.channel.type === "text")
				message.channel.send("Sent to DM's to avoid clutter.");
			return message.author.send(availableStats);
		}

		if (!args.length)
			return message.reply("search a stat! `;top-players ast`");

		const searchedStat = args[0];
		if (!Object.keys(searchableStats).includes(searchedStat))
			return message.reply(
				"Invalid stat, see available stats with `;stats`"
			);

		let season = "2020-21";
		let searchedSeason = args[1];
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
				cmd === "top-players" ? "Regular Season" : "Playoffs";

			const stats = await NBA.stats.playerStats({
				Season: season,
				SeasonType: seasonType,
			});
			const leaders = stats["leagueDashPlayerStats"];
			let topPlayers = leaders.filter(function (stat) {
				if (cmd === "top-players") {
					return stat.gp > 5 && stat.min > 3;
				} else {
					return stat.min > 3;
				}
			});

			const usedStat = searchableStats[searchedStat];
			topPlayers.sort(function (a, b) {
				return b[usedStat] - a[usedStat];
			});

			const statName = statNames.find((x) => x.stat === searchedStat);
			const topPlayersEmbed = new Discord.MessageEmbed()
				.setColor("RANDOM")
				.setTitle(`**${statName.name}**`)
				.setThumbnail(
					`https://cdn.nba.com/headshots/nba/latest/1040x760/${topPlayers[0].playerId}.png`
				)
				.setURL(
					`https://www.nba.com/stats/leaders/?Season=${season}&SeasonType=Regular%20Season`
				)
				.setDescription(
					stripIndents`
						${topPlayers[0].playerName} - **${topPlayers[0][usedStat]}**
						${topPlayers[1].playerName} - **${topPlayers[1][usedStat]}**
						${topPlayers[2].playerName} - **${topPlayers[2][usedStat]}**
						${topPlayers[3].playerName} - **${topPlayers[3][usedStat]}**
						${topPlayers[4].playerName} - **${topPlayers[4][usedStat]}**
						${topPlayers[5].playerName} - **${topPlayers[5][usedStat]}**
						${topPlayers[6].playerName} - **${topPlayers[6][usedStat]}**
						${topPlayers[7].playerName} - **${topPlayers[7][usedStat]}**
						${topPlayers[8].playerName} - **${topPlayers[8][usedStat]}**
						${topPlayers[9].playerName} - **${topPlayers[9][usedStat]}**
						${topPlayers[10].playerName} - **${topPlayers[10][usedStat]}**
						${topPlayers[11].playerName} - **${topPlayers[11][usedStat]}**
					`
				)
				.setFooter(
					`${season} ${seasonType}\nSee searchable stats with ;stats`
				);
			message.channel.send(topPlayersEmbed);
		} catch (error) {
			console.error(error);
			message.reply(`Error searching for ${season}`);
		}
	},
};
