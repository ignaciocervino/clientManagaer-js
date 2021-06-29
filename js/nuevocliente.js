//Para mantener nuestras variables y funciones locales en este archivo
(function(){
    let DB;

    const formulario = document.querySelector('#formulario');
    document.addEventListener('DOMContentLoaded',()=>{
        connectarDB();
        formulario.addEventListener('submit',validarCliente);
    });

    function connectarDB(){
        const abrirConexion = window.indexedDB.open('crm',1);

        abrirConexion.onerror=function(){
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess=function(){
            DB = abrirConexion.result;
        };
    }

    function validarCliente(e){
        
        e.preventDefault();
        //Leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre===''||email===''||telefono===''||empresa==='') {
            imprimirAlerta('Todos los campos son obligatorios','error');
            return;
        }


    }

    function imprimirAlerta(mensaje,tipo){
        const alerta = document.querySelector('.alerta');
        //Si no hay una alerta previa
        if (!alerta) {
            const divAlerta = document.createElement('div');
            divAlerta.classList.add('px-4','py-3','rounded','mas-w-lg','mx-auto','mt-6','text-center','border','alerta');
            if (tipo==='error') {
                divAlerta.classList.add('bg-red-100','border-red-400','text-red-700');
            }
            else{
                divAlerta.classList.add('bg-green-100','border-green-400','text-green-700');
            }

            divAlerta.textContent = mensaje;

            formulario.appendChild(divAlerta);

            setTimeout(()=>{
                divAlerta.remove();
            },3000);
        }
        
    }
})();