# Pretty Prices – Teknisk dokumentation

## Introduktion

Dette projekt er en webapplikation udviklet med HTML, CSS og JavaScript. Formålet er at præsentere budgetvenlige beauty-produkter på en overskuelig og brugervenlig måde. Applikationen anvender en ekstern API (DummyJSON) til dynamisk at hente og vise produkter.

Brugeren kan:

- se en liste af produkter
- filtrere efter pris
- klikke på et produkt og se detaljer
- indsende forslag til nye produkter via en formular

---

## Opbygning og struktur

Projektet består af følgende filer:

- `index.html` – forside
- `products.html` – produktliste
- `product.html` – produktdetalje
- `productlist.js` – håndterer visning af produkter
- `product.js` – håndterer visning af enkelt produkt
- `productlist.css` – styling

---

## Flow i applikationen

Brugeren starter på forsiden og navigerer derefter videre til produkterne.

Flow:

Forside → Produktliste → Produktdetalje

Når brugeren klikker på et produkt:

- produktets ID sendes via URL
- JavaScript henter det specifikke produkt
- produktet vises dynamisk

---

## Navngivning og kode

Der er brugt simple og beskrivende navne:

- `products` = flere produkter
- `product` = ét produkt
- `fetchProducts()` = henter data
- `displayProducts()` = viser data

Dette gør koden nem at forstå og arbejde videre med.

---

## Kommentarer i koden

Koden er kommenteret for at forklare funktioner og variabler.

Eksempel:

```js
// Fetch products from API
async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
}
```

---

## Bæredygtighed

Der er taget flere valg i udviklingen af sitet for at gøre løsningen mere bæredygtig.

Der arbejdes med en begrænset mængde data, hvor kun relevante produkter hentes og vises. Derudover er der ikke anvendt tunge frameworks, hvilket reducerer både loadtid og energiforbrug.

Koden er holdt simpel og effektiv, så browseren kun renderer det nødvendige indhold. Designet er minimalistisk uden brug af video eller unødvendigt tunge elementer, hvilket reducerer datatrafik og forbedrer brugeroplevelsen.

Samlet set er der fokus på at reducere ressourceforbrug gennem enkel struktur og effektiv datahåndtering.

---

## Git og branches

Git er anvendt til versionsstyring gennem hele projektet. Dette har gjort det muligt at arbejde struktureret og bevare overblik over ændringer i koden.

Der er arbejdet med en hovedbranch (main), som indeholder den stabile version af projektet. Derudover er der anvendt feature branches til udvikling af nye funktioner.

Eksempler på branches:

- feature/product-page
- feature/filter
- feature/design

Arbejdsprocessen har været:

1. Oprette en ny branch til en funktion
2. Udvikle og teste funktionaliteten
3. Committe ændringer med beskrivende beskeder
4. Merge branchen ind i main

Dette gør samarbejdet nemmere og sikrer, at fejl ikke påvirker hovedversionen af projektet.

---

## Databasestruktur (JSON)

Projektet anvender data fra DummyJSON API, som fungerer som en ekstern database.

Data er struktureret i JSON-format, hvor hvert produkt indeholder flere felter.

Eksempel på datastruktur:

```json
{
  "id": 1,
  "title": "Red Nail Polish",
  "price": 8.99,
  "rating": 4.3,
  "description": "Rich and glossy nail polish",
  "brand": "Nail Couture",
  "thumbnail": "image-url"
}
```
