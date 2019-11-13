const onLogin = async () => { 
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(res => {
            // Set Unique User ID in LocalStorage
            setLocalStorageItem('uuid', res.user.uid);
            // Redirect to Home after succesful login
            redirectToRoute('/');
        })
        .catch(err => {
            console.log(err);
        });
}

const onLogOut = () => {
    removeLocalStorageItem('uuid');
    redirectToRoute('/1819-wot-domotica/login.html');
}

const redirectToRoute = (route) => {
    window.location.href = route;
}

const setLocalStorageItem = (key, data) => {
    window.localStorage.setItem(key, data);
} 

const getLocalStorageItem = (key) => {
    return window.localStorage.getItem(key);
}

const removeLocalStorageItem = (key) => {
    window.localStorage.removeItem(key);
}

const loginBtn = document.querySelector('#loginBtn');

if(loginBtn) {
    loginBtn.addEventListener('click', onLogin);
}