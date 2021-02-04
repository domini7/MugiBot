const unirest = require("unirest");

module.exports = {
	name: "define",
	description: "search urban dictionary for a word",
	execute(client, message, args, Discord) {
		if (
			message.channel.name != "bot-spam" &&
			message.guild.id === "290013534023057409"
		)
			return message.author.send(
				"Sorry, this command is restricted to #bot-spam in this server!"
			);

		if (!args.length)
			return message.reply(
				"Please add a keyword. Example: `m-define douchebag`"
			);

		const req = unirest(
			"GET",
			"https://mashape-community-urban-dictionary.p.rapidapi.com/define"
		);

		const word = args.join(" ");
		req.query({
			term: word,
		});

		req.headers({
			"x-rapidapi-key": process.env.API_KEY,
			"x-rapidapi-host":
				"mashape-community-urban-dictionary.p.rapidapi.com",
			useQueryString: true,
		});

		req.end(function (res) {
			try {
				const define = res.body["list"][0];

				// remove the brackets in strings
				let def = define.definition;
				def = def.replace(/\[|\]/g, "");
				let ex = define.example;
				ex = ex.replace(/\[|\]/g, "");

				const newEmbed = new Discord.MessageEmbed()
					.setColor("#FFA500")
					.setTitle(`${define.word}`)
					.setURL(`${define.permalink}`)
					.setDescription(`${def}`)
					.setFooter(`${ex}`);
				message.channel.send(newEmbed);
			} catch (error) {
				message.reply(
					"Could not find a definition for that word! (check spelling?)"
				);
			}
		});
	},
};
