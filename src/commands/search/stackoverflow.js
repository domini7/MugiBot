const dayjs = require("dayjs");
const request = require("node-superfetch");
const { decode: decodeHTML } = require("html-entities");
const { formatNumber } = require("../../util/Utils.js");

module.exports = {
	name: "stackoverflow",
	aliases: ["so", "stack"],
	description: "Search a question on stackoverflow",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		if (message.author.id === "814893991874002984" || message.author.id === "443583939207233536") return;
		const query = args.join(" ");
		try {
			const { body } = await request
				.get("http://api.stackexchange.com/2.2/search/advanced")
				.query({
					page: 1,
					pagesize: 1,
					order: "asc",
					sort: "relevance",
					answers: 1,
					q: query,
					site: "stackoverflow",
					key: process.env.STACKOVERFLOW,
				});

			if (!body.items.length)
				return message.reply("Could not find any results.");

			const data = body.items[0];
			const tags = data.tags.join(", ");

			const embed = new Discord.MessageEmbed()
				.setColor("#f48023")
				.setAuthor(
					"Stack Overflow",
					"https://i.imgur.com/P2jAgE3.png",
					"https://stackoverflow.com/"
				)
				.setURL(data.link)
				.setTitle(decodeHTML(data.title))
				.addFields(
					{
						name: "Asker",
						value: data.owner.display_name,
						inline: true
					},
					{
						name: "Views",
						value: formatNumber(data.view_count),
						inline: true
					},
					{
						name: "Score",
						value: formatNumber(data.score),
						inline: true
					},
					{
						name: "Date Created",
						value: dayjs.unix(data.creation_date),
						inline: true
					}
				).setFooter(`Tags: ${tags}`);
			message.channel.send(embed);
		} catch (error) {
			console.error(error);
			return message.reply(`Error: \`${error.message}\``);
		}
	},
};
