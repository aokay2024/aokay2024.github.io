const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let nodes = [];
let connections = [];
const nodeCount = 50; // Number of nodes
const maxConnectionDistance = 150; // Maximum distance between connected nodes

// Resize the canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Create a Node class for the neural network points
class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 3; // Size of the node
    this.vx = (Math.random() - 0.5) * 2; // Horizontal velocity
    this.vy = (Math.random() - 0.5) * 2; // Vertical velocity
  }

  // Update the node's position
  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce the node off the edges of the canvas
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  // Draw the node
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffcc";
    ctx.fill();
    ctx.closePath();
  }
}

// Create nodes for the neural network
for (let i = 0; i < nodeCount; i++) {
  nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
}

// Draw lines between close nodes
function drawConnections() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (dist < maxConnectionDistance) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(0, 255, 204, ${1 - dist / maxConnectionDistance})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  for (let node of nodes) {
    node.update();
    node.draw();
  }
  drawConnections();
  requestAnimationFrame(animate); // Continue the animation
}

// Start the animation
animate();
