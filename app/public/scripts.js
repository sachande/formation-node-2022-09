(() => {
  const user = {};

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const register = e.target.elements.register.checked;
    console.log({ username, password, register });
    // TODO call /auth/login or /auth/register + /auth/login
    // TODO handle errors (show a message and don't redirect)
    const token = "got a token";
    // TODO store token for auto-reconnect
    if (token) {
      handleLoggedIn(token, username);
    }
  };

  const handleLoggedIn = (token, username) => {
    // Hide login form
    hide("#login-area");
    // Update user session in UI and memory
    user.username = username;
    updateText(".user-name", username);
    show("#user-area");
    // TODO open websocket connexion
    // TODO emit event to authenticate
    // TODO only if websocket server says it's OK, switch UI
    document
      .getElementById("chat-form")
      .addEventListener("submit", handleSendMessage);
    show("#chat-area");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = e.target.elements.text.value;
    // TODO send socket event
    appendMessage({ date: Date.now(), author: user.username, text });
    // TODO clear input and re-focus
  };

  const appendMessage = ({ date, author, text }) => {
    const template = document.createElement("template");
    template.innerHTML = document
      .getElementById("template-chat-message")
      .innerText.trim();
    const element = template.content.firstChild;
    updateText(".date", date, element);
    updateText(".author", author, element);
    updateText(".text", text, element);
    const list = document.getElementById("chat-messages");
    list.appendChild(element);
    waitForDOM(() => (list.scrollTop = list.scrollHeight));
  };

  const storeToken = (token) => {
    // TODO
  };

  const getStoredToken = () => {
    // TODO
  };

  const reconnect = (token) => {
    // TODO call /auth/check
    handleLoggedIn(token);
  };

  const waitForDOM = (fn) =>
    requestAnimationFrame(() => requestAnimationFrame(fn));

  const updateText = (selector, text, container = document) =>
    container.querySelectorAll(selector).forEach((el) => (el.innerText = text));

  const show = (selector) =>
    document
      .querySelectorAll(selector)
      .forEach((el) => el.classList.remove("hidden"));

  const hide = (selector) =>
    document
      .querySelectorAll(selector)
      .forEach((el) => el.classList.add("hidden"));

  const init = () => {
    const token = getStoredToken();
    if (token) {
      show("#chat-area");
      hide("#login-area");
    } else {
      hide("#user-area");
      hide("#chat-area");
      show("#login-area");
    }
    show("#app");
    document
      .getElementById("login-form")
      .addEventListener("submit", handleLogin);
  };

  window.addEventListener("load", init);
})();
