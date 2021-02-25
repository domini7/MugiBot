const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

// (message.guild.id, queueConstructor object {voice channel, text channel, connection, song[]})
const queue = new Map();

// I regret not commenting the code while making this, but it is understandable.
module.exports = {
	name: "play",
	aliases: ["skip", "stop"],
	description: "Music control",
	async execute(client, message, args, Discord, cmd) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel)
			return message.channel.send(
				" You need to be in a channel to use this command"
			);

		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
			return message.channel.send("You don't have permissions");

		const serverQueue = queue.get(msesage.guild.id);

		if (cmd === "play") {
			if (!args.length) return message.reply("you need to search a song");

			let song = {};

			if (ytdl.validateURL(args[0])) {
				const songInfo = await ytdl.getInfo(args[0]);
				song = {
					title: songInfo.videoDetails.title,
					url: songInfo.videoDetails.video_url,
				};
			} else {
				// use keywords to find vid
				const videoFinder = async (query) => {
					const videoResult = await ytSearch(query);
					return videoResult.videos.length > 1
						? videoResult.videos[0]
						: null;
				};

				const video = await videoFinder(args.join(" "));
				if (video) {
					song = { title: video.title, url: video.url };
				} else {
					message.reply("error finding video");
				}
			}

			if (!serverQueue) {
				const queueConstructor = {
					voiceChannel: voiceChannel,
					textChannel: message.channel,
					connection: null,
					songs: [],
				};

				queue.set(message.guild.id, queueConstructor);
				queueConstructor.songs.push(song);

				try {
					const connection = await voiceChannel.join();
					queueConstructor.connection = connection;
					videoPlayer(message.guild, queueConstructor.songs[0]);
				} catch (error) {
					queue.delete(message.guild.id);
					message.reply("there was an error connecting");
					throw error;
				}
			} else {
				serverQueue.songs.push(song);
				return message.channel.send(
					`**${song.title}** added to queue.`
				);
			}
		} else if (cmd === "skip") skipSong(message, serverQueue);
		else if (cmd === "stop") stopSong(message, serverQueue);
	},
};

const videoPlayer = async (guild, song) => {
	const songQueue = queue.get(guild.id);

	if (!song) {
		songQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const stream = ytdl(song.url, { filter: "audioonly" });
	songQueue.connection
		.play(stream, { seek: 0, volume: 0.5 })
		.on("finish", () => {
			songQueue.songs.shift();
			videoPlayer(guild, songQueue.songs[0]);
		});
	await songQueue.textChannel.send(`Now playing **${song.title}**`);
};

const skipSong = (message, serverQueue) => {
	if (!message.member.voice.channel)
		return message.reply("you need to be in a voice channel");
	if (!serverQueue) return message.reply("there are no queued songs");

	serverQueue.connection.dispatcher.end();
};

const stopSong = (message, serverQueue) => {
	if (!message.member.voice.channel)
		return message.reply("you need to be in a voice channel");
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
};
