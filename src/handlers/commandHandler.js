const fs = require("fs");

module.exports = (client) => {
	// Looping through every folder and file in ./commands
	for (const commandFiles of [
		"bot",
		"games",
		"general",
		"music",
		"nba",
		"search",
	]) {
		const generalCommandFiles = fs
			.readdirSync(`./src/commands/${commandFiles}/`)
			.filter((file) => file.endsWith(".js"));

		for (const file of generalCommandFiles) {
			const command = require(`../commands/${commandFiles}/${file}`);
			if (command.name) {
				client.commands.set(command.name, command);
			} else {
				continue;
			}
		}
	}
};
