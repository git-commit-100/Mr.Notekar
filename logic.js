// console.log('Js file');

//global selectors
const showNotesSection = document.getElementById("showNotesSection");
const modalWrap = document.querySelector(".modal-wrap");

//note count
var noteCount = 0;

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
  noteCount += 1;
  const htmlofUiNote = document.createElement("div");
  htmlofUiNote.innerHTML = `
    <span hidden>${note.id}</span>
    <div class="col s12 m6 l4 note card hoverable white">
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

  //note card buttons : insert into modal and delete button
    showNotesSection.addEventListener("click", function(e){
      if (e.target.classList.contains("viewBtn")) {
        var currentNote = e.target.closest(".note");
        var currentTitle = currentNote.querySelector(".note-title").textContent;
        var currentBody = currentNote.querySelector(".note-body").textContent;
        insertIntoModal(currentTitle, currentBody);
      }

      if (e.target.classList.contains("delBtn")) {
        var currentNote = e.target.closest(".note");
        currentNote.remove();
      }
    });
}

function insertIntoModal(title, body) {
  var parentElem = document.getElementById("modal99");
  var modalTitle = parentElem.querySelector(".modal-title");
  var modalBody = parentElem.querySelector(".modal-body");
  modalTitle.textContent = title;
  modalBody.textContent = body;
}
