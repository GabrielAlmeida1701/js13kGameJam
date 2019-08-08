var inLoop = false

var canvas = document.getElementById('cv')
canvas.setAttribute('width', SCREEN_WIDTH)
canvas.setAttribute('height', SCREEN_HEIGHT)

var ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false
Context2D = ctx

var tileMap = new TileMap()
var player = new Player()
elements = [
    new Coin(495, SCREEN_HEIGHT - 800).elem,
    new Coin(600, SCREEN_HEIGHT - 300).elem,
    player.elem,
]

tileMap.createTileMap({
    rect: { x: 50, y: (SCREEN_HEIGHT - 400), w: 50, h: 50 },
    tileSize: 8,
    tileMap: [
        [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ]
})

start = () => {
    elements.forEach(elem => elem.start())
    inLoop = true

    update()
}

update = () => {
    elements.forEach(elem => { elem.update(); Physics.calcCollisions(player.elem, elem) })
    tileMap.solvePhysics()

    elements.forEach(elem => Physics.apply(elem))
    
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    tileMap.render()
    elements.forEach(elem => elem.render())
    
    if(!inLoop) alert('bye!')
    else window.requestAnimationFrame(update)
}

inputDown = (event) => {
    let code = event.which || event.keyCode
    let key = code == 32? 'space' : event.key
    if(!isPressed(key)) keysPressed.push({ code, key })
    
    if(code == 27) inLoop = false //quit game
}

inputUp = (event) => {
    let key = event.which || event.keyCode
    let id = keysPressed.findIndex(x => x.code == key)
    keysPressed.splice(id, 1)
}

/** @param {JsElement} elem */
deleteObject = (elem) => {
    let i = elements.indexOf(elem);
    if(i != -1) {
        elements.splice(i, 1)
        Physics.removeCollRef(elem)
    }
}

start()