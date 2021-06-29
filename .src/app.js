if (true) {
  var notesDisplay = document.getElementsByClassName("displayEmpty")[0];
  notesDisplay.innerHTML =
    "Nothing To Show Here :( <br> Create a Note To See Here";
}

let noteObj;
var noteTitle = document.getElementById('noteTitle');
var noteTxtArea = document.getElementById('noteTxtArea');

function takeNote() {
  notesDisplay.classList.remove("displayEmpty");
  notesDisplay.innerHTML = "";

  let checkNotes =  localStorage.getItem('notes');

  if(checkNotes == null) {
  noteObj = {title: `${noteTitle.value}` , content :`${noteTxtArea.value}`};
  let myJson = JSON.stringify(noteObj);
  localStorage.setItem('notes',myJson);
  } else {
    let myJson = JSON.parse(checkNotes);
    console.log(myJson);
  }
}

function displayNote() {
  let noteDiv;
}

function deleteNote() {}

function markImp() {}
