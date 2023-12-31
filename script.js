// Variables
let xp = 0;
let health = 100;
let gold = 50;

let currentWeapon = 0;
let monsterID;
let mosterHealth;
let inventory = ["stick"];

const healthPrice = 10;
const maxHealth = 100;
const healValue = 10;


// Elements references
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const mosterStats = document.querySelector("#mosterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");



const locations = [
  {
    name: "town square",
    "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
    "button function": [goStore, goCave, fightDragon], 
    text: "You're in the town square. You see a sign that says \"Store.\""
  },
  {
    name: "store", 
    "button text": ["Buy 10 Health (10 Gold)", "Buy a Weapon (30 Gold)", "Go to Town Square"], 
    "button function": [buyHealth, buyWeapon, goTown], 
    text: "You enter the store."
  },
  {
    name: "cave", 
    "button text": ["Fight Slime", "Fight Fang Beast", "Go to Town Square"], 
    "button function": [fightSlime, fightBeast, goTown], 
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight", 
    "button text": ["Attack", "Dodge", "Run"], 
    "button function": [attack, dodge, goTown], 
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
    "button function": [goTown, goTown, easterEgg], 
    text: "You've defeated the monster. You gain experience and find gold."
  },
  {
    name: "lose", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button function": [restart, restart, restart], 
    text: "You die."
  },
  {
    name: "win game", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button function": [restart, restart, restart], 
    text: "You have defeated the dragon and won the game! :D"
  },
  {
    name: "easter egg", 
    "button text": ["Pick 2", "Pick 8", "Go to Town Square"], 
    "button function": [pickTwo, pickEight, goTown], 
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  },
  {
    name: "resetButtons", 
    "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"], 
    "button function": [goTown, goTown, goTown], 
    text: ""
  }
]

const weapons = [
  {
    name: "stick", 
    power: 5
  }, 
  {
    name: "dagger", 
    power: 30
  },
  {
    name: "claw hammer", 
    power: 50
  },
  {
    name: "sword", 
    power: 100
  }, 
]

const monsters = [
  {
    name: "slime",
    level: 2, 
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon", 
    level: 20, 
    health: 300
  }
]


// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


// Functions
function updateUI(location)
{
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  button1.onclick = location["button function"][0];
  button2.onclick = location["button function"][1];
  button3.onclick = location["button function"][2];

  text.innerText = location.text;
}

function goTown()
{
  updateUI(locations[0]);
}



function goStore()
{
  updateUI(locations[1]);
}

function buyHealth()
{
  if(gold < healthPrice)
  {
    text.innerText = "You don't have enough gold :(";
  }
  else if(health >= maxHealth)
  { 
    text.innerText = "You have max health";
  }
  else
  {
    gold -= healthPrice;
    health += healValue;

    if(health > maxHealth)
    {
      // Refund
      gold += (health - maxHealth);
      health = maxHealth;
      text.innerText = "Reached max health. Excess gold refunded.";
    }
    
    goldText.innerText = gold;
    healthText.innerText = health;
  }
}

function buyWeapon()
{
  if(currentWeapon >= weapons.length - 1)
  {
    text.innerText = "Out of weapons. You have the most powerful weapon.";
    button2.innerText = "Sell Weapons (+15 Gold)";
    button2.onclick = sellWeapons;
  }
  else if(gold < 30)
  {
    text.innerText = "You don't have enough gold";
  }
  else
  {
    gold -= 30;
    currentWeapon++;

    goldText.innerText = gold;
    text.innerText = "You now have a " + weapons[currentWeapon].name + ".";
    inventory.push(weapons[currentWeapon].name);
    text.innerText += " Inventory: " + inventory;
    
    console.log("I just got a", weapons[currentWeapon].name);
  }
}

function sellWeapons()
{
  if(inventory.length > 1)
  {
    let weapon = inventory.shift();
    text.innerText = "You sold " + weapon + ".";
    text.innerText += " Inventory: " + inventory;
    gold += 15;
    goldText.innerText = gold;
  }
  else
  {
    text.innerText = "You can't sell your last weapon. Inventory: " + inventory;
  }
  
}



function goCave()
{
  updateUI(locations[2]);
}

function goFight(monsterID)
{
  updateUI(locations[3]);

  if(monsterID === 2)
  {
    text.innerText = "Defeat the dragon to win the game.";
  }
  
  monsterStats.style.display = "block";

  monsterNameText.innerText = monsters[monsterID].name;
  monsterHealthText.innerText = monsters[monsterID].health;
  monsterHealth = monsters[monsterID].health;
  
}

function fightSlime()
{
  monsterID = 0;
  goFight(monsterID);
}

function fightBeast()
{
  monsterID = 1;
  goFight(monsterID);
}

function fightDragon()
{
  monsterID = 2;
  goFight(monsterID);
}

function attack()
{  
  text.innerText = "The " + monsters[monsterID].name + " attacks.";

  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  
  if (isMonsterHit()) 
  {
    health -= getMonsterAttackValue(monsters[monsterID].level);  
  }
  else // Player miss
  {
    text.innerText += " You miss.";
  }
  
  healthText.innerText = health;

  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  monsterHealthText.innerText = monsterHealth;

  if(health <= 0)
  {
    lose();
  }
  else if(monsterHealth <= 0)
  {
    (monsterID === 2) ? winGame():monsterDefeated();
  }

  if( Math.random() <= 0.1 && (inventory.length !== 1) )
  {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function isMonsterHit()
{
  return ( Math.random() > 0.2 ) || ( health <= (0.2 * maxHealth) ); // Always hit if player health is less than 20%
}

function getMonsterAttackValue()
{
  let hit = Math.abs((monsters[monsterID].level * 5) - (Math.floor(Math.random() * xp)));
  console.log(hit);
  
  return hit;
}

function dodge()
{
  text.innerText = "You dodge the attack from the " + monsters[monsterID].name + ".";
}



function monsterDefeated()
{
  monsterHealthText.innerText = 0;
  
  xp += monsters[monsterID].level;
  xpText.innerText = xp;
  
  gold += Math.floor(monsters[monsterID].level * 6.7);
  goldText.innerText = gold;

  // text.innerText = "You have defeated " + monsters[monsterID].name + " and gained " + gainedGold + " gold and " + monsters[monsterID].level + " xp.";
  
  updateUI(locations[4]);
}

function lose()
{
  healthText.innerText = 0;
  text.innerText = "The " + monsters[monsterID].name + " defeated you.";

  updateUI(locations[5]);
}

function restart()
{
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  xpText.innerText = xp;
  healthText.innerText = health;
  goTown();
}

function winGame()
{
  updateUI(locations[6]);
}



function easterEgg()
{
  updateUI(locations[7]);
}

function pick(guess)
{
  updateUI(locations[8]);
  let numbers = [];
  let isGuessCorrect = false;
  
  while(numbers.length < 11)
    {
      numbers.push(Math.floor(Math.random() * 10));
    }
  
  text.innerText = "You picked " + guess + ". The random numbers are: \n";

  for(let i = 0; i < 10; i++)
    {
      text.innerText += numbers[i] + ", ";
      
      if(numbers[i] === guess)
      {
        isGuessCorrect = true;
      }
    }

  text.innerText += "\n";
  
  if(isGuessCorrect)
  {
    text.innerText += "Your guess is correct! You win 20 gold.";
    gold += 20;
    goldText.innerText = gold;
  }
  else
  {
    text.innerText += "Your guess is incorrect. Better luck next time!";
  }
  
}

function pickTwo()
{
  pick(2);  
}

function pickEight()
{
  pick(8);
}

