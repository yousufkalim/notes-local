//init
console.log(`Hey Developer! Welcome to Magic Notes`);
showNotes();

//If user adds a note, add it to local storage.
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function () {
	let title = document.getElementById("title");
	let noteTitle = localStorage.getItem("title");

	let addTxt = document.getElementById("input");
	let notes = localStorage.getItem("notes");

	let markVal = "false";
	let mark = localStorage.getItem("important");

	if (notes == null && noteTitle == null && mark == null) {
		notesTitleObj = [];
		notesObj = [];
		markObj = [];
	} else {
		notesTitleObj = JSON.parse(noteTitle);
		notesObj = JSON.parse(notes);
		markObj = JSON.parse(mark);
	}
	if (addTxt.value == "") {
		alert("You cannot add blank note");
	} else if (title.value == "") {
		notesTitleObj.unshift("Untitled");
		notesObj.unshift(addTxt.value);
		markObj.unshift(markVal);
	} else {
		notesTitleObj.unshift(title.value);
		notesObj.unshift(addTxt.value);
		markObj.unshift(markVal);
	}
	localStorage.setItem("title", JSON.stringify(notesTitleObj));
	localStorage.setItem("notes", JSON.stringify(notesObj));
	localStorage.setItem("important", JSON.stringify(markObj));
	title.value = "";
	addTxt.value = "";

	showNotes();
});

//Show Local Storage Data to Font-end
function showNotes() {
	let noteTitle = localStorage.getItem("title");
	let notes = localStorage.getItem("notes");
	let mark = localStorage.getItem("important");
	if (notes == null && noteTitle == null && mark == null) {
		notesTitleObj = [];
		notesObj = [];
		markObj = [];
	} else {
		notesTitleObj = JSON.parse(noteTitle);
		notesObj = JSON.parse(notes);
		markObj = JSON.parse(mark);
	}
	let html = "";
	notesObj.forEach(function (element, index) {
		if (markObj[index] == "true") {
			if (notesTitleObj[index] == "Untitled") {
				html += `
			<div class="card">
				<h2 style="color: red" class="card-title">Untitled ${index + 1}</h2>
				<p class="card-note">${element}</p>
				<button id="${index}" class="mark" onclick="markNote(this.id)">important</button>
				<button id="${index}" class="del" onclick="deleteNote(this.id)">Delete Note</button>
			</div>
			`;
			} else {
				html += `
			<div class="card">
				<h2 style="color: red" class="card-title">${notesTitleObj[index]}</h2>
				<p class="card-note">${element}</p>
				<button id="${index}" class="mark" onclick="markNote(this.id)">important</button>
				<button id="${index}" class="del" onclick="deleteNote(this.id)">Delete Note</button>
			</div>
			`;
			}
		} else {
			if (notesTitleObj[index] == "Untitled") {
				html += `
			<div class="card">
				<h2 class="card-title">Untitled ${index + 1}</h2>
				<p class="card-note">${element}</p>
				<button id="${index}" class="mark" onclick="markNote(this.id)">important</button>
				<button id="${index}" class="del" onclick="deleteNote(this.id)">Delete Note</button>
			</div>
			`;
			} else {
				html += `
			<div class="card">
				<h2 class="card-title">${notesTitleObj[index]}</h2>
				<p class="card-note">${element}</p>
				<button id="${index}" class="mark" onclick="markNote(this.id)">important</button>
				<button id="${index}" class="del" onclick="deleteNote(this.id)">Delete Note</button>
			</div>
			`;
			}
		}
	});
	let noteElm = document.getElementById("card-container");
	if (notesObj.length != 0) {
		noteElm.innerHTML = html;
	} else {
		noteElm.innerHTML = `<p>Nothing to show! Use "Add a Note" section above to add notes.</p>`;
	}
}

//function to mark note as important
function markNote(index) {
	let mark = localStorage.getItem("important");
	if (mark == null) {
		markObj = [];
	} else {
		markObj = JSON.parse(mark);
	}
	if (markObj[index] == "false") {
		markObj.splice(index, 1, "true");
	} else if (markObj[index] == "true") {
		markObj.splice(index, 1, "false");
	}

	localStorage.setItem("important", JSON.stringify(markObj));
	showNotes();
}

//function to delete a note
function deleteNote(index) {
	let noteTitle = localStorage.getItem("title");
	let notes = localStorage.getItem("notes");
	let mark = localStorage.getItem("important");
	if (notes == null && noteTitle == null && mark == null) {
		notesTitleObj = [];
		notesObj = [];
		markObj = [];
	} else {
		notesTitleObj = JSON.parse(noteTitle);
		notesObj = JSON.parse(notes);
		markObj = JSON.parse(mark);
	}
	notesTitleObj.splice(index, 1);
	notesObj.splice(index, 1);
	markObj.splice(index, 1);
	localStorage.setItem("title", JSON.stringify(notesTitleObj));
	localStorage.setItem("notes", JSON.stringify(notesObj));
	localStorage.setItem("important", JSON.stringify(markObj));
	showNotes();
}

//Search Function
let search = document.getElementById("search");
search.addEventListener("input", function () {
	let inputVal = search.value;
	let noteCards = document.getElementsByClassName("card");

	Array.from(noteCards).forEach(function (element) {
		let titleTxt = element.getElementsByTagName("h2")[0].innerText;
		let cardTxt = element.getElementsByTagName("p")[0].innerText;
		if (titleTxt.includes(inputVal) || cardTxt.includes(inputVal)) {
			element.style.display = "block";
		} else {
			element.style.display = "none";
		}
	});
});
