let globalImage; // Store the loaded image globally so we can access it on slider change

function handleImage() {
    let input = document.getElementById('imageInput');
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
    
    // Define max dimensions.
    const maxWidth = 400; // Set this to the max width you want.
    const maxHeight = 400; // Set this to the max height you want.
    
    // Calculate the new image dimensions, maintaining aspect ratio.
    let width = globalImage.width;
    let height = globalImage.height;
    
    // Calculate aspect ratio
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    
    // Use the ratio to calculate the new dimensions that fit within the max dimensions
    width *= ratio;
    height *= ratio;
    
    // Set canvas dimensions to the new calculated dimensions.
    canvas.width = width;
    canvas.height = height;
    
    let pixelationLevel = document.getElementById('pixelationSlider').value;

    // Now draw the image on the canvas
    ctx.drawImage(globalImage, 0, 0, width, height);
    
    // Pixelate the image by drawing it smaller, then blowing it back up.
    let tempCanvas = document.createElement('canvas');
    let tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = width / (8 * pixelationLevel);
    tempCanvas.height = height / (8 * pixelationLevel);
    tempCtx.drawImage(globalImage, 0, 0, tempCanvas.width, tempCanvas.height);
    
    // Now draw the pixelated version on the main canvas.
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, width, height);
}

function downloadImage() {
    let canvas = document.getElementById('canvas');
    let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let link = document.createElement('a');
    link.download = 'pixelated_image.png';
    link.href = image;
    link.click();
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    downloadImage();
});

document.getElementById('pixelationSlider').addEventListener('input', function() {
    document.getElementById('sliderValue').textContent = this.value;
    if (globalImage) {
        processImage(); // Reprocess the image whenever the slider changes
    }
});
