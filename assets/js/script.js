// DEFINE VARIABLES FOR SIGN UP AND LOG IN

const navUlElement = document.querySelector('nav ul');
const containerModalLogInElm = document.querySelector('.container-modal-login');
const logInBtn = document.querySelector('.log-in-button');
const signUpBtn = document.querySelector('.sign-up-button');
const logInBtnSubmit = document.querySelector('#submit-log-in');
const closeLogIn = document.querySelector('.modal-log-in i');
const containerModalSignUpElm = document.querySelector('.container-modal-sign-up');
const closeSignup = document.querySelector('.modal-sign-up i');
const emailInputLogIn = document.querySelector('#email-log-in');
const passInputLogIn = document.querySelector('#pass-log-in');
const emailInputSignUp = document.querySelector('#email-sign-up');
const passInputSignUp = document.querySelector('#pass-sign-up');
const signUpBtnSubmit = document.querySelector('#submit-sign-up');



// EVENT LISTENER FOR CHECKING IF THERE'S AN ACTIVE SESSION

document.addEventListener('DOMContentLoaded', () => {
    const localItem = localStorage.getItem('sessionStatus'); 
    if (localItem) {
        loadUserData(localItem);
    }
})

// ADD EVENT LISTENER DIRECTLY IN DOCUMENT FOR EFFICIENCY AND READABILITY

document.addEventListener('click', (e) => {

    switch (e.target) {
        case logInBtn:
            toggleModal(containerModalLogInElm);
            break;
        case logInBtnSubmit:
            logIn(emailInputLogIn.value, passInputLogIn.value);
            break;
        case closeLogIn:
            toggleModal(containerModalLogInElm);
            break;
        case signUpBtn:
            toggleModal(containerModalSignUpElm);
            break;
        case signUpBtnSubmit:
            signUp(emailInputSignUp.value, passInputSignUp.value);
            break;
        case closeSignup:
            toggleModal(containerModalSignUpElm);
            break;
        default:
            break;
    }

})


function toggleModal(modalElement) {
    modalElement.classList.toggle('disabled');
    modalElement.classList.toggle('center-flex');
}


// LOGIC FOR SIGNING UP AND LOGGING IN

function logIn(email, password) {
    let userData = localStorage.getItem(email);
    userData = JSON.parse(userData)
    if (userData[0] === password) {
        userData[2] = true;
        localStorage.setItem(email, JSON.stringify(userData));
        localStorage.setItem('sessionStatus', email)
        alert('Log In Success!');
    } else {
        alert('Incorrect data!');
    }
}

function signUp(email, password) {
    const tasks = [];
    const userData = [password, tasks, session];
    localStorage.setItem(email, JSON.stringify(userData));
}


// LOGIC FOR LOADING USER'S DATA

function loadUserData(email) {
    
    navUlElement.innerHTML = '';
    navUlElement.textContent = 'Welcome';

    
}