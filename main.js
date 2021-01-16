const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const rps = require("./responses/responses.js");

client.commands = new Discord.Collection();
const prefix = "m-";
// Anti-spam cooldown
const cooldown = new Set();
// User IDs of users who can't use the bot.
const blacklist = [""];
const spamChannels = ["bot-spam"];

const commandFiles = fs
	.readdirSync("./commands/")
	.filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once("ready", () => {
	console.log("MugiBot is now on.");
	console.log("Servers: " + client.guilds.cache.size);
	client.user.setActivity("m-help");
});

client.on("message", async (message) => {
	// Bot won't respond to itself or blacklisted users
	if (message.author.bot || blacklist.includes(message.author.id)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	const dm = message.channel instanceof Discord.DMChannel;
	const secs = new Date(message.createdTimestamp);
	const commandLogger = `Time: ${secs.getUTCSeconds()} | User: ${
		message.author.username
	},${message.author.id} | Command: ${command} ${args}`;

	// command handler checks for prefix then checks if command is valid
	// commands MUST execute with message and args as params
	if (message.content.toLowerCase().startsWith(prefix)) {
		if (client.commands.has(command)) {
			try {
				if (message.channel.name === "bot-spam" || dm) {
					client.commands
						.get(command)
						.execute(message, args, Discord);
					console.log(commandLogger);
				} else {
					if (cooldown.has(message.author.id)) {
						console.log(commandLogger);
						message.author.send(
							"Wait 45 seconds before entering another command in non-spam channels " +
								message.author.username +
								", (DM's and bot-spam excluded)"
						);
					} else {
						client.commands
							.get(command)
							.execute(message, args, Discord);
						console.log(commandLogger);

						// Gives user a cooldown to prevent spam
						if (message.author.id === "188530356394131456") return;
						cooldown.add(message.author.id);
						setTimeout(() => {
							// Removes the cooldown after 45 seconds
							cooldown.delete(message.author.id);
						}, 45000);
					}
				}
			} catch (error) {
				console.log('Error: ' + commandLogger);
				console.error(error);
				message.reply(
					"There was an error trying to execute that command!"
				);
			}
		} else {
			message.reply("that command doesnt exist");
		}
	}

	const wordLogger = `Time: ${secs.getUTCSeconds()} | User: ${
		message.author.username
	},${message.author.id}, ${message.content}`;
	// good/bad bot
	if (message.content.toLowerCase() === "good bot") {
		client.commands.get("gBot").execute(message);
		message.react("😇");
		console.log(wordLogger);
	} else if (message.content.toLowerCase() === "bad bot") {
		client.commands.get("bBot").execute(message);
		console.log(wordLogger);
	}
	// this crap is for a specific nfl channel
	if (
		message.channel.name === "football-gm-discussion" &&
		message.content.toLowerCase().includes("nfl roster") ||
		message.content.toLowerCase().includes("nfl file") ||
		message.content.toLowerCase().includes("nfl league")
	) {
		message.channel.send(
			"<https://www.dropbox.com/s/e31zctcm4bj3fpx/FBGM2020preseason.json?dl=0>"
		);
		console.log(wordLogger);
	}

	// reactions
	if (rps.reactObject[message.content.toLowerCase()]) {
		message.react(rps.reactObject[message.content.toLowerCase()]);
	}
});
// login removed pre-commit (PAST TOKENS IN OLDER COMMITS ARE INVALID)
client.login("");
