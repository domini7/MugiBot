module.exports = {
	name: "stop",
	description: "Stops the bot and leaves the channel",
	async execute(message, args) {
		const voiceChannel = message.member.voice.channel;

		if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop music");
		await voiceChannel.leave();
	}
}