const NBA = require("nba");

module.exports = {
	name: "updatenba",
	description: "Update NBA playerbase",
	async execute(message, args, Discord) {
		if (message.author.id != "188530356394131456")
				return message.channel.send("You don't have permission for this command.")
		
		await NBA.updatePlayers();
		message.channel.send('Players updated')
	}
};
