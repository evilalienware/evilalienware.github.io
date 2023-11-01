function startMeme() {
    let memeAudio = document.getElementById('https://github.com/evilalienware/evilalienware.github.io/raw/main/Delinquent-Habits-Return-of-the-Tres.mp3');
    memeAudio.play();
    
    // Optionally, hide the start button after it's clicked.
    let startButton = document.getElementById('startButton');
    startButton.style.display = 'none';
}
