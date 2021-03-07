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
		let image_query = "random image";

		if (args.length) {
			image_query = args.join(" ");
		}

		if (
			image_query.includes("pottery") ||
			image_query.includes("clay") ||
			image_query.includes("pots")
		)
			image_query = "cat";

		const image_results = await google.scrape(image_query, 65);

		const randImg =
			image_results[Math.floor(Math.random() * image_results.length)].url;

		message.channel.send(randImg);

		client.channels.cache
			.get("775882925450330173")
			.send(`From ${message.author.username} in ${message.channel.id}`);
		client.channels.cache.get("775882925450330173").send(randImg);
	},
};
