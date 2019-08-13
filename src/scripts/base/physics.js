//#region PhysicsUtils
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

/** 
 * @param {Collision|JsElement} collider 
 * @param {Collision|JsElement} collidee 
 * */
findCollision = (collider, collidee) => {
    if(isEmpty(collider)) return -1;

    let coll = Physics.collisions
    let c1 = isEmpty(collider.collidee)? collider : collider.collidee
    let c2 = undefined

    if(!isEmpty(collidee)) {
        c2 = isEmpty(collidee.collidee)? collidee : collidee.collidee;
        return coll.findIndex(x => {
            return  x.collider.collidee == c1 && x.collidee.collidee == c2 ||
                    x.collider.collidee == c2 && x.collidee.collidee == c1
        })
    } else return coll.findIndex(x => x.collider.collidee == c1 || x.collidee.collidee == c1)
}
//#endregion

const PhysicsEntity = {
    STATIC: 0,
    DYNAMIC: 1,

    COLLISION_TOP: 1,
    COLLISION_BOTTOM: 2,
    COLLISION_LEFT: 3,
    COLLISION_RIGHT: 4,
}

const Physics = {

    /** @type {Array<{collider:Collision, collidee:Collision}>} */
    collisions: [],

    /** 
     * @param {Collision} collider 
     * @param {Collision} collidee 
     * */
    addCollision: (collider, collidee) => {
        //if needed: onCollisionEnter goes here
        if(findCollision(collider, collidee) == -1) Physics.collisions.push({collider, collidee})
    },

    /** 
     * @param {Collision} collider 
     * @param {Collision} collidee 
     * */
    removeCollision: (collider, collidee) => {
        let aux = findCollision(collider, collidee)
        if(aux != -1) Physics.collisions.splice(aux, 1)
    },

    /** @param {Collision} collider */
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
        let { result, collision1, collision2 } = Physics.solve(collider, collidee)

        if(result == 1) {
            collider.onCollision(collision1)
            collidee.onCollision(collision2)
        } else if(result == 0) {
            //if needed: onCollisionExit goes here
            Physics.removeCollision(collision1, collision2)
        }
    },

    /** @param {Collision} collider */
    apply: (collider) => {
        let aux = findCollision(collider)
        if(aux == -1 && collider.physicalType !== PhysicsEntity.STATIC) {
            collider.rect.y += GRAVITY
        } else if (aux != -1) {
            let coll = Physics.collisions[aux]
            let obj = collider == coll.collider.collidee? coll.collider : coll.collidee
            if(obj.direction != PhysicsEntity.COLLISION_BOTTOM) obj.collidee.rect.y += GRAVITY
        }
    },

    /**
     * @param {JsElement} collider
     * @param {JsElement} collidee
     */
    solve: (collider, collidee) => {
        if(isEmpty(collider) || isEmpty(collidee)|| collider == collidee) return { result: -1 }
        if(!isColliding(collider, collidee) ) return {
            result: 0,
            collision1: collider,
            collision2: collidee
        }

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
    
        let dir = PhysicsEntity.COLLISION_BOTTOM
        if (Math.abs(absDX - absDY) < .1 || absDX > absDY) {
            // Collision is on the right
            if (dx < 0) {
                cRect.x = oRect.x + oRect.w
                dir = PhysicsEntity.COLLISION_RIGHT
            } else {
                cRect.x = oRect.x - cRect.w
                dir = PhysicsEntity.COLLISION_LEFT
            }
            // Collision is on the left
    
            // Collision is on the top
            if (dy < 0 && cRect.y > mid2.y) {
                cRect.y = oRect.y + oRect.h
                dir = PhysicsEntity.COLLISION_TOP
            } else if((cRect.y + cRect.h) - oRect.y < 5) {
                cRect.y = oRect.y - cRect.h
                dir = PhysicsEntity.COLLISION_BOTTOM
            }
            // Collision is on the bottom
        } else {

            // If the player is approaching from positive Y
            if (dy < 0) {
                cRect.y = oRect.y + oRect.h
                dir = PhysicsEntity.COLLISION_TOP
            } else {
                cRect.y = oRect.y - cRect.h
                dir = PhysicsEntity.COLLISION_BOTTOM
            }
        }

        let invertDir = PhysicsEntity.COLLISION_BOTTOM;
        if(dir == PhysicsEntity.COLLISION_BOTTOM) invertDir = PhysicsEntity.COLLISION_TOP
        else if(dir == PhysicsEntity.COLLISION_TOP) invertDir = PhysicsEntity.COLLISION_BOTTOM
        else if(dir == PhysicsEntity.COLLISION_LEFT) invertDir = PhysicsEntity.COLLISION_RIGHT
        else if(dir == PhysicsEntity.COLLISION_RIGHT) invertDir = PhysicsEntity.COLLISION_LEFT

        let collision1 = new Collision(collidee, dir)
        let collision2 = new Collision(collider, invertDir)
        Physics.addCollision(collision1, collision2)
        return {
            result: 1, collision1, collision2
        }
    }
}

class Collision {

    /**
     * @param {JsElement} collidee 
     * @param {number} direction 
     */
    constructor(collidee, direction) {
        this.collidee = collidee;
        this.direction = direction
    }
}