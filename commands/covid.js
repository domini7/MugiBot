const unirest = require("unirest");

module.exports = {
	name: "covid",
	description: "Check CoronaVirus stats",
	execute(message, args, Discord) {

		// if there is no arg, command will search global
		let search = "country";
		if (!args.length) {
			search = "totals";
		}

		const req = unirest(
			"GET",
			"https://covid-19-data.p.rapidapi.com/" + search
		);

		const word = args.join(" ");
		req.query({
			name: word,
			format: "json",
		});

		// key removed precommit
		req.headers({
			"x-rapidapi-key":
				"",
			"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
			useQueryString: true,
		});

		req.end(function (res) {
			try {
				const stats = res.body[0];
				const date = stats.lastUpdate.slice(0, 10);
				let country;
				!args.length ? (country = "World") : (country = stats.country);

				const newEmbed = new Discord.MessageEmbed()
					.setColor("#FFA500")
					.setTitle(`${country}`)
					.addFields(
						{
							name: "Cases",
							value: `${stats.confirmed.toLocaleString()}`,
							inline: true,
						},
						{
							name: "Recovered",
							value: `${stats.recovered.toLocaleString()}`,
							inline: true,
						},
						{
							name: "Active",
							value: `${(stats.confirmed - stats.recovered).toLocaleString()}`,
							inline: true,
						},
						{
							name: "Deaths",
							value: `${stats.deaths.toLocaleString()}`,
							inline: true,
						}
					)
					.setFooter(`Accurate as of: ${date}`);
				message.channel.send(newEmbed);
			} catch (error) {
				message.reply(
					"Can't find data for that country! Maybe spell propery? Thanks."
				);
			}
		});
	},
};
