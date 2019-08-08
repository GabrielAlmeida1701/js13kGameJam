class Coin {
    constructor(x, y) {
        //let self = this
        var anims = [
            new JsAnimation('coin', { count: 8, size: 32, speed: 5 })
        ]
        this.elem = new JsElement('coin')
        this.elem.setAnimations(anims)
        this.elem.rect = { x, y, w: 45, h: 45 }

        this.elem.update = () => {
            this.elem.playAnimation('coin')
        }
    }
}