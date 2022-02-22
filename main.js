//подключение файла с данными. помещение его в переменную в глобальной зоне видимости + асинхрон, чтобы json успел прогрузиться
let db = [];
let entriesPerPage = 10;
const p = new Promise (function (resolve,reject) {
    fetch('./data.json')
    .then (function(resp){
        return resp.json();
    })
    .then(function(data){
        for (i = 0; i < data.length; i++) {
            db.push(data[i]);
        }
        resolve (data);
    })
})

p.then (db=>{
    sortTable(db);
    pagination(db)
    buildTable(db);
    columnHide(db)
})

function buildTable(data){
    let table = document.querySelector('.table-body');
        for (i=0; i<entriesPerPage; i++){
            let row = 
                `<tr class='rows'>
                    <td class="first-col">${data[i].name.firstName}</td>
                    <td class="second-col">${data[i].name.lastName}</td>
                    <td class="third-col">${data[i].about}</td>
                    <td class="fourth-col" style = "background-color: ${data[i].eyeColor}; color: white"></td>
                    <td class="edit"><img src="icons/pencil.png" alt=""></td>
                </tr>`;
            table.innerHTML += row;
        }
}

function sortTable (){
    const sortingButtons = document.querySelector('thead');

    sortingButtons.addEventListener('click', (e)=>{
        let table = document.querySelector('tbody');
        const el = e.target;
        const dataBase = db;
    
        if (el.cellIndex === 0){
            dataBase.sort((a, b) => a.name.firstName > b.name.firstName ? 1 : -1);
            document.querySelectorAll(".rows").forEach(e => e.remove());
            buildTable(dataBase);
        }
        if (el.cellIndex === 1) {
            dataBase.sort((a, b) => a.name.lastName > b.name.lastName ? 1 : -1);
            document.querySelectorAll(".rows").forEach(e => e.remove());
            buildTable(dataBase);
        }
        if (el.cellIndex === 2) {
            dataBase.sort((a, b) => a.about > b.about ? 1 : -1);
            document.querySelectorAll(".rows").forEach(e => e.remove());
            buildTable(dataBase);
        }
        if (el.cellIndex === 3) {
            dataBase.sort((a, b) => a.eyeColor > b.eyeColor ? 1 : -1);
            document.querySelectorAll(".rows").forEach(e => e.remove());
            buildTable(dataBase);
        }
    })
}

function pagination(){
    let pages = document.querySelector('.pagination');

    for (i = 1; i <= 5; i++){
        let li = document.createElement('li');
        li.innerHTML = i;
        pages.appendChild(li);
    }
    
    let paginationItems = document.querySelectorAll('li');
    for(let item of paginationItems){
        item.addEventListener('click', function(){
            let pageNum = +this.innerHTML;
            let start = (pageNum - 1) * entriesPerPage;
            let end = start + entriesPerPage;
            let entries = db.slice(start, end);
            document.querySelectorAll(".rows").forEach(e => e.remove());
            buildTable(entries);
        })
    }
}

function columnHide(){
    const hideButtons = document.querySelector('.hide');

    hideButtons.addEventListener('click', (e)=>{
        const el = e.target;
        console.log(el);
    })
}