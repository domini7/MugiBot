module.exports = {
	name: "help",
	description: "Displays public commands",
	cooldown: 120,
	execute(client, message, args, Discord) {
		const newEmbed = new Discord.MessageEmbed()
			.setColor("#808080")
			.setThumbnail("https://i.imgur.com/MINhF0h.jpg")
			.setTitle("MugiBot")
			.setURL("https://github.com/domini7/MugiBot")
			.setDescription("General Commands")
			.addFields(
				{
					name: "**`m-play/stop (direct URL or title)`**",
					value:
						"Play and stop music (Must be in voice channel for both) (No queue system yet)",
					inline: false,
				},
				{
					name: "**`m-image (keyword)`**",
					value: "Get a random image based off keyword",
					inline: false,
				},
				{
					name: "**`m-covid (OPTIONAL: country name)`**",
					value: "Get coronavirus stats for the world or specific countries",
					inline: false,
				},
				{
					name: "**`m-define (keyword)`**",
					value: "Define a word using urban dictionary. NSFW. Restricted to #bot-spam or DM's",
					inline: false,
				},
				{
					name: "**`m-flip`**",
					value: "Flip a coin",
					inline: false,
				},
				{
					name: "**`m-userinfo`**",
					value: "Displays basic info, must be used in a server",
					inline: false,
				},
				{
					name: "**`m-echo`**",
					value: "Bot repeats what you say after `m-echo`",
					inline: false,
				},
				{
					name: "**`m-gpt2 [sentence]`**",
					value: "Bot tries to finish your sentence",
					inline: false,
				},
				{
					name: "**`m-version`**",
					value: "Checks current version and date last updated",
					inline: false,
				},
			);
		const nbacommands = new Discord.MessageEmbed()
			.setColor("#808080")
			.setTitle("NBA Commands")
			.addFields(
				{
					name: "**`m-pstats (player name)`**",
					value: "Check a NBA player's basic season stats",
					inline: false,
				},
				{
					name: "**`m-pbio (player name)`**",
					value: "Check a NBA player's basic info",
					inline: false,
				},
				{
					name: "**`m-plastgame (player name)`**",
					value: "Check a player's last game.",
					inline: false,
				},
				{
					name: "**`m-tstats (team city/name)`**",
					value: "Displays basic NBA team stats",
					inline: false,
				},
				{
					name: "**`m-standings`**",
					value: "Displays current NBA standings",
					inline: false,
				},
			);

		message.author.send(newEmbed);
		message.author.send(nbacommands);
	},
};
