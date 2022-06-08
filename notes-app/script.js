const addBtn = document.querySelector('#add');
const notesEl = document.querySelector('.notes');

const notes = JSON.parse(localStorage.getItem('notes'));

addBtn.addEventListener('click',() => {
    addNewNote();
})


const updateLS = () => {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    })

    console.log(notes);

    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `<div class="notes">
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden" }">
        
    </div>   
    <textarea class="${text ? "hidden" : "" }">

    </textarea>
</div>`;

const editBtn = note.querySelector('.edit');
const deleteBtn = note.querySelector('.delete');
const main = note.querySelector('.main');
const textarea = note.querySelector('textarea');
textarea.value = text;
console.log(text);
main.innerHTML = marked.parse(text);
editBtn.addEventListener('click',()=> {
    main.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
})

deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
})

textarea.addEventListener('input', (event) => {
    const {value } = event.target;
    main.innerHTML = marked.parse(value);
    updateLS();
})
    document.body.appendChild(note);
}

if(notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}

