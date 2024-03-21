import {OAUTH} from "./config.js"

const urlParams = new URLSearchParams(window.location.search)

const channel = urlParams.get('twitch');

var container = document.getElementById("container")

const socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");


const oAuth = OAUTH;
const nick = `hajbot`;
const image_size = 15


if (!urlParams.has('twitch')){
    container.innerHTML = "add /?twitch=channel_name to the link";
    console.log("add /?twitch=channel_name to the link")
} 

socket.addEventListener('open', () => {
    socket.send(`CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands`)
    socket.send(`PASS ${oAuth}`);
    socket.send(`NICK ${nick}`);
    socket.send(`JOIN #${channel}`);
})

socket.addEventListener('message', event => {
    if (event.data.includes("user-type=") && !event.data.includes("ROOMSTATE") && !event.data.includes("GLOBALUSERSTATE")&& !event.data.includes("USERNOTICE")) {

        const text_from_chat = event.data;

        const get_chat_message_place = text_from_chat.indexOf(`#${channel} :`);
        
        const get_chat_message = text_from_chat.slice(get_chat_message_place);

        const message_place = get_chat_message.indexOf(`#${channel} :`);

        const channel_nick_length = channel.length

        const message = get_chat_message.slice(message_place+channel_nick_length+3);

        const get_nick_start = text_from_chat.indexOf("display-name=");

        const get_nick_stop = text_from_chat.indexOf(";emote");

        const get_nick = text_from_chat.slice(get_nick_start+13,get_nick_stop);
        
        if (get_nick.includes("d :")) {
            document.write(`<p> <img src="/images/TwitchGlitchPurple.svg" alt="Twitch logo" width=${image_size} height=${image_size}> ${get_nick} : ${message}</p>`);
            window.scrollTo(0, document.body.scrollHeight);
        }
        else {
            document.write(`<p> <img src="/images/TwitchGlitchPurple.svg" alt="Twitch logo" width=${image_size} height=${image_size}> ${get_nick} : ${message}</p>`);
            window.scrollTo(0, document.body.scrollHeight);
        }

        console.log(text_from_chat)
    }

    if (event.data.includes("PING")) socket.send("PONG");

})