const textarea = document.getElementById('textarea');
textarea.addEventListener("keyup", e =>{
    textarea.style.height = "63px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
});