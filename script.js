let globalImage; // Store the loaded image globally so we can access it on slider change

function handleImage() {
    let input = document.getElementById('imageInput');
    let canvas = document.getElementById('canvas');

    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        globalImage = new Image();
        globalImage.src = e.target.result;

        globalImage.onload = function() {
            processImage(); // Process the image when it's loaded
        }
    }

    reader.readAsDataURL(file);
}

function processImage() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    const maxWidth = 1280;
    const maxHeight = 720;

    let width = globalImage.width;
    let height = globalImage.height;

    if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
    }

    if (height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
    }

    let pixelationLevel = document.getElementById('pixelationSlider').value;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(globalImage, 0, 0, width / (8 * pixelationLevel), height / (8 * pixelationLevel));

    // Apply pixelation effect
    for(let y = 0; y < height; y += pixelationLevel) {
        for(let x = 0; x < width; x += pixelationLevel) {
            const pixelColor = ctx.getImageData(x, y, 1, 1).data;
            ctx.fillStyle = `rgba(${pixelColor[0]},${pixelColor[1]},${pixelColor[2]},${pixelColor[3] / 255})`;
            ctx.fillRect(x, y, pixelationLevel, pixelationLevel);
        }
    }
}

document.getElementById('pixelationSlider').addEventListener('input', function() {
    document.getElementById('sliderValue').textContent = this.value;
    if (globalImage) {
        processImage(); // Reprocess the image whenever the slider changes
    }
});
