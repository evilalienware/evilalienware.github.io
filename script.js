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
            const maxWidth = 1280;
            const maxHeight = 720;

            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (maxWidth / width) * height;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width = (maxHeight / height) * width;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            // Get the pixelation level from the slider
            let pixelation = document.getElementById('pixelation').value;
            let pixelSize = (width / 1280) * (11 - pixelation); // Adjust pixelation based on image width and slider value

            ctx.drawImage(img, 0, 0, width * pixelSize, height * pixelSize);
            let pixelatedImage = new Image();
            pixelatedImage.src = canvas.toDataURL();
            pixelatedImage.onload = function() {
                ctx.drawImage(pixelatedImage, 0, 0, width * pixelSize, height * pixelSize, 0, 0, width, height);
            }
        }
    }

    reader.readAsDataURL(file);
}

// Function to update the pixelation value display
function updatePixelationValue(slider) {
    document.getElementById('sliderValue').innerText = slider.value;
}
