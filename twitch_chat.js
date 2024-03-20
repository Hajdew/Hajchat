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
    //console.log(event.data);
    
    const text_from_chat = event.data;
    
    const split_data = text_from_chat.split(";");

    const get_chat_message_place = split_data.length-1;

    const get_chat_message = split_data[get_chat_message_place];
    
    const get_nick_lenght = get_chat_message.indexOf("!");

    const get_nick = get_chat_message.slice(12,get_nick_lenght);

    const message_place = get_chat_message.indexOf(`#${channel} :`);

    const channel_nick_length = channel.length

    const message = get_chat_message.slice(message_place+channel_nick_length+3);
    
    document.write(`<p> ${get_nick} : ${message}</p>`);

    console.log(text_from_chat);

    if (event.data.includes("PING")) socket.send("PONG");

})

