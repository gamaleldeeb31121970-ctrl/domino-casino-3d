// نظام الجوائز والرهان
let playerBalance = 28500000;
let currentBet = 1000;

function winRound(multiplier) {
    let profit = currentBet * multiplier;
    playerBalance += profit;
    updateUI();
    alert("مبروك! ربحت: " + profit);
}

function loseRound() {
    playerBalance -= currentBet;
    updateUI();
    alert("حظ أوفر المرة القادمة!");
}

function updateUI() {
    document.getElementById('balance').innerText = (playerBalance / 1000000).toFixed(1) + "M";
}

// مصفوفة قطع الدومينو (المنطق البرمجي)
const dominoSet = [];
for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
        dominoSet.push({ sideA: i, sideB: j });
    }
}
