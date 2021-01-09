module.exports = {
	name: "version",
	description: "checks version",
	execute(message, args, Discord) {
		const newEmbed = new Discord.MessageEmbed()
		.addFields(
			{name: "Version", value: "0.21", inline: true},
			{name: "Last updated", value: "Jan 9th, 2021", inline: true}
		)

		message.channel.send(newEmbed);
	},
};
