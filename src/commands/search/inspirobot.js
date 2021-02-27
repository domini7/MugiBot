const request = require("request");

module.exports = {
	name: "inspirobot",
	aliases: ["ib"],
	description: "send an inspirational image",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		request(
			"http://inspirobot.me/api?generate=true",

			function (error, response, body) {
				const embed = new Discord.MessageEmbed()
					.setAuthor(
						"Inspirobot",
						"https://inspirobot.me/website/images/inspirobot-dark-green.png",
						"https://inspirobot.me/"
					)
					.setColor("#00FF00")
					.setImage(body);

				message.channel.send(embed);
			}
		);
	},
};
