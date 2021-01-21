var Scraper = require("images-scraper");

const google = new Scraper({
	puppeteer: {
		headless: true,
	},
});

module.exports = {
	name: "image",
	description: "search and send random immage",
	cooldown: 120,
	async execute(client, message, args) {
		if (!args.length)
			return message.reply(
				"Please add a keyword. Example: `m-image dogs`"
			);

		const image_query = args.join(" ");

		const image_results = await google.scrape(image_query, 50);
		message.channel.send(
			image_results[Math.floor(Math.random() * image_results.length)].url
		);
	},
};
