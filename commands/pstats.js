const NBA = require("nba");
// rounds to nearest tenth, needed for fg%'s to return 50% instead of 0.5
function rnd(x) {
  return Number.parseFloat(x).toFixed(1);
}

module.exports = {
	name: "pstats",
	description: "Displays basic NBA player stats",
	async execute(message, args, Discord) {
		if (!args.length)
			return message.reply(
				"You need to search a player name. Example: `m-pstats lillard`"
			);

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
			const stats = await NBA.stats.playerProfile({
				PlayerID: pid.playerId,
			});
			// info needed for team and position
			const info = await NBA.stats.playerInfo({ PlayerID: pid.playerId });
			// returns last season a player played in
			const latest = stats.seasonTotalsRegularSeason.length - 1;

			const p = stats["seasonTotalsRegularSeason"][latest];
			const playerInfo = info["commonPlayerInfo"][0];

			const newEmbed = new Discord.MessageEmbed()
				.setThumbnail(
					"https://cdn.nba.com/headshots/nba/latest/1040x760/" +
						pid.playerId +
						".png"
				)
				.setColor("#FF0000")
				.setTitle(`${pid.fullName}`)
				.setURL("https://www.nba.com/player/" + pid.playerId)
				.setDescription(
					`${playerInfo.teamName} - ${playerInfo.position}`
				)
				.addFields(
					{
						name: "GP / GS / MPG",
						value: `${p.gp} / ${p.gs} / ${p.min}`,
					},
					{
						name: "PPG / TRB / AST",
						value: `${p.pts} / ${p.reb} / ${p.ast}`,
					},
					{
						name: "STL / BLK / TOV",
						value: `${p.stl} / ${p.blk} / ${p.tov}`,
					},
					{
						name: "FG% / 3P% / FT%",
						value: `${rnd(p.fgPct*100)}% / ${rnd(p.fg3Pct*100)}% / ${rnd(p.ftPct*100)}%`,
					}
				)
				.setFooter(`Basic ${p.seasonId} stats`);
			message.channel.send(newEmbed);
		} else {
			message.channel.send("No player found");
		}
	},
};
