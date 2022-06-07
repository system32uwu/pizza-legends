import constants from '@/constants'
import GameObject from '@/gameObject'
import Person from '@/person'
import utils from '@/utils'
import { GameMapConfig } from '@pl-types'
import personAnimations from './animations/person'

const gameObjects = new Map<string, GameObject>([
  [
    constants.HERO,
    new Person({
      x: utils.withGrid(5),
      y: utils.withGrid(6),
      src: constants.HERO_SPRITE,
      shadow: constants.SHADOW_SPRITE,
      isPlayerControlled: true,
      animations: personAnimations
    })
  ],
  [
    constants.NPC1,
    new Person({
      x: utils.withGrid(7),
      y: utils.withGrid(9),
      src: constants.NPC1_SPRITE,
      shadow: constants.SHADOW_SPRITE,
      animations: personAnimations,
      behaviourLoop: [
        {
          type: 'stand',
          direction: 'left',
          time: 800
        },
        {
          type: 'stand',
          direction: 'up',
          time: 800
        },
        {
          type: 'stand',
          direction: 'right',
          time: 1200
        },
        {
          type: 'stand',
          direction: 'up',
          time: 300
        }
      ]
    })
  ],
  [
    constants.NPC2,
    new Person({
      x: utils.withGrid(3),
      y: utils.withGrid(8),
      src: constants.NPC2_SPRITE,
      shadow: constants.SHADOW_SPRITE,
      animations: personAnimations,
      behaviourLoop: [
        {
          type: 'walk',
          direction: 'left'
        },
        {
          type: 'stand',
          direction: 'up',
          time: 800
        },
        {
          type: 'walk',
          direction: 'up'
        },
        {
          type: 'walk',
          direction: 'right'
        },
        {
          type: 'walk',
          direction: 'down'
        }
      ]
    })
  ]
])

const map: GameMapConfig = {
  lowerSrc: constants.DEMO_LOWER_SPRITE,
  upperSrc: constants.DEMO_UPPER_SPRITE,
  gameObjects,
  walls: {
    [utils.asGridCoord(7, 6)]: true,
    [utils.asGridCoord(8, 6)]: true,
    [utils.asGridCoord(7, 7)]: true,
    [utils.asGridCoord(8, 7)]: true
  }
}

export default map
