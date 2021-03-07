const fs = require("fs");

module.exports = (client) => {
	const generalCommandFiles = fs
		.readdirSync("./src/commands/general/")
		.filter((file) => file.endsWith(".js"));

	for (const file of generalCommandFiles) {
		const command = require(`../commands/general/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}

	const nbaCommandFiles = fs
		.readdirSync("./src/commands/nba/")
		.filter((file) => file.endsWith(".js"));

	for (const file of nbaCommandFiles) {
		const command = require(`../commands/nba/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}

	const musicCommandFiles = fs
		.readdirSync("./src/commands/music/")
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
		.readdirSync("./src/commands/bot/")
		.filter((file) => file.endsWith(".js"));

	for (const file of botCommandFiles) {
		const command = require(`../commands/bot/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}

	const searchCommandFiles = fs
		.readdirSync("./src/commands/search/")
		.filter((file) => file.endsWith(".js"));

	for (const file of searchCommandFiles) {
		const command = require(`../commands/search/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}

	const gamesCommandFiles = fs
		.readdirSync("./src/commands/games/")
		.filter((file) => file.endsWith(".js"));

	for (const file of gamesCommandFiles) {
		const command = require(`../commands/games/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}
};
