const request = require("node-superfetch");
const { stripIndents } = require("common-tags");
const { shuffle, formatNumber, toTitleCase } = require("../../util/Utils.js");
// for specific code block
const bbgmDiscord = require("../../../assets/json/bbgm");
const fs = require("fs");

module.exports = {
	name: "quiz",
	aliases: ["categories"],
	descriptions: "Sends a question with answer choices",
	async execute(client, message, args, Discord, cmd) {
		if (cmd === "quiz") {
			const difficulties = ["easy", "medium", "hard"];
			const choices = ["A", "B", "C", "D"];

			if (!args.length)
				return message.reply(
					"choose a difficulty! `;quiz <easy | medium | hard>`"
				);

			const choice = args[0].toLowerCase();

			if (!difficulties.includes(choice))
				return message.reply(
					"difficulty choice should be easy, medium, or hard"
				);

			let categ = 0;

			if (!isNaN(args[1])) {
				if (args[1] < 9 || args[1] > 32)
					return message.reply(
						"invalid category, see list of category #'s with `;categories`"
					);
				categ = args[1];
			}

			try {
				const { body } = await request
					.get("https://opentdb.com/api.php")
					.query({
						amount: 1,
						category: categ,
						type: "multiple",
						encode: "url3986",
						choice,
					});

				if (!body.results)
					return message.reply(
						"question could not be fetched, try again later."
					);

				const answers = body.results[0].incorrect_answers.map(
					(answer) => decodeURIComponent(answer.toLowerCase())
				);
				const correct = decodeURIComponent(
					body.results[0].correct_answer.toLowerCase()
				);

				answers.push(correct);
				const shuffled = shuffle(answers);

				await message.reply(stripIndents`
				**you have 15 seconds. The category is _${decodeURIComponent(
		body.results[0].category
	)}_.**
				${decodeURIComponent(body.results[0].question)}
				${shuffled
		.map(
			(answer, i) =>
				`**${choices[i]}.** ${toTitleCase(answer)}`
		)
		.join("\n")}
			`);

				const filter = (res) =>
					res.author.id === message.author.id &&
					choices.includes(res.content.toUpperCase());

				const messages = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 15000,
				});

				if (!messages.size)
					return message.reply(
						`Time's up. It was ${toTitleCase(correct)}.`
					);

				const win =
					shuffled[
						choices.indexOf(messages.first().content.toUpperCase())
					] === correct;

				if (win) {
					message.reply("correct!");
				} else {
					message.reply(`Nope, it's ${toTitleCase(correct)}.`);
				}

				// All this code til the catch is for a specific points system in a server. Feel free to remove this and the require.
				if (message.channel.id === "788821945214435340") {
					const player = message.author.username;
					const bbgm = bbgmDiscord["bbgmDiscord"];
					if (!bbgm[player]) bbgm[player] = 0;

					let score = 5;

					if (choice === "medium") score = 10;
					if (choice === "hard") score = 15;

					if (win) {
						bbgm[player] += +score;
						message.channel.send(
							`You earn ${score} points, current total: ${formatNumber(
								bbgm[player]
							)}`
						);
					} else {
						bbgm[player] -= score;
						message.channel.send(
							`You lose ${score} points, current total: ${formatNumber(
								bbgm[player]
							)}`
						);
					}
					fs.writeFile(
						"../MugiBot/assets/json/bbgm.json",
						JSON.stringify(bbgmDiscord),
						(error) => {
							if (error) console.log(error);
						}
					);
				}
			} catch (error) {
				return message.reply(`Error: \`${error.message}\``);
			}
		}

		if (cmd === "categories") {
			const embed = new Discord.MessageEmbed()
				.setColor("RANDOM")
				.setTitle("Category #'s")
				.setDescription("Quiz usage `;quiz <difficulty> <Cat #>`")
				.setFooter(stripIndents`
					9 - General Knowledge
					10 - Books
					11 - Film
					12 - Music
					13 - Musicals & Theatres
					14 - Television
					15 - Video Games
					16 - Board Games
					17 - Science & Nature
					18 - Computers
					19 - Mathematics
					20 - Mythology
					21 - Sports
					22 - Geography
					23 - History
					24 - Politics
					25 - Art
					26 - Celebrities
					27 - Animals
					28 - Vehicles
					29 - Comics
					30 - Gadgets
					31 - Anime & Manga
					32 - Cartoons & Animations`);
			message.channel.send(embed);
		}
	},
};
