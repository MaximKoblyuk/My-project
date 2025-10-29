# Auto-doplňování služeb - Implementace

## Co bylo implementováno

### 1. Data služeb (`/src/data/services.ts`)
- Vytvořen seznam přednastavených automobilových služeb
- Každá služba obsahuje:
  - `id`: Unikátní identifikátor
  - `name`: Název služby (např. "Výměna oleje")
  - `category`: Kategorie služby (např. "Údržba")
  - `keywords`: Klíčová slova pro vyhledávání

### 2. Funkce vyhledávání
- `searchServices(query: string)`: Vyhledává služby podle názvu a klíčových slov
- Podporuje české znaky a různé způsoby psaní
- Omezuje výsledky na 8 nejrelevantnějších položek

### 3. Vylepšené komponenty SearchBar
Oba komponenty (`SearchBar.tsx` a `SearchBarNew.tsx`) nyní obsahují:

#### Nové stavy:
- `showServiceDropdown`: Kontroluje zobrazení dropdownu se službami
- `filteredServices`: Filtrované služby na základě zadaného textu

#### Nové funkce:
- `handleServiceInputChange`: Zpracovává změny v poli služeb
- `selectService`: Vybírá službu z dropdownu
- Auto-doplňování se aktivuje po zadání 2 znaků

#### UI vylepšení:
- Dropdown s navrhovanými službami
- Ikona nářadí (`Wrench`) pro každou službu
- Zobrazení kategorie služby
- Tlačítko pro vymazání textu (`X`)
- Lepší styling a animace

## Podporované služby

1. **Autoopravna** - Kategorie: Opravy
2. **Výměna oleje** - Kategorie: Údržba  
3. **Mytí auta** - Kategorie: Čištění
4. **Pneuservis** - Kategorie: Pneumatiky
5. **Diagnostika** - Kategorie: Kontrola
6. **Detailing** - Kategorie: Čištění
7. **Klimatizace** - Kategorie: Komfort
8. **Brzdy** - Kategorie: Bezpečnost
9. **Odtahová služba** - Kategorie: Nouzové služby
10. **Elektrika** - Kategorie: Opravy
11. **Karosářské práce** - Kategorie: Opravy
12. **STK - Státní technická kontrola** - Kategorie: Kontrola
13. **EK - Měření emisí** - Kategorie: Kontrola
14. **STK + EK** - Kategorie: Kontrola
15. **PředSTK kontrola** - Kategorie: Kontrola
16. **Kontrola motorové brzdy** - Kategorie: Kontrola

## Jak to funguje

1. Uživatel začne psát do pole "Typ služby"
2. Po zadání 2 znaků se aktivuje vyhledávání
3. Zobrazí se dropdown s relevantními službami
4. Uživatel může vybrat službu kliknutím
5. Text se automaticky vyplní do pole

## Výhody

- **Rychlejší vyhledávání**: Uživatel nemusí psát celý název
- **Menší počet překlepů**: Výběr z přednastavených opcí
- **Lepší UX**: Intuitivní a responzivní rozhraní
- **Flexibilní**: Snadno rozšířitelné o další služby

## Testování

Spusťte lokální server:
```bash
npm run dev
```

Otevřete `http://localhost:3001` a vyzkoušejte psát:
- "myc" → navrhne "Mytí auta"
- "olej" → navrhne "Výměna oleje" 
- "brzd" → navrhne "Brzdy"
- "diag" → navrhne "Diagnostika"
- "STK" → navrhne "STK - Státní technická kontrola", "STK + EK", "PředSTK kontrola"
- "EK" → navrhne "EK - Měření emisí", "STK + EK"
- "emise" → navrhne "EK - Měření emisí"
- "technická" → navrhne "STK - Státní technická kontrola"
- "kontrola" → navrhne všechny kontrolní služby