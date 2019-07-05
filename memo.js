const slider = document.querySelector('.slider');
const addBox = document.querySelector('.add-box');
const addBoxChildren = Array.from(document.querySelectorAll('.hide'));
const trash = document.querySelector('.fa-trash');
const save = document.querySelector('.save');
const cancel = document.querySelector('.cancel');
const title = document.querySelector('.title');
const notes = document.querySelector('.notes');
const list = document.querySelector('ul');
const audio = document.querySelector('audio');

var id = 1, store = [];

//load items
loadData();
function loadData(){
    var getstore =  JSON.parse(localStorage.getItem("storeItem"));
    console.log(getstore);
    if (getstore !== null) {
        
      getstore.forEach(elem => {
        //   console.log(elem);
          if (elem.trash===true) {
              return;
          }else{
              store.push(elem);

          }
    
      });

      console.log(store);


      store.forEach(elem => {
        var item = `<li>
                       <i class="fas fa-sticky-note fa-5x" job="edit" id="${elem.ID}"></i>
                       <p job="edit" class="titleContent" id="${elem.ID}">${elem.title}</p>
                       <p class="hiddenNotes" id="${elem.ID}">${elem.notes}</p>
                       <i class="fas fa-trash fa-3x" id="${elem.ID}" job="delete"></i>
                    </li>
                   `;
        const position = "beforeend";
        list.insertAdjacentHTML(position, item);
        
        
        
        //---updating id---
        if (elem.ID>= id) {
            id = elem.ID;
        }
      });
     id++;
    //  console.log(id);
     
    }else return;
};


addBox.addEventListener('click', slide);
function slide(){
    audio.currentTime = 0;
    audio.play();

    slider.classList.toggle('closed');
    addBoxChildren[0].classList.toggle('invisible');
    addBoxChildren[1].classList.toggle('invisible');
}

save.addEventListener('click', add);

function add() {
    audio.currentTime = 0;
    audio.play();

    const titleVal = title.value;
    const notesVal = notes.value;

    const item = `<li>
                      <i class="fas fa-sticky-note fa-5x" job="edit" id="${id}"></i>
                      <p job="edit" class="titleContent" id="${id}">${titleVal}</p>
                      <p class="hiddenNotes" id="${id}">${notesVal}</p>
                      <i class="fas fa-trash fa-3x" id="${id}" job="delete"></i>
                  </li>
                  `;

    list.insertAdjacentHTML("beforeend", item);

    slide();

    title.value = '';
    notes.value = '';
    
    //store
    store.push({
        "ID" : id,
        "trash" : false,
        "title" : titleVal,
        "notes" : notesVal
    });
    console.log(store);
    
    localStorage.setItem("storeItem", JSON.stringify(store));

     
    id++;
}

cancel.addEventListener('click', cancelAdd);
function cancelAdd() {
    audio.currentTime = 0;
    audio.play();

    title.value = '';
    notes.value = '';
    slide();
}



function removeItem(element) {
    audio.currentTime = 0;
    audio.play();

    const elementId = element.attributes.id.value;
    element.parentNode.remove(element);

    //---set trash to true in local storage---
    var getstore = JSON.parse(localStorage.getItem("storeItem"));
    console.log(getstore);
    var index = getstore.findIndex((elem) => {
        return elem.ID == elementId;
    })
    console.log(index);
    getstore[index].trash = true;
    console.log(getstore);
    store = getstore;
    localStorage.setItem("storeItem", JSON.stringify(getstore));
    
}

function editItem(element) {
    // const elementId = element.attributes.id.value;
    const titleVal = element.parentNode.querySelector('.titleContent').innerHTML;
    const notesVal = element.parentNode.querySelector('.hiddenNotes').innerHTML;

    removeItem(element);
    // display 
    slide();
    title.value = titleVal;
    notes.value = notesVal;
    notes.focus();
    
}


list.addEventListener("click", function(event){
    const element = event.target;  //return the clicked element inside list
    const elementJob = element.attributes.job.value;  //complete or delete
    if (elementJob == "delete") {
        removeItem(element);
    }else if (elementJob == "edit") {
        editItem(element);
    } 
})