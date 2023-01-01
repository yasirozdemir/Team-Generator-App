var unassignedParticipantsList = document.getElementById(
  "unassigned-participants_list"
);

var nameInput = document.getElementById("name_input");
const addNewParticipant = function () {
  nameInput.addEventListener("keyup", (eventData) => {
    if (eventData.key === "Enter") {
      let newParticipantName = nameInput.value;
      if (newParticipantName != "") {
        let newParticipant = document.createElement("div");
        newParticipant.innerText = newParticipantName;
        newParticipant.className = "list-item";
        unassignedParticipantsList.appendChild(newParticipant);
        nameInput.value = "";
        return;
      } else {
        nameInput.setAttribute("placeholder", "Please insert a name!");
        return;
      }
    }
  });
};

var addParticipantButton = document.getElementById("add-participant_button");
addParticipantButton.addEventListener("click", () => {
  let newParticipantName = nameInput.value;
  if (newParticipantName != "") {
    let newParticipant = document.createElement("div");
    newParticipant.innerText = newParticipantName;
    newParticipant.className = "list-item";
    unassignedParticipantsList.appendChild(newParticipant);
    nameInput.value = "";
    return;
  } else {
    nameInput.setAttribute("placeholder", "Please insert a name!");
    return;
  }
});

var numberInput = document.getElementById("number_input");
var generateButton = document.getElementById("generate_button");

var listContainer = document.getElementById("list_container");

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

  if (memberPerTeam < 1) {
    numberInput.value = "1";
    alert("Number of members per team must be at least 1");
    return;
  }

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
      // console.log(typeof memberToMakeUnassigned.parentNode.parentNode);
      if (memberToMakeUnassigned.parentNode.childElementCount === 1) {
        // if (memberToMakeUnassigned.parentNode.parentNode != null) {
        //   memberToMakeUnassigned.parentNode.parentNode.nextElementSibling.firstChild.innerHTML =
        //     memberToMakeUnassigned.parentNode.parentNode.firstChild.innerHTML;
        // }
        listContainer.removeChild(memberToMakeUnassigned.parentNode.parentNode);
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
}

generateButton.addEventListener("click", generateTeams);

window.onload = () => {
  addNewParticipant();
};
