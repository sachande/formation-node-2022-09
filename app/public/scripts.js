// import io from 'socket.io-client'
/* global io */

(() => {
  const user = {};

  const fetchLogin = async (username, password) => {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw new Error(body.error);
    }
    return body.token;
  };

  const fetchRegister = async (username, password) => {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.status !== 201) {
      const body = await response.json();
      throw new Error(body.error);
    }
  };

  const fetchCheck = async (token) => {
    const response = await fetch("/auth/check", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw new Error(body.error);
    }
    return body.username;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const register = e.target.elements.register.checked;

    try {
      if (register) {
        await fetchRegister(username, password);
      }

      const token = await fetchLogin(username, password);
      if (token) {
        storeToken(token);
        handleLoggedIn(token, username);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLoggedIn = (token, username) => {
    // Hide login form
    hide("#login-area");
    // Update user session in UI and memory
    user.username = username;
    updateText(".user-name", username);
    show("#user-area");

    // Connect to websocket server
    const socket = io();

    // send message: socket.emit(event, ...args)
    // receive message: socket.on(event, (...args) => ...)

    socket.emit("toto", 1);

    socket.on("tata", (n, b) => {
      console.log("recv tata", { n, b });
      socket.emit("toto", 2);
      socket.emit("coucou", { date: Date.now(), values: [1, 2, 3, 4] });
    });

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
    localStorage.setItem("AUTH_TOKEN", token);
  };

  const getStoredToken = () => {
    return localStorage.getItem("AUTH_TOKEN");
  };

  const reconnect = async (token) => {
    const username = await fetchCheck(token);
    handleLoggedIn(token, username);
  };

  // UTILS

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
      reconnect(token);
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
