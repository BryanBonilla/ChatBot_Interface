const microfono = document.querySelector("#microfono");
const resultado = document.querySelector(".resultado");
const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector(".mensaje");
const API_KEY = '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';
const MODEL_ENGINE = 'text-davinci-003';

// Array para almacenar la conversación
let conversacion = [];

document.addEventListener("DOMContentLoaded", ()=>{
  microfono.addEventListener("click", ejecutarSpeech);
  microfono.addEventListener("click", spinner);
  formulario.addEventListener("submit", capturarTexto);
  formulario.addEventListener("submit", spinner);
})

async function generateText(prompt) {
  try {
    const response = await fetch(`https://api.openai.com/v1/engines/${MODEL_ENGINE}/completions`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 0.5
      })
    });
    const data = await response.json();
    return data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
}

function capturarTexto(e){
  e.preventDefault();
   
  const texto = mensaje.value;
  const prompt = texto;
  generateText(prompt).then(output => {
    const mensajeUsuario = `<div class="mensaje mensaje-usuario"><b>User:</b> ${texto}</div>`;
    const mensajeBot = `<div class="mensaje mensaje-bot"><b>Bot:</b> ${output}</div>`;
    conversacion.push(mensajeUsuario, mensajeBot);
    actualizarConversacion();
    mensaje.value = "";
  });
}

function ejecutarSpeech(){
    limpiarHTML();
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.onstart = function(){
        console.log("Iniciar");
    }
    recognition.onspeechend = function(){
        console.log("Finalizado");
    }
    recognition.onresult = function(e){
        console.log(e.results);
      
        let transcript = e.results[0][0].transcript;
       
        const prompt = transcript;
        generateText(prompt).then(output => {
            const mensajeUsuario = `<div class="mensaje mensaje-usuario"><b>User:</b> ${transcript}</div>`;
            const mensajeBot = `<div class="mensaje mensaje-bot"><b>Bot:</b> ${output}</div>`;
            conversacion.push(mensajeUsuario, mensajeBot);
            actualizarConversacion();
        });
    
    }
}

function spinner(){
  limpiarHTML();
  const spinner = document.createElement("DIV");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="cube1"></div>
  <div class="cube2"></div>
  `
  resultado.appendChild(spinner);
}

function actualizarConversacion(){
  limpiarHTML();
conversacion.forEach((mensaje) => {
resultado.innerHTML += mensaje;
});
}

function limpiarHTML(){
while(resultado.firstChild){
resultado.removeChild(resultado.firstChild);
}
}