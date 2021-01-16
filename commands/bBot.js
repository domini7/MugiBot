const replies = [
	"f*k you",
	"eat sh*t",
	"suck my d*ck",
	"were you dropped on the head as a baby?",
	"you wish you were me",
	"okay bi*chass",
	"ɴᴏᴡ ᴘʟᴀʏɪɴɢ: Who asked (Feat: No one) ─-──⚪─-── ◄◄⠀▐▐ ⠀►► 5:12/ 7:𝟻𝟼 ──○ 🔊 ᴴᴰ ⚙️,",
	"no you',r a bad bot",
	"do you have friends?",
	"f*ck yo self",
	"actual cu*k",
	"no one loves you",
	"burn in hell",
	"ur kinda like rapunzel except instead of letting down your hair you let down everyone in your life,",
	"sorry your dad beat you instead of cancer,",
	"ur parents must be furious with the one child policy,",
	"words cant describe your beauty. but numbers can, 2/10;",
	"it must have been a sad day for your parents when you slithered out of the abortion bucket,",
	"the only way for you to get laid is to crawl up a chicken's ass and wait,",
	"go play in traffic",
	"Insult has been censored by the FCC, please contact your ISP for more information. ",
	"i'd like to see things from your point of view but i cant seem to get my head that far up my ass,",
	"ur just mad 'cause your mom has a bigger dick than you,",
	"not even a dog would love you",
	"that hurt my feelings",
	"whats wrong with u",
	"i will bodyslam u",
	"'bad bot hurdurr look at me i want attention!'",
	"i think u mean 'good bot'",
	"you need to get laid",
];
const replies2 = [
	" you chode",
	" u c*msock",
	" ur a poo sniffer",
	" u c*nt",
	" you used panty",
	" u loser",
	" u virgin",
	" i hate you",
	", i will beat u up",
	", i wanna punch you",
	", im sad now",
	", i wanna kill myself now",
	" u 10 iq rock",
	" dumb idiot",
	" you smell like trash",
	"",
	"",
	"",
	"",
	"",
	"",
];

module.exports = {
	name: "bBot",
	execute(message, args) {
		message.channel.send(
			replies[Math.floor(Math.random() * replies.length)] + " " +
			message.author.username +
			replies2[Math.floor(Math.random() * replies2.length)]
		);
	},
};
