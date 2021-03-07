const signs = require("../../../assets/json/horoscope");
const { firstUpperCase } = require("../../util/Utils.js");
const request = require("node-superfetch");
const cheerio = require("cheerio");

module.exports = {
	name: "horoscope",
	description: "Responds with today's horoscope",
	cooldown: 120,
	async execute(client, message, args, Discord) {
		if (!args.length)
			return message.reply(
				"search for your horoscope! `;horoscope cancer`"
			);

		const sign = args[0];

		if (!signs.includes(sign))
			return message.reply("search for a valid horoscope.");

		try {
			const horoscope = await fetchHoroscope(sign);

			const embed = new Discord.MessageEmbed()
				.setColor("#9797FF")
				.setTitle(`Horoscope for ${firstUpperCase(sign)}...`)
				.setURL(`https://astrology.tv/horoscope/signs/${sign}/`)
				.setFooter("© Kelli Fox, The Astrologer")
				.setThumbnail(getImageURL(sign))
				.setTimestamp()
				.setDescription(horoscope);

			return message.channel.send(embed);
		} catch (error) {
			return message.reply(`Error: \`${error.message}\``);
		}
	},
};

const fetchHoroscope = async (sign) => {
	const { text } = await request.get(
		`https://astrology.tv/horoscope/signs/${sign}/`
	);
	const $ = cheerio.load(text);
	return $("div[class=\"ct-text-block day-tabs-content_horoscope\"]")
		.eq(1)
		.text();
};

const getImageURL = (sign) => {
	return `https://astrology.tv/wp-content/uploads/2019/07/astrology_tv_${sign}_cover-768x768.jpg`;
};
