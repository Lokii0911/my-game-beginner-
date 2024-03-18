let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
const inventory = ['stick'];
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const text = document.querySelector('#text');
const monsterStats = document.querySelector('#monsterStats');
const monsterNametext = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const monsters = [{
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "Fanged Beast",
        level: 8,
        health: 60
    },
    {
        name: "Dragon",
        level: 20,
        health: 300
    }
];
const weapons = [{
        name: 'stick',
        power: 5
    },
    {
        name: 'dagger',
        power: 30
    },
    {
        name: 'claw hammer',
        power: 50
    },
    {
        name: 'sword',
        power: 100
    }
];
const locations = [{
        name: "town square",
        "Button text": ["go to store", "go to cave", "fight dragon"],
        "Button functions": [gostore, gocave, fightdragon],
        text: "You are in the town square.You see a sign says \"store\""
    },
    {
        name: "Store",
        "Button text": ["Buy 10 health(10 Gold)", "Buy weapon(30 Gold)", "go to town square"],
        "Button functions": [Buyhealth, Buyweapon, gotown],
        text: "you entered the store"
    },
    {
        name: "cave",
        "Button text": ["fight the slime", "fight the beast", "back to town"],
        "Button functions": [Fightslime, FightBeast, gotown],
        text: "you are in the cave"
    },
    {
        name: "fight",
        "Button text": ["attack", "dodge", "run"],
        "Button functions": [Attack, Dodge, gotown],
        text: "you are fighting a beast"
    },
    {
        name: "kill monster",
        "Button text": ["return town", "return town", "return town"],
        "Button functions": [gotown, gotown, gotown],
        text: "the monster died"
    },
    {
        name: "lose",
        "Button text": ["restart?", "restart?", "restart?"],
        "Button functions": [restart, restart, restart],
        text: "start again"
    },
    {
        name: "win",
        "Button text": ["restart?", "restart?", "restart?"],
        "Button functions": [restart, restart, restart],
        text: "won the game"
    }
];
//initialize button
button1.onclick = gostore;
button2.onclick = gocave;
button3.onclick = fightdragon;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["Button text"][0];
    button2.innerText = location["Button text"][1];
    button3.innerText = location["Button text"][2];
    button1.onclick = location["Button functions"][0];
    button2.onclick = location["Button functions"][1];
    button3.onclick = location["Button functions"][2];
    text.innerText = location.text;
}

function gotown() {
    update(locations[0]);
}

function gostore() {
    update(locations[1]);
}

function gocave() {
    update(locations[2]);
}

function Buyhealth() {
    if (gold >= 10) {
        gold = gold - 10;
        health = health + 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "not enough gold";
    }
}

function Buyweapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;
            let newweapon = weapons[currentWeapon].name;
            text.innerText = "you have a " + newweapon;
            inventory.push(newweapon);
            text.innerText = "you have a new weapon in the inventory " + inventory;
        } else {
            text.innerText = "not enough gold";
        }
    } else {
        text.innerText = "you already have the most powerful weapon";
        button2.innerText = "you can sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "you sold a " + currentWeapon;
        text.innerText = "in your inventory you have " + inventory;
    } else {
        text.innerText = "dont sell your only weapon";
    }
}

function fightdragon() {
    fighting = 2;
    gofight();
}

function Fightslime() {
    fighting = 0;
    gofight();
}

function FightBeast() {
    fighting = 1;
    gofight();
}

function gofight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNametext.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function Attack() {
    text.innerText = "you are fighting " + monsters[fighting].name + " now";
    text.innerText = "you attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting === 2) {
            wingame();
        } else {
            defeatmonster();
        }
    }
}

function Dodge() {
    text.innerText = "you dodged the attack of " + monsters[fighting].name + ".";
}

function defeatmonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    let inventory = ['stick'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    gotown();
}

function wingame() {
    update(locations[6]);
}
