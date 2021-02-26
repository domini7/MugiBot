module.exports = {
	name: "echo",
	cooldown: 20,
	execute(client, message, args, Discord) {
		if (!args.length) return message.reply('say something! `m-echo Hello!`');

		let echo = args.join(" ");
		echo = echo.replace(/@/g, "");

		if (message.guild.id === "290013534023057409" && echo.length < 8) return;

		message.channel.send(echo);
	},
};