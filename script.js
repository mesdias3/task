const tbody = document.querySelector("tbody");

const nome = document.querySelector("#nomeItem");
const desc = document.querySelector("#descItem");
const valor = document.querySelector("#valorItem");

let items;

document.getElementById('produtoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if(desc.value === "" || valor.value === "" || nome.value === ""){
        return alert("Preencha todos os campos!");
    }else{
        items.push({
            nome: nomeItem.value,
            desc: desc.value,
            valor: Math.abs(valor.value).toFixed(2)
        });

        setItensBD();
        loadItens();
        limparFormulario();
    }
});

function limparFormulario() {
    document.getElementById('produtoForm').reset();
}

function deleteItem(index) {
    items.splice(index, 1);
    setItensBD();
    loadItens();
}

function insertItem(item, index) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.desc}</td>
        <td>R$ ${item.valor}</td>
        <td class="columnAction">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;

    tbody.appendChild(tr);
}

function loadItens() {
    items = getItensBD();
    items.sort((a, b) => a.valor - b.valor);
    tbody.innerHTML = "";
    items.forEach((item, index) => {
        insertItem(item, index);
    });
}

const getItensBD = () => JSON.parse(localStorage.getItem("task_db")) ?? [];
const setItensBD = () => 
    localStorage.setItem("task_db", JSON.stringify(items));

loadItens();
