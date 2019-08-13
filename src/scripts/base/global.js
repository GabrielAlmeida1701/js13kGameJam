const SCREEN_WIDTH  = window.innerWidth - 10;
const SCREEN_HEIGHT = window.innerHeight;
const RATIO = ((SCREEN_WIDTH + SCREEN_HEIGHT) / 3000) * 1.3;

const WORLD_MATRIX = { x: 0, y: 0 }
var rewind = false

GRAVITY = 10
PhysicsEntity = { STATIC: 0, DYNAMIC: 1 }

/** @type {Array<JsElement>} */
elements = []

/** @type {CanvasRenderingContext2D} */
Context2D = null;

const loadImage = (src) => {
    return new Promise(resolve => {
        var image = new Image()
        image.src = `assets/${src}.png`
        image.onload = () => {
            resolve(image)
        }
    })
};

const isEmpty = (val) => val === undefined || val === null

/** @type {Array<{code: number, key: string}>} */
keysPressed = []
const isPressed = (key) => {
    return !isEmpty(keysPressed.find(x => x.key == key))
}

/** @param {JsElement} elem */
deleteObject = (elem) => {}