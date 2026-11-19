// 10 preguntas familiares en formato Verdadero o Falso (4 originales + 6 nuevas)
const preguntas = [
  // --- 4 PREGUNTAS ORIGINALES ADAPTADAS A VERDADERO O FALSO ---
  {
    emoji: "🐶",
    pregunta: "El nombre de la mascota de la casa es Lulú.",
    esVerdadero: true,
    explicacion: "¡Así es! Lulú es la mascota de nuestra casa."
  },
  {
    emoji: "🏘️",
    pregunta: "El nombre de nuestro pueblo es Coyaima.",
    esVerdadero: true,
    explicacion: "¡Correcto! Nuestro pueblo es Coyaima."
  },
  {
    emoji: "🍲",
    pregunta: "El plato típico de la casa es la bandeja paisa.",
    esVerdadero: false,
    explicacion: "Es falso: el plato tradicional de la casa es el tamal."
  },
  {
    emoji: "🐱",
    pregunta: "El gato de la familia se llama Flores.",
    esVerdadero: true,
    explicacion: "¡Exacto! El gato de la casa se llama Flores."
  },

  // --- 6 PREGUNTAS FAMILIARES NUEVAS ---
  {
    emoji: "☕",
    pregunta: "En las mañanas en la casa nunca falta un buen café o chocolate caliente.",
    esVerdadero: true,
    explicacion: "¡Verdadero! Siempre empezamos el día compartiendo algo calientito."
  },
  {
    emoji: "🎂",
    pregunta: "Los cumpleaños en la familia se celebran reunidos en casa con torta y música.",
    esVerdadero: true,
    explicacion: "¡Verdadero! Ningún cumpleaños pasa sin reunirnos en familia."
  },
  {
    emoji: "🌱",
    pregunta: "En el patio o corredor de la casa no hay ninguna mata ni jardín.",
    esVerdadero: false,
    explicacion: "Es falso: en la casa siempre cuidamos las matas y flores."
  },
  {
    emoji: "🍽️",
    pregunta: "Los domingos son el día favorito para almorzar todos juntos en familia.",
    esVerdadero: true,
    explicacion: "¡Verdadero! El almuerzo dominical en familia es tradición."
  },
  {
    emoji: "🌙",
    pregunta: "En nuestra familia nadie se despide ni da la bendición antes de salir o dormir.",
    esVerdadero: false,
    explicacion: "Es falso: pedir y dar la bendición es una costumbre muy nuestra."
  },
  {
    emoji: "📸",
    pregunta: "Siempre guardamos fotos y recuerdos de las reuniones y paseos familiares.",
    esVerdadero: true,
    explicacion: "¡Verdadero! Los recuerdos en familia son nuestro mayor tesoro."
  }
];

// Estado del juego
let indiceActual = 0;
let puntaje = 0;
let historialRespuestas = [];

// Referencias al DOM
const topBar = document.getElementById("top-bar");
const questionCounter = document.getElementById("question-counter");
const scoreBadge = document.getElementById("score-badge");
const progressFill = document.getElementById("progress-fill");

const screenStart = document.getElementById("screen-start");
const screenQuiz = document.getElementById("screen-quiz");
const screenResult = document.getElementById("screen-result");

const questionEmoji = document.getElementById("question-emoji");
const questionText = document.getElementById("question-text");
const btnTrue = document.getElementById("btn-true");
const btnFalse = document.getElementById("btn-false");

const feedbackBox = document.getElementById("feedback-box");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackDetail = document.getElementById("feedback-detail");
const btnNext = document.getElementById("btn-next");

const resultTrophy = document.getElementById("result-trophy");
const finalScoreText = document.getElementById("final-score-text");
const resultMessage = document.getElementById("result-message");
const summaryList = document.getElementById("summary-list");

// Iniciar juego
function iniciarJuego() {
  indiceActual = 0;
  puntaje = 0;
  historialRespuestas = [];

  screenStart.hidden = true;
  screenResult.hidden = true;
  screenQuiz.hidden = false;
  topBar.hidden = false;

  cargarPregunta();
}

// Cargar la pregunta actual
function cargarPregunta() {
  const actual = preguntas[indiceActual];

  // Actualizar barra superior
  questionCounter.textContent = `Pregunta ${indiceActual + 1} de ${preguntas.length}`;
  scoreBadge.textContent = `⭐ Puntaje: ${puntaje}`;
  const porcentaje = (indiceActual / preguntas.length) * 100;
  progressFill.style.width = `${porcentaje}%`;

  // Mostrar datos de la pregunta
  questionEmoji.textContent = actual.emoji;
  questionText.textContent = actual.pregunta;

  // Reiniciar botones Verdadero / Falso
  btnTrue.disabled = false;
  btnFalse.disabled = false;
  btnTrue.classList.remove("selected-correct", "selected-wrong");
  btnFalse.classList.remove("selected-correct", "selected-wrong");

  feedbackBox.hidden = true;
  feedbackBox.classList.remove("correct", "incorrect");
  btnNext.hidden = true;
}

// Evaluar respuesta Verdadero o Falso en cada pregunta
function responder(eleccionUsuario) {
  const actual = preguntas[indiceActual];
  const esCorrecta = eleccionUsuario === actual.esVerdadero;
  const botonElegido = eleccionUsuario ? btnTrue : btnFalse;

  // Desactivar ambos botones
  btnTrue.disabled = true;
  btnFalse.disabled = true;

  // Mostrar mensaje de CORRECTO o INCORRECTO
  feedbackBox.hidden = false;

  if (esCorrecta) {
    puntaje++;
    scoreBadge.textContent = `⭐ Puntaje: ${puntaje}`;
    botonElegido.classList.add("selected-correct");
    feedbackBox.classList.add("correct");
    feedbackIcon.textContent = "✅";
    feedbackTitle.textContent = "¡CORRECTO! +1 punto ✨";
    feedbackDetail.textContent = actual.explicacion;
  } else {
    botonElegido.classList.add("selected-wrong");
    feedbackBox.classList.add("incorrect");
    feedbackIcon.textContent = "❌";
    feedbackTitle.textContent = `Incorrecto (Era ${actual.esVerdadero ? "Verdadero" : "Falso"})`;
    feedbackDetail.textContent = actual.explicacion;
  }

  historialRespuestas.push({
    pregunta: actual.pregunta,
    esVerdadero: actual.esVerdadero,
    acierto: esCorrecta
  });

  // Configurar botón siguiente
  btnNext.textContent =
    indiceActual < preguntas.length - 1
      ? "Siguiente pregunta ➡️"
      : "Ver resultado final 🏆";
  btnNext.hidden = false;
  btnNext.focus();
}

btnTrue.addEventListener("click", () => responder(true));
btnFalse.addEventListener("click", () => responder(false));

// Pasar a la siguiente pregunta o mostrar resultados
btnNext.addEventListener("click", () => {
  indiceActual++;
  if (indiceActual < preguntas.length) {
    cargarPregunta();
  } else {
    mostrarResultados();
  }
});

// Pantalla final
function mostrarResultados() {
  progressFill.style.width = "100%";
  screenQuiz.hidden = true;
  screenResult.hidden = false;

  finalScoreText.textContent = `${puntaje} / ${preguntas.length}`;

  if (puntaje === preguntas.length) {
    resultTrophy.textContent = "🏆";
    resultMessage.textContent =
      "¡Lo lograste! Reconociste toda la casa y a la familia a la perfección.";
    lanzarConfeti();
  } else if (puntaje >= 6) {
    resultTrophy.textContent = "👏";
    resultMessage.textContent =
      "¡Muy buen trabajo! Conoces bastante bien nuestras costumbres y hogar.";
  } else {
    resultTrophy.textContent = "😅";
    resultMessage.textContent =
      "Te falta visitar más a la familia. ¡Inténtalo de nuevo!";
  }

  // Generar resumen
  summaryList.innerHTML = historialRespuestas
    .map(
      (item) => `
      <div class="summary-item">
        <span>${item.acierto ? "✅" : "❌"} ${item.pregunta}</span>
        <span class="badge-tf ${item.esVerdadero ? "v" : "f"}">
          ${item.esVerdadero ? "Verdadero" : "Falso"}
        </span>
      </div>
    `
    )
    .join("");
}

// Efecto de confeti al lograr puntaje perfecto
function lanzarConfeti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colores = ["#e07a5f", "#2ec4b6", "#f2cc8f", "#3d405b", "#ff9f1c"];
  const particulas = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 5,
    color: colores[Math.floor(Math.random() * colores.length)],
    speedY: Math.random() * 3 + 2,
    speedX: Math.random() * 2 - 1,
    rot: Math.random() * 360
  }));

  let frames = 0;
  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rot += 4;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    frames++;
    if (frames < 180) {
      requestAnimationFrame(animar);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  animar();
}

// Eventos de botones inicio y reinicio
document.getElementById("btn-start").addEventListener("click", iniciarJuego);
document.getElementById("btn-restart").addEventListener("click", iniciarJuego);
