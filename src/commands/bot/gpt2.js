const booste = require("booste");

module.exports = {
	name: "gpt2",
	aliases: ["gpt", "gpt2xl", "xl"],
	description: "Predict end of text",
	cooldown: 120,
	async execute(client, message, args, Discord, cmd) {
		let inString = "I";

		if (args.length) {
			inString = args.join(" ");
		}

		try {
			let outList;
			const gpt2 = ["gpt2", "gpt"];

			if (gpt2.includes(cmd)) {
				outList = await booste.gpt2(process.env.BOOSTE, inString, 45);
			} else {
				outList = await booste.gpt2XL(process.env.BOOSTE, inString, 37);
			}

			let outString = outList.join(" ");
			message.channel.send(`${inString}` + " " + `${outString}`);
		} catch (error) {
			console.error(error);
			message.reply("There was an error executing the command");
		}
	},
};
