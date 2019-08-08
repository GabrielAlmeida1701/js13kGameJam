class Player {
    constructor() {
        //let self = this
        this.elem = new JsElement('player')
        this.elem.tag = 'player'
        this.elem.physicalType = PhysicsEntity.DYNAMIC

        var rect = this.elem.rect = { x: 105, y: SCREEN_HEIGHT - 300, w: 25, h: 50 }
        var onAir = false
        var airTime = 20

        this.elem.start = () => {
            this.elem.setSprite('dude')
        }

        this.elem.update = () => {
            if(isPressed('d')) {
                rect.x += 5
                if(rect.x > SCREEN_WIDTH / 2) WORLD_MATRIX.x = -rect.x + (SCREEN_WIDTH / 2)
            } else if(isPressed('a')) {
                rect.x -= 5
                if(rect.x > SCREEN_WIDTH / 2) WORLD_MATRIX.x = -rect.x + (SCREEN_WIDTH / 2)
            }
            
            if(!onAir && isPressed('space')) {
                onAir = true
                rect.y -= 5
            } else if(onAir) {
                this.elem.physicalType = PhysicsEntity.STATIC

                rect.y -= airTime
                airTime--
                if(airTime < -20) airTime = -20
            }

            if(rect.y > SCREEN_HEIGHT) rect.y = SCREEN_HEIGHT - 400
        }

        this.elem.onCollision = (elem) => {
            if(elem.name == 'coin') deleteObject(elem)
            if(elem.tag == 'tile') {
                onAir = false;
                airTime = 20
                this.elem.physicalType = PhysicsEntity.DYNAMIC
            }
        }
    }
}