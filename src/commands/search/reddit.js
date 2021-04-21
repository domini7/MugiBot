const request = require("node-superfetch");

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = {
	name: "reddit",
	description: "Get filtered r/all links",
	cooldown: 50,
	async execute(client, message, args) {
		// Sub to search?
		const subreddit = args[0] ?? "all";

		// How old can the posts be in hours
		const maxAgeInHours = args[1] ?? 6;

		// Max # of comments on a post
		const maxComments = args[2] ?? 120;

		// Top comment has to be getting this many upvotes per min to qualify
		const minUpvotesPerMin = args[3] ?? 0.82;

		const seconds = Date.now() / 1000;

		try {
			// Gets the best 100 post on r/all, can't search for more sadly.
			const { body } = await request.get(
				`https://www.reddit.com/r/${subreddit}.json?limit=100`
			);

			const info = body.data.children;

			// Weed out any post that don't pass given filters.
			const filteredData = info.filter(function (item) {
				return (
					item.data.num_comments <= maxComments &&
					item.data.created_utc >= seconds - maxAgeInHours * 3600 &&
					item.data.locked === false
				);
			});

			if (!filteredData.length)
				return message.reply("Couldn't find any links!");

			let potentialPost = [];
			for (let i = 0; i < filteredData.length; i++) {
				potentialPost.push(
					`https://reddit.com${filteredData[i].data.permalink}`
				);
			}

			let qualifiedPost = [];
			// This loop will be checking the top comment for qualifications.
			for (const post of potentialPost) {
				const { body } = await request.get(`${post}.json`);

				const checkForDistinguished =
					body[1].data.children[0].data.distinguished;

				// If the top comment is a mod comment, just check the next comment.
				let index = 0;
				if (checkForDistinguished === "moderator") index += 1;

				const comments = body[1].data.children[index].data;

				// If the comment isn't getting 0.8 upvotes a minute, continue.
				const commentAge = (seconds - comments.created_utc) / 60;
				if (comments.ups / commentAge < minUpvotesPerMin) {
					continue;
				}

				const checkForReplies = comments.replies;
				// Checks the comment or the first reply for replies, if there are none, push the link.
				if (
					checkForReplies === "" ||
					checkForReplies.data.children[0].data.replies === ""
				) {
					qualifiedPost.push(post);
				}
			}

			if (!qualifiedPost.length)
				return message.reply("Couldn't find any links!");

			// Send the links every 1.25 to avoid spam protection.
			for (const post of qualifiedPost) {
				message.channel.send(`<${post}>`);
				await timer(1250);
			}
		} catch (error) {
			message.reply(`Error: ${error.message}`);
			console.error(error);
		}
	},
};
