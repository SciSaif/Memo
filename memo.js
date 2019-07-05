const slider = document.querySelector('.slider');
const addBox = document.querySelector('.add-box');
const addBoxChildren = Array.from(document.querySelectorAll('.hide'));

addBox.addEventListener('click', () => {
    slider.classList.toggle('closed');
    console.log(addBoxChildren);
    addBoxChildren[0].classList.toggle('invisible');
    addBoxChildren[1].classList.toggle('invisible');
})