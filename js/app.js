//IIFE - Las variables y funciones en este archivo quedan de forma local
(function(){
    document.addEventListener('DOMContentLoaded',()=>{
        crearDB();
    });

    function crearDB(){
        const crearDB = window.indexedDB.open('crm',1);

        crearDB.onerror = ()=>{
            console.log('Hubo un error');
        };

        crearDB.onsuccess = ()=>{
            DB = crearDB.resulst;
        };
        //Cuando se crea la base de datos va a registrar todas las columnas
        crearDB.onupgradeneeded = (e)=>{
            const db = e.target.result;
            const objectStore = db.createObjectStore('crm',{keyPath: 'id', autoIncrement: true});

            objectStore.createIndex('nombre','nombre',{unique: false});
            objectStore.createIndex('email','email',{unique: true});
            objectStore.createIndex('telefono','telefono',{unique: false});
            objectStore.createIndex('empresa','empresa',{unique: false});
            objectStore.createIndex('id','id',{unique: true});

            console.log('DB lista y creada');
        }
    }
})();