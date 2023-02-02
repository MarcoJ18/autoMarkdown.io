"user strict";

const subcontainer = document.querySelector('.subcontainer');



subcontainer.addEventListener('click', (e)=>{
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    div.classList.add('div-effect');
    fragment.appendChild(div);
    subcontainer.appendChild(fragment);
    let y = e.clientY;
    let x = e.clientX;
    div.style.position = 'fixed';
    div.style.top = y + 'px';
    div.style.left = x + 'px';
    
})



