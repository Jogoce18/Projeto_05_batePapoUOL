let mensaje= [];
let activos=[];
let nome;
let remitente="Todos";
let estado="message";
  function buscarDados() {
    const promise= axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(buscarmensa);
   
  }
  login();
  setInterval(buscarDados,3000);

  function Manterconex(){
    const promise= axios.post("https://mock-api.driven.com.br/api/v6/uol/status ",
    nome
   );
   }
   setInterval(Manterconex,5000);

  function login(){
   
    nome = {
      name: prompt("Qual o seu nome lindo?"),
    }
    const promise1= axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ",
     nome
    );
    promise1.then(CadastradComSucesso);
    promise1.catch(tratarError);
  }
  
  function tratarError(error) {
    alert("Já esta cadastrado");
    login();
    console.log(error.response);
  ;
  }
  
  function CadastradComSucesso() {
    alert("Cadastrada com sucesso!");
  }


  function buscarmensa(mensaje) {
   const data= mensaje.data
   console.log(mensaje)
   const ulmsj = document.querySelector(".msj");
   const posicion=document.querySelector(".msj").childElementCount;
   ulmsj.innerHTML = "";
   for (let i=0; i<data.length;i++){
     if(data[i].type==="status"){
    ulmsj.innerHTML += `
          <div class="opcionmes sistemamens">
            <li>
            (${data[i].time}) <span style="color:black;font-weight:bold">${data[i].from}</span>   ${data[i].text} 
            </li>   
            </div>
        `;
  }else{
    if(data[i].type ==="message"){
      ulmsj.innerHTML += `
             <div class="opcionmes todosmens">
              <li>
              (${data[i].time}) <span style="color:black;font-weight:bold">${data[i].from}</span>    <span style="color:black;font-weight:bold">${data[i].to}</span>    ${data[i].text}  
              </li>   
              </div>
          `;

    }else{
      if((data[i].from==nome.name && data[i].type==="private_message") || (data[i].to===nome.name && data[i].type==="private_message") ){
      ulmsj.innerHTML += `
      <div class="opcionmes particularmens">
       <li>
       (${data[i].time}) <span style="color:black;font-weight:bold">${data[i].from}</span>   <span style="color:black;font-weight:bold">${data[i].to}</span>  ${data[i].text}  
       </li>   
       </div>

   `;
     }else{
       console.log(1)
     }
    }
  }
}
let ultimomsj=ulmsj.children[posicion-1];
ultimomsj.scrollIntoView();
}

function escolha() {
  const container= document.querySelector(".container");
  container.setAttribute("style", "display: inline");

   const verificar = document.querySelector(".verificar");
  verificar.setAttribute("style", "display: inline");
}
function voltar(){
  const container= document.querySelector(".container");
  container.setAttribute("style", "display")
  
  const verificar = document.querySelector(".verificar");
  verificar.setAttribute("style", "display");
}

function mandarmensage(){
  const mensajito=document.querySelector(".digitar").value;
  const newmsj = {
    from: nome.name,
    to: remitente,
    text: mensajito,
    type: estado
   }
  const promise= axios.post("https://mock-api.driven.com.br/api/v6/uol/messages" ,
  newmsj
  );
 promise.then(buscarDados);
  promise.catch(tratarError1);
 document.querySelector(".digitar").value="";
}

function tratarError1(error) {
  alert("Vc já nao esta online");
  mandarmensage();
  console.log(error.response);
  window.location.reload()
;
}
participantesactivos();
function participantesactivos(){
  const promise= axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
  promise.then(activo);
 }setInterval(participantesactivos,10000);

function activo(activos){
const mydata=activos.data
console.log(activos)
const ulpeople = document.querySelector(".hagale");
ulpeople.innerHTML = "";
ulpeople.innerHTML += `
<div class="enviartodos">
            <ion-icon class="ionicone" onclick="selecionarpessoa(this)" name="people">Todos</ion-icon>
            <h1>Todos</h1>
            <img class="check1" src="descarga.png" alt="" />
        </div>
        `;
 for (let i=1; i< mydata.length;i++){
  ulpeople.innerHTML += `
        <div class="participantesactivos" >
        <ion-icon class="ionicon" onclick="selecionarpessoa(this) " name="person-circle-outline"> ${mydata[i].name}</ion-icon>
        ${mydata[i].name}  
        <img class="check1" src="descarga.png" alt="" />
         </div>
      `;

}
}   

function selecionar(elemento){
const almacena=document.querySelector(".private.vamos");
if(almacena != null){
  almacena.classList.toggle("vamos");
}
elemento.classList.toggle("vamos");
elemento.parentNode.classList.toggle("vamos");
estado=elemento.innerHTML;
console.log(estado)
}
function selecionarpessoa(elemento){
  const almacena=document.querySelector(".participantesactivos.vamos");
  if(almacena != null){
    almacena.classList.toggle("vamos");
  }
  elemento.parentNode.classList.toggle("vamos");
  remitente=elemento.innerHTML;
  console.log(remitente)
  }

  
function estatus(){
  let msj;
  const mg= document.querySelector(".remitente")
  if(estado === "private_message"){
    msj = "Reservadamente";
  }else if(remitente === "Todos"){
    msj = "";
  }else{
    msj = "Público"
  }
  mg.innerHTML =`
    Enviando para ${remitente} (${msj})
    `;
}setInterval(estatus,300);