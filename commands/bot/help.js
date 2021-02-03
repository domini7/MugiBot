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
						"Play and stop music (Must be in voice channel for both) (No queue system yet).",
					inline: false,
				},
				{
					name: "**`m-image (keyword)`**",
					value: "Get a random image based off keyword.",
					inline: false,
				},
				{
					name: "**`m-inspirobot`**",
					value: "Bot sends an inspirational image from inspirobot.",
					inline: false,
				},
				{
					name: "**`m-covid (OPTIONAL: country name)`**",
					value: "Get coronavirus stats for the world or specific countries.",
					inline: false,
				},
				{
					name: "**`m-define (keyword)`**",
					value: "Define a word using urban dictionary. Potentially NSFW.",
					inline: false,
				},
				{
					name: "**`m-flip`**",
					value: "Flip a coin.",
					inline: false,
				},
				{
					name: "**`m-userinfo`**",
					value: "Displays basic info, must be used in a server.",
					inline: false,
				},
				{
					name: "**`m-echo`**",
					value: "Bot repeats what you say after `m-echo`.",
					inline: false,
				},
				{
					name: "**`m-gpt2 [sentence]`**",
					value: "Bot tries to finish your sentence. Processes under a minute.",
					inline: false,
				},
				{
					name: "**`m-gpt2xl [sentence]`**",
					value: "Same function as m-gpt2 with bigger model. Can take up to 5-10 min.",
					inline: false,
				},
				{
					name: "**`m-version`**",
					value: "Checks current version and date last updated.",
					inline: false,
				},
			);
		const nbacommands = new Discord.MessageEmbed()
			.setColor("#808080")
			.setTitle("NBA Commands")
			.addFields(
				{
					name: "**`m-pstats (player name) [OPTIONAL YEAR]`**",
					value: "Check a NBA player's basic season stats.",
					inline: false,
				},
				{
					name: "**`m-pstats-per36`**",
					value: "Same as pstats but with per 36 min numbers.",
					inline: false,
				},
				{
					name: "**`m-pbio (player name)`**",
					value: "Check a NBA player's basic info.",
					inline: false,
				},
				{
					name: "**`m-plastgame (player name)`**",
					value: "Check a player's last game. (Can't check players who didn't play their team's last game!)",
					inline: false,
				},
				{
					name: "**`m-tstats (team) [OPTIONAL YEAR]`**",
					value: "Displays basic NBA team stats.",
					inline: false,
				},
				{
					name: "**`m-standings [OPTIONAL YEAR]`**",
					value: "Displays current NBA standings.",
					inline: false,
				},,
				{
					name: "**`m-leaders [OPTIONAL YEAR]`**",
					value: "Displays league leaders.",
					inline: false,
				}
			);

		message.author.send(newEmbed);
		message.author.send(nbacommands);
	},
};
