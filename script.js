const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const genBtn = document.getElementById('genBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDisplay = document.getElementById('result');

// Comprehensive list of Legendary Pokémon (Generations 1-9)
const legendaries = [
    "Articuno", "Zapdos", "Moltres", "Mewtwo", 
    "Raikou", "Entei", "Suicune", "Lugia", "Ho-Oh", 
    "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", 
    "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina", "Cresselia", 
    "Cobalion", "Terrakion", "Virizion", "Tornadus", "Thundurus", "Reshiram", "Zekrom", "Landorus", "Kyurem", 
    "Xerneas", "Yveltal", "Zygarde", 
    "Type: Null", "Silvally", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Necrozma", 
    "Zacian", "Zamazenta", "Eternatus", "Kubfu", "Urshifu", "Regieleki", "Regidrago", "Glastrier", "Spectrier", "Calyrex", "Enamorus",
    "Wo-Chien", "Chien-Pao", "Ting-Lu", "Chi-Yu", "Okidogi", "Munkidori", "Fezandipiti", "Ogerpon", "Terapagos", "Koraidon", "Miraidon"
];

let currentRotation = 0;
const totalSegments = legendaries.length;
const arcSize = (2 * Math.PI) / totalSegments;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < totalSegments; i++) {
        const angle = i * arcSize + currentRotation;
        
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? "#1a1a1a" : "#252525";
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 190, angle, angle + arcSize);
        ctx.lineTo(200, 200);
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Drawing text for 70+ items requires tiny, thin fonts
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#aaa";
        // Smaller font size for high density
        ctx.font = "8px Arial"; 
        ctx.fillText(legendaries[i], 185, 3);
        ctx.restore();
    }
}

function spin() {
    genBtn.disabled = true;
    resultDisplay.innerText = "Spinning...";
    resultDisplay.style.color = "white";
    
    const isMagmar = Math.random() < 0.05;
    const extraSpins = 8 + Math.random() * 10; 
    const randomOffset = Math.random() * (2 * Math.PI);
    const targetRotation = currentRotation + (extraSpins * 2 * Math.PI) + randomOffset;
    
    const duration = 5000; 
    const start = performance.now();

    function animate(time) {
        let elapsed = time - start;
        let progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4); // Slightly sharper deceleration
        
        currentRotation = (targetRotation * easeOut);
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            finalizeResult(isMagmar);
        }
    }
    requestAnimationFrame(animate);
}

function finalizeResult(isMagmar) {
    genBtn.disabled = false;
    if (isMagmar) {
        resultDisplay.innerText = "🔥 SECRET: MAGMAR 🔥";
        resultDisplay.style.color = "#ff4500";
    } else {
        const normalizedRotation = (currentRotation % (2 * Math.PI));
        const pointerAngle = (3 * Math.PI / 2) - normalizedRotation;
        let index = Math.floor((pointerAngle / arcSize) % totalSegments);
        if (index < 0) index += totalSegments;
        
        resultDisplay.innerText = legendaries[index];
        resultDisplay.style.color = "#ffd700";
    }
}

resetBtn.addEventListener('click', () => {
    currentRotation = 0;
    drawWheel();
    resultDisplay.innerText = "Wheel Reset";
    resultDisplay.style.color = "#888";
});

genBtn.addEventListener('click', spin);
drawWheel();
