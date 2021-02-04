module.exports = {
	name: "ship",
	description: "Combines two users for a ship",
	cooldown: 20,
	execute(client, message, args, Discord) {
		if (!args.length)
			return message.reply(
				"Mention two users!"
			);

		let users = message.mentions.users.map((u) => u.username);

		let shippedName = "";
		for (let i = 0; i < users.length; i++) {
			shippedName += `${users[i].substring(0, users[i].length / 2)}`;
		}

		message.channel.send(`**${shippedName}**`);
	},
};
