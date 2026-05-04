import { Renderlogin } from "./ui/dom.js";
import { RenderHome } from "./ui/chart.js";

 function Inapp(){
 const tocken = localStorage.getItem('jwt')
   const container = document.getElementById('container')
   container.innerHTML =''
  if (tocken) {

  
    console.log("User is already logged in! Bypassing login...");
    RenderHome();


  }else  { 
  
    console.log("No token found. Showing login page...");
    Renderlogin()
  }
 }
 
document.addEventListener('DOMContentLoaded', ()=> {
Inapp();
})

