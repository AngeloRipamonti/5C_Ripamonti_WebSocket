import io from "/node_modules/socket.io/client-dist/socket.io.esm.min.js";
import { createNavigator } from "./components/navigator.js";
import { createPubSub } from "./components/pubSub.js";
import { createForm } from "./components/form.js";
import { wsChat } from "./components/chat.js";

const socket = io();
const navigator = createNavigator();
const pubSub = createPubSub();
const form = createForm(document.getElementById("login"), pubSub);
const chat = wsChat(document.getElementById("chat"), pubSub, socket)

form.render();
chat.render();

/*
input.onkeydown = (event) => {

    if (event.keyCode === 13) {
        event.preventDefault();
        button.click();
    }
}*/






