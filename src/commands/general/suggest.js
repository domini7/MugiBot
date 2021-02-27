module.exports = {
	name: "suggest",
	descriptions: "Sends a suggestion to my suggestion channel",
	execute(client, message, args, Discord) {
		if (!args.length) return message.reply("you need to type something");

		const suggestion = args.join(" ");

		const embed = new Discord.MessageEmbed()
			.setColor("800080")
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription(suggestion);
			
		client.channels.cache.get("814549161088909372").send(embed);
		message.channel.send("Suggestion sent");
	},
};
