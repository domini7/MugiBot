const bbgmDiscord = require("../../assets/json/bbgm");

module.exports = {
	name: "score",
	aliases: ["leaderboard"],
	cooldown: 20,
	execute(client, message, args, Discord, cmd ) {
		const bbgm = bbgmDiscord["bbgmDiscord"];

		if (cmd === "score") {
			if (message.channel.name != "bot-spam") return;
			
			const embed = new Discord.MessageEmbed()
				.setColor("RANDOM")
				.setTitle(message.author.username)
				.setDescription(`Score: ${bbgm[message.author.username]}`);

			message.channel.send(embed);
		}

		if (cmd === "leaderboard") {
			const best = Object.fromEntries(
				Object.entries(bbgm).sort(([, a], [, b]) => b - a)
			);

			const worst = Object.fromEntries(
				Object.entries(bbgm).sort(([, a], [, b]) => a - b)
			);

			const bestNames = Object.keys(best);
			const bestScores = Object.values(best);

			const worstNames = Object.keys(worst);
			const worstScores = Object.values(worst);

			const embed = new Discord.MessageEmbed()
				.setColor("RANDOM")
				.setTitle(message.author.username)
				.addFields({
					name: "Best scores",
					value: `${bestNames[0]}: ${bestScores[0]}\n${bestNames[1]}: ${bestScores[1]}\n${bestNames[2]}: ${bestScores[2]}\n${bestNames[3]}: ${bestScores[3]}\n${bestNames[4]}: ${bestScores[4]}\n`,
				},
				{ name: "Worst Scores",
					value: `${worstNames[0]}: ${worstScores[0]}\n${worstNames[1]}: ${worstScores[1]}\n${worstNames[2]}: ${worstScores[2]}\n${worstNames[3]}: ${worstScores[3]}\n${worstNames[4]}: ${worstScores[4]}\n`});

			message.channel.send(embed);
		}
	},
};
