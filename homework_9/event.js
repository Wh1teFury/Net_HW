
const bodyPage = document.querySelector('body');
const sortBtn = document.getElementById("sort-btn");
const sortMenu = document.getElementById("sort-menu");
const taskBtn = document.getElementById("task-add");
const taskForm = document.getElementById("form-block");

let timeCheck = '';

sortBtn.addEventListener('click', () => changeBlock(sortMenu));
bodyPage.addEventListener('click', () => removeBlock(sortMenu));
taskBtn.addEventListener('click', () => changeBlock(taskForm));
bodyPage.addEventListener('click', () => removeBlock(taskForm));

function changeBlock (element) {
    if (element.style.display == "block") {
        element.style = "display: none";
    } else {
        element.style = "display: block"; timeCheck = 1;
    }
}

function removeBlock (element) {
    if (!timeCheck) {
        element.style = "display: none";
    }
    if (timeCheck) { setTimeout(function () { timeCheck = ''; }, 100); }
}
