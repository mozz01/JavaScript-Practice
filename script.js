// Variables
let xp = 0;
let health = 100;
let gold = 50;

let currentWeapon = 0;
let fighting, mosterHealth, inventory = ["stick"];

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

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Functions
function goStore()
{
    console.log("Going to store");
}

// function goCave()
// {

// }

// function fightDragon()
// {

// }


console.log(invnetory);