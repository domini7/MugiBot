module.exports = {
	name: "version",
	description: "checks version",
	cooldown: 500,
	execute(client, message, args, Discord) {
		const newEmbed = new Discord.MessageEmbed()
		.addFields(
			{name: "Version", value: "0.39", inline: true},
			{name: "Last updated", value: "Jan 30th, 2021", inline: true}
		)

		message.channel.send(newEmbed);
	},
};
