const giphyRandom = require("giphy-random");

module.exports = {
	name: "gif",
	description: "search and send random gif on giphy",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		let gifQuery = "gif";
		if (args.length) gifQuery = args.join(" ");

		const { data } = await giphyRandom(process.env.GIPHY, {
			rating: "r",
			tag: gifQuery,
		});

		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setAuthor(
				"Powered by GIPHY",
				"https://alightedlamp.github.io/GifTastic/img/logo.png",
				"https://giphy.com/"
			)
			.setImage(data.image_url);

		message.channel.send(embed);

		// Also sends the gif to my server just for fun
		client.channels.cache
			.get("775882925450330173")
			.send(`From ${message.author.username} in ${message.channel.id}`);
		client.channels.cache.get("775882925450330173").send(embed);
	},
};
