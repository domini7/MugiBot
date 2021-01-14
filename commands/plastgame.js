const NBA = require("nba");

module.exports = {
	name: "plastgame",
	description: "Check a player's last game.",
	async execute(message, args, Discord) {
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

		

		if (pid) {
			const profile = await NBA.stats.playerProfile({
				PlayerID: pid.playerId,
			});

			// searches for last season a player played in and gets the seasonID
			const latest = profile.seasonTotalsRegularSeason.length - 1;
			const lastSeason = profile["seasonTotalsRegularSeason"][latest].seasonId;

			const stats = await NBA.stats.playerSplits({
				Season: lastSeason,
				PlayerID: pid.playerId,
				LastNGames: "1",
			});

			// info needed for team and position
			const info = await NBA.stats.playerInfo({ PlayerID: pid.playerId });

			const p = stats["overallPlayerDashboard"][0];
			const playerInfo = info["commonPlayerInfo"][0];
			let result = 'Won';

			if (p.l > p.w){
				result = 'Lost'
			}

			const newEmbed = new Discord.MessageEmbed()
				.setThumbnail(
					"https://cdn.nba.com/headshots/nba/latest/1040x760/" +
						pid.playerId +
						".png"
				)
				.setColor("#FF0000")
				.setTitle(`${pid.fullName}'s last game (${result})`)
				.setURL("https://www.nba.com/player/" + pid.playerId)
				.setDescription(`${playerInfo.teamName} - ${playerInfo.position}`)
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
						name: "MIN | +/-",
						value: `${p.min} / ${p.plusMinus}`,
					}
				);
			message.channel.send(newEmbed);
		} else {
			message.channel.send("No player found");
		}
	},
};
