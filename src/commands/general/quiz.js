const request = require("node-superfetch");
const { stripIndents } = require("common-tags");
const { shuffle, formatNumber } = require("../../util/Utils.js");
// for specific code block
const bbgmDiscord = require("../../../assets/json/bbgm");

module.exports = {
	name: "quiz",
	descriptions: "Sends a question with answer choices",
	async execute(client, message, args) {
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

		try {
			const { body } = await request
				.get("https://opentdb.com/api.php")
				.query({
					amount: 1,
					type: "multiple",
					encode: "url3986",
					choice,
				});

			if (!body.results)
				return message.reply(
					"Oh no, a question could not be fetched. Try again later!"
				);

			const answers = body.results[0].incorrect_answers.map((answer) =>
				decodeURIComponent(answer.toLowerCase())
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
				${shuffled.map((answer, i) => `**${choices[i]}.** ${answer}`).join("\n")}
			`);

			const filter = (res) =>
				res.author.id === message.author.id &&
				choices.includes(res.content.toUpperCase());

			const messages = await message.channel.awaitMessages(filter, {
				max: 1,
				time: 15000,
			});

			if (!messages.size)
				return message.reply(`Sorry, time is up! It was ${correct}.`);

			const win =
				shuffled[
					choices.indexOf(messages.first().content.toUpperCase())
				] === correct;

			if (win) {
				message.reply("correct!");
			} else {
				message.reply(`Nope, it's ${correct}.`);
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
			}
		} catch (error) {
			return message.reply(`Error: \`${error.message}\``);
		}
	},
};
