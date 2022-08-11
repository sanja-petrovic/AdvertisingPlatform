export const getUsernameFromToken = () => {
    const token = sessionStorage.getItem("token");
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