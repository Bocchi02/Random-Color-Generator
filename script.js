function changeColor() {
    // Generate a random hex color code
    var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    var root = document.documentElement;
    // Update the color display
    root.style.setProperty('--primary-color', randomColor);

     // Validate the input (basic validation)
     if (!/^#[0-9A-Fa-f]{6}$/.test(randomColor)) {
        alert("Invalid hex color code. Please click generate button to generate new color.");
        return;
    }

    // Convert hex to RGB
    var rgbColor = hexToRgb(randomColor);

    // Convert hex to HSL
    var hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);

    // Get the closest color name
    var colorName = getClosestColorName(randomColor);

    // Display the results
    var resultElement = document.getElementById('colors');
    resultElement.innerHTML = `
        <li>RGB : ${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}</li>
        <li>HSL : ${hslColor.h.toFixed(2)}, ${hslColor.s.toFixed(2)}%, ${hslColor.l.toFixed(2)}%</li>
        <li>Hex : ${randomColor}</p></li>
    `;
}

function hexToRgb(hex) {
    // Remove the hash if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values into separate RGB values
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;

    var h, s, l;

    if (delta === 0) {
        h = 0;
    } else if (max === r) {
        h = ((g - b) / delta) % 6;
    } else if (max === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (max + min) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return { h, s: s * 100, l: l * 100 };
}

function getClosestColorName(hexColor) {
    var colorNames = {
        'Red': '#ff0000',
        'Green': '#00ff00',
        'Blue': '#0000ff'
        // Add more color names as needed
    };

    // Convert hexColor to RGB
    var targetRgb = hexToRgb(hexColor);

    // Find the closest color name based on Euclidean distance in RGB space
    var closestColor = Object.keys(colorNames).reduce(function(prev, curr) {
        var currRgb = hexToRgb(colorNames[curr]);
        var prevRgb = hexToRgb(prev);

        var currDistance = colorDistance(targetRgb, currRgb);
        var prevDistance = colorDistance(targetRgb, prevRgb);

        return currDistance < prevDistance ? curr : prev;
    });

    return closestColor;
}
// Function to calculate Euclidean distance between two colors in RGB space
function colorDistance(color1, color2) {
    var deltaR = color1.r - color2.r;
    var deltaG = color1.g - color2.g;
    var deltaB = color1.b - color2.b;

    return Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB);
}