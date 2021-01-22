var colors = require('colors/safe');

module.exports = (Discord, client) => {
	console.log(colors.red("MugiBot is now on."));
	console.log(colors.yellow("Servers: " + client.guilds.cache.size));
	client.user.setActivity("m-help");
}