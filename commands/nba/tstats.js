const NBA = require("nba");

module.exports = {
	name: "tstats",
	aliases: ['ts'],
	description: "Displays basic NBA team stats",
	cooldown: 35,
	async execute(client, message, args, Discord) {
		if (!args.length)
			return message.reply(
				"You need to search a team city/name. Example: `m-tstats warriors"
			);

		let team = args.join(" ");

		let lastArg = args[args.length - 1];

		let season = "2020-21";

		// This is all for a season search, takes last arg if its a number and converts it into proper seasonId
		if (!isNaN(lastArg)) {
			// nameOnly will be used to seperate the arg searching for a name from the year
			let nameOnly = team.length - lastArg.length - 1;

			team = team.slice(0, nameOnly);

			// convert season arg into a number to subtract from
			let num0 = parseInt(lastArg);

			if (num0 < 1947 || num0 > 2021)
				return message.reply("You can't search for that year!");

			const num1 = lastArg;

			let num2 = num0 - 1;

			toString(num2);

			season = num2 + "-" + num1.slice(num1.length - 2);
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
