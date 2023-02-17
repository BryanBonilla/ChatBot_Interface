
const microfono = document.querySelector("#microfono");
const resultado = document.querySelector(".resultado");
const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector(".mensaje");
const API_KEY = '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';
const MODEL_ENGINE = 'text-davinci-003';

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
    limpiarHTML();
    const respuesta = document.createElement("p");
    respuesta.innerHTML = `<b>User:</b> ${texto} <br><br><b>Respuesta: </b> ${output}`
    resultado.appendChild(respuesta);
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
       
// Usage
const prompt = transcript;
generateText(prompt).then(output => {
    limpiarHTML();
    const respuesta = document.createElement("p");
    respuesta.innerHTML = `<b>User:</b> ${transcript} <br><br><b>Respuesta: </b> ${output}`
    resultado.appendChild(respuesta);
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

function limpiarHTML(){
  if(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
}