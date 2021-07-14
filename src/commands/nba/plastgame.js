const NBA = require("nba");
const { rnd } = require("../../util/Utils.js");

module.exports = {
	name: "plastgame",
	aliases: ["plg", "plastgame-simple", "plg-simple"],
	description: "Check a player's last game.",
	cooldown: 35,
	async execute(client, message, args, Discord, cmd) {
		if (!args.length)
			return message.reply(
				"You need to search a player name. Example: `;plastgame lebron`"
			);

		// Takes in arg and seaches for that player
		const player = args.join(" ");
		const pid = NBA.findPlayer(player);

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
				SeasonType: "Playoffs",
				PlayerID: pid.playerId,
				LastNGames: "1",
			});

			// info needed for team and position
			const info = await NBA.stats.playerInfo({ PlayerID: pid.playerId });

			const p = stats["overallPlayerDashboard"][0];
			const playerInfo = info["commonPlayerInfo"][0];

			let result;
			p.w > p.l ? (result = "Won") : (result = "Lost");

			const efg = (p.fgm + 0.5 * p.fG3M) / p.fga;
			const ts = p.pts / (2 * (p.fga + 0.44 * p.fta));
			const gmSc =
				p.pts +
				0.4 * p.fgm -
				0.7 * p.fga -
				0.4 * (p.fta - p.ftm) +
				0.7 * p.oreb +
				0.3 * p.dreb +
				p.stl +
				0.7 * p.ast +
				0.7 * p.blk -
				0.4 * p.pf -
				p.tov;

			const playerImage = `https://cdn.nba.com/headshots/nba/latest/1040x760/${pid.playerId}.png`;
			const playerLink = `https://www.nba.com/player/${pid.playerId}`;

			if (["plastgame", "plg"].includes(cmd)) {
				const lastGame = new Discord.MessageEmbed()
					.setThumbnail(playerImage)
					.setColor("#FF0000")
					.setTitle(`${pid.lastName}'s last game (${result})`)
					.setURL(playerLink)
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
							value: `(${p.fgm} | ${p.fga})/(${p.fG3M} | ${p.fG3A})/(${p.ftm} | ${p.fta})`,
						},
						{
							name: "FG% / 3P% / FT%",
							value: `${rnd(p.fgPct * 100)}% / ${rnd(
								p.fg3Pct * 100
							)}% / ${rnd(p.ftPct * 100)}%`,
						},
						{
							name: "MIN | eFG% | TS%",
							value: `${p.min} | ${rnd(efg * 100)}% | ${rnd(
								ts * 100
							)}%`,
						},
						{
							name: "GmSc | PF | +/-",
							value: `${rnd(gmSc)} / ${p.pf} / ${p.plusMinus}`,
						}
					);
				message.channel.send(lastGame);
			} else {
				const lastGameSimple = new Discord.MessageEmbed()
					.setThumbnail(playerImage)
					.setColor("#FF0000")
					.setTitle(`${pid.lastName}'s last game (${result})`)
					.setURL(playerLink)
					.setDescription(
						`${playerInfo.teamName} - ${playerInfo.position}`
					)
					.addFields(
						{
							name: "PTS / TRB / AST",
							value: `${p.pts} / ${p.reb} / ${p.ast}`,
						},
						{
							name: "FG / 3P / FT",
							value: `(${p.fgm} | ${p.fga})/(${p.fG3M} | ${p.fG3A})/(${p.ftm} | ${p.fta})`,
						}
					);
				message.channel.send(lastGameSimple);
			}
		} catch (error) {
			console.error(error);
			message.reply("Could not find a previous game for that player.");
		}
	},
};
