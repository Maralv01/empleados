const API = '/api/empleados';
const form = document.getElementById('empleado-form');
const lista = document.getElementById('empleados-list');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const empleado = {
    nombre: form.nombre.value,
    puesto: form.puesto.value,  // Cambiado de 'cargo' a 'puesto'
    salario: form.salario.value
  };
  const id = form._id.value;
  const url = id ? `${API}/${id}` : API;
  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(empleado)
  });

  form.reset();
  cargarEmpleados();
});

async function cargarEmpleados() {
  const res = await fetch(API);
  const empleados = await res.json();
  lista.innerHTML = empleados.map(emp => `
    <tr>
      <td>${emp.nombre}</td>
      <td>${emp.puesto}</td>  <!-- Cambiado de emp.cargo a emp.puesto -->
      <td>${emp.salario}</td>
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
  form.puesto.value = emp.puesto;  // Cambiado de 'cargo' a 'puesto'
  form.salario.value = emp.salario;
  form._id.value = emp._id;
}

async function eliminarEmpleado(id) {
  if (confirm('¿Eliminar este empleado?')) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    cargarEmpleados();
  }
}

cargarEmpleados();



