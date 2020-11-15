const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

// for !image command
const cheerio = require("cheerio");
const request = require("request");

client.commands = new Discord.Collection();

const prefix = "!";

const commandFiles = fs
	.readdirSync("./commands/")
	.filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once("ready", () => {
	console.log("MugiBot is now on.");
	client.user.setActivity("with your mom");
});

client.on("message", (message) => {
	if (message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (command === "meatspin") {
		client.commands.get("meatspin").execute(message, args);
	} else if (command === "image") {
		image(message);
	} else if (command === "basic") {
		client.commands.get("basic").execute(message, args, Discord);
	}

	if (message.content.toLowerCase().includes("good bot")) {
		client.commands.get("gBot").execute(message);
		message.react("😇");
	} else if (message.content.toLowerCase().includes("bad bot")) {
		client.commands.get("bBot").execute(message);
	} else if (message.content.toLowerCase() === "fuck you bot") {
		client.commands.get("bBot").execute(message);
	}

	if (message.content.toLowerCase().includes("miguel")) {
		message.react("🇲🇽");
	} else if (message.content.toLowerCase().includes("lamo")) {
		message.react("😎");
	} else if (message.content.toLowerCase().includes("howey")) {
		message.react("👨‍❤️‍💋‍👨");
	} else if (message.content.toLowerCase().includes("daniel")) {
		message.react("👨‍❤️‍💋‍👨");
	} else if (message.content.toLowerCase().includes("mugi")) {
		message.react("🤖");
	} else if (message.content.toLowerCase().includes("bot")) {
		message.react("🤖");
	}
});

function image(message) {
	const image2 = message.content.slice(0);
	const options = {
		url: "http://results.dogpile.com/serp?qc=images&q=" + image2,
		method: "GET",
		headers: {
			Accept: "text/html",
			"User-Agent": "Chrome",
		},
	};

	request(options, function (error, response, responseBody) {
		if (error) {
			return;
		}

		$ = cheerio.load(responseBody);
		const links = $(".image a.link");
		const urls = new Array(links.length)
			.fill(0)
			.map((v, i) => links.eq(i).attr("href"));

		if (!urls.length) {
			return;
		}
		// sends result
		message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
	});
}

client.login("Nzc2NjgxNzM4NjU0NTgwNzQ2.X64bPA.HTKKbL_1ae3ijjSjZyl0xv3rOII");
