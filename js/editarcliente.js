(function(){
    let DB;
    const nombreInput = document.querySelector('#nombre');
    document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();

        //Verificar el ID de la URL
        const parameterosURL = new URLSearchParams(window.location.search);

        const idCliente = parameterosURL.get('id');

        if (idCliente) {
            //Esto se soluciona con async await
            setTimeout(()=>{
                obtenerCliente(idCliente);
            },1000);
           
        }
    });

    function obtenerCliente(id){
        const transaction = DB.transaction(['crm'],'readwrite');
        //Object store es para interactuar con la DB
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function(e){
            const cursor = e.target.result;
            if (cursor) {
                //El id es el que leemos del url
                if (cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
            else{
                
                
            }
        }

    }

    function llenarFormulario(datosCliente){
        const {nombre} = datosCliente;

        nombreInput.value = nombre;
    }

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm',1);
        abrirConexion.onerror = function(){
            console.log('Hubo un error');
        }
        abrirConexion.onsuccess = function(){
            DB=abrirConexion.result;
        }
       
    }
})();