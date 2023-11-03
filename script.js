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

            // Check if the image size exceeds the set dimensions
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

            // Draw and pixelate the image
            ctx.drawImage(img, 0, 0, width / 8, height / 8);
            let pixelatedImage = new Image();
            pixelatedImage.src = canvas.toDataURL();
            pixelatedImage.onload = function() {
                ctx.drawImage(pixelatedImage, 0, 0, width / 8, height / 8, 0, 0, width, height);
            }
        }
    }

    reader.readAsDataURL(file);
}
