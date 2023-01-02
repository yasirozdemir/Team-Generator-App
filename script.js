// GLOBAL VARIABLES
var unassignedParticipantsList = document.getElementById(
  "unassigned-participants_list"
);

var nameInput = document.getElementById("name_input");
var addParticipantButton = document.getElementById("add-participant_button");

var numberInput = document.getElementById("number_input");
var generateButton = document.getElementById("generate_button");

var listContainer = document.getElementById("list_container");

// function makeUnassignedParticipantsRemovable() {
//   let unassignedParticipantsNode = document.querySelectorAll(
//     "#unassigned-participants_list div"
//   );

//   let unassignedParticipantsArray = Array.from(unassignedParticipantsNode);

//   for (unassigned of unassignedParticipantsArray) {
//     unassigned.addEventListener("click", (eventData) => {
//       // eventData.target.outerHTML = "";
//       let indexToRemove = unassignedParticipantsArray.indexOf(eventData.target);
//       unassignedParticipantsArray.splice(indexToRemove, 1);
//       unassignedParticipantsList.innerHTML = "";
//       for (item of unassignedParticipantsArray) {
//         unassignedParticipantsList.appendChild(item);
//       }
//     });
//   }
// }

function addNewParticipant(eventData) {
  if (
    eventData.key === "Enter" ||
    eventData.target.id === "add-participant_button"
  ) {
    let newParticipantName = nameInput.value;
    if (newParticipantName != "") {
      let newParticipant = document.createElement("div");
      newParticipant.innerText = newParticipantName;
      newParticipant.className = "list-item";
      unassignedParticipantsList.appendChild(newParticipant);
      nameInput.value = "";
      // makeUnassignedParticipantsRemovable();
      return;
    } else {
      nameInput.setAttribute("placeholder", "Please insert a name!");
      return;
    }
  }
}

function shuffleUnassignedParticipants() {
  let unassignedParticipantsNode = document.querySelectorAll(
    "#unassigned-participants_list div"
  );
  let unassignedParticipantsArray = Array.from(unassignedParticipantsNode);

  let shuffledArray = [];
  let usedIndexes = [];

  let i = 0;
  while (i < unassignedParticipantsArray.length) {
    let randomIndex = Math.floor(
      Math.random() * unassignedParticipantsArray.length
    );
    if (!usedIndexes.includes(randomIndex)) {
      shuffledArray.push(unassignedParticipantsArray[randomIndex]);
      usedIndexes.push(randomIndex);
      i++;
    }
  }
  return shuffledArray;
}

function generateTeams() {
  let shuffledArray = shuffleUnassignedParticipants();

  let memberPerTeam = shuffledArray.length / numberInput.value;

  if (numberInput.value === "") {
    numberInput.value = "1";
    alert("Please first select the number of teams you want to create!");
    return;
  }

  if (shuffledArray.length > 0) {
    for (let i = 1; i <= numberInput.value; i++) {
      let newTeamListContainer = document.createElement("div");
      newTeamListContainer.className = "lists";
      newTeamListContainer.innerHTML = `<h3>Team ${i}</h3>
          <hr>
          <div id='team-${i}' class ='teams'></div>`;

      listContainer.appendChild(newTeamListContainer);
      let newTeamList = document.getElementById(`team-${i}`);

      if (shuffledArray.length > 0) {
        let newTeamMembers = [];
        for (let temp = 1; temp <= memberPerTeam; temp++) {
          newTeamMembers.push(shuffledArray[shuffledArray.length - 1]);
          shuffledArray.pop();
        }

        for (member of newTeamMembers) {
          if (typeof member != "undefined") {
            newTeamList.appendChild(member);
            // newTeamList.innerHTML += `<div>${member.innerText}</div>`;
          }
        }
      }
    }

    let unassignedParticipantsNode = document.querySelectorAll(
      "#unassigned-participants_list div"
    );
    let unassignedParticipantsArray = Array.from(unassignedParticipantsNode);

    let stillHaveUnassigned =
      unassignedParticipantsArray.length > 0 ? true : false;

    if (stillHaveUnassigned) {
      for (let i = 0; i < unassignedParticipantsArray.length; i++) {
        let newTeamList = document.getElementById(`team-${i + 1}`); // added 1 because i is starting from 0
        newTeamList.appendChild(unassignedParticipantsArray[i]);
      }
    }

    var assignedMembers = document.querySelectorAll(".teams > div");
    for (member of assignedMembers) {
      member.addEventListener("click", (eventData) => {
        let memberToMakeUnassigned = eventData.target;
        if (memberToMakeUnassigned.parentNode.childElementCount === 1) {
          listContainer.removeChild(
            memberToMakeUnassigned.parentNode.parentNode
          );
          memberToMakeUnassigned.parentNode.parentNode.innerHTML = "";
        }
        unassignedParticipantsList.appendChild(memberToMakeUnassigned);
      });
    }

    // to prevent the function break remove event listener from the button
    generateButton.removeEventListener("click", generateTeams);
    numberInput.value = "";
    generateButton.disabled = true;
    numberInput.disabled = true;
    numberInput.setAttribute("placeholder", "TEAMS CREATED");
  } else {
    alert("Please add some names!");
  }
}

function addingEventListeners() {
  nameInput.addEventListener("keyup", addNewParticipant);

  addParticipantButton.addEventListener("click", addNewParticipant);

  generateButton.addEventListener("click", generateTeams);
}

window.onload = () => {
  addingEventListeners();
  // makeUnassignedParticipantsRemovable();
};
