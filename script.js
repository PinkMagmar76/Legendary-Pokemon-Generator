const legendaryPokemon = [
  "Mewtwo", "Mew", "Lugia", "Ho-Oh", "Raikou", "Entei", "Suicune",
  "Regirock", "Regice", "Registeel", "Latias", "Latios",
  "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys"
];

const secretPokemon = "Magmar";
const secretChance = 0.05;

const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const generateBtn = document.getElementById("generateBtn");

function buildWheel() {
  const sliceCount = legendaryPokemon.length;
  const angleStep = 360 / sliceCount;

  legendaryPokemon.forEach((name, i) => {
    const slice = document.createElement("div");
    slice.className = "slice";

    // Rotate slice around the wheel
    slice.style.transform = `rotate(${i * angleStep}deg)`;

    // Give each slice a color
    slice.style.background = `hsl(${i * angleStep}, 70%, 40%)`;

    slice.textContent = name;
    wheel.appendChild(slice);
  });
}

buildWheel();

generateBtn.addEventListener("click", () => {
  result.textContent = "";

  if (Math.random() < secretChance) {
    spinRandom();
    setTimeout(() => {
      result.textContent = "🔥 Secret Pokémon: Magmar!";
    }, 4000);
    return;
  }

  const index = Math.floor(Math.random() * legendaryPokemon.length);
  const selected = legendaryPokemon[index];

  const sliceAngle = 360 / legendaryPokemon.length;
  const targetAngle = 360 * 5 + (index * sliceAngle);
  wheel.style.transform = `rotate(-${targetAngle}deg)`;

  setTimeout(() => {
    result.textContent = `⭐ You got: ${selected}!`;
  }, 4000);
});

function spinRandom() {
  const randomAngle = 360 * 5 + Math.random() * 360;
  wheel.style.transform = `rotate(-${randomAngle}deg)`;
}
