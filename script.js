const imgInput = document.querySelector('#img-select');
const imgPreview = document.querySelector('.preview');
const resultElement = document.querySelector('.result');
const pickerBtn = document.querySelector('.open-picker');
const copyBtn = document.querySelector('.copy-btn');

if (!window.EyeDropper) {
    alert("Your browser does not support this feature");
}

const eyeDropper = new EyeDropper();

imgInput.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('load', function() {
        imgPreview.src = this.result;
    });

    reader.readAsDataURL(file);
});

pickerBtn.addEventListener('click', function() {
    eyeDropper.open()
        .then(res => {
            const hex = res.sRGBHex;
            const rgb = hexToRgb(hex);
            resultElement.innerHTML = `Picked Color: <b>rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</b>`;
            copyBtn.style.display = 'block';
            copyBtn.addEventListener('click', function() {
                navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
                alert(`Copied to clipboard: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
            });
        })
        .catch(err => {
            console.log("User canceled the selection.");
        });
});

function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
}
