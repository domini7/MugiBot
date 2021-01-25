const rps = require("../../responses/responses.js");
const cooldowns = new Set();
var colors = require("colors");

module.exports = (Discord, client, message) => {
	const blackList = [];
	
	const responseBlackList = [
		"773612970767941654",
		"771834997618376719",
		"725151960449417246",
	];

	if (
		blackList.includes(message.author.id) ||
		message.content.toLowerCase().includes("@everyone") ||
		message.content.toLowerCase().includes("@here") ||
		message.author.bot
	)
		return;

	if (!responseBlackList.includes(message.author.id)) {
		if (message.content.toLowerCase() === "good bot") {
			client.commands.get("gBot").execute(client, message);
			message.react("😇");
		} else if (message.content.toLowerCase() === "bad bot") {
			client.commands.get("bBot").execute(client, message);
		} else if (rps.reactObject[message.content.toLowerCase()]) {
			message.react(rps.reactObject[message.content.toLowerCase()]);
		} else if (message.mentions.has(client.user.id)) {
			message.react("👋");
		} // this crap is for a specific discord server
		else if (
			(message.channel.name === "football-gm-discussion" &&
				message.content.toLowerCase().includes("nfl roster")) ||
			(message.channel.name === "football-gm-discussion" &&
				message.content.toLowerCase().includes("nfl file"))
		) {
			message.channel.send(
				"<https://www.dropbox.com/s/e31zctcm4bj3fpx/FBGM2020preseason.json?dl=0>"
			);
		}
	}

	const prefix = "m-";

	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);

	const cmd = args.shift().toLowerCase();

	const dm = message.channel instanceof Discord.DMChannel;

	const secs = new Date(message.createdTimestamp);

	const commandLogger = `Time: ${secs.getUTCSeconds()} | User: ${
		message.author.username
	},${message.author.id} | Command: ${cmd} ${args}`;

	const command = client.commands.get(cmd);

	if (command) {
		try {
			if (message.channel.name === "bot-spam" || dm) {
				command.execute(client, message, args, Discord);
				console.log(commandLogger.green);
				return;
			}

			if (cooldowns.has(message.author.id)) {
				message.author.send(
					"Cooldown, wait 50 seconds. (#bot-spam or DM's excluded)"
				);
				console.log(commandLogger.green);
				return;
			}
			command.execute(client, message, args, Discord);
			console.log(commandLogger.green);

			if (message.author.id === "188530356394131456") return;
			cooldowns.add(message.author.id);
			setTimeout(() => {
				cooldowns.delete(message.author.id);
			}, 50000);
		} catch (error) {
			console.log("Error: " + commandLogger.green);
			console.error(error);
			message.reply("There was an error trying to execute that command!");
		}
	} else {
		message.reply("That commmand does not exist.");
	}
};
