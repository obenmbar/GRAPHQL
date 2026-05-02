import { Logout } from './logout.js'
 import { fetchProfileData } from '../api/auth.js'
export  async function RenderHome() {
    const container = document.getElementById('container')
   const result = await fetchProfileData()
   console.log(result)
    const htmlbuton = `<button id ="logout">logout</button>`
    container.innerText = " bienvenue frtlan"

    container.innerHTML += htmlbuton
    Logout()
}

