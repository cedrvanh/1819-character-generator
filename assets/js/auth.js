const onLogin = async () => { 
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(res => {
            // Set Unique User ID in LocalStorage
            setLocalStorageItem('uuid', res.user.uid);
            // Redirect to Home after succesful login
            redirectToRoute('/1819-character-generator');
        })
        .catch(err => {
            console.log(err);
        });
}

const redirectToRoute = (route) => {
    window.location.pathname = route;
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

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        const token = getLocalStorageItem('uuid');
        if(window.location.pathname == '/1819-character-generator') {
            if(!token) {
                redirectToRoute('/1819-character-generator/login.html')
            }
        }
    } else {
        redirectToRoute('/1819-character-generator/login.html')
    }
})

const loginBtn = document.querySelector('#loginBtn');

if(loginBtn) {
    loginBtn.addEventListener('click', onLogin);
}