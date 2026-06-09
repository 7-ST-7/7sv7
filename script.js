const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('open');
  });
});

// ── Formularz kontaktowy ─────────────────────────────────────────────
// 1. Wejdź na https://web3forms.com
// 2. Podaj swój e-mail i skopiuj wygenerowany Access Key
// 3. Wklej klucz poniżej zamiast YOUR_ACCESS_KEY
const FORM_CONFIG = {
  accessKey: 'ceb6f1e6-eb0c-4698-a60c-1cf8764cd495',
  subject: 'Nowe zgłoszenie — 7ST7 Tech Serwis',
};

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = form?.querySelector('button[type="submit"]');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.textContent = '';
  formStatus.className = 'form-note';

  const data = new FormData(form);
  const name = data.get('name')?.toString().trim();
  const phone = data.get('phone')?.toString().trim();
  const device = data.get('device')?.toString();
  const message = data.get('message')?.toString().trim();

  if (!name || !phone || !device || !message) {
    formStatus.textContent = 'Uzupełnij wszystkie pola formularza.';
    formStatus.classList.add('error');
    return;
  }

  if (FORM_CONFIG.accessKey === 'YOUR_ACCESS_KEY') {
    formStatus.textContent = 'Skonfiguruj klucz Web3Forms w pliku script.js (patrz komentarz na górze).';
    formStatus.classList.add('error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Wysyłanie…';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: FORM_CONFIG.accessKey,
        subject: FORM_CONFIG.subject,
        from_name: 'Formularz WWW',
        name,
        phone,
        device,
        message,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Nie udało się wysłać formularza.');
    }

    formStatus.textContent = 'Dziękujemy! Wiadomość została wysłana — odezwiemy się wkrótce.';
    formStatus.classList.add('success');
    form.reset();
  } catch (err) {
    formStatus.textContent = err.message || 'Wystąpił błąd. Spróbuj ponownie lub zadzwoń do nas.';
    formStatus.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Wyślij zgłoszenie';
  }
});
