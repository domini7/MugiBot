module.exports = {
	name: "version",
	description: "checks version",
	cooldown: 500,
	execute(client, message, args, Discord) {
		const newEmbed = new Discord.MessageEmbed().addFields(
			{ name: "Version", value: "0.6.1", inline: true },
			{ name: "Last updated", value: "Apr 19th, 2021", inline: true }
		);

		message.channel.send(newEmbed);
	},
};
