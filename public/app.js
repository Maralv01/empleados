const API = '/api/empleados';
const form = document.getElementById('empleado-form');
const lista = document.getElementById('empleados-list');
const alerta = document.getElementById('alerta');
const buscar = document.getElementById('buscar');
const cancelarBtn = document.getElementById('cancelar');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const empleado = {
    nombre: form.nombre.value.trim(),
    puesto: form.puesto.value.trim(),
    salario: form.salario.value
  };

  if (!empleado.nombre || !empleado.puesto || !empleado.salario) {
    mostrarAlerta('Todos los campos son obligatorios', 'danger');
    return;
  }

  const id = form._id.value;
  const url = id ? `${API}/${id}` : API;
  const method = id ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(empleado)
  });

  const data = await res.json();
  mostrarAlerta(id ? 'Empleado actualizado' : 'Empleado guardado', 'success');

  form.reset();
  cancelarBtn.classList.add('d-none');
  cargarEmpleados();
});

cancelarBtn.addEventListener('click', () => {
  form.reset();
  cancelarBtn.classList.add('d-none');
});

async function cargarEmpleados(filtro = '') {
  const res = await fetch(API);
  let empleados = await res.json();

  if (filtro) {
    empleados = empleados.filter(emp => emp.nombre.toLowerCase().includes(filtro.toLowerCase()));
  }

  lista.innerHTML = empleados.map(emp => `
    <tr>
      <td>${emp.nombre}</td>
      <td>${emp.puesto}</td>
      <td>$${parseFloat(emp.salario).toFixed(2)}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarEmpleado('${emp._id}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarEmpleado('${emp._id}')">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

async function editarEmpleado(id) {
  const res = await fetch(`${API}/${id}`);
  const emp = await res.json();
  form.nombre.value = emp.nombre;
  form.puesto.value = emp.puesto;
  form.salario.value = emp.salario;
  form._id.value = emp._id;
  cancelarBtn.classList.remove('d-none');
}

async function eliminarEmpleado(id) {
  if (confirm('¿Eliminar este empleado?')) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    mostrarAlerta('Empleado eliminado', 'warning');
    cargarEmpleados();
  }
}

function mostrarAlerta(mensaje, tipo) {
  alerta.textContent = mensaje;
  alerta.className = `alert alert-${tipo}`;
  alerta.classList.remove('d-none');
  setTimeout(() => alerta.classList.add('d-none'), 3000);
}

buscar.addEventListener('input', e => {
  cargarEmpleados(e.target.value);
});

cargarEmpleados();







