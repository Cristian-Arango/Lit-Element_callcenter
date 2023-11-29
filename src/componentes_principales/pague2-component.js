import { LitElement, html, css, property } from "lit-element";
import stylesScss from "../css/stylepague2.js";
import { Router } from "@vaadin/router";

export class Index2 extends LitElement {
  static get styles() {
    return [stylesScss];
  }
  static get properties() {
    return {
      llamadasRealizadas: { type: Number },
      campañas: { type: Array },
      usuarios: { type: Array },
      resultadosBusqueda: { type: Array },
    };
  }
  constructor() {
    super();
    this.usuarios = this.obtenerUsuariosDesdeLocalStorage();
    this.resultadosBusqueda = this.usuarios;
    this.llamadasRealizadas = this.obtenerLlamadasRealizadas();
    this.campañas = this.obtenerCampañasDesdeLocalStorage();
  }
  toggleCampañaActiva(campaña) {
    campaña.activa = !campaña.activa;
    this.guardarCampañasEnLocalStorage(this.campañas); // Guarda el estado actual de las campañas
    this.render(); // Vuelve a renderizar el componente para reflejar los cambios
  }

  buscarUsuarios() {
    const resultados = this.usuarios.filter((usuario) => {
      return (
        usuario.nombre.includes(this.busquedaNombre) &&
        usuario.documento.includes(this.busquedaDocumento)
      );
    });

    this.actualizarUsuarios(resultados);
  }

  actualizarBusquedaNombre(event) {
    this.busquedaNombre = event.target.value;
  }

  actualizarBusquedaDocumento(event) {
    this.busquedaDocumento = event.target.value;
  }

  actualizarUsuarios(resultados = this.resultadosBusqueda) {
    const listaUsuarios = this.shadowRoot.getElementById("listaUsuarios");
    listaUsuarios.innerHTML = "";
    if (resultados.length === 0) {
      listaUsuarios.innerHTML = "<li>No se encontraron resultados.</li>";
    } else {
      resultados.forEach((usuario) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `  <br> Nombre: ${usuario.nombre}, <br> Email: ${usuario.email},<br> Documento: ${usuario.documento},  <br> Contraseña: ${usuario.password},  <br> Campaña: ${usuario.opcions}`;
        listaUsuarios.appendChild(listItem);

        // Esto nos sirve para crear el boton de llmar
        const llamarButton = document.createElement("button");
        llamarButton.textContent = `Llamar a ${usuario.nombre}`;
        llamarButton.style.marginTop = "50px"; // Espacio a la izquierda del botón
        llamarButton.style.marginLeft = "40px"; // Espacio a la izquierda del botón
        llamarButton.style.backgroundColor = "red"; // Espacio a la izquierda del botón

        llamarButton.addEventListener("click", () =>
          this.abrirModalLlamda(usuario)
        );
        listItem.appendChild(llamarButton);
      });
    }
  }

  obtenerUsuariosDesdeLocalStorage() {
    const usuariosJSON = localStorage.getItem("usuarios");
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
  }
  obtenerCampañasDesdeLocalStorage() {
    const campañasJSON = localStorage.getItem("categoria");
    return campañasJSON ? JSON.parse(campañasJSON) : [];
  }
  renderUsuarios() {
    if (this.resultadosBusqueda.length === 0) {
      return html`<p>No se encontraron usuarios.</p>`;
    }

    return html`
      <ul>
        ${this.resultadosBusqueda.map(
          (usuario) => html` <li>
            NOMBRE:${usuario.nombre} -email: ${usuario.email} -
            documento:${usuario.documento}-
          </li>`
        )}
      </ul>
    `;
  }
  redireccio() {
    Router.go("/COMPONENTE3");
  }
  redirecciologin() {
    Router.go("/");
  }
  campaña() {
    Router.go("/CAMPANA");
  }
  equipos() {
    Router.go("/EQUIPOS");
  }
  abrirModal() {
    const openModalButton = this.shadowRoot.getElementById("openModal");
    const closeModalButton = this.shadowRoot.getElementById("closeModal");
    const modal = this.shadowRoot.querySelector("#myModal");
    const form = this.shadowRoot.getElementById("myForm");
    // Abrir la ventana modal

    modal.style.display = "block";
  }
  cerrarModal() {
    const modal = this.shadowRoot.querySelector("#myModal");
    modal.style.display = "none";
  }
  guardarDatosEnLocalStorage() {
    // Obtener los valores del formulario
    const nombreInput = this.shadowRoot.getElementById("nombre");
    const emailInput = this.shadowRoot.getElementById("email");
    const documentoInput = this.shadowRoot.getElementById("documento");
    const passwordInput = this.shadowRoot.getElementById("password");
    const opcionsinput = this.shadowRoot.getElementById("opcion");

    // Obtener los datos almacenados previamente en el localStorage
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const nuevoUsuario = {
      nombre: nombreInput.value,
      email: emailInput.value,
      documento: documentoInput.value,
      password: passwordInput.value,
      opcions: opcionsinput.value,
    };

    // Agregar el nuevo usuario a la matriz de usuarios
    usuariosGuardados.push(nuevoUsuario);

    // Guardar la matriz de usuarios en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    // eso nos sirve para limpiar datos
    nombreInput.value = "";
    emailInput.value = "";
    documentoInput.value = "";
    passwordInput.value = "";
  }
  abrirModalLlamda() {
    const modal = this.shadowRoot.getElementById("modals");
    const horaInicio = this.shadowRoot.getElementById("horaInicio");
    const contadorLlamadas = this.shadowRoot.getElementById("contadorLlamadas");
    const now = new Date();
    horaInicio.textContent = now.toLocaleTimeString();
    (modal.style.display = "block"), this.llamadasRealizadas++;
    contadorLlamadas.textContent = this.llamadasRealizadas;
    this.guardarLlamadasRealizadas(this.llamadasRealizadas);
  }
  guardarLlamadasRealizadas(valor) {
    localStorage.setItem("llamadasRealizadas", valor);
  }
  obtenerLlamadasRealizadas() {
    const valorAlmacenado = localStorage.getItem("llamadasRealizadas");

    return valorAlmacenado ? parseInt(valorAlmacenado) : 0;
  }
  cortarLlamada() {
    const modal = this.shadowRoot.getElementById("modals");
    // cuando cortemos la llamda se cierra el modal
    modal.style.display = "none";
  }
  filtrarPorCampaña(event) {
    const campañaSeleccionada = event.target.value;
    if (campañaSeleccionada === "") {
      //en caso de que no se selecciona se muestra todo
      this.resultadosBusqueda = this.usuarios;
    } else {
      // Filtra los usuarios por la campaña seleccionada
      this.resultadosBusqueda = this.usuarios.filter((usuario) => {
        return usuario.opcions === campañaSeleccionada;
      });
    }

    this.actualizarUsuarios();
  }

  render() {
    const campañasActivas = this.campañas.filter(
      (categoria) => categoria.activa
    );
    const contar = JSON.parse(localStorage.getItem("usuarios"));

    return html`
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />        <div class="body">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="d-flex ">
    <div class="pt-2 d-flex justify-content-left ">
        <div class="d-flex  flex-shrink-0 p-3 ml-5" style="width: 250px; background-color: rgb(201, 205, 207); border-radius: 1rem; height: 42.4rem;">
            <hr>
            <ul class="nav nav-pills flex-column mb-auto" style="width: 25rem;">
                <li class="nav-item">
                    <button  " class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; width: 13.5rem; font-size: 18px;" aria-current="page">
                    <span class="material-symbols-outlined" id="p">
                    person_apron
                    </span>Usuarios
                    </button>
                </li>
                <li class="nav-item pt-3">
                    <button " class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; width: 13.5rem; font-size: 18px;" aria-current="page",  @click=${(
                      e
                    ) => this.campaña()}>
                        <span class="material-symbols-outlined" id="p">
                        person_apron
                        </span> Campañas
                    </button>
                </li>
                <li class="nav-item pt-3">
                    <button class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; width: 13.5rem; font-size: 18px;" aria-current="page", @click=${(
                      e
                    ) => this.equipos()}>
                    <span class="material-symbols-outlined" id="p">
                    person_apron
                    </span> Equipos
                    </button>
                </li>
            </ul>
            <hr>
        </div>
    </div>
    &nbsp&nbsp&nbsp
    &nbsp&nbsp&nbsp
    <!-- cajas de texto-->
    <div class="pt-2  align-items-center">
        <div class="d-flex justify-content-left ">
            &nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp
            <div class="row d-flex">
                <div class="row g-0 text-center pt-3 ">
                    <div id="cajas" class="col-sm-6 col-md-4">40</div>
                    <div id="cajas2" class="col-md-5  pt-2">Usuarios Conectados: </div>
                </div>
                &nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp
                <div class="row g-0 text-center pt-3 ">
                    <div id="cajas" class="col-sm-6 col-md-4">10</div>
                    <div id="cajas2" class="col-md-5  pt-2">Usuarios Ausentes</div>
                </div>
                &nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp
                <div class="row g-0 text-center pt-3 " id="pir">
                        
                    <div id="cajas" class="col-sm-6 col-md-7">10</div>
                    <div id="cajas2" class="col-md-5  pt-2">Campañas Activas</div>
                </div>
            </div>
        </div>
        <br>

        <div id="cuadro" class="container border border-dark">
            <div class="d-flex p-3" >
                <div class=" border border-dark" style="width: 14rem; height: 33.3rem; border-radius: 1rem;">
                    <div>
                        <div class="d-flex  flex-shrink-0 p-3" style="width: 222px; background-color: rgb(201, 205, 207); border-top-left-radius: 1rem; border-top-right-radius: 1rem; height: 15rem; ">
                            <hr>
                            <ul class="nav nav-pills flex-column mb-auto" style="width: 25rem;">
                            <div class="input-group mt-1" style="width: 12rem;">
                            <input class="form-control font-weight-bold" id="busquedaDocumento" type="text" placeholder="Buscar por documento" @input="${
                              this.actualizarBusquedaDocumento
                            }" />
                        </div>
                        <div class="input-group mt-3" style="width: 12rem;">
                            <input class="form-control font-weight-bold" id="busquedaNombre" type="text" placeholder="Buscar por nombre" @input="${
                              this.actualizarBusquedaNombre
                            }" />
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="mt-2 text-center" style="width: 5rem; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;" @click="${
                              this.buscarUsuarios
                            }">Buscar</button>
                        </div>
                        
                            </ul>
                          
                            <hr>
                        </div>
                        
                    </div>
                    <ul id="listaUsuarios">

                        <!-- Los usuarios se mostrarán aquí -->
                        <br> <br>   


                      </ul>
                      <br> <br>   

                </div>
                <div>
                    <div class="d-flex justify-content-around ">
                        <div class=" ml-5">
                            <div class="row g-0 text-center pt-1 ">
                            <select id="busquedaCampaña" @change="${
                              this.filtrarPorCampaña
                            }">
                            ${campañasActivas.map(
                              (categoria) => html` ${categoria.nombre} `
                            )}
                            <option value="">Todas las campañas</option>
                            ${campañasActivas.map(
                              (categoria) =>
                                html`<option value="${categoria.nombre}">
                                  ${categoria.nombre}
                                </option>`
                            )}
                        </select>                             
                        
                        
                        
                        <div class="col-sm-6 col-md-4 pt-2 border border-secondary font-weight-bold" style="width: 25rem; font-size: 20px; height: 6rem; border-radius: 7px; margin-left:5px;"><p>Contador llamadas: <span id="contadorLlamadas"></span></p>
                                </div>

                            </div>       
                        </div>
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <div class="d-flex justify-content-right ml-5">
                            <button id="openModal" class="mt-1 text-center" style=" width: 10rem; height: 50px; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white; " @click=${(
                              e
                            ) => this.abrirModal()}>
                            Nuevo
                            </button>
                            <div class="input-group mt-3" style="width: 12rem;">
                            </select>
                        </div>
                        </div>
                    </div>
                    <div class="container border border-dark mt-4 ml-4" style="border-radius: 1rem; width: 40rem; height: 26.5rem; ">
                   <h2>Usuarios registrados:</h2>
                    <ul>
                       ${this.usuarios.map(
                         (usuario) =>
                           html`<li>
                             ${usuario.nombre} - ${usuario.email} -
                             ${usuario.documento}
                           </li>`
                       )}
                        
                    </div>
                    </ul>
                    </div>
                        
                    </div>
                </div>
                </div>
                <div class="input-group mt-3" style="width: 12rem;">
   
</div>
            </div>
            
        </div> 
    </div>   
</div> 


<div id="myModal" class="modal">
    <div class="modal-content">
    <span class="close" id="closeModal" @click=${
      this.cerrarModal
    }>&times;</span>
        <h2>Formulario</h2>
        <div id="myForm" class="registroForm">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="documento">Documento:</label>
        <input type="text" id="documento" name="documento" required>
        <br>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required>
        <br>
         <select id="opcion">
                                        ${campañasActivas.map(
                                          (categoria) =>
                                            html`<option>
                                              ${categoria.nombre}
                                            </option>`
                                        )}
                                        </select>
        
        <input type="submit" value="Enviar" @click=${
          this.guardarDatosEnLocalStorage
        }>
        </div>
    </div>
</div>




<div id="modals" class="modal">
<div class="modals-content">
    <p>Llamada en curso... </p>
    <p>Hora de inicio: <span id="horaInicio"></span></p>
    <button class="cut-call-button" @click=${
      this.cortarLlamada
    }>Cortar llamada</button>
</div>
</div>
    `;
  }
}

customElements.define("pague2-component", Index2);
