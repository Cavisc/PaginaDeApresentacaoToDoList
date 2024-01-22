let id = 0;

const numTarefas = document.getElementById("number");
const btnTasks = document.getElementById("form-btn");
const btnList = document.getElementById("save-btn");
const avisoCadastro = document.querySelector(".aviso_cadastro");
const btnNewList = document.querySelector(".aviso_cadastro-add");
const btnToLists = document.querySelector("aviso_cadastro-listas");

function montaCadastro() {
  let str = "";
  for (let i = 0; i < numTarefas.value; i++) {
    str += `
      <div class="form-tarefa">
                <span class="urgency">Urgency</span>
                <select name="urgency" id="urgency">
                  <option class="nao-emergencia" value="nao-emergencia">Not Urgent</option>
                  <option class="pouca-emergencia" value="pouca-emergencia">Little Urgent</option>
                  <option class="emergencia" value="emergencia">Urgent</option>
                </select>
                <label class="descricao" for="descricao">Description</label>
                <input type="text" id="descricao-tarefa">
              </div>
      `;
  }
  document.querySelector(".tarefas-cadastro").innerHTML = str;

  if (numTarefas.value < 1 || numTarefas.value > 10 || numTarefas.value == "") {
    btnList.classList.remove("visivel");
  } else {
    btnList.classList.add("visivel");
  }
}

btnTasks.addEventListener("click", (e) => {
  const inputTituloLista = document.getElementById("title");
  const tituloLista = document.getElementById("title").value;

  // Verifica titulo da lista e número de tarefas
  if (
    tituloLista == "" ||
    numTarefas.value < 1 ||
    numTarefas.value > 10 ||
    numTarefas.value == ""
  ) {
    if (tituloLista == "") {
      inputTituloLista.style.border = "1px solid red";
      alert("Attention!!\nPlease enter a title for list.");
    } else {
      inputTituloLista.style.border = "none";
    }
    if (
      numTarefas.value < 1 ||
      numTarefas.value > 10 ||
      numTarefas.value == ""
    ) {
      numTarefas.style.border = "1px solid red";
      alert("Attention!!\nPlease enter a valid number of tasks.");
    } else {
      numTarefas.style.border = "none";
    }
  } else {
    inputTituloLista.style.border = "none";
    numTarefas.style.border = "none";
    montaCadastro();
  }
});

btnList.addEventListener("click", (e) => {
  // Não recarregar página
  e.preventDefault();

  // Muda id das listas
  if (localStorage.hasOwnProperty("id")) {
    id = JSON.parse(localStorage.getItem("id")) + 1;
  }
  localStorage.setItem("id", JSON.stringify(id));

  // Receber os dados do formulário
  const tituloLista = document.getElementById("title").value;
  const tarefas = document.querySelectorAll(".form-tarefa");
  const tarefasCadastradas = [];

  // Dados para cada tarefa
  let idTarefa = 0;

  // Laço que salva info das tarefas
  for (let tarefa of tarefas) {
    const urgencia = tarefa.querySelector("#urgency").value;
    const inputDescricao = tarefa.querySelector("#descricao-tarefa");
    const descricao = tarefa.querySelector("#descricao-tarefa").value;
    if (descricao == "") {
      inputDescricao.style.border = "1px solid red";
      alert("Attention!!\nPlease enter a description for each task.");
      tarefasCadastradas.length = 0;
      break;
    } else {
      inputDescricao.style.border = "none";
      const tarefaCadastrada = {
        id: idTarefa,
        ordem: idTarefa + 1,
        prioridade: urgencia,
        descricao: descricao,
        terminado: false,
      };
      tarefasCadastradas.push(tarefaCadastrada);
      idTarefa += 1;
    }
  }

  // Array para listas
  let listasCadastradas = new Array();

  // Verifica se há propriedade no localStorage
  if (localStorage.hasOwnProperty("listasCadastradas")) {
    listasCadastradas = JSON.parse(localStorage.getItem("listasCadastradas"));
    localStorage.setItem("id", JSON.stringify(id));
  }

  // Add novo objeto no array criado
  listasCadastradas.push({
    id: id,
    titulo: tituloLista,
    tarefas: tarefasCadastradas,
  });

  if (tarefasCadastradas.length > 0) {
    localStorage.setItem(
      "listasCadastradas",
      JSON.stringify(listasCadastradas)
    );
  }

  avisoCadastro.classList.add("visivel");
});

btnNewList.addEventListener("click", (e) => {
  location.reload();
});
