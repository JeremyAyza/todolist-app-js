// Crear una lista
let todoItems=[];

// Crear una funcion que cree el objeto tarea y lo enliste
function addTodo(descripcion){
    const objetoTarea = {
        id: Date.now(),
        descripcion: descripcion,
        checked:false,
    };

    // añadir el objeto a la lista
    todoItems.push(objetoTarea);
    renderizar(objetoTarea);
};

function toggleDone(key){
    // busca el indice de la tarea del array cuyo id
    // coincida con la llave
    const index=todoItems.findIndex(item => item.id===Number(key));
    // cada vez que se llame a la funcion alternará el checkbox
    todoItems[index].checked=!todoItems[index].checked;
    // actualiza el elemento clickeado en el diseño
    renderizar(todoItems[index]);
    
}

function borrarTarea(key){
    const index = todoItems.findIndex(item => item.id === Number(key));
    const objetoTarea={
        deleted: true,
        ...todoItems[index]
    };
    todoItems=todoItems.filter(item=>item.id!==Number(key));
    renderizar(objetoTarea);
}


// seleccionar elementos html
const form=document.querySelector('.form');
// añadir evento submit al elemento formulario
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    // esto evita que la pagina se actualice 
    // cada vez que se responde el formulario

    // seleccionar el input y sy valor
    const input=document.querySelector('.input');
    const descripcion=input.value.trim();


    if (descripcion!=""){
        // llamo a la funcion para crear un nuevo objeto
        // y agregarlo a la lista
        addTodo(descripcion);
        // limpio el input
        input.value="";
        input.focus();
    }



});
// TODO ESTO SUSEDE AL ENVIAR LOS VALORES AL FORMULARIO (PRECIONAR ENTER)

// FUNCION PARA PLASMAR LAS TAREAS EN EL HTML

function renderizar(objetoTarea){

    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    // seleccion el elemnto ul del html

    const lista=document.querySelector('.lista-tareas');

    const item=document.querySelector(`[data-key='${objetoTarea.id}']`);

    if (objetoTarea.deleted){
        //eliminar los que tengan deleted true
        item.remove();

        if (todoItems.length === 0) lista.innerHTML = '';
        return


        return
    }
        

    // crea un constante de valor "done" si el objeto está chekeado
    //  o "" sino lo está  -------- _ Esto recientemente lo vi_ 
    const isChecked=objetoTarea.checked ? 'done':'';

    // crea un elemento li para insertar la descripcion de una tarea
    const node=document.createElement("li");
    // le registra una clase
    node.setAttribute('class',`item ${isChecked} li`);
    // le registra un "data-key??" , que será el id de la tarea
    node.setAttribute('data-key',objetoTarea.id);

    node.innerHTML=`
        <input id="${objetoTarea.id}" type="checkbox" class="checkbox"/>    
        <label for="${objetoTarea.id}" class="tick js-tick"></label>
        <span>${objetoTarea.descripcion}</span>
        <buttom class="delete-tarea js-delete-tarea boton-borrar">
        <i class="fa-solid fa-trash-can tacho"></i>
        </buttom> 
    `;

    //si el item ya se encuentra en el dom lo 
    //renderizará con una nueva 
    if (item){
        
        lista.replaceChild(node, item);
    } else{
        lista.append(node);
    }
}


const lista = document.querySelector('.lista-tareas');



lista.addEventListener('click', event => {
    
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
        
    }

    if(event.target.classList.contains('boton-borrar')){
        const itemKey=event.target.parentElement.dataset.key;
        borrarTarea(itemKey)
    }
    
});

document.addEventListener('DOMContentLoaded',() => {
    const ref=localStorage.getItem('todoItemsRef');
    if(ref){
        todoItems=JSON.parse(ref);
        todoItems.forEach(t=>{
            renderizar(t);
        });
    }
});










