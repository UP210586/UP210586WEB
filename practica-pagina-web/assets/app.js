// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const nombreusuario = document.getElementById("nombreusuario");
const emailusuario = document.getElementById("emailusuario");
const listatareas = document.getElementById("listatareas");

// Codígo nesesario para mostrar información

userSelect.addEventListener("change", () => {
  const userId = parseInt(userSelect.value);

  getAllUsers()
    .then(function (json) {
      for (let i = 0; i < json.length; i++) {
        if (userId === json[i].id) {
          const { firstname, lastname, email } = json[i];
          nombreusuario.innerHTML = `${firstname} ${lastname}`;
          emailusuario.innerHTML = email;
          break;
        }
      }
    
      getAllTasks()
      .then(function (json) {
        console.log("JSON tareas recibido",json);
        const ul = document.createElement('ul');
        listatareas.innerHTML = "";
        for (let i = 0; i < json.tareas.length; i++) {
          if (userId === json.tareas[i].userId) {
            const li = document.createElement('li');
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            li.innerText = json.tareas[i].title;
            li.appendChild(checkbox);
            ul.appendChild(li);
  
          }
        }
        listatareas.appendChild(ul);
        console.log(json.tareas);
      })
    });
});




// Fin de codígo 

// Funciones
/**
 * Optiene una lista de todos los usuarios que pueden existir
 * @returns {Promise<User[]>}
 */
function getAllUsers() {
  return fetch('data/usuarios.json')
    .then(resp => resp.json());
}

/**
 * Optiene una lista de todas las tareas que hay de todos los usuarios
 * @returns {Promise<Task[]>}
 */
function getAllTasks() {
  return fetch('data/tareas.json')
    .then(resp => resp.json());
}

/**
 * @typedef User Definición de un usuario
 * @property {number} id Identificador unico del usuario
 * @property {string} firtsname Primer nombre del usuario
 * @property {string} lastname Apellido del usuario
 * @property {string} email Correo electronico del usuario
  */

/**
 * @typedef Task Definición de una tarea de usuario
 * @property {number} id Identificador unico de la tarea
 * @property {number} userId IDentificador del uaurio a quien corresponde la tarea
 * @property {string} title Titulo de la tarea
 * @property {boolean} completed Estado de la tarea si esta completada o no
 */

