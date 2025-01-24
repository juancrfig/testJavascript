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
const addTaskButton = document.querySelector('.add-task-button i');
const addTaskModal = document.querySelector('.container-modal-add-task');
const closeAddTaskModal = document.querySelector('.modal-add-task i');
const submitNewTaskBtn = document.querySelector('#submit-new-task-button');
const newTaskTitle = document.querySelector('#new-task-title');
const newTaskDescription = document.querySelector('#new-task-description');
const newTaskImage = document.querySelector('#new-task-image');
const newTaskStartDate = document.querySelector('#new-task-start-date');
const newTaskEndDate = document.querySelector('#new-task-end-date');
const newTaskTypeBoard = document.querySelector('#new-task-boards');



// EVENT LISTENER FOR CHECKING IF THERE'S AN ACTIVE SESSION

document.addEventListener('DOMContentLoaded', () => {
    const localItem = localStorage.getItem('sessionEmail'); 
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
        case addTaskButton:
            toggleModal(addTaskModal);
            break;
        case closeAddTaskModal:
            toggleModal(addTaskModal);
            break;
        case submitNewTaskBtn:
            toggleModal(addTaskModal);
            if (submitNewTask()) {
            };
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
        localStorage.setItem('sessionEmail', email)
        alert('Log In Success!');
    } else {
        alert('Incorrect data!');
    }
}

function signUp(email, password) {
    const tasks = [];
    const userData = [password, tasks];
    localStorage.setItem(email, JSON.stringify(userData));
}

function submitNewTask() {

    const title = newTaskTitle.value;
    const description = newTaskDescription.value;
    const image = newTaskImage.value;
    const startDate = newTaskStartDate.value;
    const endDate = newTaskEndDate.value;
    const board = newTaskTypeBoard.selectedIndex;

    let userEmail = localStorage.getItem('sessionEmail');
    userData = localStorage.getItem(userEmail);
    userData = JSON.parse(userData);

    const task = {
        "title": title,
        "description": description,
        "image": image,
        "startDate": startDate,
        "endDate": endDate,
        "board": board
    };
    userData[1].push(task);
    
    // ADD TASK INFORMATION TO THE USER'S LOCAL STORAGE
    localStorage.setItem(userEmail, JSON.stringify(userData));
}

// LOGIC FOR LOADING USER'S DATA

function loadUserData(email) {
    navUlElement.innerHTML = '';
    navUlElement.textContent = 'Welcome';
}