module.exports = {
	name: "echo",
	cooldown: 20,
	execute(client, message, args, Discord) {
		if (!args.length) return message.reply('say something! `m-echo Hello!`');

		let echo = args.join(" ");
		echo = echo.replace(/@/g, "");

		message.channel.send(echo);
	},
};