const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
	name: "play",
	description: "Joins and plays a video from youtube",
	async execute(message, args) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel)
			return message.channel.send("You need to be a in channel");

		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT"))
			return message.channel.send(
				"You don't have the correct permissions"
			);
		if (!permissions.has("SPEAK"))
			return message.channel.send(
				"You don't have the correct permissions"
			);

		if (!args.length)
			return message.channel.send("You need to send the second argument");

		const validURL = (str) => {
			var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
			if (!regex.test(str)) {
				return false;
			} else {
				return true;
			}
		};

		if (validURL(args[0])) {
			const connection = await voiceChannel.join();
			const stream = ytdl(args[0], { filter: "audioonly" });
			connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
				voiceChannel.leave();
			});

			await message.reply(`Now playing your link`);

			return;
		}

		const connection = await voiceChannel.join();

		const videoFinder = async (query) => {
			const videoResult = await ytSearch(query);

			return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
		};

		const video = await videoFinder(args.join(" "));

		if (video) {
			const stream = ytdl(video.url, { filter: "audioonly" });
			connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
				voiceChannel.leave();
			});

			await message.reply(`Now playing ***${video.title}***`);
		} else {
			message.channel.send("No video results found");
		}
	},
};
