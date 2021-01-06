const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const rps = require("./responses/responses.js");

client.commands = new Discord.Collection();
const prefix = "m-";

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
	if (message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	const dm = message.channel instanceof Discord.DMChannel;

	// command handler checks for prefix then checks if command is valid
	// commands MUST execute with message and args as params
	if (message.content.toLowerCase().startsWith(prefix)) {
		if (client.commands.has(command)) {
			try {
				client.commands.get(command).execute(message, args, Discord);

				// Logs commands called to console. Needed incase of spam
				if (dm) {
					console.log(
						`User: ${message.author.username} | Server: DMs | Command: ${command} ${args}`
					);
				} else {
					console.log(
						`User: ${message.author.username} | Server: ${message.guild.name} | Command: ${command} ${args}`
					);
				}
			} catch (error) {
				if (dm) {
					console.log(
						`ERROR: User: ${message.author.username} | Server: DMs | Command: ${command} ${args}`
					);
				} else {
					console.log(
						`ERROR: User: ${message.author.username} | Server: ${message.guild.name} | Command: ${command} ${args}`
					);
				}
				console.error(error);
				message.reply(
					"There was an error trying to execute that command!"
				);
			}
		} else {
			message.reply("that command doesnt exist");
		}
	}

	// good/bad bot
	if (message.content.toLowerCase().includes("good bot")) {
		client.commands.get("gBot").execute(message, args);
		message.react("😇");
	} else if (message.content.toLowerCase().includes("bad bot")) {
		client.commands.get("bBot").execute(message);
	} else if (message.content.toLowerCase().includes("fuck you bot")) {
		client.commands.get("bBot").execute(message);
	}

	// reactions
	if (rps.reactObject[message.content.toLowerCase()]) {
		message.react(rps.reactObject[message.content.toLowerCase()]);
	}
});
// login removed pre-commit (PAST TOKENS IN OLDER COMMITS ARE INVALID)
client.login("");
