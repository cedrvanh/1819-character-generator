const initFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyA3XHcX91KtZ6iEvPNq8fbIhstFZ2pdjng",
        authDomain: "pi-charactergenerator.firebaseapp.com",
        databaseURL: "https://pi-charactergenerator.firebaseio.com",
        projectId: "pi-charactergenerator",
        storageBucket: "pi-charactergenerator.appspot.com",
        messagingSenderId: "984679984646",
        appId: "1:984679984646:web:5c6c3c57e9128eded61d87"
    };

    firebase.initializeApp(firebaseConfig);
}

initFirebase();