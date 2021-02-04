const wiki = require("wikipedia");
const topic = require("../../assets/json/wiki")

module.exports = {
	name: "wiki",
	description: "Search wikipedia",
	cooldown: 50,
	async execute(client, message, args, Discord) {
		let search = topic[Math.floor(Math.random() * topic.length)]

		if (args.length) {
			search = args.join(" ");
		}

		try {
			const summary = await wiki.summary(search);

			const embed = new Discord.MessageEmbed()
				.setColor("RANDOM")
				.setTitle(summary.title)
				.setURL(`${summary.content_urls.desktop.page}`)
				.setAuthor(
					"Wikipedia",
					"https://i.imgur.com/Z7NJBK2.png",
					"https://www.wikipedia.org/"
				)
				.setDescription(summary.description)
				.setFooter(summary.extract);

			message.channel.send(embed);
		} catch (error) {
			message.reply("Error searching for that!");
		}
	},
};
