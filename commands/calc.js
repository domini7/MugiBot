const math = require("mathjs");

module.exports = {
	name: "calc",
	description: "Evaluate math expressions.",
	cooldown: 20,
	async execute(client, message, args) {
		try {
			let exp = args.join(" ");

			if (!exp)
				return message.reply(
					"You need to calculate something! `m-calc 2 + 2`"
				);

			if (exp.includes("°")) exp = exp.replace(/°/g, "deg");

			let evaled = math.evaluate(exp);

			if (isNaN(evaled)) evaled = "NaN (not a number).";

			if (exp.length + evaled.length > 2000)
				return message.channel.send(`output is too long`);

			message.channel.send(`${exp} = ${evaled}`);
		} catch (error) {
			message.reply("Error evaluating that!");
		}
	},
};
