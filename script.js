let globalImage; // Store the loaded image globally so we can access it on slider change

function handleImage() {
    let input = document.getElementById('imageInput');
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        let img = new Image();
        img.src = e.target.result;

        img.onload = function() {
            const maxWidth = 1280; // Set the max width for the image
            const maxHeight = 720; // Set the max height for the image

            let width = img.width;
            let height = img.height;

            // Check if the image size exceeds the set dimensions and scale down proportionally
            if (width > maxWidth) {
                const ratio = maxWidth / width; // calculate ratio to scale image
                height *= ratio;
                width *= ratio;
            }

            if (height > maxHeight) {
                const ratio = maxHeight / height; // calculate ratio to scale image
                width *= ratio;
                height *= ratio;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and pixelate the image
            ctx.drawImage(img, 0, 0, width, height); // Draw the full-sized image
            let pixelatedImage = new Image();
            pixelatedImage.src = canvas.toDataURL();
            pixelatedImage.onload = function() {
                ctx.drawImage(pixelatedImage, 0, 0, width, height);
            }
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
    let pixelatedImage = new Image();
    pixelatedImage.src = canvas.toDataURL();
    pixelatedImage.onload = function() {
        ctx.drawImage(pixelatedImage, 0, 0, width / (8 * pixelationLevel), height / (8 * pixelationLevel), 0, 0, width, height);
    }
}

document.getElementById('pixelationSlider').addEventListener('input', function() {
    document.getElementById('sliderValue').textContent = this.value;
    if (globalImage) {
        processImage(); // Reprocess the image whenever the slider changes
    }
});
