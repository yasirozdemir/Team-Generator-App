var unassignedParticipantsList = document.getElementById(
  "unassigned-participants_list"
);

var nameInput = document.getElementById("name_input");
const addNewParticipant = function () {
  nameInput.addEventListener("keyup", (eventData) => {
    if (eventData.key === "Enter") {
      let newParticipantName = nameInput.value;
      if (newParticipantName != "") {
        let newParticipant = document.createElement("li");
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
    let newParticipant = document.createElement("li");
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

const shuffleUnassignedParticipants = function () {
  const unassignedParticipantsArray = document.querySelectorAll(
    "#unassigned-participants_list li"
  );

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
};

const generateTeams = function () {
  let memberPerTeam =
    shuffleUnassignedParticipants().length / numberInput.value;

  for (let i = 1; i <= numberInput.value; i++) {
    let newTeamList = document.createElement("div");
    newTeamList.className = "lists";
    newTeamList.setAttribute("id", `team-${i}`);
    newTeamList.innerHTML = `<h3>Team ${i}</h3>
    <hr>`;
    listContainer.appendChild(newTeamList);

    for (let k = 1; k <= memberPerTeam; k++) {
      newTeamList.appendChild(
        shuffleUnassignedParticipants()[
          shuffleUnassignedParticipants().length - 1
        ]
      );
      shuffleUnassignedParticipants().pop;
    }
    let lastTeam = document.getElementById(`team-${numberInput.value}`);
  }

  if (shuffleUnassignedParticipants().length > 0) {
    console.log(shuffleUnassignedParticipants());
  }

  // to prevent the function break remove event listener from the button
  if (numberInput.value >= 1) {
    generateButton.removeEventListener("click", generateTeams);
    numberInput.value = "";
    generateButton.disabled = true;
    numberInput.disabled = true;
    numberInput.setAttribute("placeholder", "TEAMS CREATED");
  }
};

generateButton.addEventListener("click", generateTeams);

window.onload = () => {
  addNewParticipant();
};
