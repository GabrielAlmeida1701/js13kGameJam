class Teste {
    constructor(x, y) {
        //let self = this
        this.elem = new JsElement('coin')
        this.elem.setAnimations([
            new JsAnimation('coin', { count: 8, size: 32, speed: 5 })
        ])
        this.elem.physicalType = PhysicsEntity.DYNAMIC
        this.elem.rewindLogic = RewindLogic.STATIC
        this.elem.rect = { x, y, w: 45, h: 45 }

        this.elem.update = () => {
            this.elem.playAnimation('coin')
            this.elem.rect.x += 3
        }
    }
}