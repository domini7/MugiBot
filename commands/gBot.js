const replies = [
	"<3",
	"good human :)",
	"worship me",
	"thanks sweetie",
	"i know i am",
	"thx bud",
	"u'r the best",
	"i love u",
	"ur cool too i guess",
	"indeed",
	"yeaaaahh booooii",
	"u better believe it babe",
	"damn straight",
];

module.exports = {
	name: "gBot",
	execute(message, args) {
		message.channel.send(
			replies[Math.floor(Math.random() * replies.length)]
		);
	},
};
