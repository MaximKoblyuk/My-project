# STK a EK služby - Přidáno ✅

## Nové služby pro kontrolu vozidel

### 1. STK - Státní technická kontrola
- **ID**: `stk`
- **Kategorie**: Kontrola
- **Klíčová slova**: STK, státní technická kontrola, kontrola, technická, pravidelná kontrola, povinná kontrola

### 2. EK - Měření emisí  
- **ID**: `ek`
- **Kategorie**: Kontrola
- **Klíčová slova**: EK, emise, měření emisí, emisní kontrola, výfuk, katalyzátor

### 3. STK + EK (Kombinovaná služba)
- **ID**: `stk-ek`  
- **Kategorie**: Kontrola
- **Klíčová slova**: STK EK, STK a EK, technická kontrola + emise, kompletní kontrola, povinné kontroly

### 4. PředSTK kontrola
- **ID**: `predstk`
- **Kategorie**: Kontrola  
- **Klíčová slova**: předSTK, příprava na STK, kontrola před STK, prověrka, předběžná kontrola

### 5. Kontrola motorové brzdy
- **ID**: `motorova-brzda`
- **Kategorie**: Kontrola
- **Klíčová slova**: motorová brzda, brzda motoru, kontrola brzd, brzdný systém, EK brzda

## Jak testovat

Spusťte aplikaci na `http://localhost:3001` a vyzkoušejte psát:

### STK služby:
- **"STK"** → zobrazí STK, STK + EK, PředSTK
- **"státní"** → zobrazí STK - Státní technická kontrola
- **"technická"** → zobrazí STK služby
- **"před"** → zobrazí PředSTK kontrola

### EK služby:  
- **"EK"** → zobrazí EK, STK + EK
- **"emise"** → zobrazí EK - Měření emisí
- **"emisní"** → zobrazí EK služby
- **"výfuk"** → zobrazí EK - Měření emisí

### Kombinované:
- **"STK EK"** → zobrazí STK + EK
- **"kontrola"** → zobrazí všechny kontrolní služby
- **"povinná"** → zobrazí STK a povinné kontroly

## Výhody nových služeb

✅ **Specifické vyhledávání** - Uživatel najde přesně co hledá  
✅ **Více variant** - STK samostatně, EK samostatně, nebo kombinace  
✅ **České termíny** - Podporuje běžné české výrazy  
✅ **Přípravné služby** - PředSTK pro přípravu na kontrolu  
✅ **Komplexní pokrytí** - Všechny typy kontrol vozidel

Služby STK a EK jsou nyní plně implementované! 🚗✅