document.getElementById('secretForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const secretKey = document.getElementById('secretKey').value;
    const correctKey = '1234';
    if (secretKey === correctKey) {
      window.location.href = 'success.html';
    } else {
      document.getElementById('errorMessage').textContent = 'Incorrect key. Please try again.';
    }
  });