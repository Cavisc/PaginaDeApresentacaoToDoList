const listas = document.getElementById("listas");
let elMenuSelected = 1;

const linkLista1 = document.getElementById("1");
const linkLista2 = document.getElementById("2");
const linkLista3 = document.getElementById("3");
const linkLista4 = document.getElementById("4");
const linkLista5 = document.getElementById("5");

const lista1 = document.getElementById("l1");
const lista2 = document.getElementById("l2");
const lista3 = document.getElementById("l3");
const lista4 = document.getElementById("l4");
const lista5 = document.getElementById("l5");

const btnAdd = document.getElementById("btn-add");
const btnFechar = document.getElementById("fechar-aviso");
const aviso = document.getElementById("aviso");
const home = document.getElementById("home");
const user = document.getElementById("user");
const sair = document.getElementById("sair");

listas.addEventListener("click", (e) => {
  const target = e.target.id;

  if (target == "lista" || target == "" || target == elMenuSelected) {
    return;
  }

  const elMenu = document.getElementById(target);
  const elMenuReturned = document.getElementById(elMenuSelected);

  elMenu.classList.add("ativo");
  elMenuReturned.classList.remove("ativo");

  if (target == 1) {
    lista1.classList.add("visivel");

    removeClass(lista2, lista3, lista4, lista5);
  } else if (target == 2) {
    lista2.classList.add("visivel");

    removeClass(lista1, lista3, lista4, lista5);
  } else if (target == 3) {
    lista3.classList.add("visivel");

    removeClass(lista1, lista2, lista4, linkLista5);
  } else if (target == 4) {
    lista4.classList.add("visivel");

    removeClass(lista1, lista2, lista3, lista5);
  } else if (target == 5) {
    lista5.classList.add("visivel");

    removeClass(lista1, lista2, lista3, lista4);
  }

  elMenuSelected = target;
});

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

function removeClass(el, el2, el3, el4) {
  el.classList.remove("visivel");
  el2.classList.remove("visivel");
  el3.classList.remove("visivel");
  el4.classList.remove("visivel");
}

function removeClassInfo(el, el2, el3, el4) {
  el.classList.remove("visivel");
  el2.classList.remove("visivel");
  el3.classList.remove("visivel");
  el4.classList.remove("visivel");
}

function addVisibilidade(el) {
  el.classList.add("visivel");
}

function removerVisibilidade(el) {
  el.classList.remove("visivel");
}
