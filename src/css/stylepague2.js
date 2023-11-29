import { css } from "lit-element";

export default css`
#cajas{
  height: 70px;
  font-size: 40px;
  font-weight: bold;
  background-color: #646262;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  color: white;
}
#cajasi2{
  height: 70px;
  font-size: 30px;
  font-weight: bold;
  background-color:#646262;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  color: white;
}
#bu {
  background-color: gray;
}

#bu:hover {
  background-color: red;
}

#cajas2{
  width: 200px;
  height: 70px;
  font-size: 15px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color:#8F8D8D;
  color: white;
}
#cuadro{
  width: 60rem;
  height: 35.5rem;
  border-radius: 1rem;
  border-color:black;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.7);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover {
  color: black;
}

#modals {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.modals-content {
  background-color: #fff;
  width: 300px;
  margin: 10% auto;
  padding: 20px;
  border-radius: 5px;
}
/* Estilo CSS para el botón de corte de llamada */
.cut-call-button {
  background-color: #FF0000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
`;