/**
 * Renders a full-screen modal to notify the user of session expiration or connectivity issues.
 * Provides a direct action to clear invalid credentials and return to the login interface.
 */
export function RenderPopupError(){
         const container = document.getElementById('container')
        
     container.innerHTML = `
    <div id="popup-overlay">
        <div id="popup">
            <div class="popup-icon">⚠️</div>
            <h2>Session expired or network error.<br>Please login again.</h2>
            <button id="logout-popup">Go to Login</button>
        </div>
    </div>
`
        const btnlogout = document.getElementById('logout-popup')
        btnlogout.addEventListener('click', () => {
            localStorage.removeItem('jwt')
            window.location.href = "/"
        })
}