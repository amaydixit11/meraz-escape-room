document.addEventListener('DOMContentLoaded', () => {
  // Font loading handler
  const fontLoader = new FontFace('EscapeRoom', 'url(Escape\\ Room\\ 1936.otf)');
  fontLoader.load().then(() => {
      document.fonts.add(fontLoader);
      document.body.classList.remove('fonts-loading');
  }).catch(() => {
      // Fallback if font fails to load
      document.body.classList.remove('fonts-loading');
  });

  const form = document.getElementById('secretForm');
  const input = document.getElementById('secretKey');
  const errorMessage = document.getElementById('errorMessage');
  const attemptsCounter = document.getElementById('attemptsCounter');
  const container = document.querySelector('.container');
  
  let attempts = 5;
  const correctAnswer = '1234'; // Your original secret key
  
  // Ensure proper viewport height on mobile
  const setViewHeight = () => {
      document.documentElement.style.setProperty(
          '--vh', 
          `${window.innerHeight * 0.01}px`
      );
  };
  
  window.addEventListener('resize', setViewHeight);
  window.addEventListener('orientationchange', setViewHeight);
  setViewHeight();

  // Handle background image loading
  const preloadImage = new Image();
  preloadImage.src = 'img.png';
  preloadImage.onload = () => {
      document.body.style.backgroundImage = `url(${preloadImage.src})`;
  };

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const answer = input.value.trim();
      
      if (answer === correctAnswer) {
          window.location.href = 'success.html';
      } else {
          attempts--;
          container.classList.add('shake');
          
          // Remove shake animation
          container.addEventListener('animationend', () => {
              container.classList.remove('shake');
          }, { once: true });
          
          if (attempts > 0) {
              errorMessage.textContent = 'Incorrect key. Please try again.';
              attemptsCounter.textContent = `Attempts remaining: ${attempts}`;
          } else {
              container.innerHTML = `
                  <h1>Access Denied</h1>
                  <p>You have run out of attempts.</p>
                  <button onclick="location.reload()">Try Again</button>
              `;
          }
      }
      
      input.value = '';
  });

  // Prevent zoom on double tap for iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
          event.preventDefault();
      }
      lastTouchEnd = now;
  }, false);
});