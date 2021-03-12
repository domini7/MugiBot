<img src="https://i.imgur.com/PtCc2iO.jpg" width="154" height="140">

# MugiBot


This is a multi-purpose personal Discord bot built using JavaScript. DM's are open for commands at MugiBot#9444

Want MugiBot in your server? [Click here](https://discord.com/oauth2/authorize?client_id=776681738654580746&scope=bot&permissions=3267648)

## Contents
* [Info](https://github.com/domini7/MugiBot#info)
* [Commands](https://github.com/domini7/MugiBot#commands)
	* [General](https://github.com/domini7/MugiBot#commands)
	* [NBA](https://github.com/domini7/MugiBot#nba)
	* [Music](https://github.com/domini7/MugiBot#music)
	* [Bot](https://github.com/domini7/MugiBot#bot)
	* [Search](https://github.com/domini7/MugiBot#search)
	* [Games](https://github.com/domini7/MugiBot#games)
* [Installation](https://github.com/domini7/MugiBot#installation)
	* [Get API Keys](https://github.com/domini7/MugiBot#where-to-get-api-keys)
	* [Required Permissions](https://github.com/domini7/MugiBot#permissions-the-bot-needs)
	* [Starting the bot](https://github.com/domini7/MugiBot#starting-the-bot)
	* [Contributing](https://github.com/domini7/MugiBot#contributing)

## Info
* MugiBot has been in development since November 2020
* This repo is under the MIT License, which means you can do whatever you want with it.
* Mugi was the name of my family's old cat (1991-2008)

## Commands

### General

```
;help                  | DM's you the list of commands.
;flip                  | Flip a coin. Optionally guess the result.
;userinfo              | Displays basic user info, must be used in a server.
;version               | Checks current version and date last updated.
;suggest               | Send a suggestion to me.
```
### NBA

```
;pstats (name) [year]  | Check a NBA player's basic season stats with season as optional arg.
;pstats-per36          | Same as pstats but with per 36 min numbers.
;pbio (name)           | Check a NBA player's basic info.
;plastgame (name)      | Check a player's last game.
;tstats (team) [year]  | Check a NBA team's current or *optionally* past season stats.
;standings [year]      | Check current NBA standings or optionally check past seasons.
;leaders [year]        | Displays league leaders.
;retire (name) [year]  | Guesses the chance of a player retiring.
```
### Music

```
;play                  | Play music from title or youtube URL, play more songs to add to queue.
;stop                  | Stop current music.
;skip                  | Skips current song and plays next in queue.
```
### Bot

```
;echo                  | Bot repeats what is said after ';echo ...'.
;leet                  | Bot repeats what you say but turns it into leet text.
;gpt2 [sentence]       | Bot tries to finish your sentence, responds within a minute.
;gpt2xl [sentence]     | Same function as ;gpt2, but with a much larger model. Takes up to 5-10 minutes to respond.
;rate [name]           | Bot will rate you/someone from 0-10.
;ship [@user, @user]   | Combines two users for a ship.
;calc                  | Bot will solve math expressions.
```
### Search

```
;image (keyword)       | Get a random image based off keyword.
;gif (keyword)         | Get a random gif.
;inspirobot            | Bot sends an inspirational image from inspirobot.
;covid (optional)      | Get coronavirus stats for the world or specific countries.
;define (keyword)      | Define a word using urban dictionary. Potentially NSFW.
;wiki (query)          | Search wikipedia.
;stackoverflow (query) | Search for a question on StackOverflow
;horoscope (sign)      | Get a daily horoscope for a sign.
```
### Games

```
;quiz (diff)(category) | Answer an easy, medium, or hard question along with an optional category number (See ;categories).
;akinator              | Play with the akinator.
```

## Installation
1. Install the latest version of [Node.js](https://nodejs.org/en/) (v14.0.0 required) and [git](https://git-scm.com/downloads)
2. Clone this repo with `git clone https://github.com/domini7/MugiBot.git`
3. Open the folder in git and run `npm install`
4. Create a new file called `.env` and fill it out using the `.env.example`
5. Create a new application at the [Discord Dev Portal](https://discord.com/developers/applications/)
6. [Follow these instructions to download FFMPEG on windows](https://www.wikihow.com/Install-FFmpeg-on-Windows)

Linux Users can download FFMPEG with `apt install ffmpeg`

### Where to get API keys
1. `TOKEN` - Obtain from the Discord Dev Portal under "Bot" in your application
2. `API_KEY` - Create an account at [RapidAPI](https://rapidapi.com/marketplace)
3. `BOOSTE` - Obtain a key from [Booste](https://www.booste.io/pretrained-models/nodejs)
4. `STACKOVERFLOW` - Register your application at [StackApps](https://stackapps.com/apps/oauth/register)
5. `GIPHY` - Apply for a key at [Giphy](https://developers.giphy.com/dashboard/)


### Permissions the bot needs
* Read Messages
* Send Messages
* Send TTS Messages (Optional)
* Embed Links
* Attach Files
* Read Message History
* Add Reactions
* Connect
* Speak

### Starting the bot
Start the bot with `npm run start`

If you're adding new code, enforce coding standards with `npm run lint`

### Contributing
Feel free to fork and submit a pull request if you want to improve the bot ;d