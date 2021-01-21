const booste = require("booste");

module.exports = {
	name: "gpt2",
	description: "Predict end of text",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		if (!args.length)
			return message.reply("Add some text after the command!");

		try {
			const inString = args.join(" ");

			const outList = await booste.gpt2(
				process.env.BOOSTE,
				inString,
				7
			);
			const outString = outList.join(" ");
			message.channel.send(`${inString}` + " " + `${outString}`);
		} catch (error) {
			console.error(error);
			message.reply("There was an error executing the command");
		}
	},
};
