export function wsChat(parentElement, pubSub, socket) {
    const template = "<li class=\"list-group-item\">%MESSAGE</li>";
    const messages = [];
    let userList = [];

    pubSub.subscribe("isLogged", (data) => {
        socket.emit("isLogged", data[0])
        data[1].classList.add("d-none");
        parentElement.classList.remove("d-none");
    });

    let wsChat = {
        render: function(){
            console.log(messages);
            let html = `<div class="container mt-4">
                            <ul id="wschat" class="list-group overflow-auto" style="max-height: 300px;">
                                ${
                                    messages.map((message) => {
                                        return template.replace("%MESSAGE", message);
                                    }).join("")
                                }
                            </ul>
                            <div class="row g-2 mt-3">
                                <div class="col">
                                    <input id="input" class="form-control" placeholder="Type a message..." />
                                </div>
                                <div class="col-auto">
                                    <button id="sendButton" type="button" class="btn btn-success">Send</button>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h5>Active Users</h5>
                                <ul id="userList" class="list-group">
                                    ${
                                        userList.map((user) => {
                                            return `<li class="list-group-item">${user.name}</li>`;
                                        }).join("")
                                    }
                                </ul>
                            </div>
                        </div>`;
            parentElement.innerHTML = html;
            window.scrollTo(0, document.body.scrollHeight);

            const input = document.getElementById("input");
            const button = document.getElementById("sendButton");
            input.onkeydown = (event) => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    button.click();
                }
            }
            button.onclick = () => {
                socket.emit("message", input.value);
                input.value = "";
            }  
        }
    } 

    socket.on("chat", (message) => {
        messages.push(message);
        wsChat.render();
    })
    socket.on("list", (list) => {
        userList = list;
        wsChat.render();
    })

    return wsChat;
}