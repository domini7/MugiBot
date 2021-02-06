module.exports = {
	name: "help",
	description: "Displays public commands",
	cooldown: 10,
	execute(client, message, args, Discord) {
		const help = new Discord.MessageEmbed()
			.setColor("#808080")
			.setAuthor(
				"MugiBot",
				"",
				"https://github.com/domini7/MugiBot"
			)
			.setThumbnail("https://i.imgur.com/JbQP9Zp.jpg")
			.setTitle("Open-source Discord.js bot")
			.setDescription(
				"To get info about specific categories,\ndo `m-help <category>`.\nTo show all commands, do `m-help all.`"
			)
			.addFields(
				{
					name: "**General**",
					value: "Commands that don't fit into specific categories.",
					inline: false,
				},
				{
					name: "**NBA**",
					value: "NBA stat commands.",
					inline: false,
				},
				{
					name: "**Music**",
					value: "Music commands.",
					inline: false,
				},
				{
					name: "**Bot**",
					value: "Commands to make the bot do something.",
					inline: false,
				},
				{
					name: "**Search**",
					value: "Search the internet and display data.",
					inline: false,
				}
			);

		const general = new Discord.MessageEmbed()
			.setTitle("General")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`m-flip (OPTIONAL: Guess)`**",
					value: "Flip a coin.",
					inline: false,
				},
				{
					name: "**`m-userinfo`**",
					value: "Displays basic info, must be used in a server.",
					inline: false,
				},
				{
					name: "**`m-version`**",
					value:
						"Displays version and date MugiBot was last updated.",
					inline: false,
				}
			);

		const nba = new Discord.MessageEmbed()
			.setTitle("NBA")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`m-pstats (player) [OPTIONAL YEAR]`**",
					value: "Check a NBA player's basic season stats.",
					inline: false,
				},
				{
					name: "**`m-pstats-per36`**",
					value: "Same as pstats but with per 36 min numbers.",
					inline: false,
				},
				{
					name: "**`m-pbio (player)`**",
					value: "Check a NBA player's basic info.",
					inline: false,
				},
				{
					name: "**`m-plastgame (player)`**",
					value:
						"Check a player's last game. (Can't check players who didn't play their team's last game!)",
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
				},
				{
					name: "**`m-leaders [OPTIONAL YEAR]`**",
					value: "Displays league leaders.",
					inline: false,
				},
				{
					name: "**`m-retire (player) [OPTIONAL YEAR]`**",
					value: "Guesses the chance of a player retiring.",
					inline: false,
				}
			);

		const music = new Discord.MessageEmbed()
			.setTitle("Music")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`m-play (youtube URL or title)`**",
					value: "Play music. (Must be in voice channel)",
					inline: false,
				},
				{
					name: "**`m-stop`**",
					value:
						"Bot stops currently playing music and leaves channel.",
					inline: false,
				}
			);

		const bot = new Discord.MessageEmbed()
			.setTitle("Bot")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`m-echo`**",
					value: "Bot repeats what you say after `m-echo`.",
					inline: false,
				},
				{
					name: "**`m-leet`**",
					value:
						"Bot repeats what you say but turns it into leet text.",
					inline: false,
				},
				{
					name: "**`m-gpt2 [sentence]`**",
					value:
						"Bot tries to finish your sentence. Processes under a minute.",
					inline: false,
				},
				{
					name: "**`m-gpt2xl [sentence]`**",
					value:
						"Same function as m-gpt2 with bigger model. Can take up to 5-10 min.",
					inline: false,
				},
				{
					name: "**`m-rate [name]`**",
					value: "Bot will rate you/someone from 0-10.",
					inline: false,
				},
				{
					name: "**`m-ship [@user, @user]`**",
					value: "Combines two users for a ship.",
					inline: false,
				},
				{
					name: "**`m-calc [math]`**",
					value: "Bot will solve math expressions.",
					inline: false,
				}
			);
		const search = new Discord.MessageEmbed()
			.setTitle("Search")
			.setColor("RANDOM")
			.addFields(
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
					name: "**`m-define (word)`**",
					value:
						"Define a word using UrbanDictionary, potentially offensive.",
					inline: false,
				},
				{
					name: "**`m-covid (OPTIONAL: country name)`**",
					value:
						"Get coronavirus stats for the world or specific countries.",
					inline: false,
				},
				{
					name: "**`m-wiki (query)`**",
					value: "Search wikipedia.",
					inline: false,
				}
			);

		const dm = message.author;

		if (!args.length) {
			dm.send(help);
		} else {
			const cat = args[0].toLowerCase();

			switch (cat) {
				case "general":
					dm.send(general);
					break;
				case "nba":
					dm.send(nba);
					break;
				case "music":
					dm.send(music);
					break;
				case "bot":
					dm.send(bot);
					break;
				case "search":
					dm.send(search);
					break;
				case "all":
					dm.send(general);
					dm.send(nba);
					dm.send(music);
					dm.send(bot);
					dm.send(search);
					break;
				default:
					dm.send("Couldn't find that category! (Check spelling?)");
			}
		}
	},
};