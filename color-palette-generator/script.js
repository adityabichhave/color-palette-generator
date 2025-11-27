function generateColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

function loadPalette() {
    const paletteDiv = document.getElementById("palette");
    paletteDiv.innerHTML = "";
    window.currentPalette = [];

    for (let i = 0; i < 5; i++) {
        const color = generateColor();
        window.currentPalette.push(color);

        const box = document.createElement("div");
        box.classList.add("color-box");
        box.style.background = color;
        box.innerHTML = `<span>${color}</span>`;

        box.addEventListener("click", () => {
            navigator.clipboard.writeText(color);
            box.innerHTML = `<span>Copied!</span>`;
            setTimeout(() => box.innerHTML = `<span>${color}</span>`, 600);
        });

        paletteDiv.appendChild(box);
    }

    displaySavedPalettes();
}

document.getElementById("generateBtn").addEventListener("click", loadPalette);

document.getElementById("copyAll").addEventListener("click", () => {
    navigator.clipboard.writeText(window.currentPalette.join(", "));
    alert("All hex codes copied!");
});

document.getElementById("downloadPNG").addEventListener("click", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    window.currentPalette.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(i * 120, 0, 120, 150);
    });

    const link = document.createElement("a");
    link.download = "palette.png";
    link.href = canvas.toDataURL();
    link.click();
});

document.getElementById("savePalette").addEventListener("click", () => {
    let saved = JSON.parse(localStorage.getItem("palettes") || "[]");
    saved.push(window.currentPalette);
    localStorage.setItem("palettes", JSON.stringify(saved));
    alert("Palette saved!");
    displaySavedPalettes();
});

function displaySavedPalettes() {
    const savedDiv = document.getElementById("savedPalettes");
    savedDiv.innerHTML = "";

    const palettes = JSON.parse(localStorage.getItem("palettes") || "[]");

    palettes.forEach(palette => {
        const row = document.createElement("div");
        row.classList.add("saved-palette");

        palette.forEach(color => {
            const c = document.createElement("div");
            c.classList.add("saved-color");
            c.style.background = color;
            row.appendChild(c);
        });

        savedDiv.appendChild(row);
    });
}

window.onload = loadPalette;
