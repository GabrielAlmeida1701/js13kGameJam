class JsAnimation {
    /**
     * (Optional)  
     * **Count**: The total count of frames  
     * **Speed**: The speed of each frame (in ticks per second)  
     * **Size**: The size of each frame in pixels  
     * @param {string} sprite
     * @param {{ count: any; speed: any; size: any; }} config
     */
    constructor(sprite, config) {
        //let self = this
        /** @type {HTMLImageElement} */
        this.sprite = null
        /** @type {string} */
        this.animationName = ''

        /**
         * @type {{
         *    frame: number,
         *    frameCount: number,
         *    ticks: number,
         *    ticksInFrame: number,
         *    frameSize: number
         * }} animConfig 
         * */
        var animConfig = undefined

        /**
         * **Count**: The total count of frames  
         * **Speed**: The speed of each frame (in ticks per second)  
         * **Size**: The size of each frame in pixels  
         * @param {{ count: any; speed: any; size: any; }} config
         */
        this.setConfig = (config) => {
            animConfig = {
                frame: 0, frameCount: config.count,
                ticks: 0, ticksInFrame: config.speed,
                frameSize: config.size
            }
        }

        /**
         * @param {string} src
         */
        this.setSprite = async (src) => {
            this.sprite = await loadImage(src)
            this.animationName = src
        }

        this.setSprite(sprite);
        if(!isEmpty(config)) this.setConfig(config)

        this.update = () => {
            if(isEmpty(animConfig)) throw Error('No config')
            if(animConfig.ticks > animConfig.ticksInFrame) {
                animConfig.ticks = 0;
                animConfig.frame += rewind? 1 : -1;

                if(animConfig.frame >= animConfig.frameCount)
                    animConfig.frame = 0
                if(animConfig.frame < 0) animConfig.frame = animConfig.frameCount-1
            }
            animConfig.ticks++;
            
            return {
                dx: animConfig.frame * animConfig.frameSize,
                dy: 0,
                sx: animConfig.frameSize,
                sy: animConfig.frameSize
            }
        }
    }
}