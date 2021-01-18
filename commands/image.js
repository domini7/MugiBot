const cheerio = require("cheerio");
const request = require("request");

module.exports = {
	name: "image",
	description: "search and send random immage",
	cooldown: 120,
	execute(client, message, args) {
		if (!args.length)
			return message.reply("Please add a keyword. Example: `m-image dogs`");

		const image2 = args.join(" ");
		const options = {
			url: "http://results.dogpile.com/serp?qc=images&q=" + image2,
			method: "GET",
			headers: {
				Accept: "text/html",
				"User-Agent": "Chrome",
			},
		};

		request(options, function (error, response, responseBody) {
			if (error) {
				return;
			}

			$ = cheerio.load(responseBody);
			const links = $(".image a.link");
			const urls = new Array(links.length)
				.fill(0)
				.map((v, i) => links.eq(i).attr("href"));

			if (!urls.length) {
				return;
			}
			// sends result
			message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
		});
	},
};
