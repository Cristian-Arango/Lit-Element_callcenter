import { Logins } from "../componentes_principales/login-component"
     function funcionremember(){
        let datos={
            user:user,
            password:pas
        }

        localStorage.setItem("datos",JSON.stringify(datos) ) 

    }
