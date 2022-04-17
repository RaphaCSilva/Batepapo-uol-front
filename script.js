const nome = prompt("manda teu nome parceiro");

const nomeobject = {
    name: nome
}
const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",nomeobject);

function verifica(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeobject);
}
setInterval(verifica, 5000);




const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promessa.then(postarmsg);

let statusmsg = {};
let statustext = "";
let container = document.querySelector(".container");
container.innerHTML = "";
let message = {};
let messagetext = "";

function postarmsg(msg) {
	console.log(msg.data);
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

function poststatus(){
    statustext = `<div class="statushtml">
    (${statusmsg.time}) ${statusmsg.from} ${statusmsg.text}
    </div>`;
    container.innerHTML += statustext;
    
}
function postmessage(){
    messagetext = `<div class="everyone">
    (${message.time}) para ${message.to} ${message.from} ${message.text}
    </div>`;
    container.innerHTML += messagetext;
}



//from: "João",
//to: "Todos",
//text: "Bom dia",
//type: "message", "status"
//time: "08:02:50"