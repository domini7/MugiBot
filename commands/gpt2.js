const booste = require("booste");

module.exports = {
	name: "gpt2",
	description: "Predict end of text",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		let inString = 'I'
		
		if (args.length) {
			inString = args.join(" ")
		}

		try {
			const outList = await booste.gpt2(
				process.env.BOOSTE,
				inString,
				25
			);
			const outString = outList.join(" ");
			message.channel.send(`${inString}` + " " + `${outString}`);
		} catch (error) {
			console.error(error);
			message.reply("There was an error executing the command");
		}
	},
};
