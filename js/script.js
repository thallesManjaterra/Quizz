// Declaração de variáveis
const question = document.querySelector('#question')
const answersBox = document.querySelector('#answers-box')
const quizzContainer = document.querySelector('#quizz-container')
const scoreContainer = document.querySelector('#score-container')
const letters = ['a', 'b', 'c', 'd']
let points = 0
let actualQuestion = 0

// Perguntas
const questions = [
  {
    question: 'PHP foi desenvolvido para qual fim?',
    answers: [
      {
        answer: 'back-end',
        correct: true,
      },
      {
        answer: 'front-end',
        correct: false,
      },
      {
        answer: 'Sistema operacional',
        correct: false,
      },
      {
        answer: 'Banco de dados',
        correct: false,
      },
    ],
  },
  {
    question: 'Uma forma de declarar variável em JavaScript:',
    answers: [
      {
        answer: '$var',
        correct: false,
      },
      {
        answer: 'var',
        correct: true,
      },
      {
        answer: '@var',
        correct: false,
      },
      {
        answer: '#let',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual o seletor de id no CSS?',
    answers: [
      {
        answer: '#',
        correct: true,
      },
      {
        answer: '.',
        correct: false,
      },
      {
        answer: '@',
        correct: false,
      },
      {
        answer: '/',
        correct: false,
      },
    ],
  },
]

// Substituição do quizz para a primeira pergunta
function init() {
  // Criar primeira pergunta
  createQuestion(0)
}

// Cria uma pergunta
function createQuestion(i) {
  // Limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll('button')

  oldButtons.forEach((btn) => {
    btn.remove()
  })

  // Alterar o texto da pergunta
  const questionText = question.querySelector('#question-text')
  const questionNumber = question.querySelectorAll('#question-number')

  questionText.textContent = questions[i].question
  questionNumber.textContent = i + 1

  // Insere as alternativas
  questions[i].answers.forEach((answer, i) => {
    // Cria o template do button do quizz
    const answerTemplate = document
      .querySelector('.answer-template')
      .cloneNode(true)

    const letterBtn = answerTemplate.querySelector('.btn-letter')
    const answerText = answerTemplate.querySelector('.question-answer')

    letterBtn.textContent = letters[i]
    answerText.textContent = answer['answer']
    answerTemplate.setAttribute('correct-answer', answer['correct'])

    // Remover hide e template class
    answerTemplate.classList.remove('hide')
    answerTemplate.classList.remove('answer-template')

    // Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate)

    // Inserir evento de click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this)
    })
  })
  actualQuestion += 1
}

// Verificando a resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answersBox.querySelectorAll('button')

  // veriifica se a resposta está correta e adiciona classes nos botões
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') === 'true') {
      button.classList.add('correct-answer')
      if (btn === button) {
        points++
      }
    } else {
      button.classList.add('wrong-answer')
    }
  })

  // Exibir próxima pergunta
  nextQuestion()
}

// Exibe a próxima pergunta do quizz

function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(() => {
    // verifica see ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta a msg de sucesso
      showSuccessMessage()
      return
    }

    createQuestion(actualQuestion)
  }, 1500)
}

// Exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz()

  //calcular score
  const score = ((points / questions.length) * 100).toFixed(2)

  // trocar dados da tela de sucessos
  const displayScore = document.querySelector('#display-score span')
  displayScore.textContent = score.toString()

  // alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers')
  correctAnswers.textContent = points

  // alterar o total de perguntas
  const questionsQty = document.querySelector('#questions-qty')
  questionsQty.textContent = questions.length
}

// Mostra ou esconde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide')
  scoreContainer.classList.toggle('hide')
}

// Reiniciar Quizz
const restartBtn = document.querySelector('#restart')

restartBtn.addEventListener('click', function () {
  // Zerar o jogo
  actualQuestion = 0
  points = 0
  hideOrShowQuizz()
  init()
})

init()
