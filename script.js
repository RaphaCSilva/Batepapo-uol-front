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
      }else{
          message = msg.data[i];
          postmessage();
      }
    }
}
//setInterval(pegarmensagens, 3000);
pegarmensagens();

function poststatus(){
    statustext = `<div class="statushtml">
    (${statusmsg.time}) ${statusmsg.from} ${statusmsg.text}
    </div>`;
    container.innerHTML += statustext;
    const statusaparece = document.querySelector('.statushtml');
    statusaparece.scrollIntoView();
}
function postmessage(){
    messagetext = `<div class="everyone">
    (${message.time}) ${message.from} para ${message.to}: ${message.text}
    </div>`;
    container.innerHTML += messagetext;
    const messageaparece = document.querySelector('.everyone');
    messageaparece.scrollIntoView();
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
    sendmessage();
    document.querySelector(".input").value = "";
}
function sendmessage(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", enviar);
}
//{
//	from: "nome do usuário",
//	to: "nome do destinatário (Todos se não for um específico)",
//	text: "mensagem digitada",
//	type: "message" // ou "private_message" para o bônus
//}


//from: "João",
//to: "Todos",
//text: "Bom dia",
//type: "message", "status"
//time: "08:02:50"