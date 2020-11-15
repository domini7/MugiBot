module.exports = {
	name: "basic",
	description: "basic",
	execute(message, args, Discord) {
		const newEmbed = new Discord.MessageEmbed()
		.setColor("#304281")
		.setTitle("Rules")
		.setDescription("This is an embed for the server rules")
		.addFields(
			{name: "PTS", value: "21.8", inline: true},
			{name: "TRB", value: "3.2", inline: true},
			{name: "AST", value: "3.1", inline: true},
		)

		message.channel.send(newEmbed);
	},
};
