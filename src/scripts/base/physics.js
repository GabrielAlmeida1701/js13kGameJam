/**
 * @param {JsElement} coll
 * @param {JsElement} other
 */
isColliding = (coll, other) => {
    let cRect = coll.rect
    let oRect = other.rect

    //Collider edges
    let l1 = cRect.x,
        t1 = cRect.y,
        r1 = cRect.x + cRect.w,
        b1 = cRect.y + cRect.h

    //Collidee edges
    let l2 = oRect.x,
        t2 = oRect.y,
        r2 = oRect.x + oRect.w,
        b2 = oRect.y + oRect.h
    
    // If the any of the edges are beyond any of the
    // others, then we know that the box cannot be colliding
    return !(b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2)
}
findCollision = (collider, collidee) => {
    if(!isEmpty(collidee)) {
        let aux = Physics.collisions.findIndex(x => x.collider == collider && x.collidee == collidee)
        return aux != -1? aux : undefined
    } else return Physics.collisions.findIndex(x => x.collider == collider || x.collidee == collider)
}
Physics = {

    /** @type {Array<{collider:JsElement, collidee:JsElement}>} */
    collisions: [],
    addCollision: (collider, collidee) => {
        //if needed: onCollisionEnter goes here
        if(isEmpty(findCollision(collider, collidee))) Physics.collisions.push({collider, collidee})
    },
    removeCollision: (collider, collidee) => {
        let aux = findCollision(collider, collidee)
        if(!isEmpty(aux)) Physics.collisions.splice(aux, 1)
    },
    removeCollRef: (collider) => {
        let aux = findCollision(collider)
        while(aux != -1) {
            Physics.collisions.splice(aux, 1)
            aux = findCollision(collider)
        }
    },

    /**
     * @param {JsElement} collider
     * @param {JsElement} collidee
     */
    calcCollisions: (collider, collidee) => {
        let solved = Physics.solve(collider, collidee)

        if(solved == 1) {
            collider.onCollision(collidee)
            collidee.onCollision(collider)
        } else if(solved == 0) {
            //if needed: onCollisionExit goes here
            Physics.removeCollision(collider, collidee)
        }
    },
    apply: (collider) => {
        let aux = findCollision(collider)
        if(aux == -1 && collider.physicalType !== PhysicsEntity.STATIC) collider.rect.y += GRAVITY
    },

    /**
     * @param {JsElement} collider
     * @param {JsElement} collidee
     */
    solve: (collider, collidee) => {
        if(isEmpty(collider) || isEmpty(collidee)|| collider == collidee) return -1
        if(!isColliding(collider, collidee) ) return 0

        let cRect = collider.rect
        let oRect = collidee.rect
    
        let mid1 = {
            x: (cRect.w / 2) + cRect.x,
            y: (cRect.h / 2) + cRect.y
        }
        let mid2 = {
            x: (oRect.w / 2) + oRect.x,
            y: (oRect.h / 2) + oRect.y
        }
    
        let dx = (mid2.x - mid1.x) / (oRect.w / 2),
            dy = (mid2.y - mid1.y) / (oRect.h / 2)
    
        let absDX = Math.abs(dx),
            absDY = Math.abs(dy)
    
        if (Math.abs(absDX - absDY) < .1 || absDX > absDY) {
            if (dx < 0) cRect.x = oRect.x + oRect.w
            else cRect.x = oRect.x - cRect.w
    
            if (dy < 0 && cRect.y > mid2.y) cRect.y = oRect.y + oRect.h
            else if((cRect.y + cRect.h) - oRect.y < 5) cRect.y = oRect.y - cRect.h
        } else {

            // If the player is approaching from positive Y
            if (dy < 0) cRect.y = oRect.y + oRect.h
            else cRect.y = oRect.y - cRect.h
        }

        Physics.addCollision(collider, collidee)
        return 1
    }
}