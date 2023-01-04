// GLOBAL VARIABLES
var unassignedParticipantsList = document.getElementById(
  "unassigned-participants_list"
);

var nameInput = document.getElementById("name_input");
var addParticipantButton = document.getElementById("add-participant_button");

var generateButton = document.getElementById("generate_button");

var listContainer = document.getElementById("list_container");

let questionMark = document.querySelector("#input_container > div > svg");
let infoAboutPage = document.getElementById("info-about-page");

function makeUnassignedParticipantsRemovable() {
  let unassignedParticipantsNode =
    document.getElementsByClassName("unassigned");

  for (unassigned of unassignedParticipantsNode) {
    unassigned.addEventListener("click", (eventData) => {
      unassignedParticipantsList.removeChild(eventData.target);
    });
  }
}

function addNewParticipant(eventData) {
  if (
    eventData.key === "Enter" ||
    eventData.target.id === "add-participant_button"
  ) {
    let newParticipantName = nameInput.value;
    if (newParticipantName != "") {
      let newParticipant = document.createElement("div");
      newParticipant.innerText = newParticipantName;
      newParticipant.classList.add("list-item", "unassigned");
      unassignedParticipantsList.appendChild(newParticipant);
      nameInput.value = "";
      makeUnassignedParticipantsRemovable();
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
  for (item of unassignedParticipantsNode) {
    item.classList.remove("unassigned");
  }
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

function deleteEmptyTeams() {
  // deleting empty teams
  let newTeams = document.getElementsByClassName("teams");
  let emptyTeamsArray = [];
  for (let i = 0; i < newTeams.length; i++) {
    if (newTeams[i].childElementCount === 0) {
      emptyTeamsArray.push(newTeams[i].parentNode);
    }
  }
  for (team of emptyTeamsArray) {
    team.remove();
  }
}

function generateTeams() {
  var numberInput = document.getElementById("number_input");

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

    var assignedMembers = document.querySelectorAll(".teams .list-item");
    for (member of assignedMembers) {
      member.addEventListener("click", (eventData) => {
        let memberToMakeUnassigned = eventData.target;
        memberToMakeUnassigned.classList.add("unassigned");
        if (memberToMakeUnassigned.parentNode.childElementCount === 1) {
          // memberToMakeUnassigned.parentNode.parentNode.nextSibling.firstChild.innerHTML =
          //   memberToMakeUnassigned.parentNode.parentNode.firstChild.innerHTML;
          listContainer.removeChild(
            memberToMakeUnassigned.parentNode.parentNode
          );
        }
        unassignedParticipantsList.appendChild(memberToMakeUnassigned);
      });
      makeUnassignedParticipantsRemovable();
    }

    deleteEmptyTeams();

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

let regenerateButton = document.getElementById("regenerate-teams_button");

function regenerateTeams() {
  let numberOfTeams = document.getElementsByClassName("teams").length;

  if (numberOfTeams > 0) {
    let allMembers = document.querySelectorAll(".lists > div > div");

    let allMembersArray = Array.from(allMembers);
    // console.log(allMembersArray);
    let memberPerTeam = allMembersArray.length / numberOfTeams;

    let shuffledArray = [];
    let usedIndexes = [];

    let i = 0;
    while (i < allMembers.length) {
      let randomIndex = Math.floor(Math.random() * allMembers.length);
      if (!usedIndexes.includes(randomIndex)) {
        shuffledArray.push(allMembers[randomIndex]);
        usedIndexes.push(randomIndex);
        i++;
      }
    }

    for (let i = 1; i <= numberOfTeams; i++) {
      let newTeamList = document.getElementById(`team-${i}`);
      // console.log(newTeamList);

      if (newTeamList != null) {
        if (shuffledArray.length > 0) {
          let newTeamMembers = [];
          for (let temp = 1; temp <= memberPerTeam; temp++) {
            newTeamMembers.push(shuffledArray[shuffledArray.length - 1]);
            shuffledArray.pop();
          }

          for (member of newTeamMembers) {
            if (typeof member != "undefined") {
              newTeamList.appendChild(member);
            }
          }
        }
      }
    }
  } else {
    alert("There's no team to regenerate!");
  }
}

function addingEventListeners() {
  nameInput.addEventListener("keyup", addNewParticipant);

  addParticipantButton.addEventListener("click", addNewParticipant);

  generateButton.addEventListener("click", generateTeams);

  questionMark.addEventListener("click", () => {
    infoAboutPage.classList.toggle("visible");
  });

  regenerateButton.addEventListener("click", regenerateTeams);
}

window.onload = () => {
  addingEventListeners();
  makeUnassignedParticipantsRemovable(); // TODO delete this part after you're done with the code (it's not necessary bc at the beginning you don't have any unassigned members)
};
