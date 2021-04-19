const request = require("node-superfetch");

module.exports = {
	name: "reddit",
	description: "Get filtered r/all links",
	cooldown: 50,
	async execute(client, message, args) {
		// How old can the posts be in hours
		let maxAgeInHours = args[0] ? args[0] : 4;

		// Max # of comments on a post
		let maxComments = args[1] ? args[1] : 120;

		// Min # of comments on a post
		let minComments = 10;

		// Minimum upvotes for a post
		let minUpvotes = args[2] ? args[2] : 1000;

		let links = [];

		try {
			// Gets the best 100 post on r/all, can't search for more sadly.
			const { body } = await request.get(
				"https://www.reddit.com/r/all.json?limit=100"
			);

			const info = body.data.children;

			const filteredData = info.filter(function (item) {
				return (
					item.data.num_comments <= maxComments &&
					item.data.num_comments >= minComments &&
					item.data.created_utc >=
						Date.now() / 1000 - maxAgeInHours * 3600 &&
					item.data.ups >= minUpvotes &&
					item.data.locked === false
				);
			});

			for (let i = 0; i < filteredData.length; i++) {
				links.push(
					`<https://reddit.com${filteredData[i].data.permalink}>`
				);
			}
			message.channel.send(links);
		} catch (error) {
			message.reply(`Error: ${error.message}`);
			console.error(error);
		}
	},
};
