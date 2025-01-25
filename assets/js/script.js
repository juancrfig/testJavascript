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
        console.log(localStorage.getItem(localItem))
        loadUserData(localItem);
    }
})

// LOGIC FOR LOADING USER'S DATA

function loadUserData(email) {
    navUlElement.innerHTML = '';
    navUlElement.textContent = 'Welcome';
    renderTasks(email);
}

// LOGIC FOR RENDERING TASK 
function renderTasks(email) {
    const userData = parseToJSON(email);
    const userTasks = userData[1];

    userTasks.forEach(element => {
        const title = element.title;
        const description = element.description;
        const image = element.image;
        const startDate = element.startDate;
        const endDate = element.endDate;
        const board = element.board;
        const liElement = createLiElement(title);
        assignToBoard(board, liElement);

        liElement.addEventListener('click', () => {
            generateModal(title, description, image, startDate, endDate);
        })
    });
}

function parseToJSON(email) {
    return JSON.parse(localStorage.getItem(email));
}

function createLiElement(title) {
    const liElement = document.createElement('li');
    liElement.textContent = title;
    return liElement;
}

const pendingBoardUl = document.querySelector('.pending ul');
const inProgressBoardUl = document.querySelector('.in-progress ul');
const completedBoardUl = document.querySelector('.completed ul');

function assignToBoard(board, liElement) {
    switch (board) {
        case 0:
            pendingBoardUl.appendChild(liElement);
            break;
        case 1:
            inProgressBoardUl.appendChild(liElement);
            break;
        case 2:
            completedBoardUl.appendChild(liElement);
            break;
    }
}

const dynamicContainerModal = document.querySelector('.dynamic-container-task');
const dynamicModal = document.querySelector('.dynamic-modal-task');

function generateModal(title, description, image, startDate, endDate) {

    dynamicModal.innerHTML = '<i class="fa-solid fa-x"></i>';
    const closeDynamicModal = document.querySelector('.dynamic-modal-task i');

    closeDynamicModal.addEventListener('click', () => {
        toggleModal(dynamicContainerModal);
    })
    
    const titleElm = document.createElement('h1');
    titleElm.textContent = title;
    const descriptionElm = document.createElement('p');
    descriptionElm.innerText = description;
    const imageElm = document.createElement('img');
    imageElm.setAttribute('src', image);
    const startDateData = document.createElement('p');
    startDateData.innerText = startDate;
    const endDateData = document.createElement('p');
    endDateData.textContent = endDate;

    dynamicModal.appendChild(titleElm)
    dynamicModal.appendChild(descriptionElm);
    dynamicModal.appendChild(imageElm);
    dynamicModal.appendChild(startDateData);
    dynamicModal.appendChild(endDateData);

    toggleModal(dynamicContainerModal);
}

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
            if (submitNewTask()) {
                toggleModal(addTaskModal);
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
    const userData = parseToJSON(email);
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

    if (!title || !description || !startDate || !endDate) {
        return false;
    } else {
    }

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
    return true;
}


