// console.log('Js file');

//LOADING GIF
const loadingGif = document.querySelector(".loaderGif");
window.addEventListener("load", function () {
  this.setTimeout(removeLoading, 2000);
});

window.onbeforeunload = function scrollBodyTop() {
  //SCROLL TO TOP ON REFRESH
  window.scrollTo(0, -1);
};

function removeLoading() {
  loadingGif.classList.add("hidden");
}

//GLOBAL SELECTORS
const mainBody = document.querySelector("body");
const showNotesSection = document.getElementById("showNotesSection");
const noteTitle = document.getElementById("noteTitle");
const messageBox = document.getElementsByClassName("messageBox")[0];
var modalWrap = document.querySelector(".modal-wrap");
const noNotes = document.getElementById("noNotes");
var parentElem = document.getElementById("popup");
const popupCont = parentElem.querySelector(".popup-content");
var modalTitle = parentElem.querySelector(".popup-title");
var modalBody = parentElem.querySelector(".popup-body");

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
    noNotes.style.display = "none";
    addNoteToUI(newNote);
    insertIntoLocalStorage(newNote);

    //CLEARING INPUT FIELD ON SUBMIT
    noteTitle.value = "";
    noteContent.value = "";
    noteTitle.focus();
    showAlertMsg("Your Note was Added", "success-msg");
  } else if (noteTitle.value.length <= 0) {
    noteTitle.focus();
    showAlertMsg("Please Add a Note Title", "noteAdd-msg");
  } else if (noteContent.value.length <= 0) {
    noteContent.focus();
    showAlertMsg("Please Add Note Content", "noteAdd-msg");
  }
});

//ADD NOTE TO UI
function addNoteToUI(note) {
  noteCount += 1;
  //NOTES ARE AVAILABLE , SHOW IN UI
  const htmlofUiNote = document.createElement("div");
  htmlofUiNote.classList.add("note");
  htmlofUiNote.innerHTML = `
    <span hidden class='note-id'>${note.id}</span>
    <div class="col s12 m6 l4 card hoverable white">
    <div class="card-content">
      <span class="card-title note-title">${note.title}</span>
      <div class="divider"></div>
      <p class="truncate note-body">${note.body}</p>
      <a class="btn viewBtn col s6 l6 m6">View
        <span style="font-size: 18px;" class="iconify viewIcon" data-icon="carbon:view" data-inline="true"></span>
      </a>
      <a class="btn delBtn col s6 l6 m6">Delete
        <span style="font-size: 18px;" class="iconify delIcon" data-icon="fluent:delete-20-regular" data-inline="true"></span>
      </a>
    </div>
  </div>
    `;
  showNotesSection.appendChild(htmlofUiNote);
}

//MODAL OPEN
window.onclick = function (e) {
  if (e.target == modalWrap) {
    modalWrap.style.display = "none";
    mainBody.style.overflow = "";
  }
};

//NOTE CARD BUTTONS
showNotesSection.addEventListener("click", function (e) {
  //VIEW NOTE BTN
  if (
    e.target.classList.contains("viewBtn") ||
    e.target.classList.contains("viewIcon")
  ) {
    const currentNote = e.target.closest(".note");
    var currentTitle = currentNote.querySelector(".note-title").textContent;
    var currentBody = currentNote.querySelector(".note-body").textContent;
    insertIntoModal(currentTitle, currentBody);
  }

  //DELETE NOTE BTN
  if (
    e.target.classList.contains("delBtn") ||
    e.target.classList.contains("delIcon")
  ) {
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

  //TRIGGER MODAL
  modalWrap.style.display = "block";
  mainBody.style.overflow = "hidden";
  popupCont.scrollIntoView({ behavior: "smooth" });
}
//MODAL CLOSE
window.onclick = function (e) {
  if (e.target == modalWrap) {
    modalWrap.style.display = "none";
    mainBody.style.overflow = "";
  }
};

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
  window.scrollTo(0, 0);
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
    noNotes.style.display = "none";
  }
  return notesArr;
}

//DISPLAY NOTES IN UI WHEN WINDOW OPENS
function displayNotes(note) {
  const noteArr = getNotes();
  if (noteArr == null || noteArr.length == 0) {
    noNotes.style.display = "";
  }
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
  if (noteArr.length <= 1) {
    //MEANS ONLY 1 NOTE IS PRESENT , WHEN DELETED SHOW NO NOTES
    noNotes.style.display = "";
  }
  noteArr.forEach((note, index) => {
    if (note.id == noteId) {
      noteArr.splice(index, 1);
    }
    localStorage.setItem("mrNotekar.notes", JSON.stringify(noteArr));
  });
}
