 /**
 * Attaches a click event listener to the logout button to clear the authentication 
 * token from local storage and redirect the user back to the login page.
 */
 export function Logout(){
 const btnlogout =  document.getElementById('logout') 
 btnlogout.addEventListener('click',()=> {
    localStorage.removeItem('jwt')
     window.location.href = "/"   
 })
 }