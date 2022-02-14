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
    buildTable(dataBase)
    function buildTable(data){
        let table = document.querySelector('.people')
        for (i=0; i<data.length; i++){
            let row = 
                `<tr>
                    <td class="first-col">${data[i].name.firstName}</td>
                    <td class="second-col">${data[i].name.lastName}</td>
                    <td class="third-col">${data[i].about}</td>
                    <td class="fourth-col">${data[i].eyeColor}</td>
                </tr>`
            
        table.innerHTML += row;
        }
    }
})