const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const response = document.getElementById("response");
const heartsContainer = document.querySelector(".hearts");
const notifyForm = document.getElementById("notifyForm");

let alreadySent = false;

yesBtn.addEventListener("click", async () => {
  response.innerHTML =
    "Yay! My heart is so happy 💖 I can't wait to celebrate our 29th monthsary with you, my love.";

  yesBtn.disabled = true;
  yesBtn.innerHTML = "You said yes 💖";

  createManyHearts();
  createSparkles();

  if (!alreadySent) {
    alreadySent = true;
    await sendNotification();
  }
});

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

noBtn.addEventListener("click", () => {
  response.innerHTML =
    "No is not allowed today 😭 Please choose yes, my love 💖";
});

async function sendNotification() {
  const formData = new FormData(notifyForm);

  try {
    const result = await fetch(notifyForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (result.ok) {
      console.log("Notification sent successfully.");
    } else {
      console.log("Notification failed.");
    }
  } catch (error) {
    console.log("Error sending notification:", error);
  }
}

function moveNoButton() {
  const x = Math.random() * 260 - 130;
  const y = Math.random() * 220 - 110;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = randomHeart();

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 18 + 18 + "px";
  heart.style.animationDuration = Math.random() * 2 + 4 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

function createManyHearts() {
  for (let i = 0; i < 45; i++) {
    setTimeout(createHeart, i * 80);
  }
}

function createSparkles() {
  for (let i = 0; i < 35; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      sparkle.innerHTML = "✨";

      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.top = Math.random() * 90 + "vh";

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 3500);
    }, i * 70);
  }
}

function randomHeart() {
  const hearts = ["❤️", "💖", "💕", "💗", "💘"];
  return hearts[Math.floor(Math.random() * hearts.length)];
}

setInterval(createHeart, 900);