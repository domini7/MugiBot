module.exports = {
	name: "help",
	description: "Displays public commands",
	execute(message, args, Discord) {
		const newEmbed = new Discord.MessageEmbed()
			.setColor("#808080")
			.setThumbnail("https://i.imgur.com/MINhF0h.jpg")
			.setTitle("MugiBot")
			.setURL("https://github.com/domini7/MugiBot")
			.setDescription("Commands")
			.addFields(
				{
					name: "**`m-version`**",
					value: "Checks current version and date last updated",
					inline: false,
				},
				{
					name: "**`m-play/stop (direct URL or title)`**",
					value:
						"Play and stop music (Must be in channel for both) (No queue system yet)",
					inline: false,
				},
				{
					name: "**`m-pstats (player name)`**",
					value: "Check a NBA player's basic season stats",
					inline: false,
				},
				{
					name: "**`m-image (keyword)`**",
					value: "Get a random image based off keyword",
					inline: false,
				},
				{
					name: "**`m-flip`**",
					value: "Flip a coin",
					inline: false,
				},
			);

		message.channel.send(newEmbed);
	},
};
