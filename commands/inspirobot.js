const request = require("request");

module.exports = {
	name: "inspirobot",
	description: "send an inspirational image",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		request(
			"http://inspirobot.me/api?generate=true",

			function (error, response, body) {
				const embed = new Discord.MessageEmbed()
					.setTitle("Inspirobot")
					.setURL("https://inspirobot.me/")
					.setColor("#00FF00")
					.setImage(body)

				message.channel.send(embed);
			}
		);
	},
};
