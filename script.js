// Define variables for the game

let currentRoom = undefined;
let previousRoom = currentRoom;
let gameRunning = false;
let inputControls;
let ethnoamb = document.getElementById("forest-ambience");
const inventory = [];
const startBtn = document.querySelector("#s-btn");
const reloadBtn = document.querySelector("#r-btn");
const persDiv = document.getElementById('pers-output');
const textAudio = new Audio("Sounds/typewriterKey.wav");
const controlCheckbox = document.querySelector('#control-toggle');
const textInputControl = document.querySelector('#input-container');
const btnInputControl = document.querySelector('#btn-controls-div');
textAudio.volume = .05;

function controlToggle(){
  if (controlCheckbox.checked){
    textInputControl.classList.add('hide');
    textInputControl.classList.remove('input-container-flex');
    btnInputControl.classList.remove('hide');
    btnInputControl.classList.add('btn-container-flex');
  } else {
    textInputControl.classList.remove('hide')
    textInputControl.classList.add('input-container-flex')
    btnInputControl.classList.add('hide')
    btnInputControl.classList.remove('btn-container-flex')
  }
}
// #region START GAME
// let ethnoamb = document.getElementById('forest-ambience');
function hideBtn() {
  let startBtn = document.querySelector("#s-btn");
  let reloadBtn = document.querySelector("#r-btn");
  let persDiv = document.getElementById('pers-output');
  setTimeout(() => {
    if (
      startBtn.className === "play-btn" &&
      reloadBtn.className === "hide"
    ) {
      startBtn.className = "hide";
      reloadBtn.className = "play-btn";
      startGame();
    } else if (
      startBtn.className === "hide" &&
      reloadBtn.className === "play-btn"
    ) {
      startBtn.className = "play-btn";
      reloadBtn.className = "hide";
      persDiv.innerHTML = "";
      // pauseAudio('Sounds/forestEthnoAmbience.wav');
      pauseLoop();
    }
  }, 150);
}
// #endregion



// #region START & END GAME
function startGame() {
  if (!gameRunning){
    gameRunning = true;
    currentRoom = 1;
    previousRoom = 1;
    document.getElementById('pers-output').innerHTML = '';
    document.getElementById("room-id").innerHTML = '';
    document.getElementById("room-id").innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
      // audio.play();
      // playAudio();
      // playAudio('Sounds/forestEthnoAmbience.wav');
      playLoop();
    initializeControls();  
    document.getElementById("pers-output").innerHTML +=
    "<p>Welcome to the game! Type 'help' for a list of commands. Actually don't bother, just use the buttons.</p>" +
    "<p>You awaken, confused. Your head aches with the furor of Jack Rebney.</p>";
    printRoomDescription();
  }
}

function endGame() {
  if (gameRunning){
    gameRunning = false;
    initializeControls();
  document.getElementById('pers-output').innerHTML = '';
  currentRoom = undefined;
  document.getElementById("pers-output").innerHTML += "Game ended";
}
}
// #endregion

// #region Audio Control  ===================================

function audioControl(src, playPause) {
  if (playPause == "play") {
    new Audio(src).play();
  } else {
    new Audio(src).pause();
  }
}

function playAudio(src) {
  const audio = new Audio(src);
  audio.play();
}

function playLoop() {
  ethnoamb.loop = true;
  ethnoamb.play();
}

function pauseLoop() {
  ethnoamb.loop = false;
  ethnoamb.pause();
  ethnoamb.currentTime = 0;
}
// #endregion

// #region Died and Win  ====================================

function died() {
  let startBtn = document.querySelector("#s-btn");
  let reloadBtn = document.querySelector("#r-btn");
  let persDiv = document.getElementById('pers-output');
  alert("You have died.");
  endGame();
  startBtn.className = "play-btn";
  reloadBtn.className = "hide";
}

function win() {
  let startBtn = document.querySelector("#s-btn");
  let reloadBtn = document.querySelector("#r-btn");
  let persDiv = document.getElementById("pers-output");
  endGame();
  startBtn.className = "play-btn";
  reloadBtn.className = "hide";
  // persDiv.innerHTML = "";
  audioControl(document.getElementById("forest-ambience"), "pause");
}

// #endregion

// #region Display Image  ===================================

function displayImage(src) {
  const img = document.createElement("img");
  img.src = src;
  const textElement = document.querySelector("#pers-output");
  textElement.appendChild(img);
}

// #endregion

// #region Open Bag  ========================================

function openBag() {
  invIndex = 0;
  speed = 50;
  persDiv.innerHTML += "<br>" + "You are carrying:" + "<br>";
  persDiv.scrollTop = persDiv.scrollHeight;
  let audioInv = new Audio("Sounds/openBag.mp3");
  audioInv.volume = .05;
  audioInv.play();
  printInventory();
}

// #endregion

// #region Print Inventory  =================================
function printInventory() {
  let audioType = new Audio("Sounds/keyboardKey.wav");
  if (invIndex < inventory.toString().length) {
    persDiv.innerHTML += inventory.toString().charAt(invIndex);
    console.log(inventory.toString().charAt(invIndex));
    console.log(inventory.toString().length);
    invIndex++;
    audioType.play();
    setTimeout(printInventory, speed);

    if (invIndex >= inventory.toString().length) {
      persDiv.innerHTML += "<br>";
    }
  }
  persDiv.scrollTop = persDiv.scrollHeight;
}

// #endregion


// #region Movement Controls ================================
function initializeControls() {
  document.getElementById("north").addEventListener("click", function () {
    handleInput("north");
  });

  document.getElementById("south").addEventListener("click", function () {
    handleInput("south");
  });

  document.getElementById("east").addEventListener("click", function () {
    handleInput("east");
  });

  document.getElementById("west").addEventListener("click", function () {
    handleInput("west");
  });

  document.getElementById("look").addEventListener("click", function () {
    handleInput("look");
  });

  document.getElementById("take").addEventListener("click", function () {
    handleInput("take");
  });

  document.getElementById("inventory").addEventListener("click", function () {
    // handleInput("inventory");
    openBag();
  });

  // SUBMIT BUTTON
  document.getElementById("submit").addEventListener("click", function () {
    handleInput(document.getElementById("input").value.toLowerCase());
  });

  document
    .getElementById("input")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        handleInput(document.getElementById("input").value.toLowerCase());
      }
    });
}
// #endregion



// #region ROOMS ============================================

// Define function for printing room description
let typing = false;
let interrupt = false;
function printRoomDescription() {
  const descriptionByRoom = {
      1: "You are in a small clearing of the forest.",
    2: 'There is a large shack ahead.',
    3: "The forest is bearing down on you.",
    4: "The trees are thinner and a brook lies here.",
    5: "You fall down the hill or something.",
    6: "You are at the entrance to the forest.",
    7: "A dilapidated manor stands before you.",
    8: "You are in the foyer of the manor.",
    9: "There is a staircase here.",
    10: "The cellar reeks of earth and mildew.",
    11: "It is pitch black.",
    12: "You are in a small cave.",
    13: "You are in large a cistern.",
    14: "You are at the top landing.",
    15: "You are in an antechamber.",
    16: `You slowly push the door open as you peek inside. The door groans and squeaks loudly as flakes of rust fall from the hinges onto the floor. 
      \n
      It\'s pitch black in here and you cannot see very well. As you push past the door and your eyes adjust to the dark, you notice a hole in the floor surrounded by splintered wood. Below the hole is yet another hole bored deep into the earth. 
      \n
      You slowly step forward being careful so as not to fall in. Suddenly, a large, dark hand reaches up and encircles your entire body, pulling you down into the abyss.`,
    17: "",
    18: "",
    19: "",
    20: "",
    21: "",
    default: "You are lost.",
    999: "Please Start Game",
  };
  const description = descriptionByRoom[currentRoom];
  const outputDiv = document.getElementById("temp-output");
  const persDiv = document.getElementById('pers-output');
  if (typing) {
    // Cancel printing by character and clear the printing field
    outputDiv.innerHTML += '';
    outputDiv.scrollTop = outputDiv.scrollHeight;
    typing = false;
    return;
  }
  
  typing = true;
  let typedDescription = "";
  let index = 0;
  const speed = 50;

  let audio = new Audio("Sounds/typewriterKey.wav");
  function typeNextChar() {
    textAudio.currentTime = 0;
    if (index < description.length) {
      // If printing has been cancelled, print full content into the text window, persDiv
      if (interrupt) {
        typedDescription += description.substring(index);
        persDiv.innerHTML += typedDescription + '<br>';
        // Scroll window to show most recent content
        persDiv.scrollTop = persDiv.scrollHeight;
        // Clear printing field
        outputDiv.innerHTML = '';
        // Switch typing & interrupt to stop printing
        typing = false;
        interrupt = false;
        // Hide the auto-complete button
        // document.querySelector('#btn-controls-div').classList.remove('no-click');
        document.querySelector('#complete').classList.add('hide');
        return;
      }
      // Get the specified character in the description and print it while scrolling the window
      typedDescription += description.charAt(index);
      outputDiv.innerHTML = typedDescription;
      outputDiv.scrollTop = outputDiv.scrollHeight;
      index++;
      textAudio.play();
      setTimeout(typeNextChar, speed);
    }
    
    
    else {
      // Print the full content, scroll the window and clear the print field
       persDiv.innerHTML += typedDescription + '<br>';
        persDiv.scrollTop = persDiv.scrollHeight;
      outputDiv.innerHTML = '';
      typing = false;
      // Hide the auto-complete button
      // document.querySelector('#btn-controls-div').classList.remove('no-click');
      document.querySelector('#complete').classList.add('hide');
    }
  }
  // Add interrupt functionality to button
  document.getElementById("complete").addEventListener("click", function () {
    interrupt = true;
  });
  typeNextChar();
  if (typing) {
    // If typing is in progress, show the auto-complete button, otherwise hide it
  // document.querySelector('#btn-controls-div').classList.add('no-click');
  document.querySelector('#complete').classList.remove('hide');
} else {
  // document.querySelector('#btn-controls-div').classList.remove('no-click');
  document.querySelector('#complete').classList.add('hide');
  };
}
  
// #endregion



function printLook(){

  const description = lookDescription[currentRoom];
  const outputDiv = document.getElementById("temp-output");
  const persDiv = document.getElementById('pers-output');
  if (typing) {
    // Cancel printing by character and clear the printing field
    outputDiv.innerHTML += '';
    outputDiv.scrollTop = outputDiv.scrollHeight;
    typing = false;
    return;
  }
  
  typing = true;
  let typedDescription = "";
  let index = 0;
  const speed = 50;

  let audio = new Audio("Sounds/typewriterKey.wav");
  function typeNextChar() {
    textAudio.currentTime = 0;
    if (index < description.length) {
      // If printing has been cancelled, print full content into the text window, persDiv
      if (interrupt) {
        typedDescription += description.substring(index);
        persDiv.innerHTML += typedDescription + '<br>';
        // Scroll window to show most recent content
        persDiv.scrollTop = persDiv.scrollHeight;
        // Clear printing field
        outputDiv.innerHTML = '';
        // Switch typing & interrupt to stop printing
        typing = false;
        interrupt = false;
        // Hide the auto-complete button
        // document.querySelector('#btn-controls-div').classList.remove('no-click');
        document.querySelector('#complete').classList.add('hide');
        return;
      }
      // Get the specified character in the description and print it while scrolling the window
      typedDescription += description.charAt(index);
      outputDiv.innerHTML = typedDescription;
      outputDiv.scrollTop = outputDiv.scrollHeight;
      index++;
      textAudio.play();
      setTimeout(typeNextChar, speed);
    }
    
    
    else {
      // Print the full content, scroll the window and clear the print field
       persDiv.innerHTML += typedDescription + '<br>';
        persDiv.scrollTop = persDiv.scrollHeight;
      outputDiv.innerHTML = '';
      typing = false;
      // Hide the auto-complete button
      // document.querySelector('#btn-controls-div').classList.remove('no-click');
      document.querySelector('#complete').classList.add('hide');
    }
  }
  // Add interrupt functionality to button
  document.getElementById("complete").addEventListener("click", function () {
    interrupt = true;
  });



  typeNextChar();
  if (typing) {
    // If typing is in progress, show the auto-complete button, otherwise hide it
  // document.querySelector('#btn-controls-div').classList.add('no-click');
  document.querySelector('#complete').classList.remove('hide');
} else {
  // document.querySelector('#btn-controls-div').classList.remove('no-click');
  document.querySelector('#complete').classList.add('hide');
  };
};
const textElement = document.querySelector("#pers-output");


let north = '<span id="black-span"><strong>North</strong></span>';
let south = '<span id="white-span"><strong>South</strong></span>';
let east = '<span id="red-span"><strong>East</strong></span>';
let west = '<span id="yellow-span"><strong>West</strong></span>';

const lookDescription = {
  
  1: `<p>You are surrounded by trees on all sides. Birds and squirrels are flitting about in the treetops, chirping and chittering without a care in the world. The leaves rustle in the wind and you get a strong whiff of pine needles, damp leaves and dirt. There is a clear path to the ${north} and you can make out a building in the distance. There is also an overgrown path to the ${east}, leading deeper into the forest.</p>`,

  2: `<p>You see a large shack ahead; the door is slightly ajar and you can hear some slow shuffling and scraping on wood coming from inside. Could it be someone who can help you, or could it be your assailant? As you ponder this, a dark silhouette passes across the gap between the door and the doorframe. A dense line of trees are to the east and to the west. There is a path to the ${south} leading deeper into the forest and a path to the ${north} leading into the shack.</p>`,

  3: `<p>The canopy blocks most of the light here and you can barely see past the wall of brush and brambles around you. The forest floor is covered in a thick layer of leaves and sticks; the overgrowth is suffocating. You can barely make out a narrow track of dirt on the ground leading ${west}, as well as to the ${north} and to the ${south}. There is a hollowed out tree to the ${east}. There seems to be a small white box lying on the ground there.</p>`,

  4: `<p>You can see some sunlight coming through the tops of the trees. There is a brook nearby and the light is glinting off the water with a quiet brilliance. You wouldn't really mind staying here forever and you consider the option. After a few moments you snap out of your thoughts and rub your eyes. This place is bewitching and must hold some dark magic as it would be insane to stop here considering you can see what appears to be a bears den to the ${west}. However, you are very thirsty... There is a path to the ${south} through a dense wall of brambles and a path leading ${north} alongside the brook. There is a impassable cliff wall to the east.</p>`,

  5: `<p>There is a hill to the south which is much to steep to climb. The gentle sound of nature here soothes you and the forest seems to be getting thinner. A refreshing breeze blows across your face and through your disheveled hair. A brook winds down the hill in a zig-zag, babbling over a bed of stones and pebbles before entering spring. There are a few fish darting about beneath the surface of the spring, that water is clear enough you can see to the bottom. There is an impassable cliff wall to the east and a steep drop to the north. A well-worn path leads from the spring to the ${west}.</p>`,

  6: `<p>The trees sparsely line the side of the path, their trunks and limbs creating a natural archway. The forest floor is carpeted with a thin layer of fallen leaves and twigs, and shafts of sunlight filter through the branches overhead. The powerful aroma of pine needles and damp earth fills the air around you. There is a clear path leading ${west} and through the archway you can see a manor in the distance. The path extends into the ${east}, leading deeper into the forest. The edge of a cliff lies to the north and a thicket of trees to the south.</p>`,

  7: `<p>The manor is very old and falling apart. Boards hang from the walls at different angles, barely holding on by nails that are nearly rusted away. The rafters and purlins above the porch are bowed down as if a giant were resting on the roof. The balusters have nearly fallen away and the handrail is supported by the few remaining. There is a door to the ${south} leading into the manor, and an open doorway on the porch to the ${west} also leading inside. There is a path with few pieces of gravel embedded in the dirt leading to the east into a forest.</p>`,

  8: `<p>The foyer is littered with broken items and covered in a thick later of dust. Taking a closer look at the items laying about the floor, you can see what appears to be a rapier sticking halfway out of the floorboards. It would be useful to have a weapon, but you aren't sure if it would be wise to retrieve it not knowing who the owner is, or why it is stuck into the floor. There is an open doorway to the ${north} and a staircase to the ${south}.</p>`,

  9: `No description yet.`,

  10: `No description yet.`,

  11: `No description yet.`,

  12: `No description yet.`,

  13: `No description yet.`,

  14: `No description yet.`,

  15: `No description yet.`,

  16: `No description yet.`,

  17: `No description yet.`,
};





const itemList = {
  1: " Stick",
  2: " Rusted Key",
  3: " Dirty Twinkie",
  4: " Jamie Flynt",
  5: " John Hunter",
  6: " Your Mom",
  7: " What even is this?",
  8: "No item yet.",
  9: "No item yet.",
  10: "No item yet.",
  11: "No item yet.",
  12: "No item yet.",
  13: "No item yet.",
  14: "No item yet.",
  15: "No item yet.",
  16: "No item yet.",
  17: "No item yet.",
  18: "No item yet.",
  19: "No item yet.",
  20: "No item yet.",
  21: "No item yet.",
};

// #region Take Item  ========================================

function takeItem() {
  const roomItem = itemList[currentRoom];

  if (roomItem === undefined) {
    playAudio("Sounds/error.wav");
    persDiv.innerHTML += "<p>" + "There is nothing worth taking." + "</p>";
    persDiv.scrollTop = persDiv.scrollHeight;
    return;
  }

  if (inventory.includes(roomItem)) {
    playAudio("Sounds/error.wav");
    persDiv.innerHTML +=
      "<p>" + "You have already searched this room." + "</p>";
    persDiv.scrollTop = persDiv.scrollHeight;
    return;
  }

  inventory.push(roomItem);
  itemList[currentRoom] = undefined;
  playAudio("Sounds/success4.wav");

  persDiv.innerHTML += "<p>" + "You picked up a " + roomItem + "</p>";
  persDiv.scrollTop = persDiv.scrollHeight;
}
// #endregion

// #region Controls  =========================================

// DIRECTIONS
let waitingForDescription = false;
function handleInput(input) {
  const roomTransitions = {
    1: {
      north: 2,
      east: 3,
      look: "look",
      take: "take",
    },

    2: {
      north: 16,
      south: 1,
      look: "look",
      take: "take",
    },

    3: {
      north: 4,
      south: 12,
      east: 16,
      west: 1,
      look: "look",
      take: "take",
    },

    4: {
      north: 5,
      south: 3,
      west: 16,
      look: "look",
      take: "take",
    },

    5: {
      west: 6,
      look: "look",
      take: "take",
    },

    6: {
      east: 5,
      west: 7,
      south: 16,
      look: "look",
      take: "take",
    },

    7: {
      east: 6,
      west: 16,
      south: 8,
      look: "look",
      take: "take",
    },

    8: {
      north: 7,
      south: 9,
      look: "look",
      take: "take",
    },

    9: {
      north: 8,
      south: 10,
      west: 14,
      look: "look",
      take: "take",
    },

    10: {
      north: 9,
      west: 13,
      east: 11,
      look: "look",
      take: "take",
    },

    11: {
      west: 10,
      east: 12,
      south: 16,
      look: "look",
      take: "take",
    },

    12: {
      east: 16,
      west: 11,
      look: "look",
      take: "take",
    },

    13: {
      west: 15,
      look: "look",
      take: "take",
    },

    14: {
      east: 9,
      look: "look",
      take: "take",
    },

    15: {
      north: "win",
      south: "win",
      west: "win",
      look: "look",
      take: "take",
    },
  };


  const transition = roomTransitions[currentRoom]?.[input];
  const transNorth = roomTransitions[currentRoom]?.['north'];
  const transSouth = roomTransitions[currentRoom]?.['south'];
  const transEast = roomTransitions[currentRoom]?.['east'];
  const transWest = roomTransitions[currentRoom]?.['west'];
  if (transition === undefined) {
    deadEnd();
  } else if (transition === transNorth){
    previousRoom = currentRoom;
    currentRoom = transition;
  document.getElementById("room-id").innerHTML = '';
  document.getElementById("room-id").innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
    playAudio("Sounds/footstepsGravel.mp3");
  document.getElementById('pers-output').innerHTML += '<p>You head <span id="black-span"><strong>North</strong></span>.</p>';
    printRoomDescription();

  } 
  else if (transition === transSouth){
    previousRoom = currentRoom;
    currentRoom = transition;
  document.getElementById("room-id").innerHTML = '';
  document.getElementById("room-id").innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
    playAudio("Sounds/footstepsGravel.mp3");
  document.getElementById('pers-output').innerHTML += '<p>You head ' + '<span id="white-span"><strong>South</strong></span>.</p>';
    printRoomDescription();

  } 
  else if (transition === transEast){
    previousRoom = currentRoom;
    currentRoom = transition;
  document.getElementById("room-id").innerHTML = '';
  document.getElementById("room-id").innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
    playAudio("Sounds/footstepsGravel.mp3");
  document.getElementById('pers-output').innerHTML += '<p>You head ' + '<span id="red-span"><strong>East</strong></span>.</p>';
    printRoomDescription();

  } 
  else if (transition === transWest){
    previousRoom = currentRoom;
    currentRoom = transition;
  document.getElementById("room-id").innerHTML = '';
  document.getElementById("room-id").innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
    playAudio("Sounds/footstepsGravel.mp3");
  document.getElementById('pers-output').innerHTML += '<p>You head ' + '<span id="yellow-span"><strong>West</strong></span>.</p>';
    printRoomDescription();

  }
  else if (transition === "look") {
      printLook();
  } else if (transition === "take") {
    takeItem();
  } else if (transition === "win") {
    alert("You Win!");
    win();
  } else {
    previousRoom = currentRoom;
    currentRoom = transition;
    playAudio("Sounds/footstepsGravel.mp3");
    printRoomDescription();
    // if (currentRoom === 16) {
    //   died();
    // }
  }
  document.getElementById("input").value = "";
}

function deadEnd() {
  playAudio("Sounds/error.wav");
  persDiv.innerHTML += "<p>" + "You can't go that way." + "</p>";
  persDiv.scrollTop = persDiv.scrollHeight;
}

// #endregion
