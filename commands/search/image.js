const Scraper = require("images-scraper");

const google = new Scraper({
	puppeteer: {
		headless: true,
	},
});

module.exports = {
	name: "image",
	description: "search and send random image",
	cooldown: 120,
	async execute(client, message, args) {
		let image_query = 'random image';

		if (args.length){
			image_query = args.join(" ")
		}

		const image_results = await google.scrape(image_query, 65);
		message.channel.send(
			image_results[Math.floor(Math.random() * image_results.length)].url
		);
	},
};
