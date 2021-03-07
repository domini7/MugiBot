const request = require("node-superfetch");
const { stripIndents } = require("common-tags");
const { shuffle, list } = require("../../util/Utils.js");

module.exports = {
	name: "quiz",
	descriptions: "Sends a question with answer choices",
	async execute(client, message, args, Discord) {
		const difficulties = ["easy", "medium", "hard"];
		const choices = ["A", "B", "C", "D"];

		if (!args.length)
			return message.reply(
				"choose a difficulty! `;quiz <easy | medium | hard>`"
			);

		const choice = args[0];

		if (!difficulties.includes(choice))
			return message.reply("difficulty choice should be easy, medium, or hard");

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
				**You have 15 seconds. The category is _${decodeURIComponent(
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

			if (!win) return message.reply(`Nope, it's ${correct}.`);

			return message.reply("Correct");
		} catch (error) {
			return message.reply(
				`Error: \`${error.message}\``
			);
		}
	},
};
