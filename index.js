/*const dbMock = {
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
        {
          id: 4,
          ordem: "5",
          prioridade: "nao-emergencia",
          descricao: "Estudar a escala menor",
        },
        {
          id: 5,
          ordem: "6",
          prioridade: "nao-emergencia",
          descricao: "Estudar a escala menor",
        },
        {
          id: 6,
          ordem: "7",
          prioridade: "nao-emergencia",
          descricao: "Estudar a escala menor",
        },
        {
          id: 7,
          ordem: "8",
          prioridade: "nao-emergencia",
          descricao: "Estudar a escala menor",
        },
        {
          id: 8,
          ordem: "9",
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
};*/

let listasCadastradas = new Array();

const btnAdd = document.getElementById("btn-add");
const btnFechar = document.getElementById("fechar-aviso");
const aviso = document.getElementById("aviso");
const home = document.getElementById("home");
const user = document.getElementById("user");
const sair = document.getElementById("sair");
const linksListas = document.querySelector("#listas");
const iconeListas = document.querySelector(".link_icone");

let linkAtivo = 0;
let visivel = "visivel";
let naoVisivel = "";

iconeListas.addEventListener("mouseenter", (e) => {
  iconeListas.innerHTML = feather.icons["frown"].toSvg();
});

iconeListas.addEventListener("mouseout", (e) => {
  iconeListas.innerHTML = feather.icons["meh"].toSvg();
});

linksListas.addEventListener("click", (e) => {
  let elClicado = e.target;
  let linkativado = document.getElementById(linkAtivo);

  if (
    elClicado.id == linkAtivo ||
    elClicado.id == "listas" ||
    elClicado == ""
  ) {
    return;
  } else {
    elClicado.classList.add("ativo");
    linkativado.classList.remove("ativo");
    linkAtivo = elClicado.id;
  }

  montaListas();
});

btnAdd.addEventListener("click", (e) => {
  addVisibilidade(cadastro);
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
  // Pega array com listas no LS
  if (localStorage.hasOwnProperty("listasCadastradas")) {
    listasCadastradas = JSON.parse(localStorage.getItem("listasCadastradas"));

    // Estruturação das listas
    let str = "";
    let strTarefa = "";
    for (let i = 0; i < listasCadastradas.length; i++) {
      let lista = listasCadastradas[i];
      for (let j = 0; j < lista.tarefas.length; j++) {
        let tarefa = lista.tarefas[j];
        if (tarefa.terminado == true) {
          strTarefa += `<div class="tarefa">
      <p class="prioridade ${tarefa.prioridade}">${tarefa.ordem}</p>
      <p class="descricao concluido">${tarefa.descricao}</p>
      <input type="checkbox" id="check" />
    </div>`;
        } else {
          strTarefa += `<div class="tarefa">
      <p class="prioridade ${tarefa.prioridade}">${tarefa.ordem}</p>
      <p class="descricao">${tarefa.descricao}</p>
      <input type="checkbox" id="check" />
    </div>`;
        }
      }

      if (lista.id == linkAtivo) {
        str += `<div class="lista-item ${visivel}" id="${lista.id}">
    <h1 class="lista_titulo">${lista.titulo}</h1>
    <div class="tarefas">
      ${strTarefa}
    </div>
  </div>`;
      } else {
        str += `<div class="lista-item ${naoVisivel}" id="${lista.id}">
    <h1 class="lista_titulo">${lista.titulo}</h1>
    <div class="tarefas">
      ${strTarefa}
    </div>
  </div>`;
      }
      strTarefa = "";
    }
    document.querySelector(".lista").innerHTML = str;
    riscaTarefa();
  } else {
    const image = `<img src="./assets/AddTasks.png" alt="lists" class="lista_imagem">`;
    document.querySelector(".lista").innerHTML = image;
  }
}

function montaLinks() {
  if (localStorage.hasOwnProperty("listasCadastradas")) {
    listasCadastradas = JSON.parse(localStorage.getItem("listasCadastradas"));
    const linksListas = document.querySelector("#listas");
    let strLinks = "";

    for (let i = 0; i < listasCadastradas.length; i++) {
      let lista = listasCadastradas[i];
      if (i == 0) {
        strLinks += `<li class="listas_item">
      <a href="#" id="${lista.id}" class="listas_link ativo">${lista.titulo}</a>
    </li>`;
      } else {
        strLinks += `<li class="listas_item">
      <a href="#" id="${lista.id}" class="listas_link">${lista.titulo}</a>
    </li>`;
      }
    }
    linksListas.innerHTML = strLinks;
  }
}

function riscaTarefa() {
  listasCadastradas = JSON.parse(localStorage.getItem("listasCadastradas"));

  for (let i = 0; i < listasCadastradas.length; i++) {
    const lista = listasCadastradas[i];

    for (let j = 0; j < lista.tarefas.length; j++) {
      if (document.querySelector("#check")) {
        const checks = document.querySelectorAll("#check");

        for (let k = 0; k < checks.length; k++) {
          const check = checks[k];
          let clicado = false;

          check.addEventListener("click", (e) => {
            const descricoes = document.querySelectorAll(".descricao");
            const descricao = descricoes[k];

            if (clicado && check.checked == false) {
              descricao.classList.remove("concluido");

              clicado = false;

              if (j == k) {
                lista.tarefas[k].terminado = false;
              }

              localStorage.setItem(
                "listasCadastradas",
                JSON.stringify(listasCadastradas)
              );
            } else {
              if (check.checked == true) {
                descricao.classList.add("concluido");

                clicado = true;

                if (j == k) {
                  lista.tarefas[j].terminado = true;
                }

                localStorage.setItem(
                  "listasCadastradas",
                  JSON.stringify(listasCadastradas)
                );
              }
            }
          });
        }
      }
    }
  }
}

function verficaRiscado() {
  listasCadastradas = JSON.parse(localStorage.getItem("listasCadastradas"));

  for (let i = 0; i < listasCadastradas.length; i++) {
    const lista = listasCadastradas[i];

    for (let j = 0; j < lista.tarefas.length; j++) {
      const tarefa = lista.tarefas[j];

      if (tarefa.terminado == true) {
        const descricoes = document.querySelectorAll(".descricao");
        const descricao = descricoes[j];
        const checks = document.querySelectorAll("#check");
        const check = checks[j];

        descricao.classList.add("concluido");
        check.checked = true;
      }
    }
  }
}

document.body.onload = () => {
  montaLinks();
  montaListas();
  verficaRiscado();
  riscaTarefa();
};
