export enum CharClass {
  PRIEST = 'priest',
  WARRIOR = 'warrior',
  HUNTER = 'hunter',
  SHAMAN = 'shaman',
  MAGE = 'mage',
  WARLOCK = 'warlock',
  DRUID = 'druid',
  ROGUE = 'rogue',
  PALADIN = 'paladin',
  DEATHKNIGHT = 'death knight',
  MONK = 'monk',
  DEMONHUNTER = 'demon hunter',
  EVOKER = 'evoker',
}

export enum ClassColors {
  PRIEST = '#ffffff',
  WARRIOR = '#bd7930',
  HUNTER = '#abd473',
  SHAMAN = '#4184ff',
  MAGE = '#68d4fc',
  WARLOCK = '#8d73db',
  DRUID = '#ff7d0a',
  ROGUE = '#fff569',
  PALADIN = '#f58cba',
  DEATHKNIGHT = '#c41f3b',
  MONK = '#00ff96',
  DEMONHUNTER = '#a330c9',
  EVOKER = '#5dc5b0',
}

export function getClassColor(charClass: string) {
  switch (charClass) {
    case CharClass.PRIEST:
      return ClassColors.PRIEST;
    case CharClass.WARRIOR:
      return ClassColors.WARRIOR;
    case CharClass.HUNTER:
      return ClassColors.HUNTER;
    case CharClass.SHAMAN:
      return ClassColors.SHAMAN;
    case CharClass.MAGE:
      return ClassColors.MAGE;
    case CharClass.WARLOCK:
      return ClassColors.WARLOCK;
    case CharClass.DRUID:
      return ClassColors.DRUID;
    case CharClass.ROGUE:
      return ClassColors.ROGUE;
    case CharClass.PALADIN:
      return ClassColors.PALADIN;
    case CharClass.DEATHKNIGHT:
      return ClassColors.DEATHKNIGHT;
    case CharClass.MONK:
      return ClassColors.MONK;
    case CharClass.DEMONHUNTER:
      return ClassColors.DEMONHUNTER;
    case CharClass.EVOKER:
      return ClassColors.EVOKER;
  }
}
