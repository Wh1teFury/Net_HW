
const bodyPage = document.querySelector('body');
const sortBtn = document.getElementById("sort-btn");
const sortMenu = document.getElementById("sort-menu");
const taskBtn = document.getElementById("task-add");
const taskForm = document.getElementById("form-block");
const videoBtn = document.getElementById("show-video");
const videoDiv = document.getElementById("video-wrap");

sortBtn.addEventListener('click', () => changeBlock(sortMenu));
bodyPage.addEventListener('click', (el) =>  {
    let target = el.target;
    removeBlock(sortMenu, target)
});

taskBtn.addEventListener('click', () => changeBlock(taskForm));
bodyPage.addEventListener('click', (el) => {
    let target = el.target;
    removeBlock (taskForm, target)
});

videoBtn.addEventListener('click', () => changeBlock(videoDiv));
bodyPage.addEventListener('click', (el) => {
    let target = el.target;
    removeBlock (videoDiv, target)
});


function changeBlock (element) {
    setTimeout(function() {
        element.classList.remove("hide");
    }, 100);    
}

function removeBlock (item, target) {
    let emptyArray = [];
    const nodeList = item.querySelectorAll("*")
    for (element of nodeList) {
        emptyArray.push((target === element))
    }
    let listArray = [...new Set(emptyArray)];
    if (listArray[1] == null) {
        item.classList.add("hide");
    } 
}

document.addEventListener('click', (e) => {
    console.log(e.target)
})
