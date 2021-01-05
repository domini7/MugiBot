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

			const team = info["commonPlayerInfo"][0].teamName;
			const pos = info["commonPlayerInfo"][0].position;
			const hgt = info["commonPlayerInfo"][0].height;
			const wgt = info["commonPlayerInfo"][0].weight;
			const jersey = info["commonPlayerInfo"][0].jersey;
			const exp = info["commonPlayerInfo"][0].seasonExp;
			const country = info["commonPlayerInfo"][0].country;
			const school = info["commonPlayerInfo"][0].school;
			const draftYear = info["commonPlayerInfo"][0].draftYear;
			const draftNum = info["commonPlayerInfo"][0].draftNumber;

			const newEmbed = new Discord.MessageEmbed()
			.setThumbnail('https://cdn.nba.com/headshots/nba/latest/1040x760/' + pid.playerId + '.png')
			.setColor("#FF0000")
			.setTitle(`${pid.fullName}`)
			.setURL('https://www.nba.com/player/' + pid.playerId)
			.setDescription(`${team}`)
			.addFields(
				{name: 'Position', value: `${pos}`, inline: true},
				{name: 'Height', value: `${hgt}`, inline: true},
				{name: 'Weight', value: `${wgt}`, inline: true},
				{name: 'Jersey', value: `${jersey}`, inline: true},
				{name: 'Exp.', value: `${exp}`, inline: true},
				{name: 'Country', value: `${country}`, inline: true},
				{name: 'School', value: `${school}`, inline: true},
				{name: 'Draft', value: `${draftYear}`, inline: true},
				{name: 'Pick', value: `${draftNum}`, inline: true},
			);
			message.channel.send(newEmbed);
		} else { 
			message.channel.send("No player found"); 
		}
	},
};