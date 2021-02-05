const booste = require("booste");

module.exports = {
	name: "gpt2",
	aliases: ['gpt'],
	description: "Predict end of text",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		let inString = "I";

		if (args.length) {
			inString = args.join(" ");
		}

		try {
			const outList = await booste.gpt2(process.env.BOOSTE, inString, 40);

			let outString = outList.join(" ");
			console.log(outString);

			// Hack to cut off unfinished sentences
			outString = outString.substring(0, outString.lastIndexOf(".") + 1);

			message.channel.send(`${inString}` + " " + `${outString}`);
		} catch (error) {
			console.error(error);
			message.reply("There was an error executing the command");
		}
	},
};
