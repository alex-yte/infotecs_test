//подключение файла с данными. помещение его в переменную в глобальной зоне видимости + асинхрон, чтобы json успел прогрузиться
let db = [];
const p = new Promise (function (resolve,reject) {
    fetch('./data.json')
    .then (function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data);
        for (i = 0; i < data.length; i++) {
            db.push(data[i]);
        }
        resolve (data);
    })
})

p.then (db=>{
    const dataBase = db;
    buildTable(dataBase);
})

p.then(db=>{
    const dataBase = db;
    sortTable(dataBase);
})

function buildTable(data){
    let table = document.querySelector('.table-body');
    for (i=0; i<data.length; i++){
        let row = 
            `<tr class='rows'>
                <td class="first-col">${data[i].name.firstName}</td>
                <td class="second-col">${data[i].name.lastName}</td>
                <td class="third-col">${data[i].about}</td>
                <td class="fourth-col" style = "background-color: ${data[i].eyeColor}; color: white">${data[i].eyeColor}</td>
            </tr>`
    table.innerHTML += row;
    }
}

function sortTable (){
    const sortingButtons = document.querySelector('thead');

    sortingButtons.addEventListener('click', (e)=>{
        let table = document.querySelector('tbody');
        const el = e.target;
        const dataBase = db;
        console.log(el.cellIndex);
        if (el.cellIndex === 0){
            console.log('firstName');
            dataBase.sort((a, b) => a.name.firstName > b.name.firstName ? 1 : -1);
            console.log(table);
            console.log(dataBase);
            document.querySelectorAll(".rows").forEach(e => e.remove());
            buildTable(dataBase);
        }
        if (el.cellIndex === 1) {
            console.log('lastName');
            dataBase.sort((a, b) => a.name.lastName > b.name.lastName ? 1 : -1);
            console.log(table);
            document.querySelectorAll(".rows").forEach(e => e.remove());
            console.log(dataBase);
            buildTable(dataBase);
        }
        if (el.cellIndex === 2) {
            console.log('about');
            dataBase.sort((a, b) => a.about > b.about ? 1 : -1);
            console.log(table);
            document.querySelectorAll(".rows").forEach(e => e.remove());
            console.log(dataBase);
            buildTable(dataBase);
        }
        if (el.cellIndex === 3) {
            console.log('eyeColor');
            dataBase.sort((a, b) => a.eyeColor > b.eyeColor ? 1 : -1);
            console.log(table);
            document.querySelectorAll(".rows").forEach(e => e.remove());
            console.log(dataBase);
            buildTable(dataBase);
        }
    })
}