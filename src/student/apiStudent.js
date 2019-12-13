import { isAuthenticated } from "../auth";

export const create = (userId, token, student) => {
    return fetch(`${process.env.REACT_APP_API_URL}/student/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: student
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};