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

// Adjustments for balls: size increase and pastel color range
const balls = [];
const gravity = 0.2; // Gravity effect
const colorChangeSpeed = 0.01; // Speed for color transition

for (let i = 0; i < 10; i++) {
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: (15 + Math.random() * 20) * 1.3, // Increase ball size by 130%
        colorHue: Math.random() * 360,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
    });
}

function animateBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        // Set pastel color by reducing saturation and lightness
        ball.colorHue = (ball.colorHue + colorChangeSpeed) % 360;
        const color = `hsl(${ball.colorHue}, 70%, 85%)`;

        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        // Continuous bounce
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }

        // Move ball
        ball.x += ball.dx;
        ball.y += ball.dy;
    });
    requestAnimationFrame(animateBalls);
}

animateBalls();
