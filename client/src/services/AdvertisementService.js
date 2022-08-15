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
    let token = localStorage.getItem("token");
    token = token.replace(/^"(.*)"$/, '$1');
    await axios.delete(`${baseUrl}/advertisements/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

async function post(title, description, url, price, category, userId, city) {
    let advertisement;
    let token = localStorage.getItem("token");
    token = token.replace(/^"(.*)"$/, '$1');
    const response = await axios.post(
        `${baseUrl}/advertisements`,
        JSON.stringify({ title: title, description: description, url: url, price: price, category: category, user: userId, city: city }),
        {
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
        }
    ).then(response => advertisement = response.data);
    return advertisement;
}

async function editById(id, title, description, url, price, category, city) {
    let advertisement;
    let token = localStorage.getItem("token");
    token = token.replace(/^"(.*)"$/, '$1');
    const response = await axios.put(
        `${baseUrl}/advertisements/${id}`,
        JSON.stringify({ title: title, description: description, url: url, price: price, category: category, city: city }),
        {
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
        }
    ).then(response => advertisement = response.data);
    return advertisement;
}

export default {
    getAll,
    getById,
    deleteById,
    post,
    editById
}