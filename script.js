const questions = [
  {
    number: 1,
    text: `Что вернет <span class="question-code">typeof null</span> в JavaScript?"`,
    options: ["null", "object", "indefined"],
    correct: "object",
  },

  {
    number: 2,
    text: "Какой из перечисленных вариантов не является типом данных в JavaScript?",
    options: ["boolean", "string", "integer"],
    correct: "integer",
  },

  {
    number: 3,
    text: "Что такое переменная в JavaScript?",
    options: [
      "Специальный оператор для математических вычислений.",
      "Встроенное ключевое слово для управления потоком выполнения.",
      "Тип данных, аналогичный массиву.",
    ],
    correct: "Встроенное ключевое слово для управления потоком выполнения.",
  },
];

function showStartScreen() {
  const container = document.getElementById("app-container");
  container.innerHTML = `
  <div class="container start" id="start">
    <button class="start-test">🚀Начать тестирование🚀</button>
  </div>`;

  container.querySelector(".start-test").addEventListener("click", startTest);
}

function startTest() {
  showQuestion(1);
}

document.addEventListener("DOMContentLoaded", function () {
  showStartScreen();
});

function showQuestion(number) {
  const currentQuestion = questions.find((item) => item.number === number);

  const optionsHTML = currentQuestion.options
    .map((option, index) => {
      return `<label class="option-card">
              <input type="radio" name="answer" value="null" />
              <div class="option-content">
                <p class="option-number">${index + 1}</p>
                <span class="option-text">${option}</span>
              </div>
            </label>`;
    })
    .join(" ");

  const container = document.getElementById("app-container");

  container.innerHTML = `
   <section class="quiz-container">
      <div class="question">
        <p class="question">Вопрос №${currentQuestion.number}. ${currentQuestion.text}</p>
      </div>
      
      <div class="options-container">
        ${optionsHTML}
      </div>
      
       <button class="submit-btn" disabled>Подтвердить ответ</button>
    </section>`;

  const submitButton = document.querySelector(".submit-btn");
  const radioButtons = document.querySelectorAll('input[type="radio"]');

  radioButtons.forEach((value) => {
    value.addEventListener("change", function () {
      submitButton.removeAttribute("disabled");
    });
  });
}
