// const onLogin = async () => { 
//     const email = document.querySelector('#email');
//     const password = document.querySelector('#password');

//     await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
//         .then(res => {
//             // Set Unique User ID in LocalStorage
//             setLocalStorageItem('uuid', res.user.uid);
//             // Redirect to Home after succesful login
//             redirectToRoute('/');
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// const redirectToRoute = (route) => {
//     window.location.pathname = route;
//     console.log(window.location.pathname);
// }

// const setLocalStorageItem = (key, data) => {
//     window.localStorage.setItem(key, data);
// } 

// const getLocalStorageItem = (key) => {
//     return window.localStorage.getItem(key);
// }

// const removeLocalStorageItem = (key) => {
//     window.localStorage.removeItem(key);
// }

// firebase.auth().onAuthStateChanged(user => {
//     if(user) {
//         const token = getLocalStorageItem('uuid');
//         if(window.location.pathname == '/') {
//             if(!token) {
//                 redirectToRoute('/login.html')
//             }
//         }
//     } else {
//         redirectToRoute('/login.html')
//     }
// })

// const loginBtn = document.querySelector('#loginBtn');

// if(loginBtn) {
//     loginBtn.addEventListener('click', onLogin);
// }