function loadURL() {
    const url = document.getElementById('urlInput').value;
    const iframe = document.getElementById('proxyFrame');
    
    iframe.src = url;
}
