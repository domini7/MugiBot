module.exports = {
	name: "leet",
	cooldown: 20,
	execute(client, message, args, Discord) {	
		if (!args.length) return message.reply('Y0u n33d 70 54y 50m37hing idi07. `m-leet text`');

		let text = args.join(" ");
		text = text.replace(/@/g, "");
		text = text.replace(/a/ig, '4');
      	text = text.replace(/e/ig, '3');
      	text = text.replace(/l/ig, '1');
      	text = text.replace(/o/ig, '0');
      	text = text.replace(/s/ig, '5');
      	text = text.replace(/t/ig, '7');

		message.channel.send(text);
	},
};