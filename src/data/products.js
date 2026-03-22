// Ceny sú orientačné (Cardmarket EUR, január 2026)
// Aktualizuj ich podľa aktuálneho trhu

export const PRODUCT_TYPES = ['ETB', 'Booster Box', 'Blister', 'Tin', 'Bundle', 'Single', 'Iné']

export const products = [
  // === PRISMATIC EVOLUTIONS (2025) ===
  { id: 'pe-etb', name: 'Prismatic Evolutions ETB', set: 'Prismatic Evolutions', type: 'ETB', cmPrice: 95, ebayPrice: 100 },
  { id: 'pe-bbox', name: 'Prismatic Evolutions Booster Box', set: 'Prismatic Evolutions', type: 'Booster Box', cmPrice: 175, ebayPrice: 185 },
  { id: 'pe-blister3', name: 'Prismatic Evolutions 3-Pack Blister', set: 'Prismatic Evolutions', type: 'Blister', cmPrice: 22, ebayPrice: 25 },

  // === SURGING SPARKS (2024) ===
  { id: 'ss-etb', name: 'Surging Sparks ETB', set: 'Surging Sparks', type: 'ETB', cmPrice: 55, ebayPrice: 60 },
  { id: 'ss-bbox', name: 'Surging Sparks Booster Box', set: 'Surging Sparks', type: 'Booster Box', cmPrice: 120, ebayPrice: 130 },

  // === STELLAR CROWN (2024) ===
  { id: 'sc-etb', name: 'Stellar Crown ETB', set: 'Stellar Crown', type: 'ETB', cmPrice: 48, ebayPrice: 52 },
  { id: 'sc-bbox', name: 'Stellar Crown Booster Box', set: 'Stellar Crown', type: 'Booster Box', cmPrice: 100, ebayPrice: 110 },

  // === TWILIGHT MASQUERADE (2024) ===
  { id: 'tm-etb', name: 'Twilight Masquerade ETB', set: 'Twilight Masquerade', type: 'ETB', cmPrice: 50, ebayPrice: 55 },
  { id: 'tm-bbox', name: 'Twilight Masquerade Booster Box', set: 'Twilight Masquerade', type: 'Booster Box', cmPrice: 105, ebayPrice: 115 },

  // === SHROUDED FABLE (2024) ===
  { id: 'sf-etb', name: 'Shrouded Fable ETB', set: 'Shrouded Fable', type: 'ETB', cmPrice: 45, ebayPrice: 50 },
  { id: 'sf-bbox', name: 'Shrouded Fable Booster Box', set: 'Shrouded Fable', type: 'Booster Box', cmPrice: 95, ebayPrice: 105 },

  // === TEMPORAL FORCES (2024) ===
  { id: 'tf-etb', name: 'Temporal Forces ETB', set: 'Temporal Forces', type: 'ETB', cmPrice: 45, ebayPrice: 50 },
  { id: 'tf-bbox', name: 'Temporal Forces Booster Box', set: 'Temporal Forces', type: 'Booster Box', cmPrice: 90, ebayPrice: 100 },

  // === PALDEAN FATES (2024) ===
  { id: 'pf-etb', name: 'Paldean Fates ETB', set: 'Paldean Fates', type: 'ETB', cmPrice: 75, ebayPrice: 85 },
  { id: 'pf-bbox', name: 'Paldean Fates Booster Box', set: 'Paldean Fates', type: 'Booster Box', cmPrice: 150, ebayPrice: 165 },

  // === 151 (2023) ===
  { id: '151-etb', name: '151 ETB', set: 'Scarlet & Violet 151', type: 'ETB', cmPrice: 65, ebayPrice: 75 },
  { id: '151-bbox', name: '151 Booster Box', set: 'Scarlet & Violet 151', type: 'Booster Box', cmPrice: 140, ebayPrice: 155 },
  { id: '151-ultraprem', name: '151 Ultra Premium Collection', set: 'Scarlet & Violet 151', type: 'Bundle', cmPrice: 130, ebayPrice: 145 },

  // === PARADOX RIFT (2023) ===
  { id: 'pr-etb', name: 'Paradox Rift ETB', set: 'Paradox Rift', type: 'ETB', cmPrice: 50, ebayPrice: 55 },
  { id: 'pr-bbox', name: 'Paradox Rift Booster Box', set: 'Paradox Rift', type: 'Booster Box', cmPrice: 100, ebayPrice: 110 },

  // === OBSIDIAN FLAMES (2023) ===
  { id: 'of-etb', name: 'Obsidian Flames ETB', set: 'Obsidian Flames', type: 'ETB', cmPrice: 48, ebayPrice: 55 },
  { id: 'of-bbox', name: 'Obsidian Flames Booster Box', set: 'Obsidian Flames', type: 'Booster Box', cmPrice: 95, ebayPrice: 105 },

  // === CROWN ZENITH (2023) ===
  { id: 'cz-etb', name: 'Crown Zenith ETB', set: 'Crown Zenith', type: 'ETB', cmPrice: 60, ebayPrice: 70 },
  { id: 'cz-bbox', name: 'Crown Zenith Booster Box', set: 'Crown Zenith', type: 'Booster Box', cmPrice: 135, ebayPrice: 145 },

  // === JOURNEY TOGETHER (2025) ===
  { id: 'jt-etb', name: 'Journey Together ETB', set: 'Journey Together', type: 'ETB', cmPrice: 55, ebayPrice: 60 },
  { id: 'jt-bbox', name: 'Journey Together Booster Box', set: 'Journey Together', type: 'Booster Box', cmPrice: 120, ebayPrice: 130 },

  // === DESTINED RIVALS (2025) ===
  { id: 'dr-etb', name: 'Destined Rivals ETB', set: 'Destined Rivals', type: 'ETB', cmPrice: 58, ebayPrice: 65 },
  { id: 'dr-bbox', name: 'Destined Rivals Booster Box', set: 'Destined Rivals', type: 'Booster Box', cmPrice: 125, ebayPrice: 135 },

  // === JAPONSKÉ PRODUKTY ===
  { id: 'jp-pe-bbox', name: 'Prismatic Evolutions Booster Box (JP)', set: 'Prismatic Evolutions JP', type: 'Booster Box', cmPrice: 55, ebayPrice: 60 },
  { id: 'jp-ss-bbox', name: 'Surging Sparks Booster Box (JP)', set: 'Surging Sparks JP', type: 'Booster Box', cmPrice: 45, ebayPrice: 50 },

  // === POPULÁRNE SINGLES ===
  { id: 'charizard-ex-of', name: 'Charizard ex (Double Rare) – Obsidian Flames', set: 'Obsidian Flames', type: 'Single', cmPrice: 18, ebayPrice: 22 },
  { id: 'charizard-ex-of-fa', name: 'Charizard ex (Special Illustration Rare) – Obsidian Flames', set: 'Obsidian Flames', type: 'Single', cmPrice: 85, ebayPrice: 95 },
  { id: 'umbreon-ex-pe', name: 'Umbreon ex (Special Illustration Rare) – Prismatic Evolutions', set: 'Prismatic Evolutions', type: 'Single', cmPrice: 90, ebayPrice: 100 },
  { id: 'eevee-pe', name: 'Eevee (Special Illustration Rare) – Prismatic Evolutions', set: 'Prismatic Evolutions', type: 'Single', cmPrice: 35, ebayPrice: 40 },
  { id: 'pikachu-ex-pe', name: 'Pikachu ex (Special Illustration Rare) – Prismatic Evolutions', set: 'Prismatic Evolutions', type: 'Single', cmPrice: 45, ebayPrice: 50 },
  { id: 'mewtwo-ex-151', name: 'Mewtwo ex (Special Illustration Rare) – 151', set: 'Scarlet & Violet 151', type: 'Single', cmPrice: 40, ebayPrice: 45 },
  { id: 'mew-ex-151', name: 'Mew ex (Hyper Rare) – 151', set: 'Scarlet & Violet 151', type: 'Single', cmPrice: 30, ebayPrice: 35 },
  { id: 'miraidon-ex-ss', name: 'Miraidon ex (Special Illustration Rare) – Scarlet & Violet', set: 'Scarlet & Violet Base', type: 'Single', cmPrice: 25, ebayPrice: 30 },
  { id: 'koraidon-ex-ss', name: 'Koraidon ex (Special Illustration Rare) – Scarlet & Violet', set: 'Scarlet & Violet Base', type: 'Single', cmPrice: 22, ebayPrice: 28 },
  { id: 'iron-valiant-pr', name: 'Iron Valiant ex (Special Illustration Rare) – Paradox Rift', set: 'Paradox Rift', type: 'Single', cmPrice: 28, ebayPrice: 32 },
]
