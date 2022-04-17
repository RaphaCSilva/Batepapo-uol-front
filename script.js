let nome = "";
nome = prompt("manda teu nome parceiro");

const nomeobject = {
    name: nome
}
const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",nomeobject);

function verifica(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeobject);
}
setInterval(verifica, 5000);

let statusmsg = {};
let statustext = "";
let container = document.querySelector(".container");
container.innerHTML = "";
let message = {};
let messagetext = "";
let privado = {};
let privadotext = "";

function pegarmensagens(){
  container.innerHTML ="";
  let promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promessa.then(postarmsg);
}

function postarmsg(msg) {
    for(let i=0; i< msg.data.length; i++){
      if(msg.data[i].type === "status"){
        statusmsg = msg.data[i];
        poststatus();
      }
      if(msg.data[i].type === "message"){
          message = msg.data[i];
          postmessage();
      }
      if(msg.data[i].type === "private_message"){
          if(msg.data[i].to === nome || msg.data[i].from === nome){
          privado = msg.data[i];
          postprivado();
          }
      }
    }
}
pegarmensagens();
setInterval(pegarmensagens, 3000);

function poststatus(){
    statustext = `<div class="statushtml">
    <h3>(${statusmsg.time})</h3> <h1>${statusmsg.from}</h1> <h2>${statusmsg.text}</h2>
    </div>`;
    container.innerHTML += statustext;
    const statusaparece = document.querySelector('.statushtml');
    statusaparece.scrollIntoView();
}

function postmessage(){
    messagetext = `<div class="everyone">
    <h3>(${message.time})  </h3> <h1> ${message.from} </h1> <h2> para </h2> <h1>${message.to}</h1><h2>: ${message.text}</h2>
    </div>`;
    container.innerHTML += messagetext;
    const messageaparece = document.querySelector('.everyone');
    messageaparece.scrollIntoView();
}

function postprivado(){
    messagetext = `<div class="private">
    <h3>(${message.time})</h3> <h1>${message.from}</h1> <h2> para </h2> <h1>${message.to}</h1><h2>: ${message.text}</h2>
    </div>`;
    container.innerHTML += messagetext;
}

let enviar = {};
let inputtext = "";

function salvarmensagem(){
    inputtext = document.querySelector(".input").value;
    enviar = {
      from: nome,
      to: "Todos",
      text: inputtext,
      type: "message"
    }
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", enviar);
    document.querySelector(".input").value = "";
}