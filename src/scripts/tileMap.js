class TileMap {
    constructor() {
        //let self = this
        var tileType = 'tileTest'
        /** @type {Array<JsElement>} */
        var mapsheet = []

        /** @type {number} */
        var tileSize = 8

        /** @type {{ x: number, y: number, w: number, h: number }} */
        this.rect = { x:0, y:0, w: 8, h: 8 }

        /** @type {HTMLImageElement} */
        this.sprite = null

        /**
         * @param {{
         *     spriteSheet: string,
         *     tileMap: Array<Array<number>>,
         *     rect: { x: number, y: number, w: number, h: number },
         *     tileSize: number
         * }} tileSettings 
         * */
        this.createTileMap = (tileSettings) => {
            if(isEmpty(tileSettings)) throw Error('No Tile Settings given')

            if(!isEmpty(tileSettings.rect)) this.rect = tileSettings.rect
            if(!isEmpty(tileSettings.tileSize)) tileSize = tileSettings.tileSize
            if(!isEmpty(tileSettings.spriteSheet)) tileType = tileSettings.spriteSheet
            this.setSprite(tileType)

            if(!isEmpty(tileSettings.tileMap)) {
                let map = tileSettings.tileMap, len = -1
                map.forEach(row => {
                    if(len == -1) len = row.length
                    if(len != row.length) throw Error('Tile map is misshapen')
                })

                let {x, y, w, h} = this.rect
                map.forEach(row => {
                    row.forEach(tile => {
                        if(tile != 0) {
                            let dx = (tile-1) * tileSize
                            let elem = new JsElement(`tile${x}x${y}|${tile}`, 'tile')
                            elem.rect = { x, y, w, h }
                            elem.uv = { dx, dy: 0, sx: 8, sy: 8 }
                            elem.setSprite(tileType)
                            elem.rewindLogic = RewindLogic.STATIC
                            mapsheet.push(elem)
                        }

                        x += w
                    })
    
                    y += h
                    x = this.rect.x
                })
            }
        }

        this.render = () => {
            if(isEmpty(mapsheet) || isEmpty(this.sprite)) return
            mapsheet.forEach(elem => elem.render())
        }

        this.solvePhysics = () => {
            if(mapsheet === null) return
            elements.forEach(elem => {
                mapsheet.forEach(tile => Physics.calcCollisions(elem, tile))
            })
        }

        this.setSprite = async (src) => {
            this.sprite = await loadImage(src)
            tileType = src
        }
    }
}