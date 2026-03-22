// Sealed products databáza — ceny orientačné (CM EUR, január 2026)
// Singles sú vyhľadávané live cez pokemontcg.io API (s reálnymi CM cenami)

export const PRODUCT_TYPES = ['ETB', 'Booster Box', 'Blister', 'Tin', 'Bundle', 'UPC', 'Single', 'Iné']

export const sealedProducts = [
  // ─── SCARLET & VIOLET ERA ──────────────────────────────────────────────────

  // Destined Rivals (2025)
  { id: 'dr-etb', name: 'Destined Rivals ETB', set: 'Destined Rivals', type: 'ETB', cmPrice: 58, ebayPrice: 65 },
  { id: 'dr-bbox', name: 'Destined Rivals Booster Box', set: 'Destined Rivals', type: 'Booster Box', cmPrice: 125, ebayPrice: 135 },

  // Journey Together (2025)
  { id: 'jt-etb', name: 'Journey Together ETB', set: 'Journey Together', type: 'ETB', cmPrice: 55, ebayPrice: 60 },
  { id: 'jt-bbox', name: 'Journey Together Booster Box', set: 'Journey Together', type: 'Booster Box', cmPrice: 120, ebayPrice: 130 },
  { id: 'jt-upc', name: 'Journey Together Ultra Premium Collection', set: 'Journey Together', type: 'UPC', cmPrice: 200, ebayPrice: 220 },

  // Prismatic Evolutions (2025)
  { id: 'pe-etb', name: 'Prismatic Evolutions ETB', set: 'Prismatic Evolutions', type: 'ETB', cmPrice: 95, ebayPrice: 105 },
  { id: 'pe-bbox', name: 'Prismatic Evolutions Booster Box', set: 'Prismatic Evolutions', type: 'Booster Box', cmPrice: 175, ebayPrice: 190 },
  { id: 'pe-upc', name: 'Prismatic Evolutions Ultra Premium Collection', set: 'Prismatic Evolutions', type: 'UPC', cmPrice: 220, ebayPrice: 245 },
  { id: 'pe-pc', name: 'Prismatic Evolutions Premium Collection', set: 'Prismatic Evolutions', type: 'Bundle', cmPrice: 65, ebayPrice: 72 },
  { id: 'pe-blister', name: 'Prismatic Evolutions 3-Pack Blister', set: 'Prismatic Evolutions', type: 'Blister', cmPrice: 22, ebayPrice: 25 },

  // Surging Sparks (2024)
  { id: 'ss-etb', name: 'Surging Sparks ETB', set: 'Surging Sparks', type: 'ETB', cmPrice: 55, ebayPrice: 60 },
  { id: 'ss-bbox', name: 'Surging Sparks Booster Box', set: 'Surging Sparks', type: 'Booster Box', cmPrice: 120, ebayPrice: 130 },
  { id: 'ss-upc', name: 'Surging Sparks Ultra Premium Collection', set: 'Surging Sparks', type: 'UPC', cmPrice: 180, ebayPrice: 200 },
  { id: 'ss-pc-pikachu', name: 'Surging Sparks Pikachu Premium Collection', set: 'Surging Sparks', type: 'Bundle', cmPrice: 55, ebayPrice: 60 },

  // Stellar Crown (2024)
  { id: 'sc-etb', name: 'Stellar Crown ETB', set: 'Stellar Crown', type: 'ETB', cmPrice: 48, ebayPrice: 55 },
  { id: 'sc-bbox', name: 'Stellar Crown Booster Box', set: 'Stellar Crown', type: 'Booster Box', cmPrice: 100, ebayPrice: 112 },

  // Shrouded Fable (2024)
  { id: 'sf-etb', name: 'Shrouded Fable ETB', set: 'Shrouded Fable', type: 'ETB', cmPrice: 45, ebayPrice: 52 },
  { id: 'sf-bbox', name: 'Shrouded Fable Booster Box', set: 'Shrouded Fable', type: 'Booster Box', cmPrice: 95, ebayPrice: 108 },
  { id: 'sf-upc', name: 'Shrouded Fable Ultra Premium Collection', set: 'Shrouded Fable', type: 'UPC', cmPrice: 150, ebayPrice: 165 },

  // Twilight Masquerade (2024)
  { id: 'tm-etb', name: 'Twilight Masquerade ETB', set: 'Twilight Masquerade', type: 'ETB', cmPrice: 50, ebayPrice: 55 },
  { id: 'tm-bbox', name: 'Twilight Masquerade Booster Box', set: 'Twilight Masquerade', type: 'Booster Box', cmPrice: 105, ebayPrice: 118 },
  { id: 'tm-upc', name: 'Twilight Masquerade Ultra Premium Collection', set: 'Twilight Masquerade', type: 'UPC', cmPrice: 165, ebayPrice: 180 },

  // Temporal Forces (2024)
  { id: 'tf-etb', name: 'Temporal Forces ETB', set: 'Temporal Forces', type: 'ETB', cmPrice: 45, ebayPrice: 50 },
  { id: 'tf-bbox', name: 'Temporal Forces Booster Box', set: 'Temporal Forces', type: 'Booster Box', cmPrice: 90, ebayPrice: 102 },
  { id: 'tf-upc', name: 'Temporal Forces Ultra Premium Collection', set: 'Temporal Forces', type: 'UPC', cmPrice: 145, ebayPrice: 160 },

  // Paldean Fates (2024)
  { id: 'pf-etb', name: 'Paldean Fates ETB', set: 'Paldean Fates', type: 'ETB', cmPrice: 75, ebayPrice: 85 },
  { id: 'pf-bbox', name: 'Paldean Fates Booster Box', set: 'Paldean Fates', type: 'Booster Box', cmPrice: 150, ebayPrice: 168 },
  { id: 'pf-tin-ninetales', name: 'Paldean Fates Tin – Ninetales', set: 'Paldean Fates', type: 'Tin', cmPrice: 22, ebayPrice: 26 },
  { id: 'pf-tin-garchomp', name: 'Paldean Fates Tin – Garchomp', set: 'Paldean Fates', type: 'Tin', cmPrice: 22, ebayPrice: 26 },

  // 151 (2023)
  { id: '151-etb', name: '151 ETB', set: 'Scarlet & Violet 151', type: 'ETB', cmPrice: 65, ebayPrice: 75 },
  { id: '151-bbox', name: '151 Booster Box', set: 'Scarlet & Violet 151', type: 'Booster Box', cmPrice: 140, ebayPrice: 158 },
  { id: '151-upc', name: '151 Ultra Premium Collection', set: 'Scarlet & Violet 151', type: 'UPC', cmPrice: 130, ebayPrice: 148 },
  { id: '151-blister', name: '151 3-Pack Blister', set: 'Scarlet & Violet 151', type: 'Blister', cmPrice: 18, ebayPrice: 22 },

  // Paradox Rift (2023)
  { id: 'pr-etb', name: 'Paradox Rift ETB', set: 'Paradox Rift', type: 'ETB', cmPrice: 50, ebayPrice: 55 },
  { id: 'pr-bbox', name: 'Paradox Rift Booster Box', set: 'Paradox Rift', type: 'Booster Box', cmPrice: 100, ebayPrice: 112 },
  { id: 'pr-upc', name: 'Paradox Rift Ultra Premium Collection', set: 'Paradox Rift', type: 'UPC', cmPrice: 155, ebayPrice: 170 },

  // Obsidian Flames (2023)
  { id: 'of-etb', name: 'Obsidian Flames ETB', set: 'Obsidian Flames', type: 'ETB', cmPrice: 48, ebayPrice: 55 },
  { id: 'of-bbox', name: 'Obsidian Flames Booster Box', set: 'Obsidian Flames', type: 'Booster Box', cmPrice: 95, ebayPrice: 108 },

  // Paldea Evolved (2023)
  { id: 'pe2-etb', name: 'Paldea Evolved ETB', set: 'Paldea Evolved', type: 'ETB', cmPrice: 42, ebayPrice: 48 },
  { id: 'pe2-bbox', name: 'Paldea Evolved Booster Box', set: 'Paldea Evolved', type: 'Booster Box', cmPrice: 88, ebayPrice: 98 },

  // Scarlet & Violet Base (2023)
  { id: 'sv1-etb', name: 'Scarlet & Violet ETB', set: 'Scarlet & Violet Base', type: 'ETB', cmPrice: 40, ebayPrice: 46 },
  { id: 'sv1-bbox', name: 'Scarlet & Violet Booster Box', set: 'Scarlet & Violet Base', type: 'Booster Box', cmPrice: 82, ebayPrice: 92 },

  // ─── SWORD & SHIELD ERA ────────────────────────────────────────────────────

  // Crown Zenith (2023)
  { id: 'cz-etb', name: 'Crown Zenith ETB', set: 'Crown Zenith', type: 'ETB', cmPrice: 60, ebayPrice: 70 },
  { id: 'cz-bbox', name: 'Crown Zenith Booster Box', set: 'Crown Zenith', type: 'Booster Box', cmPrice: 135, ebayPrice: 150 },
  { id: 'cz-upc', name: 'Crown Zenith Ultra Premium Collection', set: 'Crown Zenith', type: 'UPC', cmPrice: 170, ebayPrice: 190 },

  // Silver Tempest (2022)
  { id: 'st-etb', name: 'Silver Tempest ETB', set: 'Silver Tempest', type: 'ETB', cmPrice: 45, ebayPrice: 52 },
  { id: 'st-bbox', name: 'Silver Tempest Booster Box', set: 'Silver Tempest', type: 'Booster Box', cmPrice: 90, ebayPrice: 100 },

  // Lost Origin (2022)
  { id: 'lo-etb', name: 'Lost Origin ETB', set: 'Lost Origin', type: 'ETB', cmPrice: 42, ebayPrice: 48 },
  { id: 'lo-bbox', name: 'Lost Origin Booster Box', set: 'Lost Origin', type: 'Booster Box', cmPrice: 85, ebayPrice: 95 },

  // Pokémon GO (2022)
  { id: 'pgo-etb', name: 'Pokémon GO ETB', set: 'Pokémon GO', type: 'ETB', cmPrice: 50, ebayPrice: 58 },
  { id: 'pgo-bbox', name: 'Pokémon GO Booster Box', set: 'Pokémon GO', type: 'Booster Box', cmPrice: 100, ebayPrice: 112 },

  // Astral Radiance (2022)
  { id: 'ar-etb', name: 'Astral Radiance ETB', set: 'Astral Radiance', type: 'ETB', cmPrice: 42, ebayPrice: 48 },
  { id: 'ar-bbox', name: 'Astral Radiance Booster Box', set: 'Astral Radiance', type: 'Booster Box', cmPrice: 85, ebayPrice: 96 },

  // Brilliant Stars (2022)
  { id: 'bs-etb', name: 'Brilliant Stars ETB', set: 'Brilliant Stars', type: 'ETB', cmPrice: 45, ebayPrice: 52 },
  { id: 'bs-bbox', name: 'Brilliant Stars Booster Box', set: 'Brilliant Stars', type: 'Booster Box', cmPrice: 90, ebayPrice: 102 },
  { id: 'bs-upc', name: 'Brilliant Stars Ultra Premium Collection', set: 'Brilliant Stars', type: 'UPC', cmPrice: 160, ebayPrice: 175 },

  // Celebrations (2021)
  { id: 'cel-upc', name: 'Celebrations Ultra Premium Collection', set: 'Celebrations', type: 'UPC', cmPrice: 145, ebayPrice: 165 },
  { id: 'cel-etb', name: 'Celebrations ETB', set: 'Celebrations', type: 'ETB', cmPrice: 70, ebayPrice: 80 },
  { id: 'cel-bbox', name: 'Celebrations Booster Box', set: 'Celebrations', type: 'Booster Box', cmPrice: 130, ebayPrice: 145 },

  // Fusion Strike (2021)
  { id: 'fs-etb', name: 'Fusion Strike ETB', set: 'Fusion Strike', type: 'ETB', cmPrice: 40, ebayPrice: 46 },
  { id: 'fs-bbox', name: 'Fusion Strike Booster Box', set: 'Fusion Strike', type: 'Booster Box', cmPrice: 82, ebayPrice: 92 },

  // Evolving Skies (2021)
  { id: 'es-etb', name: 'Evolving Skies ETB', set: 'Evolving Skies', type: 'ETB', cmPrice: 62, ebayPrice: 72 },
  { id: 'es-bbox', name: 'Evolving Skies Booster Box', set: 'Evolving Skies', type: 'Booster Box', cmPrice: 130, ebayPrice: 145 },

  // Chilling Reign (2021)
  { id: 'cr-etb', name: 'Chilling Reign ETB', set: 'Chilling Reign', type: 'ETB', cmPrice: 38, ebayPrice: 44 },
  { id: 'cr-bbox', name: 'Chilling Reign Booster Box', set: 'Chilling Reign', type: 'Booster Box', cmPrice: 78, ebayPrice: 88 },

  // Battle Styles (2021)
  { id: 'bst-etb', name: 'Battle Styles ETB', set: 'Battle Styles', type: 'ETB', cmPrice: 38, ebayPrice: 44 },
  { id: 'bst-bbox', name: 'Battle Styles Booster Box', set: 'Battle Styles', type: 'Booster Box', cmPrice: 78, ebayPrice: 88 },

  // Shining Fates (2021)
  { id: 'shf-etb', name: 'Shining Fates ETB', set: 'Shining Fates', type: 'ETB', cmPrice: 80, ebayPrice: 92 },
  { id: 'shf-bbox', name: 'Shining Fates Booster Box', set: 'Shining Fates', type: 'Booster Box', cmPrice: 170, ebayPrice: 190 },

  // Vivid Voltage (2020)
  { id: 'vv-etb', name: 'Vivid Voltage ETB', set: 'Vivid Voltage', type: 'ETB', cmPrice: 38, ebayPrice: 44 },
  { id: 'vv-bbox', name: 'Vivid Voltage Booster Box', set: 'Vivid Voltage', type: 'Booster Box', cmPrice: 78, ebayPrice: 88 },

  // Champion's Path (2020)
  { id: 'chp-etb', name: "Champion's Path ETB", set: "Champion's Path", type: 'ETB', cmPrice: 65, ebayPrice: 75 },
  { id: 'chp-bbox', name: "Champion's Path Booster Box", set: "Champion's Path", type: 'Booster Box', cmPrice: 140, ebayPrice: 155 },

  // Darkness Ablaze (2020)
  { id: 'da-etb', name: 'Darkness Ablaze ETB', set: 'Darkness Ablaze', type: 'ETB', cmPrice: 36, ebayPrice: 42 },
  { id: 'da-bbox', name: 'Darkness Ablaze Booster Box', set: 'Darkness Ablaze', type: 'Booster Box', cmPrice: 72, ebayPrice: 82 },

  // Rebel Clash (2020)
  { id: 'rc-etb', name: 'Rebel Clash ETB', set: 'Rebel Clash', type: 'ETB', cmPrice: 34, ebayPrice: 40 },
  { id: 'rc-bbox', name: 'Rebel Clash Booster Box', set: 'Rebel Clash', type: 'Booster Box', cmPrice: 70, ebayPrice: 80 },

  // Sword & Shield Base (2020)
  { id: 'swsh1-etb', name: 'Sword & Shield ETB', set: 'Sword & Shield Base', type: 'ETB', cmPrice: 40, ebayPrice: 46 },
  { id: 'swsh1-bbox', name: 'Sword & Shield Booster Box', set: 'Sword & Shield Base', type: 'Booster Box', cmPrice: 80, ebayPrice: 90 },

  // ─── SUN & MOON ERA ───────────────────────────────────────────────────────

  // Hidden Fates (2019)
  { id: 'hf-etb', name: 'Hidden Fates ETB', set: 'Hidden Fates', type: 'ETB', cmPrice: 120, ebayPrice: 135 },
  { id: 'hf-upc', name: 'Hidden Fates Ultra Premium Collection', set: 'Hidden Fates', type: 'UPC', cmPrice: 220, ebayPrice: 245 },

  // Cosmic Eclipse (2019)
  { id: 'ce-etb', name: 'Cosmic Eclipse ETB', set: 'Cosmic Eclipse', type: 'ETB', cmPrice: 55, ebayPrice: 63 },
  { id: 'ce-bbox', name: 'Cosmic Eclipse Booster Box', set: 'Cosmic Eclipse', type: 'Booster Box', cmPrice: 115, ebayPrice: 130 },

  // Unbroken Bonds (2019)
  { id: 'ub-etb', name: 'Unbroken Bonds ETB', set: 'Unbroken Bonds', type: 'ETB', cmPrice: 50, ebayPrice: 58 },
  { id: 'ub-bbox', name: 'Unbroken Bonds Booster Box', set: 'Unbroken Bonds', type: 'Booster Box', cmPrice: 105, ebayPrice: 118 },

  // Team Up (2019)
  { id: 'tu-etb', name: 'Team Up ETB', set: 'Team Up', type: 'ETB', cmPrice: 45, ebayPrice: 52 },
  { id: 'tu-bbox', name: 'Team Up Booster Box', set: 'Team Up', type: 'Booster Box', cmPrice: 95, ebayPrice: 108 },

  // Lost Thunder (2018)
  { id: 'lt-bbox', name: 'Lost Thunder Booster Box', set: 'Lost Thunder', type: 'Booster Box', cmPrice: 90, ebayPrice: 102 },

  // Dragon Majesty (2018)
  { id: 'dm-etb', name: 'Dragon Majesty ETB', set: 'Dragon Majesty', type: 'ETB', cmPrice: 75, ebayPrice: 88 },

  // Celestial Storm (2018)
  { id: 'cls-bbox', name: 'Celestial Storm Booster Box', set: 'Celestial Storm', type: 'Booster Box', cmPrice: 85, ebayPrice: 96 },

  // Forbidden Light (2018)
  { id: 'fl-bbox', name: 'Forbidden Light Booster Box', set: 'Forbidden Light', type: 'Booster Box', cmPrice: 80, ebayPrice: 90 },

  // Shining Legends (2017)
  { id: 'sl-etb', name: 'Shining Legends ETB', set: 'Shining Legends', type: 'ETB', cmPrice: 95, ebayPrice: 110 },

  // ─── JAPONSKÉ PRODUKTY ────────────────────────────────────────────────────

  { id: 'jp-pe-bbox', name: 'Prismatic Evolutions Booster Box (JP)', set: 'Prismatic Evolutions JP', type: 'Booster Box', cmPrice: 55, ebayPrice: 62 },
  { id: 'jp-dr-bbox', name: 'Destined Rivals Booster Box (JP)', set: 'Destined Rivals JP', type: 'Booster Box', cmPrice: 52, ebayPrice: 58 },
  { id: 'jp-ss-bbox', name: 'Surging Sparks Booster Box (JP)', set: 'Surging Sparks JP', type: 'Booster Box', cmPrice: 45, ebayPrice: 52 },
  { id: 'jp-sc-bbox', name: 'Stellar Crown Booster Box (JP)', set: 'Stellar Crown JP', type: 'Booster Box', cmPrice: 42, ebayPrice: 48 },
  { id: 'jp-151-bbox', name: '151 Booster Box (JP)', set: '151 JP', type: 'Booster Box', cmPrice: 65, ebayPrice: 74 },
  { id: 'jp-pf-bbox', name: 'Paldean Fates Booster Box (JP)', set: 'Paldean Fates JP', type: 'Booster Box', cmPrice: 58, ebayPrice: 66 },
  { id: 'jp-pe-etb', name: 'Prismatic Evolutions ETB (JP)', set: 'Prismatic Evolutions JP', type: 'ETB', cmPrice: 45, ebayPrice: 52 },

  // ─── ŠPECIÁLNE TINS & BUNDLES ─────────────────────────────────────────────

  { id: 'tin-charizard-sv', name: 'Charizard ex Tin (SV)', set: 'Tins', type: 'Tin', cmPrice: 20, ebayPrice: 24 },
  { id: 'tin-pikachu-sv', name: 'Pikachu ex Tin (SV)', set: 'Tins', type: 'Tin', cmPrice: 18, ebayPrice: 22 },
  { id: 'tin-mewtwo-sv', name: 'Mewtwo ex Tin (SV)', set: 'Tins', type: 'Tin', cmPrice: 20, ebayPrice: 24 },
  { id: 'tin-umbreon-sv', name: 'Umbreon ex Tin (SV)', set: 'Tins', type: 'Tin', cmPrice: 22, ebayPrice: 26 },
  { id: 'tin-eevee-sv', name: 'Eevee ex Tin (SV)', set: 'Tins', type: 'Tin', cmPrice: 22, ebayPrice: 26 },
  { id: 'tin-miraidon', name: 'Miraidon ex Tin', set: 'Tins', type: 'Tin', cmPrice: 18, ebayPrice: 22 },
  { id: 'tin-koraidon', name: 'Koraidon ex Tin', set: 'Tins', type: 'Tin', cmPrice: 18, ebayPrice: 22 },

  // Binder / Accessory bundles
  { id: 'acc-pe-binder', name: 'Prismatic Evolutions Binder + 4 packs', set: 'Prismatic Evolutions', type: 'Bundle', cmPrice: 35, ebayPrice: 40 },
]
