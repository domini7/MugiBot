const NBA = require("nba");

module.exports = {
	name: "leaders",
	description: "Displays NBA league leaders",
	cooldown: 40,
	async execute(client, message, args, Discord) {
		let lastArg = args[args.length - 1];

		let season = "2020-21";

		// This is all for a season search, takes last arg if its a number and converts it into proper seasonId
		if (!isNaN(lastArg)) {
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

		const stats = await NBA.stats.playerStats({ Season: season });

		const leaders = stats["leagueDashPlayerStats"];

		const pts1 = leaders.find((x) => x.ptsRank === 1);
		const pts2 = leaders.find((x) => x.ptsRank === 2);
		const pts3 = leaders.find((x) => x.ptsRank === 3);
		const pts4 = leaders.find((x) => x.ptsRank === 4);
		const pts5 = leaders.find((x) => x.ptsRank === 5);

		const stl1 = leaders.find((x) => x.stlRank === 1);
		const stl2 = leaders.find((x) => x.stlRank === 2);
		const stl3 = leaders.find((x) => x.stlRank === 3);
		const stl4 = leaders.find((x) => x.stlRank === 4);
		const stl5 = leaders.find((x) => x.stlRank === 5);

		const reb1 = leaders.find((x) => x.rebRank === 1);
		const reb2 = leaders.find((x) => x.rebRank === 2);
		const reb3 = leaders.find((x) => x.rebRank === 3);
		const reb4 = leaders.find((x) => x.rebRank === 4);
		const reb5 = leaders.find((x) => x.rebRank === 5);

		const blk1 = leaders.find((x) => x.blkRank === 1);
		const blk2 = leaders.find((x) => x.blkRank === 2);
		const blk3 = leaders.find((x) => x.blkRank === 3);
		const blk4 = leaders.find((x) => x.blkRank === 4);
		const blk5 = leaders.find((x) => x.blkRank === 5);

		const ast1 = leaders.find((x) => x.astRank === 1);
		const ast2 = leaders.find((x) => x.astRank === 2);
		const ast3 = leaders.find((x) => x.astRank === 3);
		const ast4 = leaders.find((x) => x.astRank === 4);
		const ast5 = leaders.find((x) => x.astRank === 5);

		const tov1 = leaders.find((x) => x.tovRank === 1);
		const tov2 = leaders.find((x) => x.tovRank === 2);
		const tov3 = leaders.find((x) => x.tovRank === 3);
		const tov4 = leaders.find((x) => x.tovRank === 4);
		const tov5 = leaders.find((x) => x.tovRank === 5);

		const newEmbed = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setTitle("League Leaders")
			.addFields(
				{
					name: "Points",
					value: `${pts1.playerName} - **${pts1.pts}**\n${pts2.playerName} - **${pts2.pts}**\n${pts3.playerName} - **${pts3.pts}**\n${pts4.playerName} - **${pts4.pts}**\n${pts5.playerName} - **${pts5.pts}**`,
					inline: true,
				},
				{
					name: "Steals",
					value: `${stl1.playerName} - **${stl1.stl}**\n${stl2.playerName} - **${stl2.stl}**\n${stl3.playerName} - **${stl3.stl}**\n${stl4.playerName} - **${stl4.stl}**\n${stl5.playerName} - **${stl5.stl}**`,
					inline: true,
				},
				{
					name: "Rebounds",
					value: `${reb1.playerName} - **${reb1.reb}**\n${reb2.playerName} - **${reb2.reb}**\n${reb3.playerName} - **${reb3.reb}**\n${reb4.playerName} - **${reb4.reb}**\n${reb5.playerName} - **${reb5.reb}**`,
					inline: false,
				},
				{
					name: "Blocks",
					value: `${blk1.playerName} - **${blk1.blk}**\n${blk2.playerName} - **${blk2.blk}**\n${blk3.playerName} - **${blk3.blk}**\n${blk4.playerName} - **${blk4.blk}**\n${blk5.playerName} - **${blk5.blk}**`,
					inline: true,
				},
				{
					name: "Assists",
					value: `${ast1.playerName} - **${ast1.ast}**\n${ast2.playerName} - **${ast2.ast}**\n${ast3.playerName} - **${ast3.ast}**\n${ast4.playerName} - **${ast4.ast}**\n${ast5.playerName} - **${ast5.ast}**`,
					inline: true,
				}
			)
			.setFooter(`${season} Leaders`);
		message.channel.send(newEmbed);
	},
};
