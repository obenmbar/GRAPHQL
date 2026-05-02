import { Logout } from './logout.js'

export function RenderHome() {
    const container = document.getElementById('container')
    const   htmlbuton = `<button id ="logout">logout</button>`
    container.innerText = " bienvenue frtlan"

    container.innerHTML +=  htmlbuton
    Logout()
}


