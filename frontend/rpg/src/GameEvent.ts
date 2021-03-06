import { Behaviour, GameEventConfig } from 'types'
import GameMap from './gameMap'
import Person from './person'
import TextMessage from './textMessage'
import utils from './utils'

class GameEvent {
  map: GameMap
  event: Behaviour

  constructor({ map, event }: GameEventConfig) {
    this.map = map
    this.event = event
  }

  init() {
    return new Promise((resolve, reject) => {
      return this[
        this.event.type as 'stand' | 'walk' | 'textMessage'
      ](resolve, reject)
    })
  }

  stand(
    resolve: (value: unknown) => void,
    reject: (value: unknown) => void
  ) {
    const who = this.map.gameObjects.get(this.event.who || '')

    if (who && who instanceof Person) {
      who.startBehaviour(
        {
          map: this.map
        },
        {
          type: 'stand',
          direction: this.event.direction,
          time: this.event.time
        }
      )

      const completeHandler = (e: {
        detail: { who: string }
      }) => {
        if (e.detail.who === this.event.who) {
          document.removeEventListener(
            'personStandingComplete',
            completeHandler
          )

          resolve(`${e.detail.who} - stand`)
        }
      }

      document.addEventListener(
        'personStandingComplete',
        completeHandler
      )
    } else {
      reject('Invalid ID or object is not Person')
    }
  }

  walk(
    resolve: (value: unknown) => void,
    reject: (value: unknown) => void
  ) {
    const who = this.map.gameObjects.get(this.event.who || '')

    if (who && who instanceof Person) {
      who.startBehaviour(
        {
          map: this.map
        },
        {
          type: 'walk',
          direction: this.event.direction,
          retry: true
        }
      )

      const completeHandler = (e: {
        detail: { who: string }
      }) => {
        if (e.detail.who === this.event.who) {
          document.removeEventListener(
            'personWalkingComplete',
            completeHandler
          )

          resolve(`${e.detail.who} - walk`)
        }
      }

      document.addEventListener(
        'personWalkingComplete',
        completeHandler
      )
    } else {
      reject('Invalid ID or object is not Person')
    }
  }

  textMessage(
    resolve: (value: unknown) => void,
    reject: (value: unknown) => void
  ) {
    if (this.event.text) {
      if (this.event.who && this.event.trigger) {
        const target = this.map.gameObjects.get(this.event.who)

        const trigger = this.map.gameObjects.get(
          this.event.trigger
        )

        if (target && trigger) {
          target.direction = utils.oppositeDirection(
            trigger.direction
          )
        }
      }

      const message = new TextMessage({
        text: this.event.text,
        onComplete: () => resolve('textMessage')
      })

      const container = document.querySelector('.game-container')
      if (!container) return reject('No container')

      message.init(container as HTMLDivElement)
    }
  }

  changeMap(
    resolve: (value: unknown) => void,
    reject: (value: unknown) => void
  ) {
    if (this.event.map) {
      this.map.overworld?.changeMap(this.event.map)
      resolve(`chaged map to ${this.event.map}`)
    } else {
      reject(`No map specified`)
    }
  }
}

export default GameEvent
