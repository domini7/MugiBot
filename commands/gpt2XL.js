const booste = require("booste");

module.exports = {
	name: "gpt2xl",
	description: "Predict end of text",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		if (message.author.id != "188530356394131456")
			return message.reply("You can't use this command, try `m-gpt2`");
		if (!args.length)
			return message.reply("Add some text after the command!");

		// message.reply("Processing!");

		try {
			const inString = args.join(" ");

			const outList = await booste.gpt2XL(
				process.env.BOOSTE,
				inString,
				15
			);
			const outString = outList.join(" ");
			message.channel.send(`${inString}` + " " + `${outString}`);
		} catch (error) {
			console.error(error);
			message.reply("There was an error executing the command");
		}
	},
};
