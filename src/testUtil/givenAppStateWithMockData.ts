import {
  Armor,
  Character,
  ItemTypes,
  Shield,
  Weapon
} from "../store/character/types";
import { AttackResult, Combat, Turn } from "../store/combat/types";
import { AppState } from "../store/rootReducer";

export function givenAppStateWithMockData(): AppState {
  return {
    alert: {},
    character: {
      character: givenTestCharacter(),
      error: null,
      loading: false
    },
    login: {
      loggingIn: false,
      password: "",
      submitted: false,
      username: ""
    },
    register: {
      password: "",
      password2: "",
      registerInProgress: false,
      submitted: false,
      username: ""
    },
    combat: {
      combat: givenTestCombatDecideStaminaHigherIni(),
      error: null,
      loading: false
    }
  };
}

export function givenTestCharacter(): Character {
  return {
    name: "Jarl",
    id: "ppiykj",
    attributes: {
      endurance: 2,
      agility: 2,
      strength: 3,
      will: 3,
      intelligence: 2,
      leadership: 2,
      power: 2,
      defense: 2,
      extension: 1
    },
    equipment: {
      equipped: {
        hand1: {
          type: ItemTypes.Weapon,
          weaponType: "sword",
          name: "long sword",
          id: "sw-1",
          level: 1,
          reach: 2,
          structure: 3,
          weight: 2
        },
        hand2: {
          type: ItemTypes.Shield,
          name: "round shield",
          id: "sh-1",
          level: 1,
          structure: 1,
          weight: 1,
          dodge: 0,
          coverage: 1,
          blunt: 0,
          cut: 0,
          penetrating: 2
        },
        body: {
          type: ItemTypes.Armor,
          name: "chainmail",
          id: "ch-1",
          level: 1,
          structure: 3,
          weight: 11,
          dodge: 2,
          coverage: 5,
          blunt: 2,
          cut: 3,
          penetrating: 3
        }
      },
      carried: [
        {
          type: ItemTypes.Weapon,
          weaponType: "sword",
          name: "dagger",
          id: "dagger-1",
          level: 1,
          reach: 0,
          structure: 3,
          weight: 0.5
        } as Weapon,
        {
          type: ItemTypes.Weapon,
          weaponType: "sword",
          name: "long sword",
          id: "sw-1",
          level: 1,
          reach: 2,
          structure: 3,
          weight: 2
        } as Weapon,
        {
          type: ItemTypes.Shield,
          name: "round shield",
          id: "sh-1",
          level: 1,
          structure: 1,
          weight: 1,
          dodge: 0,
          coverage: 1,
          blunt: 0,
          cut: 0,
          penetrating: 2
        } as Shield,
        {
          type: ItemTypes.Armor,
          name: "chainmail",
          id: "ch-1",
          level: 1,
          structure: 3,
          weight: 11,
          dodge: 2,
          coverage: 5,
          blunt: 2,
          cut: 3,
          penetrating: 3
        } as Armor,
        {
          type: ItemTypes.Misc,
          id: "misc-1",
          weight: 0,
          level: 1,
          name: "flask"
        }
      ]
    },
    characteristics: {
      initiative: {
        current: 5,
        max: 6
      },
      stamina: {
        current: 9,
        max: 10
      },
      impact: 4,
      damage: 5,
      health: {
        current: 14,
        max: 15
      },
      dodge: 2,
      coverage: {
        current: 5,
        max: 6
      },
      blunt: 2,
      cut: 3,
      penetrating: 5,
      reach: 2
    }
  };
}

function givenTestOpponent(): Character {
  return {
    name: "Argh",
    id: "asfdklh",
    attributes: {
      endurance: 2,
      agility: 3,
      strength: 2,
      will: 2,
      intelligence: 3,
      leadership: 2,
      power: 2,
      defense: 2,
      extension: 1
    },
    equipment: {
      equipped: {
        hand1: {
          type: ItemTypes.Weapon,
          weaponType: "sword",
          name: "long sword",
          id: "sw-1",
          level: 1,
          reach: 2,
          structure: 3,
          weight: 2
        },
        hand2: null,
        body: {
          type: ItemTypes.Armor,
          name: "chainmail",
          id: "ch-1",
          level: 1,
          structure: 3,
          weight: 11,
          dodge: 2,
          coverage: 5,
          blunt: 2,
          cut: 3,
          penetrating: 3
        }
      },
      carried: [
        {
          type: ItemTypes.Weapon,
          weaponType: "sword",
          name: "dagger",
          id: "dagger-1",
          level: 1,
          reach: 0,
          structure: 3,
          weight: 0.5
        } as Weapon,
        {
          type: ItemTypes.Weapon,
          weaponType: "sword",
          name: "long sword",
          id: "sw-1",
          level: 1,
          reach: 2,
          structure: 3,
          weight: 2
        } as Weapon,
        {
          type: ItemTypes.Armor,
          name: "chainmail",
          id: "ch-1",
          level: 1,
          structure: 3,
          weight: 11,
          dodge: 2,
          coverage: 5,
          blunt: 2,
          cut: 3,
          penetrating: 3
        } as Armor,
        {
          type: ItemTypes.Misc,
          id: "misc-1",
          weight: 0,
          level: 1,
          name: "flask"
        }
      ]
    },
    characteristics: {
      initiative: {
        current: 6,
        max: 7
      },
      stamina: {
        current: 9,
        max: 10
      },
      impact: 4,
      damage: 5,
      health: {
        current: 9,
        max: 10
      },
      dodge: 2,
      coverage: {
        current: 5,
        max: 6
      },
      blunt: 2,
      cut: 3,
      penetrating: 3,
      reach: 0
    }
  };
}

export function givenTestCombatDecideStaminaHigherIni(
  character?: Character
): Combat {
  return {
    turn: givenTurnDecideStaminaHigherIni(character),
    participants: [
      character ? character.id : givenTestCharacter().id,
      givenTestOpponent().id
    ],
    rounds: []
  };
}

function givenTurnDecideStaminaHigherIni(character?: Character): Turn {
  return {
    step: "DecideStaminaHigherIni",
    attacker: character ? character : givenTestCharacter(),
    defender: givenTestOpponent(),
    attacks: [{ defenderStamina: { dodge: 1, block: 0 } }],
    currentDecision: "attacker"
  };
}

function givenAttackResult(): AttackResult {
  return { isHit: true, damage: 5, coverageDamage: 0, stunned: 2 };
}

export function givenTurnAttackResolved(character?: Character): Turn {
  return {
    step: "AttackResolved",
    attacker: character ? character : givenTestCharacter(),
    defender: givenTestOpponent(),
    attacks: [
      {
        defenderStamina: { dodge: 1, block: 0 },
        attackerStamina: { impact: 1, damage: 1 },
        attackResult: givenAttackResult()
      }
    ]
  };
}
