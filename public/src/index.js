import io from "/node_modules/socket.io/client-dist/socket.io.esm.min.js";
import { createPubSub } from "./components/pubSub.js";
import { createForm } from "./components/form.js";
import { wsChat } from "./components/chat.js";

const socket = io();
const pubSub = createPubSub();
const form = createForm(document.getElementById("login"), pubSub);
const chat = wsChat(document.getElementById("chat"), pubSub, socket)

form.render();
chat.render();


