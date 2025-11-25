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
      "Именованное хранилище данных в памяти компьютера.",
      "Тип данных, аналогичный массиву.",
    ],
    correct: "Именованное хранилище данных в памяти компьютера.",
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

let numberQuestion = 1;

function startTest() {
  showQuestion(numberQuestion);
}

document.addEventListener("DOMContentLoaded", function () {
  showStartScreen();
});

// Функция показа вопроса и обработки ответа
function showQuestion(number) {
  const currentQuestion = questions.find((item) => item.number === number);

  const optionsHTML = currentQuestion.options
    .map((option, index) => {
      return `<label class="option-card">
              <input type="radio" name="answer" value="${option}" class="input"/>
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
      
      <div class="buttons">
       <button class="previous-qstn">
        <img src="./icons/left-arrow.svg" alt="стрелка">
        Предыдущий вопрос
       </button>

       <button class="submit-btn" disabled>Подтвердить ответ</button>

       <button class="next-qstn">
        Следующий вопрос
        <img src="./icons/right-arrow.svg" alt="стрелка">
       </button>
      </div>
    </section>`;

  const submitButton = document.querySelector(".submit-btn");
  const radioButtons = document.querySelectorAll('input[type="radio"]');

  radioButtons.forEach((value) => {
    value.addEventListener("change", function () {
      submitButton.disabled = false;

      const selectedAnswer = container.querySelector(
        'input[name="answer"]:checked'
      );

      const optionCards = document.querySelectorAll(".option-card");
      optionCards.forEach((acc) => acc.classList.remove("selected"));

      parentSelector = selectedAnswer.closest(".option-card");
      parentSelector.classList.add("selected");

      submitButton.addEventListener("click", () => {
        if (selectedAnswer.value === currentQuestion.correct) {
          parentSelector.classList.add("true");
          optionCards.forEach((el) => el.classList.add('stop-choise'));
        } else {
          parentSelector.classList.add("false");
          optionCards.forEach((el) => el.classList.add('stop-choise'));
        }
      });
    });
  });

  nextButton = document.querySelector('.next-qstn');
  nextButton.addEventListener('click', nextQuestion);

  function nextQuestion() {
    showQuestion(numberQuestion++)
  }
}



