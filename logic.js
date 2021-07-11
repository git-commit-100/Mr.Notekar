// console.log('Js file');

//global selectors
const showNotesSection = document.getElementById("showNotesSection");
const noteTitle = document.getElementById("noteTitle");
const messageBox = document.getElementsByClassName("messageBox")[0];

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
    showAlertMsg("Please Add a Note Title", "noteAdd-msg");
    noteTitle.focus();
    // noteTitle.value = 'Default Note';
  } else if (noteContent.value.length <= 0) {
    showAlertMsg("Please Add Note Content", "noteAdd-msg");
    noteContent.focus();
    // noteContent.value = 'Default Note';
  }
});

//add note to ui
function addNoteToUI(note) {
  noteCount += 1;
  const htmlofUiNote = document.createElement("div");
  htmlofUiNote.classList.add("note");
  htmlofUiNote.innerHTML = `
    <span hidden>${note.id}</span>
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

  showNotesSection.appendChild(htmlofUiNote);
  showAlertMsg("Your Note was Added", "success-msg");

  //note card buttons : insert into modal and delete button
  showNotesSection.addEventListener("click", function (e) {
    if (e.target.classList.contains("viewBtn")) {
      const currentNote = e.target.closest(".note");
      var currentTitle = currentNote.querySelector(".note-title").textContent;
      var currentBody = currentNote.querySelector(".note-body").textContent;
      insertIntoModal(currentTitle, currentBody);
    }

    //deleting a note
    if (e.target.classList.contains("delBtn")) {
      const currentNote = e.target.closest(".note");
      currentNote.remove();
      executeOnce();
    }
  });
}

//insert note into modal
function insertIntoModal(title, body) {
  var parentElem = document.getElementById("modal99");
  var modalTitle = parentElem.querySelector(".modal-title");
  var modalBody = parentElem.querySelector(".modal-body");
  modalTitle.textContent = title;
  modalBody.textContent = body;
}

// prevent multiple calling
var lastClick = 0;
var delay = 500;
function executeOnce() {
  if(lastClick >= (Date.now() - delay)){
    return;
  }
  lastClick = Date.now();

  //main function calling
  showAlertMsg("Your Note was deleted", "delete-msg");
}

//message functionality
function showAlertMsg(msg, msgClass) {
  messageBox.style.display = "block";
  const msgDiv = document.createElement("div");
  msgDiv.className = "messageBody";
  msgDiv.classList.add("center");
  msgDiv.classList.add(msgClass);

  msgDiv.appendChild(document.createTextNode(msg));

  messageBox.appendChild(msgDiv);

  //timeout for msgDiv
  setTimeout(function () {
    msgDiv.remove();
    messageBox.style.display = "none";
  }, 2000);
  noteTitle.focus();
}
