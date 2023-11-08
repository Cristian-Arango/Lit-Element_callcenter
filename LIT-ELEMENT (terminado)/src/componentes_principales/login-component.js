import { LitElement, html } from "lit-element";
import tyleSheet from "../css/login-componentStyle.js";
import { Router } from "@vaadin/router";

export class Logins extends LitElement {
  constructor() {
    super();
    this.saludo = "";
    this.initializeFields(); // Llama a esta función para inicializar los campos si es necesario.
  }

  static get properties() {
    return {
      saludo: {
        type: String,
      },
    };
  }

  static get styles() {
    return [tyleSheet];
  }

  initializeFields() {
    this.updateComplete.then(() => {
      // Verifica si hay datos almacenados en localStorage
      const storedData = localStorage.getItem("datos");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const usersInput = this.shadowRoot.querySelector("#userss");
        const passInput = this.shadowRoot.querySelector("#passq");
        if (usersInput && passInput) { // Verifica si los elementos existen
          usersInput.value = parsedData.user;
          passInput.value = parsedData.password;
        }
        // También verifica si el checkbox debe estar marcado
        const rememberCheckbox = this.shadowRoot.querySelector("#remember");
        if (rememberCheckbox) {
          rememberCheckbox.checked = true;
        }
      }
    });
  }
  

  ingresaLogin() {
    let users = this.shadowRoot.querySelector("#userss").value;
    let pas = this.shadowRoot.querySelector("#passq").value;
    let check = this.shadowRoot.querySelector("#remember").checked;

    if (users == null || users == undefined || users == "") {
      this.saludo = "Atencion, Campo de user invalido";
      return false;
    }

    if (pas == null || pas == undefined || pas == "") {
      this.saludo = "Atencion, Campo de pass invalido";
      return false;
    } else {
      this.saludo = "";
      if (check == true) {
        let datos = {
          user: users,
          password: pas,
        };
        localStorage.setItem("datos", JSON.stringify(datos));
        Router.go("/COMPONENTE2");
      } else {
        Router.go("/COMPONENTE2");
      }
    }
  }

  mostarError() {
    return html`<div class="error">${this.saludo}</div>`;
  }

  render() {
    return html`
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div class="body">
        <div class="container">
          <div class="user">
            <span class="material-symbols-outlined" id="logo">
              person
            </span>
          </div>
          <div class="form">
            <div class="input-style">
              <span class="material-symbols-outlined" id="p">
                person_apron
              </span>
              <input
                type="text"
                class="u"
                name="usuario"
                id="userss"
                placeholder="Usuario"
                autofocus
              />
            </div>
            <div class="input-style">
              <span class="material-symbols-outlined" id="p">
                lock
              </span>
              <input
                type="password"
                class="u"
                name="usuario"
                id="passq"
                placeholder="Contraseña "
              />
            </div>
            <div class="form-footer">
              <div class="checkbox-container">
                <input type="checkbox" class="chec" id="remember" />
                <label for="remember">Recordarme</label>
              </div>
              <div class="forgot-container">
                <a href="#">Recuperar contraseña</a>
              </div>
            </div>
            <button @click=${(e) => this.ingresaLogin()}>LOGIN</button>
            ${this.mostarError()}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("login-component", Logins);
