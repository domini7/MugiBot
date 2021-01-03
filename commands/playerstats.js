const NBA = require("nba");

module.exports = {
	name: "playerstats",
	description: "Displays basic NBA player stats",
	async execute(message, args, Discord) {
		if (!args.length)
			return message.channel.send("You need to search a player name");

		const player = args.join(" ");
		const pid = NBA.findPlayer(player);

		if (pid) {
			const stats = await NBA.stats.playerProfile({ PlayerID: pid.playerId });
			const latest = stats.seasonTotalsRegularSeason.length - 1;

			const pts = stats["seasonTotalsRegularSeason"][latest].pts;
			const trb = stats["seasonTotalsRegularSeason"][latest].reb;
			const ast = stats["seasonTotalsRegularSeason"][latest].ast;
			const tov = stats["seasonTotalsRegularSeason"][latest].tov;
			const stl = stats["seasonTotalsRegularSeason"][latest].stl;
			const blk = stats["seasonTotalsRegularSeason"][latest].blk;
			const fgp = stats["seasonTotalsRegularSeason"][latest].fgPct;
			const tpp = stats["seasonTotalsRegularSeason"][latest].fg3Pct;
			const ftp = stats["seasonTotalsRegularSeason"][latest].ftPct;

			const newEmbed = new Discord.MessageEmbed()
			.setThumbnail('https://cdn.nba.com/headshots/nba/latest/1040x760/' + pid.playerId + '.png')
			.setColor("#FF0000")
			.setTitle(`${pid.fullName}`)
			.setURL('https://www.nba.com/player/' + pid.playerId)
			.addFields(
				{name: 'Points', value: `${pts}`, inline:true},
				{name: 'Rebounds', value: `${trb}`, inline:true},
				{name: 'Assist', value: `${ast}`, inline:true},
				{name: 'Steals', value: `${stl}`, inline:true},
				{name: 'Blocks', value: `${blk}`, inline:true},
				{name: 'Turnovers', value: `${tov}`, inline:true},
				{name: 'FG%', value: `${fgp}`, inline:true},
				{name: '3P%', value: `${tpp}`, inline:true},
				{name: 'FT%', value: `${ftp}`, inline:true},

			)
			.setFooter('Basic season stats');
			message.channel.send(newEmbed);
		} else { 
			message.channel.send("No player found"); 
		}
	},
};
