const NBA = require("nba");

function birth(dob) {
	// new Date(dateString)
	this.birthday = new Date(dob); // transform birthday in date-object
	this.calculateAge = function () {
		const diff = Date.now() - this.birthday.getTime();
		const ageDate = new Date(diff);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	};
}

module.exports = {
	name: "pbio",
	description: "Displays basic NBA player info",
	async execute(message, args, Discord) {
		if (!args.length)
			return message.reply(
				"You need to search a player name. Example: `m-pbio lillard`"
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
		*/

		if (pid) {
			const info = await NBA.stats.playerInfo({ PlayerID: pid.playerId });
			const p = info["commonPlayerInfo"][0];
			const age = new birth(p.birthdate).calculateAge();

			const newEmbed = new Discord.MessageEmbed()
				.setThumbnail(
					"https://cdn.nba.com/headshots/nba/latest/1040x760/" +
						pid.playerId +
						".png"
				)
				.setColor("#FFA500")
				.setTitle(`${pid.fullName}`)
				.setURL("https://www.nba.com/player/" + pid.playerId)
				.setDescription(`${p.teamName}`)
				.addFields(
					{ name: "Age", value: `${age}`, inline: true },
					{ name: "Height", value: `${p.height}`, inline: true },
					{ name: "Weight", value: `${p.weight}`, inline: true },
					{ name: "Position", value: `${p.position}`, inline: true },
					{ name: "Jersey", value: `#${p.jersey}`, inline: true },
					{ name: "Exp.", value: `${p.seasonExp}`, inline: true },
					{ name: "Country", value: `${p.country}`, inline: true },
					{ name: "School", value: `${p.school}`, inline: true },
					{ name: "Draft", value: `${p.draftYear}`, inline: true },
					{ name: "Pick", value: `${p.draftNumber}`, inline: true }
				);
			message.channel.send(newEmbed);
		} else {
			message.channel.send("No player found");
		}
	},
};
