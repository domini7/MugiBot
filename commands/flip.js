const replies = [
	"heads",
	"tails",
];

module.exports = {
	name: "flip",
	execute(message, args) {
		message.channel.send(
			replies[Math.floor(Math.random() * replies.length)]
		);
	},
};
