import { OwConfig } from '@pl-types'

class Overworld {
  element: HTMLElement | null
  canvas?: HTMLCanvasElement | null
  ctx?: CanvasRenderingContext2D | null

  constructor(config: OwConfig) {
    this.element = config.element
    this.canvas = this.element?.querySelector('.game-canvas')
    this.ctx = this.canvas?.getContext('2d')
  }

  init() {
    const image = new Image()
    image.onload = () => {
      this.ctx?.drawImage(image, 0, 0)
    }
    image.src = '/images/maps/DemoLower.png'

    const x = 0
    const y = 0

    const hero = new Image()
    hero.onload = () => {
      this.ctx?.drawImage(hero, 0, 0, 32, 32, x, y, 32, 32)
    }
    hero.src = '/images/characters/people/hero.png'
  }
}

export default Overworld
