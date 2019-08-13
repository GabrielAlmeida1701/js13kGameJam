class Player {
    constructor() {
        //let self = this
        this.elem = new JsElement('player')
        this.elem.tag = 'player'
        this.elem.physicalType = PhysicsEntity.DYNAMIC

        var rect = this.elem.rect = { x: 105, y: SCREEN_HEIGHT - 300, w: 25, h: 50 }
        var onAir = false
        var airTime = 30

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
                rect.y -= 20
            } else if(onAir) {
                // this.elem.physicalType = PhysicsEntity.STATIC

                rect.y -= airTime
                airTime--
                if(airTime < -20) airTime = -20
            }

            if(rect.y > SCREEN_HEIGHT) rect.y = SCREEN_HEIGHT - 400
        }

        /** @param {Collision} coll */
        this.elem.onCollision = (coll) => {
            if(coll.collidee.name == 'coin') deleteObject(coll.collidee)
            if(coll.collidee.tag == 'tile' && coll.direction == PhysicsEntity.COLLISION_BOTTOM) {
                onAir = false;
                airTime = 30
                // this.elem.physicalType = PhysicsEntity.DYNAMIC
            }
        }
    }
}