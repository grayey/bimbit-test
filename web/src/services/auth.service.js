import { Store } from '../redux/Store';


export const fakeSignIn = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                userId: "1",
                Name: "Bimbi",
                email: "bimbi@gmail.com",
            });
        }, 1000);
    });
}

export const fakeSignUp = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                userId: "1",
                Name: "Bimbi",
                email: "bimbi@gmail.com",
            });
        }, 1000);
    })
}

export const fakeSignOut = () => {
    console.log("Log out successful");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    })
}

let authenticated = true;

export const getAuthStatus = () => authenticated;

Store.subscribe(state => {
    if (state)
        authenticated = state.auth.isUserLoggedIn
})