document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.fade-in').forEach((section) => {
    observer.observe(section);
  });

  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        event.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const audio = document.getElementById('playerAudio');
  const playButton = document.querySelector('.audio-player__button');
  const progressBar = document.querySelector('.audio-player__progress');
  const playerTime = document.getElementById('playerTime');
  const playerDuration = document.getElementById('playerDuration');

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  if (audio && playButton && progressBar && playerTime && playerDuration) {
    playButton.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      playerDuration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / Math.max(audio.duration, 1)) * 100;
      progressBar.style.width = `${progress}%`;
      playerTime.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('play', () => {
      playButton.classList.add('playing');
      playButton.setAttribute('aria-label', 'Pause preview');
    });

    audio.addEventListener('pause', () => {
      playButton.classList.remove('playing');
      playButton.setAttribute('aria-label', 'Play preview');
    });
  }
});
