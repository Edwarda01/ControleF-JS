const tbody = document.querySelector('tbody')
const descItem = document.querySelector('#desc')
const valor = document.querySelector('#amount')
const tipo = document.querySelector('#type')
const botao = document.querySelector('#btnNew')

const incomes = document.querySelector('.incomes')
const expenses = document.querySelector('.expenses')
const total = document.querySelector('.total')

let items;

btnNew.onclick = () => {
    if (descItem.value === '' || amount.value === '' || type.value === '') {
        return alert('preencha todos os campos, por favor.')
    }

    items.push({
        desc: descItem.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value,
    });

    setItensBD();

    loadItens();

    descItem.value = '';
    amount.value = '';
}

function deleteItem(index) {
    items.splice(index, 1);
    setItensBD();
    loadItens();
}

function insertItem(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.desc}</td>
        <td>R$ ${item.amount}</td>
        <td class='columnType'>${
        item.type === 'Entrada'
            ? '<i class="bx bxs-chevron-up-circle"></i>'
            : '<i class="bx bxs-chevron-down-circle"></i>'
        }</td>
        <td class="columnAction">
            <button onclick="deleteItem(${index})"></button>
        </td>
    `;

    tbody.appendChild(tr)
}

function loadItens() {
    items = getItensBD();
    tbody.innerHTML = '';
    items.forEach((item, index) => {
        insertItem(item, index);
    });
}

function loadItens() {
    items = getItensBD();
    tbody.innerHTML = '';
    items.forEach((item, index) => {
        insertItem(item, index);
    });

    getTotals();
}

function getTotals() {
    const amountIncomes = items
    .filter((item) => item.type === "Entrada")
    .map((transaction) => Number(transaction.amount));

    const amountExpenses = items
    .filter((item) => item.type === "Saída")
    .map((transaction) => Number(transaction.amount));

    const totalIncomes = amountIncomes
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

    const totalExpenses = Math.abs(
        amountExpenses.reduce((acc, cur) => acc + cur, 0))
        .toFixed(2);

    const totalItems = (totalIncomes - totalExpenses).toFixed(2);
    
    incomes.innerHTML = totalIncomes;
    expenses.innerHTML = totalExpenses;
    total.innerHTML = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem('db_items')) ?? [];
const setItensBD = () =>
    localStorage.setItem('db_items', JSON.stringify(items));

loadItens();