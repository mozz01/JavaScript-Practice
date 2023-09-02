// Variables
let xp = 0;
let health = 100;
let gold = 500;

let currentWeapon = 0;
let fighting
let mosterHealth
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
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");



const locations = [
  {
    name: "town square",
    "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
    "button function": [goStore, goCave, fightDragon], 
    text: "You're in the town square. You see a sign that says \"Store\"."
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
  console.log("i'm in town");
  updateUI(locations[0]);
  console.log("updated UI from town");
}


function goStore()
{
  console.log("i'm in store");
  updateUI(locations[1]);
  console.log("updated UI from store");
}


function goCave()
{
  console.log("i'm in Cave");
  updateUI(locations[2]);

}


function buyHealth()
{
  console.log("i'm buying health");
  if(gold < healthPrice)
  {
    console.log("couldn't buy health. Not enough gold");
    text.innerText = "You don't have enough gold :(";
  }
  else if(health >= maxHealth)
  {
    console.log("couldn't buy health. Max health.");
    text.innerText = "You have max health";
  }
  else
  {
    gold -= healthPrice;
    health += healValue;

    goldText.innerText = gold;
    healthText.innerText = health;
    
    console.log("Gold: ", gold, "Health: ", health);
    console.log("got health. going back to town");
  }
}


function buyWeapon()
{
  console.log("i'm buying weapon");
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

function goFight(monsterID)
{
  monster = monsters[monsterID];
  playerDmg = weapons[currentWeapon].power;

  if(monster.health > 0)
  {
    monster.health -= playerDmg;
    monsterHealthText.innertext = monster.health;
  }
  
}

function fightSlime()
{
  slimeID = 0;
  goFight(slimeID);
}


function fightBeast()
{
  beastID = 1;
  goFight(beastID);
}


function fightDragon()
{
  dragonID = 2;
  goFight(dragonID);
}


