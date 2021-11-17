const form = document.querySelector('.form-wrap');

const createTask = async (e) => {
    e.preventDefault();

    const doc = {
        title: form.title.value,
        description: form.description.value
    }

    await fetch("http://localhost:3000/task", {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    })
    window.location.replace('/index.html');
}

form.addEventListener("submit", createTask );
