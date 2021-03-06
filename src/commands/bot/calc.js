const math = require("mathjs");
const { rnd } = require("../../util/Utils.js");

module.exports = {
	name: "calc",
	description: "Evaluate math expressions.",
	cooldown: 20,
	async execute(client, message, args) {
		try {
			let exp = args.join(" ");

			if (!exp)
				return message.reply(
					"You need to calculate something! `;calc 2 + 2`"
				);

			if (exp.includes("°")) exp = exp.replace(/°/g, "deg");

			let evaled = math.evaluate(exp);

			if (isNaN(evaled)) evaled = "NaN (not a number).";

			if (exp.length + evaled.length > 2000)
				return message.channel.send("output is too long");

			message.channel.send(`${rnd(evaled, 4)}`);
		} catch (error) {
			message.reply("Error evaluating that!");
		}
	},
};
