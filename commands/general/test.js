module.exports = {
	name: "test",
	cooldown: 20,
	async execute(client, message, args, Discord) {
		let times = 10
		let msg = "Hey"
		message.channel.startTyping();
		for (i = 0; i < times; i++) {
			console.log('nothing')
		}
		message.channel.stopTyping();
	},
};
