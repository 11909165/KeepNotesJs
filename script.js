const addButton = document.querySelector('#add');

const updateLSData = () =>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    // whatever user add to note add one by one in an array
    textAreaData.forEach((note)=>{
        return notes.push((note.value));                  //return note to empty array notes;
    })
    
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');                 // create div
    note.classList.add('note');                                 // add class note to created div

    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "": "hidden" } "></div>                  
    <textarea class=" ${text ? "hidden": "" }"></textarea> `;
                                                                // text is not there show textarea
                                                                // text is there show hide textarea
    note.insertAdjacentHTML('afterbegin',htmlData);             // add data to the begining in the div

    // getting the ref
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');


    // deleting note
    deleteButton.addEventListener('click', ()=>{
        note.remove();                            // deleting note
        updateLSData();
    })

    // toggle
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', ()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })

    document.body.appendChild(note);     // appends child as last child of a node
}

// get data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note) => addNewNote(note));
};

addButton.addEventListener('click', ()=> addNewNote());