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
  }

  renderForm() {
    return `<form>
        <div class="input-field">
          <input id="question" type="text" class="validate" />
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

  renderListItem({ text, date }) {
    return `<li class="collection-item avatar list__item">
          <p>
            ${date}
          </p>
          <span class="title">${text}</span>
          <a href="#!" class="secondary-content"
            ><i class="material-icons">delete</i></a
          >
        </li>`;
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  addQuestion(e) {
    e.preventDefault();

    const questionObj = {
      id: Date.now(),
      text: this.inputValue,
      isEdit: false,
      date: JSON.stringify(new Date())
    };

    this.list.push(questionObj);

    const form = document.querySelector("form");
    const ul = document.querySelector(".collection");
    form.reset();

    this.addToScreen(ul, "beforeend", this.renderListItem(questionObj));
  }

  inputChange(e) {
    const value = e.target.value;
    this.inputValue = value;
  }
}

const app = new App();

const main = document.querySelector("main");
app.start(main);
