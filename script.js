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
let historico = [];

function pegarmensagens(){
  let promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promessa.then(postarmsg);
}
let checaprimeira = 0;
let start = 0;

function postarmsg(msg) {
    if(checaprimeira === 0){
      for(let i=0; i< msg.data.length; i++){
        if(msg.data[i].type === "status"){
          statusmsg = msg.data[i];
          historico.push(msg.data[i]);
          poststatus();
        }
        if(msg.data[i].type === "message"){
          message = msg.data[i];
          historico.push(msg.data[i]);
          postmessage();
        }
        if(msg.data[i].type === "private_message"){
          if(msg.data[i].to === nome || msg.data[i].from === nome){
            privado = msg.data[i];
            historico.push(msg.data[i]);
            postprivado();
          }
        }
      }
      checaprimeira++;
    }else {
    start = 0;
    for(let i=0; i< msg.data.length; i++){
        if(start === 1){
          if(msg.data[i].type === "status"){
              statusmsg = msg.data[i];
              historico.push(msg.data[i]);
              poststatus();
            }
            if(msg.data[i].type === "message"){
              message = msg.data[i];
              historico.push(msg.data[i]);
              postmessage();
            }
            if(msg.data[i].type === "private_message"){
                if(msg.data[i].to === nome || msg.data[i].from === nome){
                    privado = msg.data[i];
                    historico.push(msg.data[i]);
                    postprivado();
                }
            }  
        }
        if(msg.data[i].text === historico[historico.length-1].text && msg.data[i].to === historico[historico.length-1].to && msg.data[i].from === historico[historico.length-1].from && msg.data[i].time === historico[historico.length-1].time){
          start = 1;
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
}

function postmessage(){
    messagetext = `<div class="everyone">
    <h3>(${message.time})  </h3> <h1> ${message.from} </h1> <h2> para </h2> <h1>${message.to}</h1><h2>: ${message.text}</h2>
    </div>`;
    container.innerHTML += messagetext;
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