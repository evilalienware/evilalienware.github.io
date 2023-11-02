// script.js

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
            // Set canvas size to the image size
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image to the canvas
            ctx.drawImage(img, 0, 0);

            // Pixelate the image
            let pixelSize = 8;  // Adjust for desired pixelation level
            for (let y = 0; y < canvas.height; y += pixelSize) {
                for (let x = 0; x < canvas.width; x += pixelSize) {
                    let data = ctx.getImageData(x, y, pixelSize, pixelSize);
                    let avg = averageColor(data);
                    ctx.fillStyle = 'rgb(' + avg[0] + ',' + avg[1] + ',' + avg[2] + ')';
                    ctx.fillRect(x, y, pixelSize, pixelSize);
                }
            }
        }
    }

    reader.readAsDataURL(file);
}

function averageColor(data) {
    let red = 0, green = 0, blue = 0;
    let blockSize = data.width * data.height;
    let pixels = data.data;

    for (let i = 0; i < blockSize; i++) {
        red += pixels[i * 4];
        green += pixels[i * 4 + 1];
        blue += pixels[i * 4 + 2];
    }
    red = Math.floor(red / blockSize);
    green = Math.floor(green / blockSize);
    blue = Math.floor(blue / blockSize);

    return [red, green, blue];
}
