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
            // Reduce the image size for more pronounced pixelation
            let reducedWidth = img.width / 8;  
            let reducedHeight = img.height / 8;

            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image reduced
            ctx.drawImage(img, 0, 0, reducedWidth, reducedHeight);

            // Scale it back up
            let pixelatedImage = new Image();
            pixelatedImage.src = canvas.toDataURL();
            pixelatedImage.onload = function() {
                ctx.drawImage(pixelatedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, img.width, img.height);
            }
        }
    }

    reader.readAsDataURL(file);
}
