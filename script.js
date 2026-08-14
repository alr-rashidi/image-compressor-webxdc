const fileInput = document.getElementById("fileInput");
const qualityInput = document.getElementById("qualityInput");
const qualitySpan = document.getElementById("qualitySpan");
const maxFileSizeInput = document.getElementById("maxFileSizeInput");
const maxFileSizeSpan = document.getElementById("maxFileSizeSpan");
const fileTypeSelect = document.getElementById("fileTypeSelect");
const sendToChatDiv = document.getElementById("sendToChatDiv");
const sendToChatButton = document.getElementById("sendToChatButton");
const sendToChatInput = document.getElementById("sendToChatInput");
const originalFileSizeSpan = document.getElementById("originalFileSizeSpan");
const compressedFileSizeSpan = document.getElementById(
  "compressedFileSizeSpan",
);
const compressionRatioSpan = document.getElementById("compressionRatioSpan");
const compressedImg = document.getElementById("compressedImg");
const loadingDiv = document.getElementById("loadingDiv");
const infoDiv = document.getElementById("info");
const sendToChatBlocked = document.getElementById("sendToChatBlocked");
const compressionController = new AbortController();
var compressedFile;
var maxFileSizeMB = 0.3;
var quality = 0.5;
var fileType = "webp";
var newFileName;

qualityInput.addEventListener("input", () => {
  const value = qualityInput.value;
  quality = value / 100;
  qualitySpan.innerHTML = value + "%";
});

maxFileSizeInput.addEventListener("input", () => {
  const value = maxFileSizeInput.value;
  maxFileSizeMB = value / 1000;
  maxFileSizeSpan.innerHTML = value + "KB";
});

fileTypeSelect.addEventListener("change", () => {
  fileType = fileTypeSelect.value;
  handleImageCompression();
});

qualityInput.addEventListener("change", handleImageCompression);
maxFileSizeInput.addEventListener("change", handleImageCompression);
fileInput.addEventListener("change", handleImageCompression);
sendToChatButton.addEventListener("click", () => sendToChat(compressedFile));

async function handleImageCompression() {
  compressionController.abort();

  const originalFile = fileInput.files[0];
  if (!originalFile) return;

  const options = {
    maxSizeMB: maxFileSizeMB,
    useWebWorker: true,
    fileType: "image/" + fileType,
    initialQuality: quality,
    onProgress: (percentage) => {
      loadingDiv.style.animationName = "blink";
      loadingDiv.innerHTML = percentage + "%";
    },
    siganl: compressionController.signal,
  };

  compressedFile = await imageCompression(originalFile, options)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      alert(err.message);
      loadingDiv.style.animationName = "";
      return;
    });

  const compressedURL = URL.createObjectURL(compressedFile);
  const compressionRatio = (
    ((originalFile.size - compressedFile.size) / originalFile.size) *
    100
  ).toFixed();
  newFileName =
    originalFile.name.split(".").slice(0, -1).join(".") + "." + fileType;
  "-compressed" + fileTypeSelect;

  originalFileSizeSpan.innerHTML = (originalFile.size / 1024).toFixed() + "KB";
  compressedFileSizeSpan.innerHTML =
    (compressedFile.size / 1024).toFixed() + "KB";
  compressionRatioSpan.innerHTML = compressionRatio + "%";
  compressedImg.src = compressedURL;
  loadingDiv.style.animationName = "";
  sendToChatDiv.style.opacity = "1";
}

async function sendToChat(blob) {
  try {
    await window.webxdc.sendToChat({
      file: {
        blob: blob,
        name: newFileName,
      },
      text: sendToChatInput.value,
    });
  } catch (error) {
    console.error("Failed to send:", error);
    alert("Sending message Failed:" + error.message);
  }
}

if (!window.webxdc) {
  sendToChatBlocked.classList.remove("hide")
}
