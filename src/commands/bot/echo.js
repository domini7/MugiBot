module.exports = {
	name: "echo",
	cooldown: 20,
	execute(client, message, args) {
		// Blocking command from being used in specific server
		if (message.guild.id === "290013534023057409") return;

		if (!args.length)
			return message.reply("say something! `;echo Hello!`");

		let echo = args.join(" ");
		echo = echo.replace(/@/g, "");

		message.channel.send(echo);
	},
};
