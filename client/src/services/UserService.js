import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

async function login(username, password) {
    let token = "";
    const response = await axios.post(
        `${baseUrl}/login`,
        JSON.stringify({ username: username, password: password }),
        {
            headers: { "Content-Type": "application/json" }
        }
    ).then(response => token = response.data);
    return token;

}

async function signUp(username, password, phone) {
    let token = "";
    const response = await axios.post(
        `${baseUrl}/users`,
        JSON.stringify({ username: username, password: password, phone: phone }),
        {
            headers: { "Content-Type": "application/json" }
        }
    ).then(response => token = response.data);
    return token;

}

async function getByUsername(username) {
    let user = null;
    const response = await axios.get(`${baseUrl}/usernames/${username}`).then(response => user = response.data);
    return user;
}

async function getById(id) {
    let user = null;
    const response = await axios.get(`${baseUrl}/users/${id}`).then(response => user = response.data);
    return user;
}

export default {
    login,
    signUp,
    getByUsername,
    getById
}