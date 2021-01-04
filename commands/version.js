module.exports = {
	name: "version",
	description: "checks version",
	execute(message, Discord) {
		const newEmbed = new Discord.MessageEmbed()
		.addFields(
			{name: "Version", value: "0.12", inline: true},
			{name: "Last updated", value: "Jan 3rd, 2021", inline: true}
		)

		message.channel.send(newEmbed);
	},
};
