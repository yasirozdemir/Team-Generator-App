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

var listContainer = document.getElementById("list_container");

const generateTeams = function () {
  // TODO randomize all unassigned names and assign them to new teams
  let unassignedParticipantsNode = document.querySelectorAll(
    "#unassigned-participants_list li"
  );
  for (let i = 1; i <= numberInput.value; i++) {
    let newTeamList = document.createElement("div");
    newTeamList.className = "lists";
    newTeamList.innerHTML = `<h3>Team ${i}</h3>
    <hr>`;
    listContainer.appendChild(newTeamList);
  }
};

var generateButton = document.getElementById("generate_button");
generateButton.addEventListener("click", generateTeams);

window.onload = () => {
  addNewParticipant();
};
