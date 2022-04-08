let mur = 0
let updating = 1
let costs2 = [10, 100, 2500, 10000, 50000, 1000000]
let costs1 = [250, 10000, 500000, 1500000, 20000000, 1500000000]
let cost3 = 10000000000
let upgrade2 = [1, 15, 350, 2000, 12000, 70000]
let upgrade1 = [10, 750, 42500, 100000, 1500000, 100000000]
let cats = [true, false, false, false, false, false]
let allAutomatic = false
let alphabet = ["♥", "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У",
    "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"]
let catsImages = ["images/Первый.png", "images/Луны.png", "images/Котик-с-рыбкой.png", 'images/Котёночек.png', 'images/Котоведбмочка.png',
    "images/Данго.png"]
let mainImage = document.getElementById("Click-img")
let n = 0
let autoUpdating = 0
const automaticButtons = Array.from(document.querySelectorAll("[upgrade-type='automatic']"))
const amountButtons = Array.from(document.querySelectorAll("[upgrade-type='amount']"))
const allAutomaticButtons = Array.from(document.querySelectorAll("[upgrade-type='all-automatic']"))
const plusValueButtons = Array.from(document.querySelectorAll("[upgrade-type='plusValue']"))
const counter = document.getElementById("counter")
const growth1 = document.getElementsByClassName("growth1")
const growth2 = document.getElementsByClassName("growth2")
const catButtons = Array.from(document.getElementsByClassName("Cat"))

allAutomaticButtons[0].innerText = heheCounter(cost3) + " Мур"
for (const i in costs1) {
    amountButtons[i].innerText = heheCounter(costs2[i]) + " Мур"
    automaticButtons[i].innerText = heheCounter(costs1[i]) + " Мур"
    growth1[i].innerText = `[+${heheCounter(upgrade1[i])}/сек]`
    growth2[i].innerText = `[+${heheCounter(upgrade2[i])}]`
}

function heheCounter(mur) {
    if (mur < 100) {
        return mur
    }
    mur2 = Math.floor(Math.floor(Math.log10(mur)) / 2)
    mur3 = mur2
    res = ""
    while (mur3 > 0) {
        res = alphabet[(mur3 % 34)] + res
        mur3 = Math.floor(mur3 / 34)
    }
    res = (mur / (10 ** (mur2 * 2))).toFixed(1) + " " + res
    return res
}

function makeCounter() {
    mur += updating
    counter.innerText = "         Мур: " + heheCounter(mur)
}

function autoCounter() {
    mur += autoUpdating
    counter.innerText = "         Мур: " + heheCounter(mur)
}

function autoBuy() {
    for (const i in automaticButtons) {
        if (mur >= costs1[i]) {
            autoUpdating += upgrade1[i]
            upgrade1[i] *= 2
            growth1[i].innerText = `[+${heheCounter(upgrade1[i])}/сек]`
            document.getElementById("text-passive").innerText = "Пассивный прирост: " + heheCounter(autoUpdating) + "/сек"
            mur -= costs1[i]
            counter.innerText = "         Мур: " + heheCounter(mur)
            costs1[i] *= 2
            automaticButtons[i].innerText = heheCounter(costs1[i]) + " Мур"
        }
    }
}

const main_button = document.getElementById("Click")
main_button.addEventListener("click", makeCounter)
setInterval(autoCounter, 1000)

for (const i in amountButtons) {
    amountButtons[i].addEventListener("click", function() {
        if (mur >= costs2[i]) {
            updating += upgrade2[i]
            upgrade2[i] *= 2
            growth2[i].innerText = `[+${heheCounter(upgrade2[i])}]`
            document.getElementById("text-active").innerText = "Радость за клик: " + heheCounter(updating)
            mur -= costs2[i]
            counter.innerText = "         Мур: " + heheCounter(mur)
            costs2[i] *= 2
            amountButtons[i].innerText = heheCounter(costs2[i]) + " Мур"
            cats[i] = true
        }
        else {
            alert("Не хватило валюты!")
        }
    })
}

for (const i in automaticButtons) {
    automaticButtons[i].addEventListener("click", function() {
        if (mur >= costs1[i]) {
            autoUpdating += upgrade1[i]
            upgrade1[i] *= 2
            growth1[i].innerText = `[+${heheCounter(upgrade1[i])}/сек]`
            document.getElementById("text-passive").innerText = "Пассивный прирост: " + heheCounter(autoUpdating) + "/сек"
            mur -= costs1[i]
            counter.innerText = "         Мур: " + heheCounter(mur)
            costs1[i] *= 2
            automaticButtons[i].innerText = heheCounter(costs1[i]) + " Мур"
        }
        else {
            alert("Не хватило валюты!")
        }
    })
}

for (const i in allAutomaticButtons) {
    allAutomaticButtons[i].addEventListener("click", function () {
        if ((mur >= cost3) && (allAutomatic == false)) {
            intervalID = setInterval(autoBuy, 10 ** 3)
            mur -= 10**10
            counter.innerText = "         Мур: " + heheCounter(mur)
            allAutomatic = true
            document.getElementById("auto").innerText = "Автоматизация: ✓"
            allAutomaticButtons[i].innerText = "Отключить"
            changer = true
        }
        else if (changer == true) {
            clearInterval(intervalID)
            changer = false
            document.getElementById("auto").innerText = "Автоматизация: ☓"
            allAutomaticButtons[i].innerText = "Включить"
        }
        else if (changer == false) {
            intervalID = setInterval(autoBuy, 10 ** 3)
            changer = true
            document.getElementById("auto").innerText = "Автоматизация: ✓"
            allAutomaticButtons[i].innerText = "Отключить"
        }
        else {
            alert("Не хватило валюты!")
        }
    })
}

for(const i in plusValueButtons) {
    plusValueButtons[i].addEventListener("click", function () {
        login_ok = false;
        password = "";
        password = prompt("Пароль", "");
        if (password == "autotest") {
            login_ok = true;
            mur += 10 ** 10
            counter.innerText = "         Мур: " + heheCounter(mur);
        }
        else if (login_ok == false) alert("Неверный пароль!");
    })
}

for (const i in catButtons) {
    catButtons[i].addEventListener("click", function() {
        if (cats[i] == true) {
            // замена картинки на основной кнопке
            mainImage.src = catsImages[i]
        }
        else {
            alert("Cначала купите улучшение с этим котом!")
        }
    })
}