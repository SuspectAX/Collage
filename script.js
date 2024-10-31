// Bouncing Balls Animation
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext('2d');

// Resize canvas to fit the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const balls = [];
const gravity = 0.2;
const colorChangeSpeed = 0.01;

for (let i = 0; i < 12; i++) {
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 25 + Math.random() * 13,
        colorHue: Math.random() * 360,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
    });
}

function animateBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.colorHue = (ball.colorHue + colorChangeSpeed) % 360;
        const color = `hsl(${ball.colorHue}, 70%, 85%)`;

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
    });
    requestAnimationFrame(animateBalls);
}

animateBalls();

let selectingMode = false;
let selectedPhotos = [];

// Start photo selection mode
function startSelection() {
    selectingMode = true;
    selectedPhotos = [];

    document.getElementById("downloadBtn").style.display = "none";
    document.getElementById("confirmBtn").style.display = "block";
    document.getElementById("cancelBtn").style.display = "block";

    document.querySelectorAll(".photo").forEach(photo => {
        photo.classList.add("selectable");
        photo.onclick = () => selectPhoto(photo);
    });
}

// Select or Deselect a photo
function selectPhoto(photo) {
    if (selectingMode) {
        const index = selectedPhotos.indexOf(photo);

        if (index > -1) {
            selectedPhotos.splice(index, 1);
            photo.classList.remove("selected");
        } else {
            selectedPhotos.push(photo);
            photo.classList.add("selected");
        }
    }
}

// Confirm download
function confirmDownload() {
    if (selectedPhotos.length === 0) {
        alert("No photos selected.");
        return;
    }

    selectedPhotos.forEach(photo => {
        const link = document.createElement("a");
        link.href = photo.src;
        link.download = photo.alt || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Reset to download button
    cancelSelection();
}

// Cancel selection
function cancelSelection() {
    selectingMode = false;
    selectedPhotos = [];

    document.getElementById("downloadBtn").style.display = "block";
    document.getElementById("confirmBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";

    document.querySelectorAll(".photo").forEach(photo => {
        photo.classList.remove("selectable");
        photo.classList.remove("selected");
        photo.onclick = null; // Reset click handler
    });
}
