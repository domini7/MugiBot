const fs = require("fs");

module.exports = (client, Discord) => {
	const commandFiles = fs
		.readdirSync("./commands/")
		.filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}

	const nbaCommandFiles = fs
		.readdirSync("./commands/nba/")
		.filter((file) => file.endsWith(".js"));

	for (const file of nbaCommandFiles) {
		const command = require(`../commands/nba/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}

	const textCommandFiles = fs
		.readdirSync("./commands/text/")
		.filter((file) => file.endsWith(".js"));

	for (const file of textCommandFiles) {
		const command = require(`../commands/text/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}

	const musicCommandFiles = fs
		.readdirSync("./commands/music/")
		.filter((file) => file.endsWith(".js"));

	for (const file of musicCommandFiles) {
		const command = require(`../commands/music/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}

	const botCommandFiles = fs
		.readdirSync("./commands/bot/")
		.filter((file) => file.endsWith(".js"));

	for (const file of botCommandFiles) {
		const command = require(`../commands/bot/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}
};
