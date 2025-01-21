const bgMusic = document.getElementById("bgMusic");
const muteButton = document.getElementById("mute");

let isPlaying = true;


muteButton.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    muteButton.className = "fa fa-volume-mute";
  } else {
    bgMusic.play().catch((err) => console.error("Audio playback failed:", err));
    muteButton.className = "fa fa-volume-up";
    
  }
  isPlaying = !isPlaying;
});


