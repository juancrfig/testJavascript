const containerModalLogInElm = document.querySelector('.container-modal-login');
const logInBtn = document.querySelector('.log-in-button');
const signUpBtn = document.querySelector('.sign-up-button');
const logInBtnSubmit = document.querySelector('.submit-log-in');
const closeLogIn = document.querySelector('.modal-log-in i');
const containerModalSignUpElm = document.querySelector('.container-modal-sign-up');
const closeSignup = document.querySelector('.modal-sign-up i');


document.addEventListener('click', (e) => {

    switch (e.target) {
        case logInBtn:
            toggleModal(containerModalLogInElm);
            break;
        case closeLogIn:
            toggleModal(containerModalLogInElm);
            break;
        case signUpBtn:
            toggleModal(containerModalSignUpElm);
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