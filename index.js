//Não consegui terminar o JSON

const dbMock = {
  listas: [
    {
      id: 0,
      titulo: "Música",
      tarefas: [
        {
          id: 0,
          ordem: "1",
          prioridade: "pouca-emergencia",
          descricao: "Aprender novos acordes",
        },
        {
          id: 1,
          ordem: "2",
          prioridade: "emergencia",
          descricao: "Terminar arranjo da música X",
        },
        {
          id: 2,
          ordem: "3",
          prioridade: "emergencia",
          descricao: "Praticar exercícios de digitação",
        },
        {
          id: 3,
          ordem: "4",
          prioridade: "nao-emergencia",
          descricao: "Estudar a escala menor",
        },
      ],
    },
    {
      id: 1,
      titulo: "Desenho",
      tarefas: [
        {
          id: 0,
          ordem: "1",
          prioridade: "emergencia",
          descricao: "Terminar o desenho Y",
        },
        {
          id: 1,
          ordem: "2",
          prioridade: "pouca-emergencia",
          descricao: "Estudar o círculo cromático",
        },
        {
          id: 2,
          ordem: "3",
          prioridade: "nao-emergencia",
          descricao: "Praticar perspectiva",
        },
      ],
    },
  ],
};

const btnAdd = document.getElementById("btn-add");
const btnFechar = document.getElementById("fechar-aviso");
const aviso = document.getElementById("aviso");
const home = document.getElementById("home");
const user = document.getElementById("user");
const sair = document.getElementById("sair");

let idVisivel = 0;

btnAdd.addEventListener("click", (e) => {
  addVisibilidade(aviso);
});

home.addEventListener("click", (e) => {
  addVisibilidade(aviso);
});

user.addEventListener("click", (e) => {
  addVisibilidade(aviso);
});

sair.addEventListener("click", (e) => {
  addVisibilidade(aviso);
});

btnFechar.addEventListener("click", (e) => {
  removerVisibilidade(aviso);
});

function addVisibilidade(el) {
  el.classList.add("visivel");
}

function removerVisibilidade(el) {
  el.classList.remove("visivel");
}

function montaListas() {
  let str = "";
  let strTarefa = "";
  for (let i = 0; i < dbMock.listas.length; i++) {
    let lista = dbMock.listas[i];
    for (let j = 0; j < lista.tarefas.length; j++) {
      let tarefa = lista.tarefas[j];
      strTarefa += `<div class="tarefa">
      <p class="prioridade ${tarefa.prioridade}">${tarefa.ordem}</p>
      <p class="descricao">${tarefa.descricao}</p>
      <input type="checkbox" id="" />
    </div>`;
    }
    if (lista.id == idVisivel) {
      str += `<div class="lista-item visivel" id="${lista.id}">
    <h1 class="lista_titulo">${lista.titulo}</h1>
    <div class="tarefas">
      ${strTarefa}
    </div>
  </div>`;
    } else {
      str += `<div class="lista-item" id="${lista.id}">
    <h1 class="lista_titulo">${lista.titulo}</h1>
    <div class="tarefas">
      ${strTarefa}
    </div>
  </div>`;
    }
    strTarefa = "";
  }
  document.querySelector(".lista").innerHTML = str;
}

document.body.onload = () => {
  montaListas();
};
