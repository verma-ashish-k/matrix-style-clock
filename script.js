let lastTimeString = '';
let lastMinute = null;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');

  if (lastMinute !== minutes) {
    // Check if the minute has changed
    if (minutes === 0) {
      // Full hour
      document.getElementById('fullHourBeep').play();
    } else if (minutes === 30) {
      // Half hour
      document.getElementById('halfHourBeep').play();
    }

    lastMinute = minutes; // Store the last minute we beeped at
  }
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  const timeString = `${hours}:${minutes} ${ampm}`;
  const clockElement = document.getElementById('clock');

  if (lastTimeString !== timeString) {
    clockElement.innerHTML = '';
    for (let i = 0; i < timeString.length; i++) {
      const char = timeString[i];
      const lastChar = lastTimeString[i] || ' ';

      if (char === ':') {
        const colonSpan = document.createElement('span');
        colonSpan.className = 'colon';
        colonSpan.textContent = char;
        clockElement.appendChild(colonSpan);
      } else {
        const digitDiv = document.createElement('div');
        digitDiv.className = 'digit';
        clockElement.appendChild(digitDiv);

        const newFlip = document.createElement('div');
        newFlip.className = 'flip';
        newFlip.textContent = char;

        const oldFlip = document.createElement('div');
        oldFlip.className = 'flip';
        oldFlip.textContent = lastChar;

        if (char !== lastChar) {
          oldFlip.style.animation = 'slideOut 1s';
          newFlip.style.animation = 'slideIn 1s';
          oldFlip.addEventListener('animationend', function () {
            oldFlip.remove();
          });
        }

        digitDiv.appendChild(oldFlip);
        digitDiv.appendChild(newFlip);

        clockElement.appendChild(digitDiv);
      }
    }

    lastTimeString = timeString;
  }
}

setInterval(updateClock, 1000);
updateClock(); // Initialize the clock
