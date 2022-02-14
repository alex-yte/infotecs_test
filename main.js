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
p.then (data=>{
    console.log(db);
    console.log(db[2]);
})

