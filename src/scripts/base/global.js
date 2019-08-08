SCREEN_WIDTH  = window.innerWidth - 10;
SCREEN_HEIGHT = window.innerHeight;
GRAVITY = 10
WORLD_MATRIX = { x: 0, y: 0 }
PhysicsEntity = { STATIC: 0, DYNAMIC: 1 }

/** @type {Array<JsElement>} */
elements = []

/** @type {CanvasRenderingContext2D} */
Context2D = null;

loadImage = (src) => {
    return new Promise(resolve => {
        var image = new Image()
        image.src = `assets/${src}.png`
        image.onload = () => {
            resolve(image)
        }
    })
};

isEmpty = (val) => val === undefined || val === null

/** @type {Array<{code: number, key: string}>} */
keysPressed = []

isPressed = (key) => {
    return !isEmpty(keysPressed.find(x => x.key == key))
}

/** @param {JsElement} elem */
deleteObject = (elem) => {}