import { Query } from "./query.js"

export async function fetchProfileData() {
    const token = localStorage.getItem('jwt')
    try {
        const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ query : Query })
        })
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.status)
        }

        const result = await response.json()

        if (result.errors) {
            throw new Error("Failed to fetch data from GraphQL")
        }
        return result.data
    } catch(error) {
         console.error(error.message)
   alert("Session expired or network error. Please login again.")
   localStorage.removeItem('jwt')
   window.location.href = "/"
    }
}
