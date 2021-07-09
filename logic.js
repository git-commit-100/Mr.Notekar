// console.log('Js file');

//global selectors
const showNotesSection = document.getElementById("showNotesSection");
const modalWrap = document.querySelector(".modal-wrap");

//note class
class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    //unique id to all notes
    this.id = Math.random();
  }
}

//takeNote btn
let takeNote = document.getElementById("takeNote");
takeNote.addEventListener("click", function () {
  const noteTitle = document.getElementById("noteTitle");
  const noteContent = document.getElementById("noteContent");

  //validate notes
  if (noteTitle.value.length > 0 && noteContent.value.length > 0) {
    const newNote = new Note(noteTitle.value, noteContent.value);
    addNoteToUI(newNote);
    //clear inputs on submit
    noteTitle.value = "";
    noteContent.value = "";
    noteTitle.focus();
  } else if (noteTitle.value.length <= 0) {
    noteTitle.focus();
    // noteTitle.value = 'Default Note';
  } else if (noteContent.value.length <= 0) {
    noteContent.focus();
    // noteContent.value = 'Default Note';
  }
});

//add note to ui
function addNoteToUI(note) {
  const htmlofUiNote = document.createElement("div");
  htmlofUiNote.innerHTML = `
    <span hidden>${note.id}</span>
    <div class="col s12 m6 l4 card note hoverable white">
    <div class="card-content">
      <span class="card-title note-title">${note.title}</span>
      <div class="divider"></div>
      <p class="truncate note-body">${note.body}</p>
      <a href="#modal99" class="btn modal-trigger viewBtn col s6 l6 m6">View
        <span style="font-size: 18px;" class="iconify" data-icon="carbon:view" data-inline="true"></span>
      </a>
      <a class="btn delBtn col s6 l6 m6">Delete
        <span style="font-size: 18px;" class="iconify" data-icon="fluent:delete-20-regular" data-inline="true"></span>
      </a>
    </div>
  </div>
    `;

  showNotesSection.appendChild(htmlofUiNote);

  //note card buttons
const noteContainer = document.querySelector('.note');
noteContainer.addEventListener('click',function(e){
  console.log(e.target);



});
}
