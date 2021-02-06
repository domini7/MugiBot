const rps = require("../../responses/responses.js");
const fs = require("fs");
const trk = require("../../assets/json/bbgm-users");
var colors = require("colors");

const cooldowns = new Set();

module.exports = (Discord, client, message) => {
	const dm = message.channel instanceof Discord.DMChannel;

	// Tracks messages sent by users in a specific server
	if (!dm) {
		const otherBots = ["Dyno", "Poni"];
		if (
			message.guild.id === "290013534023057409" &&
			!otherBots.includes(message.author.username)
		) {
			let player = message.author.username;
			let bbgm = trk["bbgmDiscord"];

			if (!bbgm[player]) bbgm[player] = { msg: 0 };

			if (rps.reactObject[message.content.toLowerCase()]) {
				bbgm[player].msg -= 15;
			} else {
				bbgm[player].msg++;
			}

			fs.writeFile(
				"../MugiBot/assets/json/bbgm-users.json",
				JSON.stringify(trk),
				(error) => {
					if (error) console.log(error);
				}
			);
		}
	}

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
				"<https://dl.dropbox.com/s/e31zctcm4bj3fpx/FBGM2020preseason.json?dl=0>"
			);
		}
	}

	const prefix = "m-";

	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);

	const cmd = args.shift().toLowerCase();

	const secs = new Date(message.createdTimestamp);

	const commandLogger = `Time: ${secs.getUTCSeconds()} | User: ${
		message.author.username
	},${message.author.id} | Command: ${cmd} ${args}`;

	const command =
		client.commands.get(cmd) ||
		client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

	if (command) {
		try {
			if (cooldowns.has(message.author.id)) {
				message.author.send(
					"Cooldowns enabled in that server, wait 50 seconds. (#bot-spam excluded)"
				);
				console.log(commandLogger.green);
				return;
			}

			command.execute(client, message, args, Discord);
			console.log(commandLogger.green);

			if (message.author.id === "188530356394131456") return;

			if (
				message.channel.name != "bot-spam" &&
				message.guild.id === "290013534023057409"
			) {
				cooldowns.add(message.author.id);
				setTimeout(() => {
					cooldowns.delete(message.author.id);
				}, 50000);
			}
		} catch (error) {
			console.log("Error: " + commandLogger.green);
			console.error(error);
			message.reply("There was an error trying to execute that command!");
		}
	} else {
		message.reply("That commmand does not exist.");
	}
};
