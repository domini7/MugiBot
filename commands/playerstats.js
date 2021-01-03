const NBA = require("nba");

module.exports = {
	name: "playerstats",
	description: "Displays basic NBA player stats",
	async execute(message, args) {
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
			const stl = stats["seasonTotalsRegularSeason"][latest].stl;
			const blk = stats["seasonTotalsRegularSeason"][latest].blk;
			const fgp = stats["seasonTotalsRegularSeason"][latest].fgPct;
			const tpp = stats["seasonTotalsRegularSeason"][latest].fg3Pct;
			const ftp = stats["seasonTotalsRegularSeason"][latest].ftPct;

			const msgStats = `PTS: ${pts}, TRB: ${trb}, AST: ${ast}, STL: ${stl}, BLK: ${blk}, ${fgp}/${tpp}/${ftp}`;
			message.channel.send(msgStats);
		} else { 
			message.channel.send("No player found"); 
		}
	},
};
