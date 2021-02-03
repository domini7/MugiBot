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

		const reb1 = leaders.find((x) => x.rebRank === 1);
		const reb2 = leaders.find((x) => x.rebRank === 2);
		const reb3 = leaders.find((x) => x.rebRank === 3);

		const ast1 = leaders.find((x) => x.astRank === 1);
		const ast2 = leaders.find((x) => x.astRank === 2);
		const ast3 = leaders.find((x) => x.astRank === 3);

		const stl1 = leaders.find((x) => x.stlRank === 1);
		const stl2 = leaders.find((x) => x.stlRank === 2);
		const stl3 = leaders.find((x) => x.stlRank === 3);

		const blk1 = leaders.find((x) => x.blkRank === 1);
		const blk2 = leaders.find((x) => x.blkRank === 2);
		const blk3 = leaders.find((x) => x.blkRank === 3);

		const newEmbed = new Discord.MessageEmbed()
			.setThumbnail(
				"https://cdn.nba.com/headshots/nba/latest/1040x760/" +
					pts1.playerId +
					".png"
			)
			.setURL(
				"https://www.nba.com/stats/leaders/?Season=" +
					season +
					"&SeasonType=Regular%20Season"
			)
			.setColor("#C0C0C0")
			.setTitle("League Leaders")
			.addFields(
				{
					name: "Points",
					value: `${pts1.playerName} - **${pts1.pts}**\n${pts2.playerName} - **${pts2.pts}**\n${pts3.playerName} - **${pts3.pts}**`,
				},
				{
					name: "Rebounds",
					value: `${reb1.playerName} - **${reb1.reb}**\n${reb2.playerName} - **${reb2.reb}**\n${reb3.playerName} - **${reb3.reb}**`,
				},
				{
					name: "Assists",
					value: `${ast1.playerName} - **${ast1.ast}**\n${ast2.playerName} - **${ast2.ast}**\n${ast3.playerName} - **${ast3.ast}**`,
				},
				{
					name: "Steals",
					value: `${stl1.playerName} - **${stl1.stl}**\n${stl2.playerName} - **${stl2.stl}**\n${stl3.playerName} - **${stl3.stl}**`,
				},
				{
					name: "Blocks",
					value: `${blk1.playerName} - **${blk1.blk}**\n${blk2.playerName} - **${blk2.blk}**\n${blk3.playerName} - **${blk3.blk}**`,
				}
			)
			.setFooter(`${season} Leaders`);
		message.channel.send(newEmbed);
	},
};
