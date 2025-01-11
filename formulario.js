document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputNombre = document.getElementById('nombre');
    const inputComentario = document.getElementById('comentario');
    const inputCategoria = document.getElementById('categoria');
    const inputEvaluacion = document.getElementById('evaluacion');
    const tablaRegistros = document.getElementById('tabla-registros').getElementsByTagName('tbody')[0];
  
    let data = {
        opiniones: [],
        categorias: [],
        evaluacion: []
    };

    // Cargar los datos desde JSON o `localStorage`
    const cargarDatos = async () => {
        const localData = localStorage.getItem('data');
        if (localData) {
            data = JSON.parse(localData);
        } else {
            try {
                const response = await fetch('data.json');
                data = await response.json();
            } catch (error) {
                console.error('Error al cargar el archivo JSON:', error);
            }
        }
        llenarSelectores();
        actualizarTabla();
    };

    // Llenar los selectores de categorías y evaluaciones
    const llenarSelectores = () => {
        inputCategoria.innerHTML = '';
        inputEvaluacion.innerHTML = '';

        data.categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            inputCategoria.appendChild(option);
        });

        data.evaluacion.forEach(evaluacion => {
            const option = document.createElement('option');
            option.value = evaluacion;
            option.textContent = evaluacion;
            inputEvaluacion.appendChild(option);
        });
    };

    // Actualizar la tabla de registros
    const actualizarTabla = () => {
        tablaRegistros.innerHTML = '';
        data.opiniones.forEach((registro, index) => {
            const row = tablaRegistros.insertRow();
            row.insertCell(0).textContent = registro.nombre;
            row.insertCell(1).textContent = registro.comentario;
            row.insertCell(2).textContent = registro.categoria;
            row.insertCell(3).textContent = registro.evaluacion;

            const cellAcciones = row.insertCell(4);
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'mr-2');
            btnEditar.onclick = () => editarRegistro(index);

            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
            btnEliminar.onclick = () => eliminarRegistro(index);

            cellAcciones.appendChild(btnEditar);
            cellAcciones.appendChild(btnEliminar);
        });
    };

    // Agregar un nuevo registro
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = inputNombre.value.trim();
        const comentario = inputComentario.value.trim();
        const categoria = inputCategoria.value;
        const evaluacion = inputEvaluacion.value;

        if (!nombre || !comentario || !categoria || !evaluacion) {
            return alert('Todos los campos son obligatorios');
        }

        const nuevoRegistro = { nombre, comentario, categoria, evaluacion };
        data.opiniones.push(nuevoRegistro);

        guardarDatos();
        actualizarTabla();

        formulario.reset();
    });

    // Editar un registro
    const editarRegistro = (index) => {
        const registro = data.opiniones[index];
        inputNombre.value = registro.nombre;
        inputComentario.value = registro.comentario;
        inputCategoria.value = registro.categoria;
        inputEvaluacion.value = registro.evaluacion;

        data.opiniones.splice(index, 1);
        guardarDatos();
        actualizarTabla();
    };

    // Eliminar un registro
    const eliminarRegistro = (index) => {
        if (confirm('¿Estás seguro de eliminar este registro?')) {
            data.opiniones.splice(index, 1);
            guardarDatos();
            actualizarTabla();
        }
    };

    // Guardar los datos en `localStorage`
    const guardarDatos = () => {
        localStorage.setItem('data', JSON.stringify(data));
    };

    // Inicializar datos
    cargarDatos();
});
