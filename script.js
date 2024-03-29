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

// FUNCTIONS
function makeUnassignedParticipantsRemovable() {
  let unassignedParticipantsNode =
    document.getElementsByClassName("unassigned");

  for (unassigned of unassignedParticipantsNode) {
    unassigned.addEventListener("click", (eventData) => {
      let parentID = eventData.target.parentNode.getAttribute("id");
      localStorage.setItem("parentID", `${parentID}`);
      eventData.target.parentNode.removeChild(eventData.target);
    });
  }
}

function addNewParticipant(eventData) {
  if (
    eventData.key === "Enter" ||
    eventData.target.id === "add-participant_button"
  ) {
    let newParticipantName = nameInput.value;

    // checking if we have the same input
    let members = document.getElementsByClassName("list-item");
    let membersInnerTextArray = [];
    for (member of members) {
      membersInnerTextArray.push(member.innerText);
    }
    if (membersInnerTextArray.includes(`${newParticipantName}`)) {
      alert(`You already have ${newParticipantName} added as a member!`);
      return;
    }

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
      nameInput.classList.toggle("red-placeholder_class");
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
        if (!eventData.target.classList.contains("unassigned")) {
          eventData.target.classList.add("unassigned");
          let parentID = localStorage.getItem("parentID");
          let parent = document.getElementById(`${parentID}`);

          let teams = document.getElementsByClassName("teams");

          if (parent.childElementCount === 0) {
            let indexOfTeamToBeDeleted = parseInt(parentID.substring(5));

            for (let i = indexOfTeamToBeDeleted; i < teams.length; i++) {
              teams[i].removeAttribute("id");
              teams[i].setAttribute(
                "id",
                `team-${parseInt(
                  teams[i].parentNode.firstChild.innerText.substring(5) - 1
                )}`
              );

              teams[i].parentNode.firstChild.innerHTML = `Team ${parseInt(
                teams[i].parentNode.firstChild.innerText.substring(5) - 1
              )}`;
            }

            listContainer.removeChild(parent.parentNode);
          }
          if (parentID != "unassigned-participants_list") {
            unassignedParticipantsList.appendChild(eventData.target);
          }
        }
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
    numberInput.classList.toggle("red-placeholder_class");
  } else {
    alert("Please add some names!");
  }
}

let regenerateButton = document.getElementById("regenerate-teams_button");
let regenerateInput = document.getElementById("number_input-regenerate");

function regenerateTeams() {
  let numberOfTeamsExisted = document.getElementsByClassName("teams").length;
  if (numberOfTeamsExisted === 0) {
    alert("There's no team to regenerate!");
    return;
  }

  let numberOfTeams = regenerateInput.value;

  if (numberOfTeams > numberOfTeamsExisted) {
    alert(
      `Since there is ${numberOfTeamsExisted} teams already existed, the number of teams optimized to regenerate. If you want to regenerate the teams again you can set the number of teams max ${numberOfTeamsExisted}!`
    );
    regenerateInput.setAttribute("max", `${numberOfTeamsExisted}`);
    regenerateInput.value = 5;
  }

  if (numberOfTeams > 0) {
    let allMembers = document.querySelectorAll(".lists > div > div");

    let allMembersArray = Array.from(allMembers);
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
  // makeUnassignedParticipantsRemovable(); // TODO delete this part after you're done with the code (it's not necessary bc at the beginning you don't have any unassigned members)
};
