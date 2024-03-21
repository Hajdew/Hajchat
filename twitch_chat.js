import {OAUTH} from "./config.js"

const oAuth = OAUTH;
const nick = `hajbot`;
const channel = "jinnytty";

const socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");


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

        const split_text_from_chat = text_from_chat.split(";")

        const get_nick_test = split_text_from_chat[4]


        const get_nick_start = text_from_chat.indexOf("display-name=");

        const get_nick_stop = text_from_chat.indexOf(";emote");

        const get_nick = text_from_chat.slice(get_nick_start+13,get_nick_stop);
        
        if (get_nick.includes("d :")) {
            document.write(`<p> ${get_nick} : ${message}</p>`);
            window.scrollTo(0, document.body.scrollHeight);
        }
        else {
            document.write(`<p> ${get_nick} : ${message}</p>`);
            window.scrollTo(0, document.body.scrollHeight);
        }

        console.log(text_from_chat)
    }

    if (event.data.includes("PING")) socket.send("PONG");


})

//@badge-info=;badges=bits/100;color=#00FF7F;display-name=Blip0_0;emote-only=1;emotes=emotesv2_d98b6c5d612747b0b08335dc4988385b:0-9;first-msg=0;flags=;id=3c20834a-dc35-4489-af4b-ba8d8e871192;mod=0;returning-chatter=0;room-id=151368796;subscriber=0;tmi-sent-ts=1710935936276;turbo=0;user-id=106911502;user-type= :blip0_0!blip0_0@blip0_0.tmi.twitch.tv PRIVMSG #piratesoftware :toonyNotes
