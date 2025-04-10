export function createForm(parentElement, pubSub) {
    
    return {
        render: function () {
            parentElement.innerHTML = `<div class="container d-flex justify-content-center align-items-center vh-100">
                                        <div class="card shadow p-4" style="max-width: 22rem; width: 100%;">
                                            <h3 class="text-center mb-3">Login</h3>
                                            <form>
                                                <div class="mb-3">
                                                    <label for="username" class="form-label">Username</label>
                                                    <input type="text" class="form-control" id="username" name="username" required>
                                                </div>
                                                <button id="loginSubmit" type="button" class="btn btn-primary w-100">Submit</button>
                                            </form>
                                        </div>
                                    </div>`;
            document.getElementById("loginSubmit").onclick = async () => {
                const usernameInput = document.getElementById("username").value;
                pubSub.publish("isLogged", [usernameInput, parentElement]);
                document.getElementById("username").value = "";
            };
        }
    }
}