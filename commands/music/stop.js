module.exports = {
	name: "stop",
	description: "Stops the bot and leaves the channel",
	async execute(client, message, args, Discord) {
		// checks if user is sending command from dm or channel
		if (message.channel instanceof Discord.DMChannel) {
			message.channel.send("You cannot use this command in DMs");
		} else {
			const voiceChannel = message.member.voice.channel;

			if (!voiceChannel)
				return message.channel.send(
					"You need to be in a voice channel to stop music"
				);
			await voiceChannel.leave();
		}
	},
};
