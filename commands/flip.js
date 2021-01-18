const doHT = () => {
	const rand = ["Heads", "Tails"];
	return rand[Math.floor(Math.random() * rand.length)];
};

module.exports = {
	name: "flip",
	cooldown: 20,
	execute(client, message, args, Discord) {
		const embed = new Discord.MessageEmbed()
			.setTitle("**Winner:**")
			.setDescription("*"+doHT()+"*")
			.setColor("#FFD700");
		message.channel.send(embed);
	},
};
