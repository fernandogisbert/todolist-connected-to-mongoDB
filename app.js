const addForm = document.querySelector('.add');

const listaTareas = document.querySelector('ul');


const generateTemplate = function(tarea){

    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${tarea}</span>
        
            <i class="far fa-trash-alt delete"></i>
            <i class="fas fa-pencil-alt pencil"></i>
        
        </li>
    `;

    listaTareas.innerHTML += html;
}

const url = 'http://localhost:3000/prueba';

addForm.addEventListener('submit', e => {
    e.preventDefault();

    const tarea = addForm.add.value.trim();

    if(tarea.length){
        generateTemplate(tarea);
        addForm.reset();
    }
    
    var data = {nombre: tarea};

    async function postData(url, data ) {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        // return response.json(); // parses JSON response into native JavaScript objects
        }
        
    postData(url, data)
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
});

// eliminar

listaTareas.addEventListener('click', e => {


    if(e.target.classList.contains('delete')){

        let paraborrar = e.target.parentElement
        // console.log(e.target)
        paraborrar.remove();
        let contenido = paraborrar.firstElementChild.textContent
        // console.log(paraborrar.firstElementChild.textContent)
        var elimina = {nombre: contenido };

        async function deleteData(url, data ) {
            // Opciones por defecto estan marcadas con un *
            const response = await fetch(url, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
        }
            
        deleteData(url, elimina);   
    }else if(e.target.classList.contains('pencil')){
        let tarea = e.target.parentElement.firstElementChild.textContent;

        console.log('pencil apretado', tarea);
        let actualizado = prompt('nuevo nombre');

        var nuevonombre = {nombre:tarea,
                        nuevonombre: actualizado };

        async function updateNombre(url, data ) {
            // Opciones por defecto estan marcadas con un *
            const response = await fetch(url, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
        }

        updateNombre(url,nuevonombre)
        
    }

   
})

// filtrar resultados

const search = document.querySelector('.search input');

const filtroTareas = ((termino)=>{

    let arrayTareas = Array.from(listaTareas.children);

    arrayTareas
        .filter(tarea => !tarea.textContent.toLowerCase().includes(termino))
        .forEach(element => element.classList.add('esconder'));

    arrayTareas
        .filter(tarea => tarea.textContent.toLowerCase().includes(termino))
        .forEach(element => element.classList.remove('esconder'));
});

search.addEventListener('keyup', () =>{

    const valorBusqueda = search.value.trim().toLowerCase();

    filtroTareas(valorBusqueda);

  
})


const bringTodos =  async() => {

    try{
        const todos = await fetch('http://localhost:3000/prueba', {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
        const resultados = await todos.json();
    
        console.log(resultados)

        for(let alumnos of resultados){
            generateTemplate(alumnos.nombre)
        }
    }catch(error){
        console.log(error)
    }
    
}

bringTodos();

