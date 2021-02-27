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

		const numLeaders = 3;

		const categories = ["pts", "reb", "ast", "stl", "blk"];

		const leaders = stats["leagueDashPlayerStats"];

		const p = {};

		for (const category of categories) {
			p[category] = [];
			for (let i = 1; i <= numLeaders; i++) {
				p[category].push(
					leaders.find((x) => x[`${category}Rank`] === i)
				);
			}
		}

		const newEmbed = new Discord.MessageEmbed()
			.setThumbnail(
				"https://cdn.nba.com/headshots/nba/latest/1040x760/" +
					p.pts[0].playerId +
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
			.setFooter(`${season} Leaders`);
		message.channel.send(newEmbed);
	},
};
