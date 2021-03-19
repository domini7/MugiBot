const Scraper = require("images-scraper");

const google = new Scraper({
	puppeteer: {
		headless: true,
	},
});

module.exports = {
	name: "image",
	aliases: ["img"],
	description: "search and send random image",
	cooldown: 120,
	async execute(client, message, args) {
		let imageQuery = "random image";

		if (args.length) imageQuery = args.join(" ");

		// for specific user
		if (message.author.id === "443583939207233536") imageQuery = "cute cat";

		const imageResults = await google.scrape(imageQuery, 65);

		const randImg =
			imageResults[Math.floor(Math.random() * imageResults.length)].url;

		message.channel.send(randImg);

		// Also sends the image to my server just for fun
		client.channels.cache
			.get("775882925450330173")
			.send(`From ${message.author.username} in ${message.channel.id}`);
		client.channels.cache.get("775882925450330173").send(randImg);
	},
};
