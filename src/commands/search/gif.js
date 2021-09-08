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

		message.channel.send(data.image_url);

		// Also sends the gif to my server just for fun
		client.channels.cache
			.get("814549161088909372")
			.send(`From ${message.author.username} in ${message.channel.id}`);
		client.channels.cache.get("814549161088909372").send(data.image_url);
	},
};
