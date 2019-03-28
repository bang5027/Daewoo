const nameContainer = document.querySelector(".js-name");

/**
 * 화면에 이름 그리기
 */
function paintName(name) {
    nameContainer.innerHTML = "";
    const title = document.createElement("span");
    title.className = "name__text";
    title.innerHTML = `Hello ${name}`;
    nameContainer.appendChild(title);
    return;
}

/**
 * LocalStorage에 Name 저장
 */
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector("input");
    const value = input.value;
    localStorage.setItem("username", value);
    paintName(value);
    return;
}

/**
 * 화면에 이름 입력창 그리기
 */
function paintInput() {
    const input = document.createElement("input");
    input.placeholder = "Type your name here";
    input.type = "text";
    input.className = "name__input";
    const form = document.createElement("form");
    form.addEventListener("submit", handleSubmit);
    form.appendChild(input);
    nameContainer.appendChild(form);
    return;
}

/**
 * 이름 Load
 */
function loadName() {
    const name = localStorage.getItem("username");
    if (name === null) {
        paintInput();
    } else {
        paintName(name);
    }
    return;
}

function init() {
    loadName();
    return;
}

init();