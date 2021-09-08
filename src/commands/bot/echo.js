module.exports = {
	name: "echo",
	cooldown: 20,
	execute(client, message, args) {
		if (!args.length)
			return message.reply("say something! `;echo Hello!`");

		let echo = args.join(" ");
		echo = echo.replace(/@/g, "");

		message.channel.send(echo);
	},
};
