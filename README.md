# Alla Sostra · Sito web

Sito web rinnovato per **Alla Sostra**, take away di pesce di lago a
Dervio (LC), sulla sponda orientale del Lago di Como.

> 📍 Via alla Darsena, Lungo Lago — 23824 Dervio (LC)
> 📞 366 742 4992 · [Instagram](https://www.instagram.com/alla_sostra_takeaway2020/) · [Facebook](https://www.facebook.com/p/Alla-Sostra-Take-Away-100063705545893/)

---

## Cosa contiene il sito

Pagina unica (single-page) con scroll fluido tra le sezioni:

1. **Hero** — vista lago animata via CSS, claim e CTA
2. **Storia** — chi siamo, valori (pesce di lago, cucina semplice, vista)
3. **Menù** — 4 categorie (primi, alla brace, sfiziosi, dolci & cantina)
4. **Esperienza** — il flusso "ordini → siedi → ti chiamiamo"
5. **Orari** — tabella aperture (Ven sera, Sab/Dom pranzo & cena)
6. **Contatti** — indirizzo, telefono, social, mappa OpenStreetMap

Funzioni extra:

- 🇮🇹 / 🇬🇧 switch lingua (preferenza salvata in `localStorage`)
- Header sticky con cambio stato allo scroll
- Reveal-on-scroll via `IntersectionObserver`
- Menu mobile a tutta pagina
- Rispetto di `prefers-reduced-motion`

## Stack

Volutamente **senza framework**: HTML + CSS + un piccolo `script.js`.
Si apre con un doppio click, si pubblica ovunque (GitHub Pages,
Netlify, Vercel, hosting tradizionale).

```
.
├── index.html      # Markup di tutte le sezioni
├── styles.css      # Palette + layout + animazioni
├── script.js       # Header, mobile menu, reveal, i18n
└── README.md
```

## Sviluppo locale

Basta aprire `index.html` nel browser.
In alternativa, un mini-server statico:

```bash
python3 -m http.server 8000
# poi visita http://localhost:8000
```

## Deploy su GitHub Pages

1. Vai su **Settings → Pages**
2. Source: `Deploy from a branch`
3. Branch: `main` (o quello desiderato), cartella `/ (root)`
4. Salva — il sito è online in pochi minuti

## Palette

| Ruolo | Colore | Hex |
|---|---|---|
| Acqua profonda | Lake 800 | `#0e3b4d` |
| Acqua media | Lake 500 | `#3a7a8f` |
| Sabbia | Sand 100 | `#f5edd9` |
| Crema | Sand 50 | `#fbf6ec` |
| Tramonto / accento | Copper | `#c66b47` |
| Oro caldo | Amber | `#d39047` |

## Tipografia

- **Display**: Cormorant Garamond (titoli)
- **Body**: Inter (testi)

Caricati via Google Fonts con `preconnect`.

## Crediti contenuti

Testi pensati ad hoc per il rinnovo del sito. Le voci di menù sono
basate sulla tradizione lariana e sulle recensioni pubbliche del
locale (Tripadvisor, Sluurpy, Restaurant Guru). Prima di pubblicare,
verifica con il proprietario eventuali aggiornamenti su prezzi,
piatti e P.IVA nel footer.
