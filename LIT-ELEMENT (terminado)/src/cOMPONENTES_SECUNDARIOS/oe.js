document.addEventListener("DOMContentLoaded", function() {
    const registroForm = document.getElementById("registroForm");
    const listaUsuarios = document.getElementById("listaUsuarios");
    let usuarios = obtenerUsuariosDesdeLocalStorage() || [];

    registroForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const documento = document.getElementById("documento").value;
        const password = document.getElementById("password").value;

        const usuario = {
            nombre,
            email,
            documento,
            password
        };

        usuarios.push(usuario);
        guardarUsuariosEnLocalStorage(usuarios);
        mostrarUsuarios();

        registroForm.reset();
    });

    const buscarBtn = document.getElementById("buscarBtn");
    buscarBtn.addEventListener("click", function() {
        const busquedaNombre = document.getElementById("busquedaNombre").value;
        const busquedaDocumento = document.getElementById("busquedaDocumento").value;
        buscarUsuarios(busquedaNombre, busquedaDocumento);
    });

    function mostrarUsuarios() {
        listaUsuarios.innerHTML = "";
        usuarios.forEach(function(usuario, index) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `Nombre: ${usuario.nombre}, Email: ${usuario.email}, Documento: ${usuario.documento}, Contraseña: ${usuario.password}`;
            listaUsuarios.appendChild(listItem);
        });
    }

    function buscarUsuarios(busquedaNombre, busquedaDocumento) {
        const resultados = usuarios.filter(function(usuario) {
            return (
                usuario.nombre.includes(busquedaNombre) && usuario.documento.includes(busquedaDocumento)
            );
        });

        listaUsuarios.innerHTML = "";

        if (resultados.length === 0) {
            const listItem = document.createElement("li");
            listItem.textContent = "No se encontraron resultados.";
            listaUsuarios.appendChild(listItem);
        } else {
            resultados.forEach(function(usuario) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `Nombre: ${usuario.nombre}, Email: ${usuario.email}, Documento: ${usuario.documento}, Contraseña: ${usuario.password}`;
                listaUsuarios.appendChild(listItem);
            });
        }
    }

    function guardarUsuariosEnLocalStorage(usuarios) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    function obtenerUsuariosDesdeLocalStorage() {
        const usuariosJSON = localStorage.getItem("usuarios");
        return JSON.parse(usuariosJSON);
    }

    mostrarUsuarios();
});
