# FixPoint — strona serwisu naprawy elektroniki

Prosta, responsywna strona wizytówka w HTML, CSS i JavaScript.

## Uruchomienie

Otwórz `index.html` w przeglądarce lub uruchom lokalny serwer:

```bash
cd naprawa-elektroniki
python3 -m http.server 8080
```

Następnie wejdź na [http://localhost:8080](http://localhost:8080).

## Dostosowanie

- **Nazwa firmy** — zmień „FixPoint” w `index.html`
- **Kontakt** — adres, telefon, e-mail w sekcji `#kontakt`
- **Cennik** — tabela w sekcji `#cennik`
- **Kolory** — zmienne CSS w `:root` w pliku `styles.css`

## Formularz kontaktowy (e-mail)

Strona używa [Web3Forms](https://web3forms.com) — darmowy serwis dla statycznych stron (250 wiadomości/miesiąc).

1. Wejdź na https://web3forms.com i podaj swój adres e-mail.
2. Skopiuj **Access Key** z maila lub panelu.
3. W `script.js` zamień `YOUR_ACCESS_KEY` na swój klucz w obiekcie `FORM_CONFIG`.

Po wysłaniu formularza dostaniesz maila z danymi klienta (imię, telefon, urządzenie, opis usterki).

Alternatywy: [Formspree](https://formspree.io), własny skrypt PHP na hostingu, lub Netlify Forms przy hostingu na Netlify.
