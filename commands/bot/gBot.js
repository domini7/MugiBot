const replies = [
	"<3",
	"good human :)",
	"worship me",
	"thanks sweetie",
	"i know i am",
	"thx bud",
	"u,r the best",
	"i love u",
	"ur cool too i guess",
	"indeed",
	"yeaaaahh booooii",
	"u better believe it babe",
	"damn straight",
	"aww how nice of u :)",
	"No, I'm a **GREAT BOT**, get it right next time, k?",
	"amazing bot",
	"sexy bot ;)",
	"the best bot",
	"cool compliment, but you can do better next time",
	"i know",
	"thanks i guess",
	"yes",
	"yup",
	"cool bot",
];

module.exports = {
	name: "gBot",
	execute(client, message, args) {
		message.channel.send(
			replies[Math.floor(Math.random() * replies.length)]
		);
	},
};
