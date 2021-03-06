const booste = require("booste");

module.exports = {
	name: "gpt2xl",
	aliases: ["gptxl", "xl"],
	description: "Predict end of text",
	cooldown: 120,
	async execute(client, message, args) {
		let inString = "I";

		if (args.length) {
			inString = args.join(" ");
		}

		try {
			const outList = await booste.gpt2XL(
				process.env.BOOSTE,
				inString,
				37
			);

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
