class App {
  constructor() {
    this.inputValue = "";
    this.list = [
      {
        id: Date.now(),
        text: "Що таке React",
        date: "23.01.2020 16:00",
        isEdit: false
      },
      {
        id: Date.now(),
        text: "Як працювати з сервером",
        date: "25.01.2020 12:45",
        isEdit: false
      }
    ];

    this.inputChange = this.inputChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.editClickHandler = this.editClickHandler.bind(this);
    // add GET request
  }

  start(container) {
    this.addToScreen(container, "beforeend", this.renderForm());
    this.addToScreen(container, "beforeend", this.renderList());

    this.addListeners();
  }

  addListeners() {
    const input = document.querySelector("#question");

    input.addEventListener("change", this.inputChange);

    const form = document.querySelector("form");

    form.addEventListener("submit", this.addQuestion);

    const list = document.querySelector(".collection");

    list.addEventListener("click", this.changeQuestion);
  }

  renderForm() {
    return `<form>
        <div class="input-field">
          <input id="question" type="text" class="validate" name="query"/>
          <label for="question">Постав своє питання</label>
        </div>
        <div>
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Задати питання
            <i class="material-icons right">send</i>
          </button>
        </div>
      </form>`;
  }

  renderList() {
    return this.list.length
      ? `<ul class="collection">
      ${this.list.reduce((acc, el) => this.renderListItem(el) + acc, "")}
      </ul>`
      : `<p>Нету данных!</p>`;
  }

  renderInputField(text) {
    return `<div class="edit">
        <input type="text" class="validate" name="question" value="${text}"/>
        <a href="#!" class="secondary-content pt-30" name="action" data-edit="edit">
          <i class="material-icons fs-24">edit</i>
        </a>
      </div>
      `;
  }

  renderListItem({ text, date, id }) {
    return `<li class="collection-item avatar list__item" data-id="${id}">
          <p>
            ${date}
          </p>
          <span class="title">${text}</span>
          <a href="#!" class="secondary-content"
            ><i class="material-icons">delete</i></a
          >
        </li>`;
  }

  renderSpanElement(text) {
    return `<span class="title">${text}</span>`;
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  addQuestion(e) {
    e.preventDefault();

    if (this.inputValue.trim() === "") {
      M.toast({ html: "Введіть своє питання!" });
      return;
    }

    const questionObj = {
      id: Date.now(),
      text: this.inputValue,
      isEdit: false,
      date: this.convertDate()
    };

    this.list.push(questionObj);

    const form = document.querySelector("form");
    const ul = document.querySelector(".collection");

    const value = e.currentTarget.elements.query.value;

    if (value.trim() === "") {
      return;
    }
    form.reset();

    this.addToScreen(ul, "beforeend", this.renderListItem(questionObj));
  }

  changeQuestion(e) {
    if (e.target.tagName !== "SPAN") {
      return;
    }
    const spanContent = e.target.textContent;

    const spanCollection = document.querySelectorAll(".title");

    spanCollection.forEach(el => {
      if (spanContent === el.textContent) {
        this.addToScreen(el, "beforebegin", this.renderInputField(spanContent));

        el.remove();
      }
    });

    this.addEditListener();
  }


  editClickHandler(e) {
    e.preventDefault();

    const inputQuestion = document.querySelector('input[name="question"]');

    const items = document.querySelectorAll(".list__item > div");

    items.forEach(el => {
      if (el.tagName === "DIV") {
        this.addToScreen(
          el,
          "afterend",
          this.renderSpanElement(inputQuestion.value)
        );

        el.remove();
      }
    });
  }

  addEditListener() {
    const editLink = document.querySelector('a[data-edit="edit"]');

    editLink.addEventListener("click", this.editClickHandler);
  }

  inputChange(e) {
    const value = e.target.value;

    this.inputValue = value;
  }

  convertDate() {
    const day = String(new Date().getDate()).padStart(2, "0");
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const year = new Date().getUTCFullYear();
    const hours = String(new Date().getHours()).padStart(2, "0");
    const min = String(new Date().getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${min}`;
  }
}

const app = new App();

const main = document.querySelector("main");
app.start(main);
