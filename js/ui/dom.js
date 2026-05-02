import { RenderHome } from "./chart.js"
export function Renderlogin() {
    const conatainer = document.getElementById('container')

    const loginhtml = `
      <div id="login-section" class="login-box">
            <h2>Welcome to zone01 profile ❄️</h2>
            <p class="pipip">Sign in to view your stats</p>
            
            <div class="input-group">
                <input type="text" id="username" placeholder="Username or Email" required>
            </div>
            
            <div class="input-group">
                <input type="password" id="password" placeholder="Password" required>
            </div>
            
            <button id="login-btn">Sign In</button>
            <p id="error-message" class="error-text"></p>
        </div>
    `
    conatainer.innerHTML = loginhtml
    
    Loginlogique()
}

export function Loginlogique() {
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const messageerror = document.getElementById('error-message')
    const inputbutton = document.getElementById('login-btn')

    inputbutton.addEventListener('click', async (event) => {
        const usernamevalue = username.value
        const passwordvalue = password.value
        if (!usernamevalue || !passwordvalue) {
            messageerror.textContent = "Please enter both username and password!";
            setTimeout(() => {
                messageerror.innerText = ""
            }, 5000)
            return
        }

        inputbutton.innerText = "loading..."
        setTimeout(async () => {
            const creadential = `${usernamevalue}:${passwordvalue}`

            const encodingcredential = btoa(creadential)
            console.log(" fjij ka ", encodingcredential)

            try {

                const response = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
                    method: "POST",
                    headers: {
                        'Authorization': `Basic ${encodingcredential}`,
                        'Content-Type': 'application/json'
                    }
                }
                )

                if (!response.ok) {
                    throw new Error("Invalid username or password!");
                }

                let tocken = await response.json()


                localStorage.setItem('jwt', tocken)

                messageerror.style.color = "#28a745"
                messageerror.innerText = `Success! Welcome ${usernamevalue}`

                setTimeout(() => {
                    window.history.replaceState({},'',"/profile")
                    RenderHome()
                }, 1000);

                console.log("Here is your JWT Token:", tocken)


            } catch (error) {
                messageerror.style.color = "#FF4C4C";
                messageerror.innerText = error.message
                setTimeout(() => {
                    messageerror.innerText = ""
                }, 5000)
                console.error("Error Details:", error.message)


            } finally {
                inputbutton.innerText = "Sign In"
            }
        }, 1000);


    })

}