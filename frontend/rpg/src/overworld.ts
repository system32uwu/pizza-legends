import { maps } from '@data'
import type { OwConfig } from '@pl-types'
import { GameMaps } from 'data/maps'
import logger from 'logger'
import constants from './constants'
import DirectionInput from './directionInput'
import GameMap from './gameMap'
import GameObject from './gameObject'
import KeyPressListener from './keyPressListener'
import utils from './utils'

class Overworld {
  element: HTMLElement | null
  canvas?: HTMLCanvasElement | null
  ctx?: CanvasRenderingContext2D | null
  map?: GameMap | null
  directionInput = new DirectionInput()
  fps = 60
  bX = 60
  bY = 60
  mX = 60
  mY = 60
  interval = 1000 / this.fps
  lastTime = new Date().getTime()
  currentTime = 0
  delta = 0

  constructor(config: OwConfig) {
    this.element = config.element
    this.canvas = this.element?.querySelector('.game-canvas')
    this.ctx = this.canvas?.getContext('2d')
    this.map = config.map || null
  }

  update() {
    //loop over your objects and run each objects update function
    if (this.map?.gameObjects) {
      this.map.gameObjects.forEach(value => {
        if (value.update) {
          value.update({
            direction: this.directionInput?.direction,
            map: this.map
          })
        }
      })
    }
  }

  get sortedGameObjects() {
    if (this.map) {
      return utils.sortMap(this.map.gameObjects, 'y')
    } else {
      return []
    }
  }

  render(cameraPerson?: GameObject) {
    //loop over your objects and run each objects render function
    if (this.map?.gameObjects) {
      this.sortedGameObjects.forEach(value => {
        value.sprite.draw(this.ctx, cameraPerson)
      })
    }
  }

  gameLoop() {
    const cameraPerson = this.map?.gameObjects.get('hero')
    if (!cameraPerson) {
      logger.error(
        'Overworld.gameLoop',
        'cameraPerson is undefined'
      )
    }

    this.currentTime = new Date().getTime()
    this.delta = this.currentTime - this.lastTime
    this.update()

    if (this.canvas && this.delta > this.interval) {
      this.ctx?.clearRect(
        0,
        0,
        this.canvas.width || 0,
        this.canvas.height || 0
      )

      this.map?.drawLowerImage(this.ctx, cameraPerson)

      this.render(cameraPerson)

      this.map?.drawUpperImage(this.ctx, cameraPerson)

      if (this.bX >= this.canvas.width || this.bX <= 0) {
        this.mX *= -1
      }
      if (this.bY >= this.canvas.height || this.bY <= 0) {
        this.mY *= -1
      }

      this.bX += this.mX
      this.bY += this.mY

      this.lastTime =
        this.currentTime - (this.delta % this.interval)
    }

    requestAnimationFrame(() => this.gameLoop())
  }

  bindActionInput() {
    new KeyPressListener('Enter', () => {
      this.map?.checkForActionCutscene()
    })
  }

  bindHeroPosition() {
    document.addEventListener('personWalkingComplete', e => {
      if (e.detail.who === constants.HERO) {
        this.map?.checkForFootstepCutscene()
      }
    })
  }

  changeMap(mapId: GameMaps) {
    this.map = new GameMap(maps[mapId])
    this.map.overworld = this
    this.map.mountObjects()
  }

  init() {
    this.changeMap('DemoRoom')

    this.bindActionInput()
    this.bindHeroPosition()

    this.directionInput.init()
    this.gameLoop()

    // this.map.startCutscene([
    //   { who: constants.HERO, type: 'walk', direction: 'down' },
    //   { who: constants.HERO, type: 'walk', direction: 'down' },
    //   { who: constants.NPC1, type: 'walk', direction: 'up' },
    //   { who: constants.NPC1, type: 'walk', direction: 'left' },
    //   {
    //     who: constants.HERO,
    //     type: 'stand',
    //     direction: 'right',
    //     time: 200
    //   },
    //   { type: 'textMessage', text: 'hellooo' }
    // ])
  }
}

export default Overworld
