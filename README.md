# Curve Learn

A static, educational website about the Curve protocol, the CRV token, and decentralized oracle
infrastructure. Built from the design system in `curve.zip`, with a neutral, compliance-focused
editorial tone. Not financial advice.

## Pages

- `index.html` — Home (hero, why oracles matter, use cases, risks)
- `how-it-works.html` — Oracle networks explained (data feeds, verification, node operators, reliability)
- `use-cases.html` — Fact-based oracle use cases with source references
- `news.html` + `news/*.html` — Editorial articles with sources, dates, authorship, and disclaimers
- `risks.html` — Risk overview (volatility, smart contract, liquidity, regulatory)
- `faq.html` — FAQ with structured-data (FAQ schema)
- `about.html` — Editorial mission and transparency statement
- `contact.html` — Contact form (client-side validation) and editorial email
- `privacy.html`, `terms.html`, `risk-disclosure.html` — Legal pages

## Structure

- `assets/css/site.css` — utility CSS extracted from the original template
- `assets/css/custom.css` — site-specific additions (menu, accordion, forms, cookie banner)
- `assets/js/main.js` — navbar menu, FAQ accordion, smooth scrolling, news filter, contact form, cookie consent
- `assets/img/` — template imagery

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

No build step is required; all pages are static HTML.
