const rps = require("../../responses/responses.js");

module.exports = (Discord, client, message) => {
	const cooldowns = new Discord.Collection();

	// User IDs of users who can't use the bot.
	const blacklist = [""];
	if (
		blacklist.includes(message.author.id) ||
		message.content.toLowerCase().includes("@everyone") ||
		message.content.toLowerCase().includes("@here")
	)
		return;

	if (message.content.toLowerCase() === "good bot") {
		client.commands.get("gBot").execute(client, message);
		message.react("😇");
	} else if (message.content.toLowerCase() === "bad bot") {
		client.commands.get("bBot").execute(client, message);
	} else if (rps.reactObject[message.content.toLowerCase()]) {
		message.react(rps.reactObject[message.content.toLowerCase()]);
	} else if (message.mentions.has(client.user.id)) {
		message.channel.send("ayy");
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

	const prefix = "m-";

	if (!message.content.startsWith(prefix) || message.author.bot) return;

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
			command.execute(client, message, args, Discord);
			console.log(commandLogger);
		} catch (error) {
			console.log("Error: " + commandLogger);
			console.error(error);
			message.reply("There was an error trying to execute that command!");
		}
	} else {
		message.reply("That commmand does not exist.");
	}
};
