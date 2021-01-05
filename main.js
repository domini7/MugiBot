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


	if (message.content.toLowerCase().startsWith(prefix)) {
		if (client.commands.has(command)) {
			try {
				client.commands.get(command).execute(message, args, Discord);
			} catch (error) {
				console.error(error);
				message.reply(
					"There was an error trying to execute that command!"
				);
			}
		} else { message.reply("that command doesnt exist")}
	}

	// good/bad bot
	if (message.content.toLowerCase().includes("good bot")) {
		client.commands.get("gBot").execute(message);
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

client.login("Nzc2NjgxNzM4NjU0NTgwNzQ2.X64bPA.hx4qAGzAs1FcDyj1lfryf0U2-5w");