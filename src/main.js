const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["commandHandler", "eventHandler"].forEach((handler) => {
	require(`../src/handlers/${handler}`)(client, Discord);
});

client.login(process.env.TOKEN);

// Leave msg for specific server
client.on("guildMemberRemove", (member) => {
	const channel = member.guild.channels.cache.find(
		(channel) => channel.id === "880517957032247356"
	);
	channel.send(`${member} has left`);
});
