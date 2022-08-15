const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const rawPayload = atob(encodedPayload);
        const user = JSON.parse(rawPayload);
        return user.username;
    } else {
        return null;
    }
}
const getIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const rawPayload = atob(encodedPayload);
        const user = JSON.parse(rawPayload);
        return user.id;
    } else {
        return null;
    }
}

export {
    getUsernameFromToken,
    getIdFromToken
}