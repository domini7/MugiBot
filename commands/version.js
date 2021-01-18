module.exports = {
	name: "version",
	description: "checks version",
	cooldown: 500,
	execute(client, message, args, Discord) {
		const newEmbed = new Discord.MessageEmbed()
		.addFields(
			{name: "Version", value: "0.27", inline: true},
			{name: "Last updated", value: "Jan 17th, 2021", inline: true}
		)

		message.channel.send(newEmbed);
	},
};
