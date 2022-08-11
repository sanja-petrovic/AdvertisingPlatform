import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/'

async function getAll() {
    let advertisements = null;
    const response = await axios.get(
        baseUrl + 'advertisements'
    ).then(response => advertisements = response.data);
    console.log(advertisements);
    return advertisements;
}

export default {
    getAll
}