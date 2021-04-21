module.exports = {
	name: "help",
	description: "Displays public commands",
	cooldown: 10,
	execute(client, message, args, Discord) {
		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setTitle("Check DM's!");

		if (message.channel.type === "text") message.channel.send(embed);

		const help = new Discord.MessageEmbed()
			.setColor("#808080")
			.setAuthor("MugiBot", "", "https://github.com/domini7/MugiBot")
			.setThumbnail("https://i.imgur.com/PtCc2iO.jpg")
			.setTitle("Open-source Discord.js bot")
			.setDescription(
				"To get info about specific categories,\ndo `;help <category>`.\nTo show all commands, do `;help all.`"
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
				},
				{
					name: "**Games**",
					value: "Simple games to play.",
					inline: false,
				}
			);

		const general = new Discord.MessageEmbed()
			.setTitle("General")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`;flip (OPTIONAL: Guess)`**",
					value: "Flip a coin.",
					inline: false,
				},
				{
					name: "**`;userinfo`**",
					value: "Displays basic info, must be used in a server.",
					inline: false,
				},
				{
					name: "**`;version`**",
					value:
						"Displays version and date MugiBot was last updated.",
					inline: false,
				},
				{
					name: "**`;suggest`**",
					value: "Send a suggestion to me.",
					inline: false,
				}
			);

		const nba = new Discord.MessageEmbed()
			.setTitle("NBA")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`;pstats (player) [OPTIONAL YEAR]`**",
					value: "Check a NBA player's basic season stats.",
					inline: false,
				},
				{
					name: "**`;pstats-per36`**",
					value: "Same as pstats but with per 36 min numbers.",
					inline: false,
				},
				{
					name: "**`;pbio (player)`**",
					value: "Check a NBA player's basic info.",
					inline: false,
				},
				{
					name: "**`;plastgame (player)`**",
					value:
						"Check a player's last game. (Can't check players who didn't play their team's last game!)",
					inline: false,
				},
				{
					name: "**`;tstats (team) [OPTIONAL YEAR]`**",
					value: "Displays basic NBA team stats.",
					inline: false,
				},
				{
					name: "**`;standings [OPTIONAL YEAR]`**",
					value: "Displays current NBA standings.",
					inline: false,
				},
				{
					name: "**`;leaders [OPTIONAL YEAR]`**",
					value: "Displays league leaders.",
					inline: false,
				},
				{
					name: "**`;retire (player) [OPTIONAL YEAR]`**",
					value: "Guesses the chance of a player retiring.",
					inline: false,
				}
			);

		const music = new Discord.MessageEmbed()
			.setTitle("Music")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`;play (youtube URL or title)`**",
					value: "Play music. Add more songs to add to a queue.",
					inline: false,
				},
				{
					name: "**`;stop`**",
					value: "Bot stops all music and deletes the queue.",
					inline: false,
				},
				{
					name: "**`;skip`**",
					value:
						"Bot stops currently playing song and plays the next.",
					inline: false,
				}
			);

		const bot = new Discord.MessageEmbed()
			.setTitle("Bot")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`;echo`**",
					value: "Bot repeats what you say after `;echo`.",
					inline: false,
				},
				{
					name: "**`;leet`**",
					value:
						"Bot repeats what you say but turns it into leet text.",
					inline: false,
				},
				{
					name: "**`;gpt2 [sentence]`**",
					value:
						"Bot tries to finish your sentence. Processes under a minute.",
					inline: false,
				},
				{
					name: "**`;gpt2xl [sentence]`**",
					value:
						"Same function as ;gpt2 with bigger model. Can take up to 5-10 min.",
					inline: false,
				},
				{
					name: "**`;rate [name]`**",
					value: "Bot will rate you/someone from 0-10.",
					inline: false,
				},
				{
					name: "**`;ship [@user, @user]`**",
					value: "Combines two users for a ship.",
					inline: false,
				},
				{
					name: "**`;calc [math]`**",
					value: "Bot will solve math expressions.",
					inline: false,
				}
			);
		const search = new Discord.MessageEmbed()
			.setTitle("Search")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`;image (keyword)`**",
					value: "Get a random image based off keyword.",
					inline: false,
				},
				{
					name: "**`;gif (keyword)`**",
					value: "Get a gif.",
					inline: false,
				},
				{
					name: "**`;inspirobot`**",
					value: "Bot sends an inspirational image from inspirobot.",
					inline: false,
				},
				{
					name: "**`;define (word)`**",
					value:
						"Define a word using UrbanDictionary, potentially offensive.",
					inline: false,
				},
				{
					name: "**`;covid (OPTIONAL: country name)`**",
					value:
						"Get coronavirus stats for the world or specific countries.",
					inline: false,
				},
				{
					name: "**`;wiki (query)`**",
					value: "Search wikipedia.",
					inline: false,
				},
				{
					name: "**`;stackoverflow (query)`**",
					value: "Search for a question on StackOverflow.",
					inline: false,
				},
				{
					name: "**`;horoscope (sign)`**",
					value: "Get a daily horoscope for a sign.",
					inline: false,
				},
				{
					name: "**`;reddit Sub|Age|MaxComments`**",
					value: "Search for Reddit links. Args are optional.",
					inline: false,
				}
			);
		const games = new Discord.MessageEmbed()
			.setTitle("Games")
			.setColor("RANDOM")
			.addFields(
				{
					name: "**`;quiz (diff) (OPTIONAL: Category)`**",
					value:
						"Get asked an easy, medium, or hard question with optional category # (see ;categories).",
					inline: false,
				},
				{
					name: "**`;akinator`**",
					value: "Play with the akinator.",
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
			case "games":
				dm.send(games);
				break;
			case "all":
				dm.send(general);
				dm.send(nba);
				dm.send(music);
				dm.send(bot);
				dm.send(search);
				dm.send(games);
				break;
			default:
				dm.send("Couldn't find that category! (Check spelling?)");
			}
		}
	},
};
