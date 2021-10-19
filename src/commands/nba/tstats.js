const NBA = require("nba");
const { seasonString } = require("../../util/Utils.js");

module.exports = {
	name: "tstats",
	aliases: ["ts"],
	description: "Displays basic NBA team stats",
	cooldown: 35,
	async execute(client, message, args, Discord) {
		if (!args.length)
			return message.reply(
				"You need to search a team city/name. Example: `;tstats warriors"
			);

		let team = args.join(" ");

		let lastArg = args[args.length - 1];

		let season = "2021-22";

		// Check if a player is searching for a season
		if (!isNaN(lastArg)) {
			// Seperate searched team from year
			let nameOnly = team.length - lastArg.length - 1;
			team = team.slice(0, nameOnly);

			if (lastArg < 1947) lastArg = "1947";
			if (lastArg > 2022) lastArg = "2022";

			season = seasonString(lastArg);
		}

		try {
			const tid = NBA.teamIdFromName(team);

			const info = await NBA.stats.teamInfoCommon({
				Season: season,
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
		} catch (error) {
			message.channel.send("No team found");
		}
	},
};
