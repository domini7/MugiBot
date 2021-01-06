const NBA = require("nba");

module.exports = {
	name: "pbio",
	description: "Displays basic NBA player info",
	async execute(message, args, Discord) {
		if (!args.length)
			return message.reply("You need to search a player name. Example: `m-pbio lillard`");

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
			const info = await NBA.stats.playerInfo({ PlayerID: pid.playerId });
			const p = info["commonPlayerInfo"][0]

			const newEmbed = new Discord.MessageEmbed()
			.setThumbnail('https://cdn.nba.com/headshots/nba/latest/1040x760/' + pid.playerId + '.png')
			.setColor("#FFA500")
			.setTitle(`${pid.fullName}`)
			.setURL('https://www.nba.com/player/' + pid.playerId)
			.setDescription(`${p.teamName}`)
			.addFields(
				{name: 'Position', value: `${p.position}`, inline: true},
				{name: 'Height', value: `${p.height}`, inline: true},
				{name: 'Weight', value: `${p.weight}`, inline: true},
				{name: 'Jersey', value: `${p.jersey}`, inline: true},
				{name: 'Exp.', value: `${p.seasonExp}`, inline: true},
				{name: 'Country', value: `${p.country}`, inline: true},
				{name: 'School', value: `${p.school}`, inline: true},
				{name: 'Draft', value: `${p.draftYear}`, inline: true},
				{name: 'Pick', value: `${p.draftNumber}`, inline: true},
			);
			message.channel.send(newEmbed);
		} else { 
			message.channel.send("No player found"); 
		}
	},
};