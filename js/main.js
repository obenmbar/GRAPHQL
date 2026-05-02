import { Renderlogin } from "./ui/dom.js";
import { RenderHome } from "./ui/chart.js";




 function Inapp(){
 const tocken = localStorage.getItem('jwt')
   const container = document.getElementById('container')
   container.innerHTML =''
   const cuurentpath = window.location 
  if (tocken) {

    window.history.replaceState({},"","/profile")
    console.log("User is already logged in! Bypassing login...");
    RenderHome();
  }else  {
    window.history.replaceState({},"","/login")
    console.log("No token found. Showing login page...");
    Renderlogin()
  }
 }
 
document.addEventListener('DOMContentLoaded', ()=> {
Inapp();

})

