const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("imageInput");
let outputFormat = document.querySelector("#outputFormat");

imageInput.addEventListener("change", function () {
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        let image = new Image();
        image.onload = function () {
            let format = outputFormat.value;
            let dataURL = convertImage(image, format);
            let link = document.createElement("a");
            link.href = dataURL;
            link.download = "converted-image." + format.split("/")[1];
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

function convertImage(image, outputFormat) {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    let dataURL = canvas.toDataURL(outputFormat);

    return dataURL;
}
