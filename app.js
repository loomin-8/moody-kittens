let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  if (!form.name.value) {
    alert("Please name your kitten")
    return;
  }
  let startingAffection = Math.floor(Math.random() * 5 + 2)
  for (let i in kittens) {
    if (kittens[i].name == form.name.value) {
      alert("Please choose a different name")
      return;
    }
  }
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: moodCheck(startingAffection),
    affection: startingAffection,
    color: Math.floor(Math.random() * 360)
  }
  kittens.push(kitten)
  saveKittens()
  form.reset()
}

function moodCheck(affection) {
  if (affection <= 2) {
    return "Angry";
  }
  if (affection <= 4) {
    return "Upset";
  }
  if (affection <= 7) {
    return "Neutral";
  }
  if (affection <= 9) {
    return "Content";
  }
  return "Happy";
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData != null) {
    kittens = kittensData
  }
  drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensElem = document.getElementById("kittens")
  let template = ""
  kittens.forEach(kitten => {
    template += `
    <div class="image-wrapper">
      <img class="overlay" style="filter: hue-rotate(${kitten.color}deg);" src="img/body.png" alt="cat">
      <img class="overlay" src="img/Expression${kitten.mood}.png" alt="">
      <img class="overlay" src="img/ears.png" alt="">
      
      <h2 class="name">Name: ${kitten.name}</h2>
      <h3 class="affection">Affection: ${kitten.affection}0%</h3>
      <button class="action" onclick="pet('${kitten.id}')">Pet</button>
      <button class="action" onclick="catnip('${kitten.id}')">Catnip</button>
      <i class="action fa fa-trash text-danger" onclick="leave('${kitten.id}')"></i>
    </div>
    `
  })
  kittensElem.innerHTML = template;
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * return {Kitten}
 */
function findKittenById(id) {
  for (let i in kittens) {
    console.log(kittens[i].id, id)
    if (kittens[i].id == id) {
      return kittens[i];
    }
  }
}

function leave(id) {
  let kitten = findKittenById(id)
  let index = kittens.indexOf(kitten)
  kittens.splice(index, 1)
  saveKittens();
  alert(kitten.name + " has left!")
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = findKittenById(id)
  if (Math.random() > 0.6) {
    kitten.affection++;
    kitten.mood = moodCheck(kitten.affection)
  }
  else {
    kitten.affection--;
    kitten.mood = moodCheck(kitten.affection)
  }
  if (kitten.affection > 10) {
    kitten.affection = 10;
  }
  if (kitten.affection == 1) {
    alert(kitten.name + " will leave soon! Try giving it some catnip!")
  }
  if (kitten.affection <= 0) {
    leave(id);
  }
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  if (kitten.affection < 5) {
    kitten.affection = 5
  }
  else if (kitten.affection < 10){
    kitten.affection++;
  }
  kitten.mood = moodCheck(kitten.affection)
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  kittens = []
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadKittens();
