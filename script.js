const questions = [
  {
    number: 1,
    text: `Что вернет <span class="question-code">typeof null</span> в JavaScript?`,
    options: ["null", "object", "indefined"],
    correct: "object",
    isInput: false,
  },

  {
    number: 2,
    text: `Какой из перечисленных вариантов не является <span class='question-code'>типом данных</span> в JavaScript?`,
    options: ["boolean", "string", "integer"],
    correct: "integer",
    isInput: false,
  },

  {
    number: 3,
    text: `Что такое <span class='question-code'>переменная</span> в JavaScript?`,
    options: [
      "Специальный оператор для математических вычислений.",
      "Именованное хранилище данных в памяти компьютера.",
      "Тип данных, аналогичный массиву.",
    ],
    correct: "Именованное хранилище данных в памяти компьютера.",
    isInput: false,
  },

  {
    number: 4,
    text: `Как называется механизм в JavaScript, который <span class='question-code'>позволяет функции запоминать лексическое окружение</span>?`,
    options: [],
    correct: "Замыкание",
    isInput: true,
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

  let optionsHTML = null;

  if (currentQuestion.isInput) {
    optionsHTML = `<label class="user-input">
                    <input type="text" value="" class="input-answer" placeholder="Введите свой ответ" maxlength=50">
                  </label>`;
  } else {
    optionsHTML = currentQuestion.options
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
  }

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

  const submitButton = container.querySelector(".submit-btn");
  const radioButtons = container.querySelectorAll('input[type="radio"]');
  const inputField = container.querySelector('input[type="text"]');

  function getSelectedElements() {
    const selectedAnswer = container.querySelector(
      'input[name="answer"]:checked'
    );
    const answerCards = container.querySelectorAll(".option-card");

    const selectedCard = selectedAnswer
      ? selectedAnswer.closest(".option-card")
      : null;

    return { selectedAnswer, answerCards, selectedCard };
  }

  function getInputArea() {
    const inputAnswer = inputField ? inputField.closest(".user-input") : null;

    return inputAnswer;
  }

  radioButtons.forEach((value) => {
    value.addEventListener("change", function () {
      const { answerCards, selectedCard } = getSelectedElements();

      submitButton.disabled = false;

      answerCards.forEach((acc) => acc.classList.remove("selected"));

      selectedCard.classList.add("selected");
    });
  });

  if (inputField) {
    inputField.addEventListener("input", function (event) {
      if (event.target.value.length > 0) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    });
  }

  submitButton.addEventListener("click", () => {
    const { selectedAnswer, answerCards, selectedCard } = getSelectedElements();

    if (!currentQuestion.isInput) {
      if (selectedAnswer.value === currentQuestion.correct) {
        selectedCard.classList.add("true");
        answerCards.forEach((el) => (el.style.pointerEvents = "none"));
      } else {
        selectedCard.classList.add("false");
        answerCards.forEach((el) => (el.style.pointerEvents = "none"));
      }
    } else {
      let inputValue = inputField.value;
      const selectedInput = getInputArea();

      if (inputValue.toLowerCase() === currentQuestion.correct.toLowerCase()) {
        inputField.classList.add("true");
        selectedInput.style.pointerEvents = "none";
      } else {
        inputField.classList.add("false");
        selectedInput.style.pointerEvents = "none";
      }
    }
  });

  const prevButton = container.querySelector(".previous-qstn");
  const nextButton = container.querySelector(".next-qstn");

  if (number === 1) {
    prevButton.style.opacity = "0";
    prevButton.style.pointerEvents = "none";
  }

  if (number === questions.length) {
    nextButton.classList.add("restart-btn");
    nextButton.innerHTML = "Завершить";
  }

  function nextQuestion() {
    if (numberQuestion < questions.length) {
      showQuestion((numberQuestion += 1));
    }
  }

  function previousQuestion() {
    if (numberQuestion - 1 >= 1) {
      showQuestion((numberQuestion -= 1));
    }
  }

  nextButton.addEventListener("click", nextQuestion);
  prevButton.addEventListener("click", previousQuestion);
}

//TODO: реализовать возможность завершить тест, счетчик правильных овтетов
