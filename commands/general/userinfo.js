const dayjs = require("dayjs");

module.exports = {
	name: "userinfo",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		if (message.channel instanceof Discord.DMChannel)
			return message.channel.send("You cannot use this command in DMs");

		let member = message.mentions.members.first() || message.member;

		const newEmbed = new Discord.MessageEmbed()
			.setColor("#000000")
			.setTitle(`${message.author.username}`)
			.setThumbnail(`${message.author.displayAvatarURL()}`)
			.addFields(
				{
					name: "Account creation date",
					value:
						"`" +
						`${dayjs(message.author.createdTimestamp).format(
							"MMM DD, YYYY"
						)}` +
						"`",
				},
				{
					name: `Joined ${message.guild.name} on`,
					value:
						"`" +
						`${dayjs(member.joinedTimestamp).format(
							"MMM DD, YYYY"
						)}` +
						"`",
				},
				{
					name: "Roles",
					value: `${member.roles.cache
						.map((r) => "`" + r.name + "`")
						.join(" - ")}`,
				}
			)
			.setFooter(`ID:${member.id}`);
		message.channel.send(newEmbed);

		// const fetch = await message.guild.members.fetch();
		// console.log(fetch)
	},
};
