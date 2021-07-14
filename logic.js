// console.log('Js file');

//LOADING GIF
const loadingGif = document.querySelector('.loaderGif');
window.addEventListener('load',function() {
  this.setTimeout(removeLoading , 2000);
});

function removeLoading() {
  loadingGif.classList.add('hidden');
}

//GLOBAL SELECTORS
const showNotesSection = document.getElementById("showNotesSection");
const noteTitle = document.getElementById("noteTitle");
const messageBox = document.getElementsByClassName("messageBox")[0];
const elems1 = document.querySelectorAll(".modal");
const noNotes = document.getElementById('noNotes');
var parentElem = document.getElementById("modal99");
var modalTitle = parentElem.querySelector(".modal-title");
var modalBody = parentElem.querySelector(".modal-body");


//NOTE COUNT
var noteCount = 0;

//NOTE CLASS
class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    //unique id to all notes
    this.id = Math.random();
  }
}

//TAKE NOTE AS INPUT
let takeNote = document.getElementById("takeNote");
takeNote.addEventListener("click", function () {
  const noteContent = document.getElementById("noteContent");

  //VALIDATE NOTES
  if (noteTitle.value.length > 0 && noteContent.value.length > 0) {
    const newNote = new Note(noteTitle.value, noteContent.value);

    //INSERTING NOTE INTO UI AND LOCAL STORAGE
    addNoteToUI(newNote);
    insertIntoLocalStorage(newNote);

    //CLEARING INPUT FIELD ON SUBMIT
    noteTitle.value = "";
    noteContent.value = "";
    showAlertMsg("Your Note was Added", "success-msg");
    noteTitle.focus();
  } else if (noteTitle.value.length <= 0) {
    showAlertMsg("Please Add a Note Title", "noteAdd-msg");
    noteTitle.focus();
  } else if (noteContent.value.length <= 0) {
    showAlertMsg("Please Add Note Content", "noteAdd-msg");
    noteContent.focus();
  }
});

//ADD NOTE TO UI
function addNoteToUI(note) {
  noteCount += 1;
  const htmlofUiNote = document.createElement("div");
  htmlofUiNote.classList.add("note");
  htmlofUiNote.innerHTML = `
    <span hidden class='note-id'>${note.id}</span>
    <div class="col s12 m6 l4 card hoverable white">
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
  noNotes.classList.add('hidden');
  showNotesSection.appendChild(htmlofUiNote);
}

//NOTE CARD BUTTONS
showNotesSection.addEventListener("click", function (e) {
  //VIEW NOTE BTN
  if (e.target.classList.contains("viewBtn")) {
    const currentNote = e.target.closest(".note");
    var currentTitle = currentNote.querySelector(".note-title").textContent;
    var currentBody = currentNote.querySelector(".note-body").textContent;
    insertIntoModal(currentTitle, currentBody);
  }

  //DELETE NOTE BTN
  if (e.target.classList.contains("delBtn")) {
    const currentNote = e.target.closest(".note");
    const currentTitle = currentNote.querySelector(".note-title").textContent;
    const currentNoteId = currentNote.querySelector(".note-id").textContent;
    var wantToDel = window.confirm(
      "Are you sure you want to delete note with title " + currentTitle + " ?"
    );
    if (wantToDel) {
      removeFromLocalStorage(Number(currentNoteId));
      currentNote.remove();
      executeOnce();
    }
  }
});

//INSERT NOTE INTO MODAL
function insertIntoModal(title, body) {
  modalTitle.textContent = title;
  modalBody.textContent = body;

  //TRIGGER MATERILIZE MODAL
  var instances1 = M.Modal.init(elems1);
}

//PREVENT MULTIPLE CALLING OF FUNCTIONS
var lastClick = 0;
var delay = 500;
function executeOnce() {
  if (lastClick >= Date.now() - delay) {
    return;
  }
  lastClick = Date.now();

  //CALLING FUNCTION
  showAlertMsg("Your Note was deleted", "delete-msg");
}

//ALERT MESSAGE
function showAlertMsg(msg, msgClass) {
  messageBox.style.display = "block";
  const msgDiv = document.createElement("div");
  msgDiv.className = "messageBody";
  msgDiv.classList.add("center");
  msgDiv.classList.add(msgClass);

  msgDiv.appendChild(document.createTextNode(msg));

  messageBox.appendChild(msgDiv);

  //TIMEOUT FOR MSGDIV
  setTimeout(function () {
    msgDiv.remove();
    messageBox.style.display = "none";
  }, 2000);
  noteTitle.focus();
}

//GET NOTES FROM LOCAL STORAGE
function getNotes() {
  const notesFromLs = localStorage.getItem("mrNotekar.notes");
  let notesArr;
  if (notesFromLs == null) {

    //NO NOTES FROM LOCAL STORAGE 
    notesArr = [];
  } else {
    notesArr = JSON.parse(notesFromLs);
  }
  return notesArr;
}

//DISPLAY NOTES IN UI WHEN WINDOW OPENS
function displayNotes(note) {
  const noteArr = getNotes();
  noteArr.forEach((note) => {
    addNoteToUI(note);
  });
}

//RETRIEVE NOTES AS SOON AS PAGE LOADS
document.addEventListener("DOMContentLoaded", displayNotes);

//INSERT INTO LOCAL STORAGE
function insertIntoLocalStorage(note) {
  const notesArr = getNotes();
  notesArr.push(note);
  localStorage.setItem("mrNotekar.notes", JSON.stringify(notesArr));
}

//REMOVE FROM LOCAL STORAGE
function removeFromLocalStorage(noteId) {
  const noteArr = getNotes();
  noteArr.forEach((note, index) => {
    if (note.id == noteId) {
      noteArr.splice(index, 1);
    }
    localStorage.setItem("mrNotekar.notes", JSON.stringify(noteArr));
  });
}

