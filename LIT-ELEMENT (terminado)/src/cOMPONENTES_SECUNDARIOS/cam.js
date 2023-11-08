import { LitElement, html, css } from "lit-element";

export class Logins extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    /* Define tus estilos CSS aquí */
  `;

  guardarDatosEnLocalStorage() {
    const nombreInput = this.shadowRoot.getElementById("nombre");
    const apellidoInput = this.shadowRoot.getElementById("apellido");
    const documentoInput = this.shadowRoot.getElementById("documento");
    const celularInput = this.shadowRoot.getElementById("celular");
    const emailInput = this.shadowRoot.getElementById("email");
    const passwordInput = this.shadowRoot.getElementById("password");

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const nuevoUsuario = {
      nombre: nombreInput.value,
      apellido: apellidoInput.value,
      documento: documentoInput.value,
      celular: celularInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

    nombreInput.value = '';
    apellidoInput.value = '';
    documentoInput.value = '';
    celularInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';

    console.log('Usuario agregado a localStorage:', nuevoUsuario);
  }

  render() {
    return html`
      <div class="body">
        <div class="form">
          <p class="title">Register</p>
          <p class="message">Signup now and get full access to our app.</p>
          <div class="flex">
            <label>
              <input class="input" type="text" placeholder="Firstname" required id="nombre">
            </label>
            <label>
              <input class="input" type="text" placeholder="Lastname" required id="apellido">
            </label>
          </div>
          <div class="flex">
            <label>
              <input class="input" type="number" placeholder="documento" required id="documento">
            </label>
            <label>
              <input class="input" type="number" placeholder="Celular" required id="celular">
            </label>
          </div>
          <label>
            <input class="input" type="email" placeholder="Email" required id="email">
          </label>
          <label>
            <input class="input" type="password" placeholder="Password" required id="password">
          </label>
          <button class="submit" @click="${this.guardarDatosEnLocalStorage}">Submit</button>
        </div>
      </div>
    `;
  }
}

customElements.define("login-component", Logins);
