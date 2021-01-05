const NBA = require("nba");

module.exports = {
	name: "pstats",
	description: "Displays basic NBA player stats",
	async execute(message, args, Discord) {
		if (!args.length)
			return message.reply("You need to search a player name. Example: `m-pstats lillard`");

		// Takes in arg and seaches for that player
		const player = args.join(" ");
		const pid = NBA.findPlayer(player);

		/* NBA.findPlayer contains
		firstName
		lastName
		playerId
		teamId
		fullName
		downcaseName
		We'll be using playerId for this command
		*/

		if (pid) {
			const stats = await NBA.stats.playerProfile({ PlayerID: pid.playerId });
			// info needed for team and position
			const info = await NBA.stats.playerInfo({ PlayerID: pid.playerId });
			// returns last season a player played in
			const latest = stats.seasonTotalsRegularSeason.length - 1;

			const team = info["commonPlayerInfo"][0].teamName;
			const pos = info["commonPlayerInfo"][0].position;
			const mpg = stats["seasonTotalsRegularSeason"][latest].min;
			const gp = stats["seasonTotalsRegularSeason"][latest].gp;
			const gs = stats["seasonTotalsRegularSeason"][latest].gs;
			const pts = stats["seasonTotalsRegularSeason"][latest].pts;
			const trb = stats["seasonTotalsRegularSeason"][latest].reb;
			const ast = stats["seasonTotalsRegularSeason"][latest].ast;
			const tov = stats["seasonTotalsRegularSeason"][latest].tov;
			const stl = stats["seasonTotalsRegularSeason"][latest].stl;
			const blk = stats["seasonTotalsRegularSeason"][latest].blk;
			const fgp = stats["seasonTotalsRegularSeason"][latest].fgPct;
			const tpp = stats["seasonTotalsRegularSeason"][latest].fg3Pct;
			const ftp = stats["seasonTotalsRegularSeason"][latest].ftPct;
			const season = stats["seasonTotalsRegularSeason"][latest].seasonId;

			const newEmbed = new Discord.MessageEmbed()
			.setThumbnail('https://cdn.nba.com/headshots/nba/latest/1040x760/' + pid.playerId + '.png')
			.setColor("#FF0000")
			.setTitle(`${pid.fullName}`)
			.setURL('https://www.nba.com/player/' + pid.playerId)
			.setDescription(`${team} - ${pos}`)
			.addFields(
				{name: 'GP / GS / MPG', value: `${gp} / ${gs} / ${mpg}`},
				{name: 'PPG / TRB / AST', value: `${pts} / ${trb} / ${ast}`},
				{name: 'STL / BLK / TOV', value: `${stl} / ${blk} / ${tov}`},
				{name: 'FG% / 3P% / FT%', value: `${fgp} / ${tpp} / ${ftp}`},
			)
			.setFooter(`Basic ${season} stats`);
			message.channel.send(newEmbed);
		} else { 
			message.channel.send("No player found"); 
		}
	},
};