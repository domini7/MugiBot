const request = require("node-superfetch");

module.exports = {
	name: "reddit",
	description: "Get filtered r/all links",
	cooldown: 50,
	async execute(client, message, args) {
		// Sub to search?
		const subreddit = args[0] ?? "all";

		// How old can the posts be in hours
		const maxAgeInHours = args[1] ?? 4;

		// Max # of comments on a post
		const maxComments = args[2] ?? 120;

		// Min # of comments on a post
		const minComments = 15;

		// Minimum upvotes for a post
		const minUpvotes = args[3] ?? 2000;

		try {
			// Gets the best 100 post on r/all, can't search for more sadly.
			const { body } = await request.get(
				`https://www.reddit.com/r/${subreddit}.json?limit=100`
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

			if (!filteredData.length)
				return message.reply("Couldn't find any links!");

			for (let i = 0; i < filteredData.length; i++) {
				// Send a link every 0.9 seconds to avoid spam blocks.
				setTimeout(() => {
					message.channel.send(
						`<https://reddit.com${filteredData[i].data.permalink}>`
					);
				}, 900);
			}
		} catch (error) {
			message.reply(`Error: ${error.message}`);
			console.error(error);
		}
	},
};
