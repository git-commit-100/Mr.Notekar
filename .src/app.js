console.log("Js File");

// adding a Note

let submitNote = document.getElementById("submitNote");
submitNote.addEventListener("click", function (e) {
  e.preventDefault();
  let noteTitle = document.getElementById("noteTitle");
  let noteTxtArea = document.getElementById("noteTxtArea");

  if (noteTitle.value || noteTxtArea.value == null) {
    notesArr = [];
  } else {
      notesArr = JSON.parse(noteTitle.value,noteTxtArea.value);
  }

  notesArr.push(noteTitle.value, noteTxtArea.value);
  localStorage.setItem('notes',JSON.stringify(notesArr));
    showNotes();
});

function showNotes() {
  let noteTitle = localStorage.getItem("notes")[3];
  let noteTxtArea = localStorage.getItem("notes")[1];

  let cardNote = document.getElementById("notesRender");

  let elemCardHtml = ` <div class="col-lg-4 my-3 col-md-6 col-sm-12">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${noteTitle}</h5>
        <p class="card-text">${noteTxtArea}</p>
        <button class="btn btn-outline-danger" style="width: 10rem;">Delete&nbsp;
          <i class="far fa-trash-alt"></i></button>
      </div>
    </div>`;

  cardNote.innerHTML = elemCardHtml;
}
