 export function Logout(){
 const btnlogout =  document.getElementById('logout') 
 btnlogout.addEventListener('click',()=> {
    localStorage.removeItem('jwt')
     window.location.href = "/"   
 })
 }