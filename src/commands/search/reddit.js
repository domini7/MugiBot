const request = require("node-superfetch");
const slurs = require("../../../assets/json/blacklistphrases");

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = {
	name: "reddit",
	aliases: ["reddit", "comment", "post", "check"],
	description: "Get filtered r/all links",
	cooldown: 50,
	async execute(client, message, args, Discord, cmd) {
		if (cmd === "reddit") {
			// Sub to search?
			const subreddit = args[0] ?? "all";

			// How old can the posts be in hours
			const maxAgeInHours = args[1] ?? 4.3;

			// Max # of comments on a post
			const maxComments = args[2] ?? 100;

			// Top comment has to be getting this many upvotes per min to qualify
			const minUpvotesPerMin = args[3] ?? 1;

			// How many pages to go through
			let iterateCount = args[4] ?? 8;

			// Reducing search count to prevent a weird issue with older post
			let searchCount = 100;
			if (subreddit != "all") {
				searchCount = 28;
				iterateCount = 1;
			}

			try {
				// This is used so the request can page through r/all and get more posts
				let lastLink = "";

				// Filtered links sent here
				let potentialPost = [];

				const seconds = Date.now() / 1000;
				for (let i = 0; i < iterateCount; i++) {
					const { body } = await request
						.get(`https://www.reddit.com/r/${subreddit}.json`)
						.query({
							limit: searchCount,
							after: lastLink,
						});

					const info = body.data.children;

					lastLink = info[info.length - 1].data.name;

					const filteredData = info.filter(function (item) {
						return (
							item.data.num_comments <= maxComments &&
							item.data.created_utc >=
								seconds - maxAgeInHours * 3600 &&
							item.data.locked === false &&
							item.data.contest_mode === false &&
							(item.data.suggested_sort === "confidence" ||
								item.data.suggested_sort === "top" ||
								item.data.suggested_sort === null)
						);
					});
					for (let i = 0; i < filteredData.length; i++) {
						potentialPost.push(
							`https://reddit.com${filteredData[i].data.permalink}`
						);
					}
				}

				message.channel.send(
					`**${potentialPost.length}** potential links found out of ${
						iterateCount * 100
					}`
				);

				let qualifiedPost = [];
				// This loop will be checking the top comment for qualifications.
				for (const post of potentialPost) {
					try {
						const { body } = await request.get(`${post}.json`);

						const checkForDistinguished =
							body[1].data.children[0].data.distinguished;

						// If the top comment is a mod comment, just check the next comment.
						let index = 0;
						if (checkForDistinguished === "moderator") index += 1;

						const comments = body[1].data.children[index].data;

						// If the comment isn't doing better than minUpvotesPerMin, continue.
						const commentAge =
							(seconds - comments.created_utc) / 60;
						if (comments.ups / commentAge < minUpvotesPerMin) {
							continue;
						}

						// Check a reply's upvotes for 50% of minUpvotesPerMin
						const checkForReplies = comments.replies;
						if (checkForReplies != "") {
							const replyComment =
								checkForReplies.data.children[0].data;

							const replyCommentAge =
								(seconds - replyComment.created_utc) / 60;

							if (
								replyComment.ups / replyCommentAge <
									minUpvotesPerMin * 0.5 ||
								// Ignore comments with hidden score
								replyComment.score_hidden
							) {
								continue;
							}
						}

						// Checks the comment or the first reply for replies, if there are none, push the link.
						if (
							checkForReplies === "" ||
							checkForReplies.data.children[0].data.replies === ""
						) {
							qualifiedPost.push(post);
						}
					} catch (error) {
						continue;
					}
				}

				if (!qualifiedPost.length)
					return message.reply("Couldn't find any links!");

				// Send the links every 1.25 to avoid spam protection.
				for (const post of qualifiedPost) {
					message.channel.send(`<${post}>`);
					await timer(1325);
				}
			} catch (error) {
				message.reply(`Error: ${error.message}`);
				console.error(error);
			}
		} else if (cmd === "comment" || cmd === "post") {
			try {
				const query = args.join(" ");

				let submissionType = cmd === "post" ? "submission" : "comment";

				const { body } = await request
					.get(
						`https://api.pushshift.io/reddit/search/${submissionType}/`
					)
					.query({
						// Wrap in quotes for exact phrase searching
						q: `"${query}"`,
						size: 10,
						after: "72h",
					});

				if (!body.data.length) {
					return message.reply("no results found");
				}

				for (const data of body.data) {
					message.channel.send(
						`<https://reddit.com${data.permalink}>`
					);
					await timer(1350);

					if (submissionType === "comment") {
						const embed = new Discord.MessageEmbed()
							.setColor("RANDOM")
							.setTitle(`u/${data.author}`)
							.setFooter(`${data.body}`);

						message.channel.send(embed);
					} else {
						const embed = new Discord.MessageEmbed()
							.setColor("RANDOM")
							.setTitle(`u/${data.author} - ${data.title}`)
							.setFooter(`${data.selftext}`);

						message.channel.send(embed);
					}
					await timer(1350);
				}
			} catch (error) {
				message.reply(`Error: ${error.message}`);
				console.error(error);
			}
		} else if (cmd === "check") {
			const searchedUser = args[0];

			const phrases = slurs.join("|");

			let checkForResults = 0;
			for (const postType of ["submission", "comment"]) {
				const { body } = await request
					.get(`https://api.pushshift.io/reddit/search/${postType}/`)
					.query({
						author: searchedUser,
						q: `${phrases}`,
					});

				// If nothing found, add to the var
				if (!body.data.length) {
					checkForResults++;
				}
				for (const data of body.data) {
					if (!data.permalink) {
						continue;
					}

					message.channel.send(
						`<https://reddit.com${data.permalink}>`
					);
					await timer(1350);

					if (postType === "comment") {
						const embed = new Discord.MessageEmbed()
							.setColor("RANDOM")
							.setFooter(`${data.body}`);

						message.channel.send(embed);
					} else {
						const embed = new Discord.MessageEmbed()
							.setColor("RANDOM")
							.setTitle(`${data.title}`)
							.setFooter(`${data.selftext}`);

						message.channel.send(embed);
					}
					await timer(1350);
				}
			}

			if (checkForResults === 2) {
				message.reply("no results found");
			}
		}
	},
};
