import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

async function getAll() {
    let advertisements = null;
    const response = await axios.get(
        `${baseUrl}/advertisements`
    ).then(response => advertisements = response.data);
    return advertisements;
}

async function getById(id) {
    let advertisement = null;
    const response = await axios.get(`${baseUrl}/advertisements/${id}`).then(response => advertisement = response.data);
    return advertisement;
}

async function deleteById(id) {
    await axios.delete(`${baseUrl}/advertisements/${id}`);
}

async function post(title, description, url, price, category, userId, city) {
    let advertisement;
    const response = await axios.post(
        `${baseUrl}/advertisements`,
        JSON.stringify({ title: title, description: description, url: url, price: price, category: category, user: userId, city: city }),
        {
            headers: { "Content-Type": "application/json" }
        }
    ).then(response => advertisement = response.data);
    return advertisement;
}

export default {
    getAll,
    getById,
    deleteById,
    post
}