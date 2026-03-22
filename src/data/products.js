// Sealed products databáza — len katalóg produktov, BEZ cien (ceny sú volatilné)
// Ceny pre singles: pokemontcg.io API (live). Ceny pre sealed: zadáš manuálne.
// Singles sú vyhľadávané live cez pokemontcg.io API (s reálnymi CM cenami)

export const PRODUCT_TYPES = ['ETB', 'Booster Box', 'Blister', 'Tin', 'Bundle', 'UPC', 'Single', 'Iné']

export const sealedProducts = [
  // ─── SCARLET & VIOLET ERA ──────────────────────────────────────────────────

  // Destined Rivals (2025)
  { id: 'dr-etb', name: 'Destined Rivals ETB', set: 'Destined Rivals', type: 'ETB' },
  { id: 'dr-bbox', name: 'Destined Rivals Booster Box', set: 'Destined Rivals', type: 'Booster Box' },

  // Journey Together (2025)
  { id: 'jt-etb', name: 'Journey Together ETB', set: 'Journey Together', type: 'ETB' },
  { id: 'jt-bbox', name: 'Journey Together Booster Box', set: 'Journey Together', type: 'Booster Box' },
  { id: 'jt-upc', name: 'Journey Together Ultra Premium Collection', set: 'Journey Together', type: 'UPC' },

  // Prismatic Evolutions (2025)
  { id: 'pe-etb', name: 'Prismatic Evolutions ETB', set: 'Prismatic Evolutions', type: 'ETB' },
  { id: 'pe-bbox', name: 'Prismatic Evolutions Booster Box', set: 'Prismatic Evolutions', type: 'Booster Box' },
  { id: 'pe-upc', name: 'Prismatic Evolutions Ultra Premium Collection', set: 'Prismatic Evolutions', type: 'UPC' },
  { id: 'pe-pc', name: 'Prismatic Evolutions Premium Collection', set: 'Prismatic Evolutions', type: 'Bundle' },
  { id: 'pe-blister', name: 'Prismatic Evolutions 3-Pack Blister', set: 'Prismatic Evolutions', type: 'Blister' },

  // Surging Sparks (2024)
  { id: 'ss-etb', name: 'Surging Sparks ETB', set: 'Surging Sparks', type: 'ETB' },
  { id: 'ss-bbox', name: 'Surging Sparks Booster Box', set: 'Surging Sparks', type: 'Booster Box' },
  { id: 'ss-upc', name: 'Surging Sparks Ultra Premium Collection', set: 'Surging Sparks', type: 'UPC' },
  { id: 'ss-pc-pikachu', name: 'Surging Sparks Pikachu Premium Collection', set: 'Surging Sparks', type: 'Bundle' },

  // Stellar Crown (2024)
  { id: 'sc-etb', name: 'Stellar Crown ETB', set: 'Stellar Crown', type: 'ETB' },
  { id: 'sc-bbox', name: 'Stellar Crown Booster Box', set: 'Stellar Crown', type: 'Booster Box' },

  // Shrouded Fable (2024)
  { id: 'sf-etb', name: 'Shrouded Fable ETB', set: 'Shrouded Fable', type: 'ETB' },
  { id: 'sf-bbox', name: 'Shrouded Fable Booster Box', set: 'Shrouded Fable', type: 'Booster Box' },
  { id: 'sf-upc', name: 'Shrouded Fable Ultra Premium Collection', set: 'Shrouded Fable', type: 'UPC' },

  // Twilight Masquerade (2024)
  { id: 'tm-etb', name: 'Twilight Masquerade ETB', set: 'Twilight Masquerade', type: 'ETB' },
  { id: 'tm-bbox', name: 'Twilight Masquerade Booster Box', set: 'Twilight Masquerade', type: 'Booster Box' },
  { id: 'tm-upc', name: 'Twilight Masquerade Ultra Premium Collection', set: 'Twilight Masquerade', type: 'UPC' },

  // Temporal Forces (2024)
  { id: 'tf-etb', name: 'Temporal Forces ETB', set: 'Temporal Forces', type: 'ETB' },
  { id: 'tf-bbox', name: 'Temporal Forces Booster Box', set: 'Temporal Forces', type: 'Booster Box' },
  { id: 'tf-upc', name: 'Temporal Forces Ultra Premium Collection', set: 'Temporal Forces', type: 'UPC' },

  // Paldean Fates (2024)
  { id: 'pf-etb', name: 'Paldean Fates ETB', set: 'Paldean Fates', type: 'ETB' },
  { id: 'pf-bbox', name: 'Paldean Fates Booster Box', set: 'Paldean Fates', type: 'Booster Box' },
  { id: 'pf-tin-ninetales', name: 'Paldean Fates Tin – Ninetales', set: 'Paldean Fates', type: 'Tin' },
  { id: 'pf-tin-garchomp', name: 'Paldean Fates Tin – Garchomp', set: 'Paldean Fates', type: 'Tin' },

  // 151 (2023)
  { id: '151-etb', name: '151 ETB', set: 'Scarlet & Violet 151', type: 'ETB' },
  { id: '151-bbox', name: '151 Booster Box', set: 'Scarlet & Violet 151', type: 'Booster Box' },
  { id: '151-upc', name: '151 Ultra Premium Collection', set: 'Scarlet & Violet 151', type: 'UPC' },
  { id: '151-blister', name: '151 3-Pack Blister', set: 'Scarlet & Violet 151', type: 'Blister' },

  // Paradox Rift (2023)
  { id: 'pr-etb', name: 'Paradox Rift ETB', set: 'Paradox Rift', type: 'ETB' },
  { id: 'pr-bbox', name: 'Paradox Rift Booster Box', set: 'Paradox Rift', type: 'Booster Box' },
  { id: 'pr-upc', name: 'Paradox Rift Ultra Premium Collection', set: 'Paradox Rift', type: 'UPC' },

  // Obsidian Flames (2023)
  { id: 'of-etb', name: 'Obsidian Flames ETB', set: 'Obsidian Flames', type: 'ETB' },
  { id: 'of-bbox', name: 'Obsidian Flames Booster Box', set: 'Obsidian Flames', type: 'Booster Box' },

  // Paldea Evolved (2023)
  { id: 'pe2-etb', name: 'Paldea Evolved ETB', set: 'Paldea Evolved', type: 'ETB' },
  { id: 'pe2-bbox', name: 'Paldea Evolved Booster Box', set: 'Paldea Evolved', type: 'Booster Box' },

  // Scarlet & Violet Base (2023)
  { id: 'sv1-etb', name: 'Scarlet & Violet ETB', set: 'Scarlet & Violet Base', type: 'ETB' },
  { id: 'sv1-bbox', name: 'Scarlet & Violet Booster Box', set: 'Scarlet & Violet Base', type: 'Booster Box' },

  // ─── SWORD & SHIELD ERA ────────────────────────────────────────────────────

  // Crown Zenith (2023)
  { id: 'cz-etb', name: 'Crown Zenith ETB', set: 'Crown Zenith', type: 'ETB' },
  { id: 'cz-bbox', name: 'Crown Zenith Booster Box', set: 'Crown Zenith', type: 'Booster Box' },
  { id: 'cz-upc', name: 'Crown Zenith Ultra Premium Collection', set: 'Crown Zenith', type: 'UPC' },

  // Silver Tempest (2022)
  { id: 'st-etb', name: 'Silver Tempest ETB', set: 'Silver Tempest', type: 'ETB' },
  { id: 'st-bbox', name: 'Silver Tempest Booster Box', set: 'Silver Tempest', type: 'Booster Box' },

  // Lost Origin (2022)
  { id: 'lo-etb', name: 'Lost Origin ETB', set: 'Lost Origin', type: 'ETB' },
  { id: 'lo-bbox', name: 'Lost Origin Booster Box', set: 'Lost Origin', type: 'Booster Box' },

  // Pokémon GO (2022)
  { id: 'pgo-etb', name: 'Pokémon GO ETB', set: 'Pokémon GO', type: 'ETB' },
  { id: 'pgo-bbox', name: 'Pokémon GO Booster Box', set: 'Pokémon GO', type: 'Booster Box' },

  // Astral Radiance (2022)
  { id: 'ar-etb', name: 'Astral Radiance ETB', set: 'Astral Radiance', type: 'ETB' },
  { id: 'ar-bbox', name: 'Astral Radiance Booster Box', set: 'Astral Radiance', type: 'Booster Box' },

  // Brilliant Stars (2022)
  { id: 'bs-etb', name: 'Brilliant Stars ETB', set: 'Brilliant Stars', type: 'ETB' },
  { id: 'bs-bbox', name: 'Brilliant Stars Booster Box', set: 'Brilliant Stars', type: 'Booster Box' },
  { id: 'bs-upc', name: 'Brilliant Stars Ultra Premium Collection', set: 'Brilliant Stars', type: 'UPC' },

  // Celebrations (2021)
  { id: 'cel-upc', name: 'Celebrations Ultra Premium Collection', set: 'Celebrations', type: 'UPC' },
  { id: 'cel-etb', name: 'Celebrations ETB', set: 'Celebrations', type: 'ETB' },
  { id: 'cel-bbox', name: 'Celebrations Booster Box', set: 'Celebrations', type: 'Booster Box' },

  // Fusion Strike (2021)
  { id: 'fs-etb', name: 'Fusion Strike ETB', set: 'Fusion Strike', type: 'ETB' },
  { id: 'fs-bbox', name: 'Fusion Strike Booster Box', set: 'Fusion Strike', type: 'Booster Box' },

  // Evolving Skies (2021)
  { id: 'es-etb', name: 'Evolving Skies ETB', set: 'Evolving Skies', type: 'ETB' },
  { id: 'es-bbox', name: 'Evolving Skies Booster Box', set: 'Evolving Skies', type: 'Booster Box' },

  // Chilling Reign (2021)
  { id: 'cr-etb', name: 'Chilling Reign ETB', set: 'Chilling Reign', type: 'ETB' },
  { id: 'cr-bbox', name: 'Chilling Reign Booster Box', set: 'Chilling Reign', type: 'Booster Box' },

  // Battle Styles (2021)
  { id: 'bst-etb', name: 'Battle Styles ETB', set: 'Battle Styles', type: 'ETB' },
  { id: 'bst-bbox', name: 'Battle Styles Booster Box', set: 'Battle Styles', type: 'Booster Box' },

  // Shining Fates (2021)
  { id: 'shf-etb', name: 'Shining Fates ETB', set: 'Shining Fates', type: 'ETB' },
  { id: 'shf-bbox', name: 'Shining Fates Booster Box', set: 'Shining Fates', type: 'Booster Box' },

  // Vivid Voltage (2020)
  { id: 'vv-etb', name: 'Vivid Voltage ETB', set: 'Vivid Voltage', type: 'ETB' },
  { id: 'vv-bbox', name: 'Vivid Voltage Booster Box', set: 'Vivid Voltage', type: 'Booster Box' },

  // Champion's Path (2020)
  { id: 'chp-etb', name: "Champion's Path ETB", set: "Champion's Path", type: 'ETB' },
  { id: 'chp-bbox', name: "Champion's Path Booster Box", set: "Champion's Path", type: 'Booster Box' },

  // Darkness Ablaze (2020)
  { id: 'da-etb', name: 'Darkness Ablaze ETB', set: 'Darkness Ablaze', type: 'ETB' },
  { id: 'da-bbox', name: 'Darkness Ablaze Booster Box', set: 'Darkness Ablaze', type: 'Booster Box' },

  // Rebel Clash (2020)
  { id: 'rc-etb', name: 'Rebel Clash ETB', set: 'Rebel Clash', type: 'ETB' },
  { id: 'rc-bbox', name: 'Rebel Clash Booster Box', set: 'Rebel Clash', type: 'Booster Box' },

  // Sword & Shield Base (2020)
  { id: 'swsh1-etb', name: 'Sword & Shield ETB', set: 'Sword & Shield Base', type: 'ETB' },
  { id: 'swsh1-bbox', name: 'Sword & Shield Booster Box', set: 'Sword & Shield Base', type: 'Booster Box' },

  // ─── SUN & MOON ERA ───────────────────────────────────────────────────────

  // Hidden Fates (2019)
  { id: 'hf-etb', name: 'Hidden Fates ETB', set: 'Hidden Fates', type: 'ETB' },
  { id: 'hf-upc', name: 'Hidden Fates Ultra Premium Collection', set: 'Hidden Fates', type: 'UPC' },

  // Cosmic Eclipse (2019)
  { id: 'ce-etb', name: 'Cosmic Eclipse ETB', set: 'Cosmic Eclipse', type: 'ETB' },
  { id: 'ce-bbox', name: 'Cosmic Eclipse Booster Box', set: 'Cosmic Eclipse', type: 'Booster Box' },

  // Unbroken Bonds (2019)
  { id: 'ub-etb', name: 'Unbroken Bonds ETB', set: 'Unbroken Bonds', type: 'ETB' },
  { id: 'ub-bbox', name: 'Unbroken Bonds Booster Box', set: 'Unbroken Bonds', type: 'Booster Box' },

  // Team Up (2019)
  { id: 'tu-etb', name: 'Team Up ETB', set: 'Team Up', type: 'ETB' },
  { id: 'tu-bbox', name: 'Team Up Booster Box', set: 'Team Up', type: 'Booster Box' },

  // Lost Thunder (2018)
  { id: 'lt-bbox', name: 'Lost Thunder Booster Box', set: 'Lost Thunder', type: 'Booster Box' },

  // Dragon Majesty (2018)
  { id: 'dm-etb', name: 'Dragon Majesty ETB', set: 'Dragon Majesty', type: 'ETB' },

  // Celestial Storm (2018)
  { id: 'cls-bbox', name: 'Celestial Storm Booster Box', set: 'Celestial Storm', type: 'Booster Box' },

  // Forbidden Light (2018)
  { id: 'fl-bbox', name: 'Forbidden Light Booster Box', set: 'Forbidden Light', type: 'Booster Box' },

  // Shining Legends (2017)
  { id: 'sl-etb', name: 'Shining Legends ETB', set: 'Shining Legends', type: 'ETB' },

  // ─── JAPONSKÉ PRODUKTY ────────────────────────────────────────────────────

  { id: 'jp-pe-bbox', name: 'Prismatic Evolutions Booster Box (JP)', set: 'Prismatic Evolutions JP', type: 'Booster Box' },
  { id: 'jp-dr-bbox', name: 'Destined Rivals Booster Box (JP)', set: 'Destined Rivals JP', type: 'Booster Box' },
  { id: 'jp-ss-bbox', name: 'Surging Sparks Booster Box (JP)', set: 'Surging Sparks JP', type: 'Booster Box' },
  { id: 'jp-sc-bbox', name: 'Stellar Crown Booster Box (JP)', set: 'Stellar Crown JP', type: 'Booster Box' },
  { id: 'jp-151-bbox', name: '151 Booster Box (JP)', set: '151 JP', type: 'Booster Box' },
  { id: 'jp-pf-bbox', name: 'Paldean Fates Booster Box (JP)', set: 'Paldean Fates JP', type: 'Booster Box' },
  { id: 'jp-pe-etb', name: 'Prismatic Evolutions ETB (JP)', set: 'Prismatic Evolutions JP', type: 'ETB' },

  // ─── ŠPECIÁLNE TINS & BUNDLES ─────────────────────────────────────────────

  { id: 'tin-charizard-sv', name: 'Charizard ex Tin (SV)', set: 'Tins', type: 'Tin' },
  { id: 'tin-pikachu-sv', name: 'Pikachu ex Tin (SV)', set: 'Tins', type: 'Tin' },
  { id: 'tin-mewtwo-sv', name: 'Mewtwo ex Tin (SV)', set: 'Tins', type: 'Tin' },
  { id: 'tin-umbreon-sv', name: 'Umbreon ex Tin (SV)', set: 'Tins', type: 'Tin' },
  { id: 'tin-eevee-sv', name: 'Eevee ex Tin (SV)', set: 'Tins', type: 'Tin' },
  { id: 'tin-miraidon', name: 'Miraidon ex Tin', set: 'Tins', type: 'Tin' },
  { id: 'tin-koraidon', name: 'Koraidon ex Tin', set: 'Tins', type: 'Tin' },

  // Binder / Accessory bundles
  { id: 'acc-pe-binder', name: 'Prismatic Evolutions Binder + 4 packs', set: 'Prismatic Evolutions', type: 'Bundle' },
]
