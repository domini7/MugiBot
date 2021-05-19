const NBA = require("nba");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "standings",
	description: "Displays current NBA standings",
	cooldown: 600,
	async execute(client, message, args, Discord) {
		const searchedSeason = parseInt(args[0]);

		let season = "06/06/2021";

		if (args.length) {
			season = "06/06/" + args[0];

			if (!searchedSeason)
				return message.reply(
					"You need to specify a season. `;standings 2013`"
				);
		}

		if (searchedSeason < 2005 || searchedSeason > 9999)
			return message.reply(
				"Can't search for standings before 2005, sorry!"
			);

		const stats = await NBA.stats.scoreboard({ gameDate: season });

		const east = stats["eastConfStandingsByDay"];
		const west = stats["westConfStandingsByDay"];

		const standings = new Discord.MessageEmbed()
			.setColor("#800080")
			.addFields(
				{
					name: "**East Standings**",
					value: stripIndents`
					**1.** ${east[0].team}: ${east[0].w} - ${east[0].l}
					**2.** ${east[1].team}: ${east[1].w} - ${east[1].l}
					**3.** ${east[2].team}: ${east[2].w} - ${east[2].l}
					**4.** ${east[3].team}: ${east[3].w} - ${east[3].l}
					**5.** ${east[4].team}: ${east[4].w} - ${east[4].l}
					**6.** ${east[5].team}: ${east[5].w} - ${east[5].l}
					**7.** ${east[6].team}: ${east[6].w} - ${east[6].l}
					**8.** ${east[7].team}: ${east[7].w} - ${east[7].l}
					9. ${east[8].team}: ${east[8].w} - ${east[8].l}
					10. ${east[9].team}: ${east[9].w} - ${east[9].l}
					11. ${east[10].team}: ${east[10].w} - ${east[10].l}
					12. ${east[11].team}: ${east[11].w} - ${east[11].l}
					13. ${east[12].team}: ${east[12].w} - ${east[12].l}
					14. ${east[13].team}: ${east[13].w} - ${east[13].l}
					15. ${east[14].team}: ${east[14].w} - ${east[14].l}
					`,
					inline: true,
				},
				{
					name: "**West Standings**",
					value: stripIndents`
					**1.** ${west[0].team}: ${west[0].w} - ${west[0].l}
					**2.** ${west[1].team}: ${west[1].w} - ${west[1].l}
					**3.** ${west[2].team}: ${west[2].w} - ${west[2].l}
					**4.** ${west[3].team}: ${west[3].w} - ${west[3].l}
					**5.** ${west[4].team}: ${west[4].w} - ${west[4].l}
					**6.** ${west[5].team}: ${west[5].w} - ${west[5].l}
					**7.** ${west[6].team}: ${west[6].w} - ${west[6].l}
					**8.** ${west[7].team}: ${west[7].w} - ${west[7].l}
					9. ${west[8].team}: ${west[8].w} - ${west[8].l}
					10. ${west[9].team}: ${west[9].w} - ${west[9].l}
					11. ${west[10].team}: ${west[10].w} - ${west[10].l}
					12. ${west[11].team}: ${west[11].w} - ${west[11].l}
					13. ${west[12].team}: ${west[12].w} - ${west[12].l}
					14. ${west[13].team}: ${west[13].w} - ${west[13].l}
					15. ${west[14].team}: ${west[14].w} - ${west[14].l}
					`,
					inline: true,
				}
			);
		message.channel.send(standings);
	},
};
