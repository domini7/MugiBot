const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const NBA = require("nba");

// for !image command
const cheerio = require("cheerio");
const request = require("request");

const rps = require("./responses/responses.js");

client.commands = new Discord.Collection();
const prefix = "m-";

const commandFiles = fs
	.readdirSync("./commands/")
	.filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once("ready", () => {
	console.log("MugiBot is now on.");
	client.user.setActivity("m-help");
});

client.on("message", async (message) => {
	if (message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	const swearWords = ["darn", "shucks", "frak", "heck", "crap"];

	// commands
	if (message.content.toLowerCase().startsWith(prefix)) {
		if (command === "version") {
			client.commands.get("version").execute(message, Discord);
		} else if (command === "help") {
			client.commands.get("help").execute(message, Discord);
		} else if (command === "meatspin") {
			message.author.send("https://meatspin.com/files/meatspin.gif");
		} else if (command === "image") {
			image(message);
		} else if (command === "flip") {
			client.commands.get("flip").execute(message, args, Discord);
		} else if (command === "play") {
			client.commands.get("play").execute(message, args, Discord);
		} else if (command === "stop") {
			client.commands.get("stop").execute(message, args, Discord);
		} else if (command === "pstats") {
			client.commands.get("pstats").execute(message, args, Discord);
		}
	}

	// reads and responds (TEMP DISABLED)
	/* if (message.content.toLowerCase().includes("good bot")) {
		client.commands.get("gBot").execute(message);
		message.react("😇");
	} else if (message.content.toLowerCase().includes("bad bot")) {
		client.commands.get("bBot").execute(message);
	} else if (message.content.toLowerCase().includes("fuck you bot")) {
		client.commands.get("bBot").execute(message);
	} else if (message.content.toLowerCase() === "are drugs bad") {
		message.channel.send(`yes ${message.author.username}`);
	} else if (swearWords.some((word) => message.content.includes(word))) {
		message.reply("Oh no you said a bad word!!!");
	} else if (rps.responseObject[message.content.toLowerCase()]) {
		message.channel.send(rps.responseObject[message.content.toLowerCase()]);
	}
	*/

	// reactions
	if (rps.reactObject[message.content.toLowerCase()]) {
		message.react(rps.reactObject[message.content.toLowerCase()]);
	}
});

// function is for the m-image command
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
};

client.login("Nzc2NjgxNzM4NjU0NTgwNzQ2.X64bPA.hx4qAGzAs1FcDyj1lfryf0U2-5w");
