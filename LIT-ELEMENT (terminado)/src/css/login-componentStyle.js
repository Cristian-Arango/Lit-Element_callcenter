import { css } from "lit-element";

export default css
`
h1{
    color:black;
    text-shadow: 2px 2px;

}

.body{
    background-color:#D5D4Da5;
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    background: #bdc3c7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2c3e50, #bdc3c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
    align-items:center;
}

.container{
    background: rgba(221, 216, 216, 0.69);
    display: grid;
    position:relative;
    place-items: center;
    width:320px;
    height:200px;
    border: 1px solid black;
    border-radius: 10px 10px;
}
#logo{
    font-size: 6em; 
    color:white;
  }


.user{
    background-color: #042c4f;
    border-radius: 50%;
    position:absolute;
    top:-70px;

}

.input-style{
    width: 100%;
    margin-bottom:15px;
    background-color: #042c4f;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px;

}

.input-style #p{
    width: 50px;
    text-align: center;
    color: white;

}

.form-footer{
    width: 100%;
    display: flex;
    justify-content: space-between;
    
}
.forgot-container a{
    font-size:0.7em; 

}






.input-style input{
    width:100%;
    height:30px;
    // margin-bottom: -90px;
    border-top-right-radius: 10px ;
    border-bottom-right-radius: 10px ;
    border:none;
    font-family:Ginebra;
    font-size:0.6rem
    padding: 10px;
    background: #2e5b82;
    color: white;
    outline: none;
}
input::placeholder{
    color:white
}


form{
    width:100%;
    margin-top:10px;
    display:flex;
    align-items: center;
    flex-direction:column;  
    justify-content: center;
}

button{
    position: absolute;
    bottom: -49px;
    background: rgba(221, 216, 216, 0.69);
    border: none;
    color: white;
    width: 280px;
    padding: 10px 0;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    font-size: 16px;
    cursor: pointer;}

label{
    font-family:Ginebra;
    font-size:1.1rem
}




`
