// ===== Dark / light mode toggle =====
// The <head> script already added .dark before the page painted.
// This part only handles clicks and saves the choice.
const themeToggle = document.querySelector('#theme-toggle');
const root = document.documentElement;

function setTheme(isDark) {
  root.classList.toggle('dark', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (error) {
    // Storage blocked: the theme still changes, it just won't be remembered
  }
}

if (themeToggle) {
  // Sync the button state with whatever the <head> script decided
  themeToggle.setAttribute('aria-pressed', String(root.classList.contains('dark')));

  themeToggle.addEventListener('click', () => {
    setTheme(!root.classList.contains('dark'));
  });
}

// ===== Typing animation (hero heading, index.html only) =====
const typedLines = document.querySelectorAll('#typed-heading [data-line]');
const typedCursor = document.querySelector('#typed-cursor');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Skip on other pages, and for users who turned on "reduce motion" (they just see the full text)
if (typedLines.length > 0 && typedCursor && !reduceMotion) {
  // Remember each line's text, then empty the lines so we can type them back in
  const lineTexts = Array.from(typedLines, (line) => line.textContent);
  typedLines.forEach((line) => {
    line.textContent = '';
  });
  typedCursor.classList.remove('hidden');

  let lineIndex = 0;
  let charIndex = 0;

  function typeNextChar() {
    const line = typedLines[lineIndex];
    const text = lineTexts[lineIndex];

    line.after(typedCursor); // keep the cursor at the end of the line being typed
    charIndex++;
    line.textContent = text.slice(0, charIndex);

    if (charIndex < text.length) {
      setTimeout(typeNextChar, 70); // next letter
    } else if (lineIndex < typedLines.length - 1) {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, 400); // short pause before the next line
    } else {
      setTimeout(eraseNextChar, 2500); // all lines typed: hold, then start erasing
    }
  }

  // Erase backwards (last line first), then start typing again from the top
  function eraseNextChar() {
    const line = typedLines[lineIndex];

    line.after(typedCursor);
    charIndex--;
    line.textContent = lineTexts[lineIndex].slice(0, charIndex);

    if (charIndex > 0) {
      setTimeout(eraseNextChar, 35); // erasing is faster than typing
    } else if (lineIndex > 0) {
      lineIndex--;
      charIndex = lineTexts[lineIndex].length;
      setTimeout(eraseNextChar, 150);
    } else {
      // Everything erased: loop back to the first line
      setTimeout(typeNextChar, 600);
    }
  }

  setTimeout(typeNextChar, 300);
}

// ===== Tools strip: fill wide screens (index.html only) =====
// One list is about 960px wide. The CSS slides the track by half its width, so each half
// must be wider than the screen, or an empty gap shows on big monitors (e.g. 1920px).
const toolsTrack = document.querySelector('#tools-track');

function fillToolsTrack() {
  const lists = toolsTrack.querySelectorAll('ul');
  const hiddenCopy = lists[1]; // already aria-hidden, so its clones are hidden from screen readers too
  const listWidth = lists[0].offsetWidth;

  // How many lists each half needs to cover the whole screen
  const listsPerHalf = Math.max(1, Math.ceil(window.screen.width / listWidth));

  // The HTML already has 2 lists (1 per half); add clones until both halves are full
  for (let i = 2; i < listsPerHalf * 2; i++) {
    toolsTrack.append(hiddenCopy.cloneNode(true));
  }

  // A longer track travels farther, so give it more time to keep the same speed
  toolsTrack.style.animationDuration = `${listsPerHalf * 30}s`;
}

if (toolsTrack && !reduceMotion) {
  // Wait for Google Sans to load first: measured with the fallback font, the list looks narrower than it is
  document.fonts.ready.then(fillToolsTrack);
}

// ===== Contact form validation (contact.html only) =====
// Front-end only: the form is checked in the browser and never actually sent anywhere.
const contactForm = document.querySelector('#contact-form');
const MIN_MESSAGE_LENGTH = 20;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // text@text.text with no spaces

// Each rule gets the trimmed value and returns an error message, or '' when the value is OK
const contactRules = {
  name: (value) => (value === '' ? 'Please enter your name.' : ''),
  email: (value) => {
    if (value === '') return 'Please enter your email address.';
    if (!emailPattern.test(value)) return 'Please enter a valid email address, like name@example.com.';
    return '';
  },
  message: (value) => {
    if (value === '') return 'Please write a message.';
    if (value.length < MIN_MESSAGE_LENGTH) {
      return `Your message needs at least ${MIN_MESSAGE_LENGTH} characters (you have ${value.length}).`;
    }
    return '';
  },
};

function validateField(input) {
  const error = contactRules[input.name](input.value.trim());
  const errorText = document.querySelector(`#${input.id}-error`);

  // textContent, never innerHTML: the text can't run as HTML, even if the visitor typed some
  errorText.textContent = error;
  // aria-invalid tells screen readers the field has a problem; aria-describedby (in the HTML) reads the error
  input.setAttribute('aria-invalid', String(error !== ''));
  return error === '';
}

if (contactForm) {
  const fields = Array.from(contactForm.querySelectorAll('input, textarea'));
  const successText = document.querySelector('#form-success');

  fields.forEach((field) => {
    // Check a field when the visitor leaves it, but only if they typed something (no nagging while tabbing)
    field.addEventListener('blur', () => {
      if (field.value.trim() !== '') validateField(field);
    });
    // Once a field shows an error, re-check while typing so the error disappears as soon as it's fixed
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the browser from sending the form or reloading the page
    successText.classList.add('hidden');

    // Check every field (not just the first) so all errors show at once
    const results = fields.map(validateField);
    if (results.includes(false)) {
      fields[results.indexOf(false)].focus(); // jump to the first problem
      return;
    }

    const name = document.querySelector('#name').value.trim();
    successText.textContent = `Thanks, ${name}! Your message passed every check. This form is a front-end demo, so nothing was actually sent. Email me at justinjayvitales00@gmail.com and I'll get back to you.`;
    successText.classList.remove('hidden');
    contactForm.reset();
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
  });
}

// ===== Mobile menu toggle =====
const menuButton = document.querySelector('#menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
const iconOpen = document.querySelector('#menu-icon-open');
const iconClose = document.querySelector('#menu-icon-close');

function setMenuOpen(isOpen) {
  // aria-expanded tells screen readers whether the menu is open
  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.classList.toggle('hidden', !isOpen);
  iconOpen.classList.toggle('hidden', isOpen);
  iconClose.classList.toggle('hidden', !isOpen);
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  // Close with the Escape key and return focus to the button
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
}
