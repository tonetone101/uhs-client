import { isAuthenticated } from "../auth";

export const create = (userId, token, carousel) => {
    return fetch(`${process.env.REACT_APP_API_URL}/carousel/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: carousel
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};