function minifyJS(content) {
    var day = new Date()
    var start = day.getMilliseconds()

    content = content
                .replace(/SCREEN_WIDTH/g, 'SW')    .replace(/SCREEN_HEIGHT/g, 'SH')     .replace(/elements\b/g, 'els')
                .replace(/keysPressed/g, 'kp')     .replace(/isPressed\b/g, 'ip')       .replace(/JsElement/g, 'JE')
                .replace(/JsAnimation/g, 'JA')     .replace(/image\b/g, 'i')            .replace(/collider/g, 'c1')
                .replace(/collidee/g, 'c2')        .replace(/cRect/g, 'cr')             .replace(/oRect/g, 'or')
                .replace(/setAnimations/g, 'sa')   .replace(/playAnimation/g, 'pa')     .replace(/onCollision/g, 'oc')
                .replace(/isEmpty/g, 'ie')         .replace(/isColliding/g, 'ic')       .replace(/coll\b/g, 'c')
                .replace(/other\b/g, 'o')          .replace(/Context2D\b/g, 'c2d')      .replace(/useSprite/g, 'us')
                .replace(/useAnimation/g, 'ua')    .replace(/animations\b/g, 'ans')     .replace(/animationName\b/g, 'aN')
                .replace(/ticksInFrame\b/g, 'tif') .replace(/frameCount\b/g, 'fc')      .replace(/animConfig\b/g, 'ac')
                .replace(/tileSettings\b/g, 'ts')  .replace(/createTileMap\b/g, 'ctm')  .replace(/\bPhysics\b/g, 'py')
                .replace(/collisions/g, 'cs')      .replace(/addCollision/g, 'adc')     .replace(/removeCollision/g, 'rc')
                .replace(/\bname\b/g, 'n')         .replace(/aux\b/g, 'x')              .replace(/physicalType/g, 'pt')
                .replace(/GRAVITY = 10/g, '')      .replace(/GRAVITY/g, '10')           .replace(/setSprite/g, 'ss')
                .replace(/start\b/g, 'st')         .replace(/update\b/g, 'up')          .replace(/render\b/g, 'r')
                .replace(/frame\b/g, 'fr')         .replace(/ticks\b/g, 'tk')           .replace(/frameSize\b/g, 'fs')
                .replace(/loadImage\b/g, 'l')      .replace(/elem\b/g, 'e')             .replace(/rect(?!\()\b/g, 't')
                .replace(/removeCollRef\b/g, 'rcf').replace(/deleteObject\b/g, 'dj')    .replace(/inLoop/g, 'lop')
                .replace(/solvePhysics/g, 'spy')   .replace(/mapsheet/g, 'mp')          .replace(/\bsprite\b/g, 'sp')
                .replace(/tileSize/g, 'tss')       .replace(/spriteSheet/g, 'tsp')      .replace(/createTileMap/g, 'ctm')
                .replace(/WORLD_MATRIX\b/g, 'wm')  .replace(/calcCollisions/g, 'pycc')  .replace(/tileType\b/g, 'tt')
                .replace(/airTime/g, 'at')         .replace(/tag/g, 'g')                .replace(/player\b/g, 'p')
                .replace(/\bcanvas\b/g, 'cv')      .replace(/tileMap/g, 'tm')           .replace(/\bsolve\b/g, 'sv')
                .replace(/count\b/g, 'c')          .replace(/speed\b/g, 'd')            .replace(/\bsize\b/g, 's')
                .replace(/findCollision\b/g, 'fc') .replace(/RATIO/g, 'asp')
                // .replace(/WORLD_MATRIX\b/g, 'wm')

                .replace(/\bthis\b/g, 'self').replace(/\/\/let self/g, 'let self=this//').replace(/self/g, 's')
                .replace(/PhysicsEntity.DYNAMIC/g, '1').replace(/PhysicsEntity.STATIC/g, '0')
                .replace(/PhysicsEntity = { STATIC: 0, DYNAMIC: 1 }/g, '')

                //Remove stats ref
                .replace(/var stats = new Stats\(\);/g, '').replace(/stats.showPanel\(0\);/g, '')
                .replace(/document.body.appendChild\(stats.dom\);/g, '').replace(/stats.begin\(\);/g, '').replace(/stats.end\(\);/g, '')

    var hour = ("0"+day.getHours()).slice(-2) + ":" + ("0"+day.getMinutes()).slice(-2) + ":" + ("0"+day.getSeconds()).slice(-2)
    var elapsed = new Date().getMilliseconds() - start
    const   gray = '\u001b[1;30m',
            blue = '\u001b[1;36m',
            pink = '\u001b[1;35m',
            end = '\u001b[0m'

    console.log(`[${gray}${hour}${end}] Finished '${blue}js Simplify${end}' after ${pink}${elapsed} ms${end}`)
    return content;
}

exports.minifyJS = minifyJS