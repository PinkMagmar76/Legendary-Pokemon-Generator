const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const genBtn = document.getElementById('genBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDisplay = document.getElementById('result');

const legendaries = ["Mewtwo", "Lugia", "Rayquaza", "Dialga", "Arceus", "Zekrom", "Xerneas", "Solgaleo", "Zacian", "Koraidon"];
const colors = ["#1a1a1a", "#252525", "#1a1a1a", "#252525", "#1a1a1a", "#252525", "#1a1a1a", "#252525", "#1a1a1a", "#252525"];

let currentRotation = 0;
const totalSegments = legendaries.length;
const arcSize = (2 * Math.PI) / totalSegments;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < totalSegments; i++) {
        const angle = i * arcSize + currentRotation;
        
        // Draw Segments
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 190, angle, angle + arcSize);
        ctx.lineTo(200, 200);
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Text
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#bbb";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText(legendaries[i], 170, 5);
        ctx.restore();
    }
}

function spin() {
    genBtn.disabled = true;
    resultDisplay.innerText = "Spinning...";
    resultDisplay.style.color = "white";
    
    // 5% Secret Chance Logic
    const isMagmar = Math.random() < 0.05;
    
    const extraSpins = 7 + Math.random() * 5; 
    const randomOffset = Math.random() * (2 * Math.PI);
    const targetRotation = currentRotation + (extraSpins * 2 * Math.PI) + randomOffset;
    
    const duration = 5000; // 5 seconds of spinning
    const start = performance.now();

    function animate(time) {
        let elapsed = time - start;
        let progress = Math.min(elapsed / duration, 1);
        
        // Cubic ease-out formula
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
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
        // Calculate the winning slice based on the pointer (at top)
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

// Initial Render
drawWheel();
