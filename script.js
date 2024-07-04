

document.addEventListener('DOMContentLoaded', () => {
    const listaTareas = document.getElementById('lista-tareas');
    const nuevaTareaInput = document.getElementById('nueva-tarea');
    const agregarBtn = document.getElementById('agregar-btn');
    const infoBtn = document.getElementById('info-btn');
    const info = document.getElementById('info');

    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    const renderizarTareas = () => {
        listaTareas.innerHTML = '';
        tareas.forEach((tarea, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${tarea}</span>
                <div>
                    <button class="btn btn-secondary btn-sm mr-2" onclick="editarTarea(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${index})">Eliminar</button>
                </div>
            `;
            listaTareas.appendChild(li);
        });
    };

    const guardarTareas = () => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    };

    agregarBtn.addEventListener('click', () => {
        const nuevaTarea = nuevaTareaInput.value.trim();
        if (nuevaTarea) {
            tareas.push(nuevaTarea);
            nuevaTareaInput.value = '';
            guardarTareas();
            renderizarTareas();
        }
    });

    window.eliminarTarea = (index) => {
        tareas.splice(index, 1);
        guardarTareas();
        renderizarTareas();
    };

    window.editarTarea = (index) => {
        const nuevaTarea = prompt('Editar tarea:', tareas[index]);
        if (nuevaTarea !== null) {
            tareas[index] = nuevaTarea;
            guardarTareas();
            renderizarTareas();
        }
    };

    infoBtn.addEventListener('click', () => {
        info.classList.toggle('d-block');
    });

    renderizarTareas();
});
