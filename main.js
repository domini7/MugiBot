const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const rps = require("./responses/responses.js");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler =>{
	require(`./handlers/${handler}`)(client, Discord);
});

// login removed pre-commit (PAST TOKENS IN OLDER COMMITS ARE INVALID)
client.login("");
