const taskWrap = document.querySelector('.task');

const renderTask = async () => {
    let uri = 'http://localhost:3000/task';

    const res = await fetch (uri);
    const task = await res.json();

    let template = '';
    task.forEach(task => {
        template += `
            <button class="task-wrap">
                    <div class="task-description">
                        <h4>${task.title}</h4>
                        <p>${task.description.slice(0,60)}...</p>
                    </div>
            </button>  
        `
    });
    taskWrap.innerHTML = template;
    
}

window.addEventListener('DOMContentLoaded', () => renderTask ());
