import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
  constructor()
  {
    super()

    // Setup
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Resize event
    this.resizeHandler = this.resizeHandler.bind(this)
    window.addEventListener('resize', this.resizeHandler)
  }

  resizeHandler()
  {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.trigger('resize')
  }

  removeResize()
  {
    window.removeEventListener('resize', this.resizeHandler)
  }
}