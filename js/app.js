// Navegación entre módulos
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.modulo').forEach(m => m.classList.remove('activo'));
        document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('activo'));
        link.classList.add('activo');
        document.getElementById(link.dataset.modulo).classList.add('activo');
    });
});

// Módulo Tareas (CRUD con localStorage)
function agregarTarea() {
    const input = document.getElementById('nuevaTarea');
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.push(input.value);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    input.value = '';
    mostrarTareas();
}
function editarTarea(index) {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const actual = tareas[index];

    const nueva = prompt('Editar tarea:', actual);
    if (nueva === null) return; // canceló

    const textoLimpio = nueva.trim();
    if (textoLimpio === '') return; // vacío, no se guarda

    tareas[index] = textoLimpio;
    localStorage.setItem('tareas', JSON.stringify(tareas));
    mostrarTareas();
}

function eliminarTarea(index) {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.splice(index, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    mostrarTareas();
}
function mostrarTareas() {
    const lista = document.getElementById('listaTareas');
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    lista.innerHTML = tareas.map((tarea, i) =>
    `<li class="${tarea.completada ? 'tarea-completada' : ''}">
        <span>${tarea.texto}</span>
        <div>
            <button class="btn-editar" onclick="editarTarea(${i})">Editar</button>
            <button class="btn-eliminar" onclick="eliminarTarea(${i})">Eliminar</button>
        </div>
    </li>`
    ).join('');

}

mostrarTareas(); // Carga inicial

// Módulo Calculadora
function calcular() {
    const n1 = parseFloat(document.getElementById('num1').value);
    const n2 = parseFloat(document.getElementById('num2').value);
    const op = document.getElementById('operacion').value;
    let res;
    switch(op) {
        case '+': res = n1 + n2; break;
        case '-': res = n1 - n2; break;
        case '*': res = n1 * n2; break;
        case '/': res = n2 ? n1 / n2 : 'Error'; break;
    }
    document.getElementById('resultado').textContent = `Resultado: ${res}`;
}
