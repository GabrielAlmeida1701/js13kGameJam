class JsElement {
    /**
     * @param {string} name
     * @param {string} tag
     * */
    constructor(name, tag) {
        //let self = this
        this.name = name
        this.tag = isEmpty(tag)? 'object' : tag
        this.physicalType = PhysicsEntity.DYNAMIC

        var useSprite = false
        var useAnimation = false

        /** @type {Array<JsAnimation>} */
        var animations = []
        /** @type {JsAnimation} */
        var crrAnim

        this.rect = { x: 0, y: 0, w: 20, h: 20 }
        this.color = '#fff'
        this.sprite = null
        var lastPos = []

        /** @type {{ dx: number, dy: number, sx: number, sy: number }} */
        this.uv = undefined

        this.start = () => {}
        this.update = () => {}
        this.render = () => {
            var {x,y,w,h} = this.rect

            if(!rewind) lastPos.push({ x, y });
            if(lastPos.length >= 150) lastPos.shift()
            if(rewind && lastPos.length > 0) {
                let last = lastPos.pop()
                x = last.x
                y = last.y
            }

            x = (x + WORLD_MATRIX.x) * RATIO
            y = (y + WORLD_MATRIX.y) * RATIO
            w *= RATIO
            h *= RATIO

            if(!useSprite && !useAnimation) {
                Context2D.beginPath()
                Context2D.rect(x, y, w, h)
                Context2D.fillStyle = this.color
                Context2D.fill();

            } else {
                if(isEmpty(this.uv) && !useAnimation) Context2D.drawImage( this.sprite, x, y, w, h )
                else {
                    let {dx,dy,sx,sy} = useAnimation? crrAnim.update() : this.uv
                    let sprite = useAnimation? crrAnim.sprite : this.sprite
                    
                    Context2D.drawImage(sprite, dx, dy, sx, sy, x, y, w, h)
                }
            }
        }

        this.setSprite = async (src, uv) => {
            if(!isEmpty(uv)) this.uv = uv
            this.sprite = await loadImage(src)
            useSprite = true
            useAnimation = false
        }

        /**
         * @param {Array<JsAnimation>} anims
         */
        this.setAnimations = (anims) => animations = anims

        /**
         * @param {string} anim
         */
        this.playAnimation = (anim) => {
            let select = animations.find(x => x.animationName == anim)
            if(!isEmpty(select)) {
                crrAnim = select
                useAnimation = true;
            }
        }

        /**
         * @param {JsElement} elem
         */
        this.onCollision = (elem) => {}
    }
}