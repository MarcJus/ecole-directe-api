import axios from "axios"

async function request() {
    const params: URLSearchParams = new URLSearchParams()
    // eslint-disable-next-line quotes
    params.append("data", '{"identifiant": "MarcJus", "motdepasse": "Hen12goa"}')
    console.log(params.toString())
    const requete = await axios.post("https://api.ecoledirecte.com/v3/login.awp", params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    // console.log(requete.data)
}

request()