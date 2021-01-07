const NBA = require("nba");

module.exports = {
	name: "tstats",
	description: "Displays basic NBA team stats",
	async execute(message, args, Discord) {
		if (!args.length)
			return message.reply(
				"You need to search a team city/name. Example: `m-tstats warriors"
			);

		// Takes in arg and seaches for that team
		const team = args.join(" ");
		const tid = NBA.teamIdFromName(team);

		if (tid) {
			const info = await NBA.stats.teamInfoCommon({
				Season: "2020-21",
				TeamID: tid,
			});
			const basicInfo = info["teamInfoCommon"][0];
			const stats = info["teamSeasonRanks"][0];

			const newEmbed = new Discord.MessageEmbed()
				.setColor("#89CFF0")
				.setTitle(
					`${basicInfo.teamCity}` + " " + `${basicInfo.teamName}`
				)
				.setURL("https://www.nba.com/stats/team/" + tid)
				.setDescription(`${basicInfo.seasonYear} season`)
				.addFields(
					{
						name: "W-L | Win%",
						value: `${basicInfo.confRank}. ${basicInfo.w}-${basicInfo.l} | ${basicInfo.pct}`,
					},
					{
						name: "PPG | oPPG",
						value: `${stats.ptsPg} (${stats.ptsRank}) | ${stats.oppPtsPg} (${stats.oppPtsRank})`,
					},
					{
						name: "RPG | APG",
						value: `${stats.rebPg} (${stats.rebRank}) | ${stats.astPg} (${stats.astRank})`,
					}
				);
			message.channel.send(newEmbed);
		} else {
			message.channel.send("No team found");
		}
	},
};
