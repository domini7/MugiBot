let replies = [
	"fuck you",
	"eat shit",
	"suck my dick",
	"were you dropped on the head as a baby?",
	"you wish you were me",
	"lick my ass",
	"cunt",
	"k bitch",
	"ɴᴏᴡ ᴘʟᴀʏɪɴɢ: Who asked (Feat: No one) ───--───⚪───--─── ◄◄⠀▐▐ ⠀►► 5:12/ 7:𝟻𝟼 ───○ 🔊⠀ ᴴᴰ ⚙️",
	"you sound like a used panty",
	"no you',r a bad bot",
	"do you have friends?",
	"wow i can smell your ass from here",
	"fuck yo self",
	"scatmonkey",
	"actual cuck",
	"whine more poo sniffer",
	"no one loves you",
	"burn in hell",
];

module.exports = {
	name: "bBot",
	execute(message, args) {
		message.channel.send(
			replies[Math.floor(Math.random() * replies.length)]
		);
	},
};
