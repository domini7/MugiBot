module.exports = (Discord, client) => {
	console.log("MugiBot is now on.");
	console.log("Servers: " + client.guilds.cache.size);
	client.user.setActivity("m-help");
}