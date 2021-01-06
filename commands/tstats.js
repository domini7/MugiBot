const NBA = require("nba");

module.exports = {
	name: "tstats",
	description: "Displays basic NBA team stats",
	async execute(message, args, Discord) {
		if (!args.length)
			return message.reply("You need to search a team city/name. Example: `m-tstats warriors");

		// Takes in arg and seaches for that team
		const team = args.join(" ");
		const tid = NBA.teamIdFromName(team);

		if (tid) {
			const info = await NBA.stats.teamInfoCommon({Season: "2020-21", TeamID: tid});

			const abbrev = info["teamInfoCommon"][0].teamAbbreviation;
			const teamCity = info["teamInfoCommon"][0].teamCity;
			const teamName = info["teamInfoCommon"][0].teamName;
			const season = info["teamInfoCommon"][0].seasonYear;

			const seed = info["teamInfoCommon"][0].confRank;
			const won = info["teamInfoCommon"][0].w;
			const lost = info["teamInfoCommon"][0].l;
			const pct = info["teamInfoCommon"][0].pct;

			const ppg = info["teamSeasonRanks"][0].ptsPg;
			const ppgRnk = info["teamSeasonRanks"][0].ptsRank;
			const oppg = info["teamSeasonRanks"][0].oppPtsPg;
			const oppgRnk = info["teamSeasonRanks"][0].oppPtsRank;

			const reb = info["teamSeasonRanks"][0].rebPg;
			const rebRnk = info["teamSeasonRanks"][0].rebRank;
			const ast = info["teamSeasonRanks"][0].astPg;
			const astRnk = info["teamSeasonRanks"][0].astRank;

			const newEmbed = new Discord.MessageEmbed()
			.setColor("#0000ff")
			.setTitle(`${teamCity}` + ' ' + `${teamName}`)
			.setURL('https://www.nba.com/stats/team/' + tid)
			.setDescription(`${season} season`)
			.addFields(
				{name: 'W-L | Win%', value: `${seed}. ${won}-${lost} | ${pct}`},
				{name: 'PPG | oPPG', value: `${ppg} (${ppgRnk}) | ${oppg} (${oppgRnk})`},
				{name: 'RPG | APG', value: `${reb} (${rebRnk}) | ${ast} (${astRnk})`},
			);
			message.channel.send(newEmbed);
		} else { 
			message.channel.send("No team found"); 
		}
	},
};