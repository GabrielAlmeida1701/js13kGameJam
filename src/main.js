var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

var inLoop = false

var canvas = document.getElementById('cv')
canvas.setAttribute('width', SCREEN_WIDTH)
canvas.setAttribute('height', SCREEN_HEIGHT)

var ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false
Context2D = ctx

coins = [
    [495, SCREEN_HEIGHT - 150, 1],
    [300, 20, 1],
    [500, SCREEN_HEIGHT - 150, 1],
    [900, SCREEN_HEIGHT - 150, 1],
    [1200, SCREEN_HEIGHT - 150, 1],
    [600, 360, 0],
    [660, 360, 0],
    [730, 360, 0],
    [1755, 650, 1],
    [1880, 650, 1],
    [2210, 550, 1],
    [2365, 450, 1],
    [2515, 550, 1],
]

var tileMap = new TileMap()
elements = [
    new Player().elem,
    new Teste(400, 560).elem
]
coins.forEach(c => elements.push( new Coin(c[0], c[1], c[2]).elem ))

tileMap.createTileMap({
    rect: { x: 50, y: SCREEN_HEIGHT - 450, w: 50, h: 50 },
    tileSize: 8,
    tileMap: [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    ]
})

start = () => {
    elements.forEach(elem => elem.start())
    inLoop = true

    update()
}

update = () => {
	stats.begin();
    
    if(!rewind) elements.forEach(elem => Physics.apply(elem))
    
    elements.forEach(elem => {
        elem.callUpdate();
        Physics.calcCollisions(elements[0], elem)
    })
    tileMap.solvePhysics()

    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    tileMap.render()
    elements.forEach(elem => elem.render())
    
	stats.end();
    if(inLoop) window.requestAnimationFrame(update)
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
const deleteObject = (elem) => {
    let i = elements.indexOf(elem);
    if(i != -1) {
        elements.splice(i, 1)
        Physics.removeCollRef(elem)
    }
}

const gameOver = () => {
    inLoop = false
    alert('You lose, The game will restart now')
    window.location.reload()
}

start()