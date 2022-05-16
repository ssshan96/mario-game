const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 300
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 60
    }
        
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if((this.position.y + this.height + this.velocity.y) < canvas.height){
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}

class Platform{
    constructor ({x, y}){
        this.position ={
            x,
            y
        }
        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = "black"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platforms = [
    new Platform({
        x: 200, y: 500
    }), 
    new Platform({
        x: 500, y: 300
    })]

const keys ={
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    shift: { 
        pressed: false
    },
    
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform =>{
        platform.draw()
    })

    if (keys.right.pressed && player.position.x < 400){
        if (keys.shift.pressed){
            player.velocity.x = 5 * 1.5
        } else {
            player.velocity.x = 5
        }
        
    } else if (keys.left.pressed && player.position.x > 100){
        if (keys.shift.pressed){
            player.velocity.x = -5 * 1.5
        } else {
            player.velocity.x = -5
        }
    } else {
        player.velocity.x = 0

        if (keys.right.pressed){
            if (keys.shift.pressed){
                platforms.forEach(platform =>{
                    platform.position.x -= 7.5
                })
            } else {
                platforms.forEach(platform =>{
                    platform.position.x -= 5
                })
            }
        } else if(keys.left.pressed){
            if (keys.shift.pressed){
                platforms.forEach(platform =>{
                    platform.position.x += 7.5
                })
            } else {
                platforms.forEach(platform =>{
                    platform.position.x += 5
                })
            }
        }
    }
    
    //Platform collision detection
    platforms.forEach(platform =>{
    if (player.position.y +  player.height <= platform.position.y
        && player.position.y + player.height + player.velocity.y
        >= platform.position.y && player.position.x + 
        player.width >= platform.position.x &&
        player.position.x <= platform.position.x + 
        platform.width){
        player.velocity.y = 0
    }})
}

animate()


addEventListener('keydown', ({keyCode}) => {
    console.log(keyCode)
    switch (keyCode) {
        case 65: //left (a)
            console.log('left')
            keys.left.pressed = true
            break
        case 87: //up (w)
            console.log('up')
            player.velocity.y = -14
            break
        case 68: //right (d)
            console.log('right')
            keys.right.pressed = true
            break
        case 83: //down (s)
            console.log('down')
            break
        case 16: //sprint (s)
            console.log('sprint')
            keys.shift.pressed = true
            break
    }

    console.log(keys.right.pressed)
})

addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65: //left (a)
            console.log('left')
            keys.left.pressed = false
            break
        case 87: //up (w)
            console.log('up')
            player.velocity.y = 0
            break
        case 68: //right (d)
            console.log('right')
            keys.right.pressed = false
            break
        case 83: //down (s)
            console.log('down')
            break
        case 16: //sprint (s)
            console.log('sprint')
            keys.shift.pressed = false
            break
    }
    console.log(keys.right.pressed)
})