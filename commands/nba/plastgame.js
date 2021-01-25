const NBA = require("nba");

module.exports = {
	name: "plastgame",
	description: "Check a player's last game.",
	cooldown: 35,
	async execute(client, message, args, Discord) {
		if (!args.length)
			return message.reply(
				"You need to search a player name. Example: `m-plastgame lebron`"
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

		if (!pid) return message.channel.send("No Player Found");

		const profile = await NBA.stats.playerProfile({
			PlayerID: pid.playerId,
		});

		// searches for last season a player played in and gets the seasonID
		const latest = profile.seasonTotalsRegularSeason.length - 1;
		const lastSeason =
			profile["seasonTotalsRegularSeason"][latest].seasonId;

		try {
			const stats = await NBA.stats.playerSplits({
				Season: lastSeason,
				PlayerID: pid.playerId,
				LastNGames: "1",
			});

			// info needed for team and position
			const info = await NBA.stats.playerInfo({ PlayerID: pid.playerId });

			const p = stats["overallPlayerDashboard"][0];
			const playerInfo = info["commonPlayerInfo"][0];
			p.w > p.l ? (result = "Won") : (result = "Lost");

			const newEmbed = new Discord.MessageEmbed()
				.setThumbnail(
					"https://cdn.nba.com/headshots/nba/latest/1040x760/" +
						pid.playerId +
						".png"
				)
				.setColor("#FF0000")
				.setTitle(`${pid.lastName}'s last game (${result})`)
				.setURL("https://www.nba.com/player/" + pid.playerId)
				.setDescription(
					`${playerInfo.teamName} - ${playerInfo.position}`
				)
				.addFields(
					{
						name: "PTS / TRB / AST",
						value: `${p.pts} / ${p.reb} / ${p.ast}`,
					},
					{
						name: "STL / BLK / TOV",
						value: `${p.stl} / ${p.blk} / ${p.tov}`,
					},
					{
						name: "FG / 3P / FT",
						value: `(${p.fgm}|${p.fga}) / (${p.fG3M}|${p.fG3A}) / (${p.ftm}|${p.fta})`,
					},
					{
						name: "MIN | PF | +/-",
						value: `${p.min} / ${p.pf} / ${p.plusMinus}`,
					}
				);
			message.channel.send(newEmbed);
		} catch (error) {
			console.error(error);
			message.reply("Could not find a previous game for that player.");
		}
	},
};
