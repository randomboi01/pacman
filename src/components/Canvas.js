import React, { useEffect, useRef } from "react"
// import { getConstant } from 'react'
import pipeHorizontal from '../PacmanAssets/pipeHorizontal.png'
import pipeVertical from '../PacmanAssets/pipeVertical.png'
import pipeConer1 from '../PacmanAssets/pipeCorner1.png'
import pipeConer2 from '../PacmanAssets/pipeCorner2.png'
import pipeConer3 from '../PacmanAssets/pipeCorner3.png'
import pipeConer4 from '../PacmanAssets/pipeCorner4.png'
import pipeBlock from '../PacmanAssets/block.png'
import capLeft from '../PacmanAssets/capLeft.png'
import capRight from '../PacmanAssets/capRight.png'
import capTop from '../PacmanAssets/capTop.png'
import capBottom from '../PacmanAssets/capBottom.png'
import pipeCross from '../PacmanAssets/pipeCross.png'
import pipeConnectorTop from '../PacmanAssets/pipeConnectorTop.png'
import pipeConnectorBottom from '../PacmanAssets/pipeConnectorBottom.png'
import pipeConnectorLeft from '../PacmanAssets/pipeConnectorLeft.png'
import pipeConnectorRight from '../PacmanAssets/pipeConnectorRight.png'



export default function Canvas(props) {
    const ref = useRef();

    useEffect(() => {

        const canvas = ref.current
        const score = document.getElementById('scoreEl')

        const context = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // context.fillStyle = 'blue'
        // context.fillRect(10,10, 100, 100)

        class Boundary {
            static width = 40
            static height = 40
            constructor({ position, image }) {
                this.position = position
                this.width = 40
                this.height = 40
                this.image = image
            }

            draw() {
                // context.fillStyle = "blue";
                // context.fillRect(this.position.x, this.position.y, this.width, this.height);
                // context.stroke();
                context.drawImage(this.image, this.position.x, this.position.y)
            }
        }

        class Player {
            constructor({ position, velocity }) {
                this.position = position
                this.velocity = velocity
                this.radius = 15
            }

            draw() {
                context.beginPath()
                context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
                context.fillStyle = 'yellow'
                context.fill()
                context.closePath()
            }

            update() {
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
            }
        }

        class Ghost {
            static speed = 2
            constructor({ position, velocity, color = 'red' }) {
                this.position = position
                this.velocity = velocity
                this.radius = 15
                this.color = color
                this.prevCollisions = []
                this.speed = 2
            }

            draw() {
                context.beginPath()
                context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
                context.fillStyle = this.color
                context.fill()
                context.closePath()
            }

            update() {
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
            }
        }

        class Pellet {
            constructor({ position }) {
                this.position = position
                this.radius = 3
            }

            draw() {
                context.beginPath()
                context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
                context.fillStyle = 'white'
                context.fill()
                context.closePath()
            }
        }

        const player = new Player({
            position: {
                x: Boundary.width + Boundary.width / 2,
                y: Boundary.height + Boundary.height / 2
            },
            velocity: {
                x: 0,
                y: 0
            }
        })

        const keys = {
            w: {
                pressed: false
            },
            s: {
                pressed: false
            },
            a: {
                pressed: false
            },
            d: {
                pressed: false
            },

        }

        let lastkey = ''
        let scorePoints = 0
        const boundaries = []
        const pellets = []
        const ghosts = [
            new Ghost({
                position: {
                    x: 6 * Boundary.width + Boundary.width / 2,
                    y: Boundary.height + Boundary.height / 2
                },
                velocity: {
                    x: Ghost.speed,
                    y: 0
                }
            })
        ]

        function createImage(src) {
            var image = new Image()
            image.src = src
            return image
        }
        const map = [
            ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
            ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
            ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
            ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
            ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
            ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
            ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
            ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
            ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
            ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
            ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
            ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
            ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
        ]




        map.forEach((row, i) => {
            row.forEach((symbol, j) => {
                console.log(symbol)
                switch (symbol) {
                    case '-':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                image: createImage(pipeHorizontal)
                            })
                        )
                        break
                    case '|':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                image: createImage(pipeVertical)
                            })
                        )
                        break

                    case '1':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                image: createImage(pipeConer1)
                            })
                        )
                        break

                    case '2':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                image: createImage(pipeConer2)
                            })
                        )
                        break

                    case '3':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                image: createImage(pipeConer3)
                            })
                        )
                        break

                    case '4':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                image: createImage(pipeConer4)
                            })
                        )
                        break

                    case 'b':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                image: createImage(pipeBlock)
                            })
                        )
                        break

                    case '[':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: j * Boundary.width,
                                    y: i * Boundary.height
                                },
                                image: createImage(capLeft)
                            })
                        )
                        break
                    case ']':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: j * Boundary.width,
                                    y: i * Boundary.height
                                },
                                image: createImage(capRight)
                            })
                        )
                        break
                    case '_':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: j * Boundary.width,
                                    y: i * Boundary.height
                                },
                                image: createImage(capBottom)
                            })
                        )
                        break
                    case '^':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: j * Boundary.width,
                                    y: i * Boundary.height
                                },
                                image: createImage(capTop)
                            })
                        )
                        break
                    case '+':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: j * Boundary.width,
                                    y: i * Boundary.height
                                },
                                image: createImage(pipeCross)
                            })
                        )
                        break
                    case '5':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: j * Boundary.width,
                                    y: i * Boundary.height
                                },
                                color: 'blue',
                                image: createImage(pipeConnectorTop)
                            })
                        )
                        break
                    case '6':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: j * Boundary.width,
                                    y: i * Boundary.height
                                },
                                color: 'blue',
                                image: createImage(pipeConnectorRight)
                            })
                        )
                        break
                    case '7':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: j * Boundary.width,
                                    y: i * Boundary.height
                                },
                                color: 'blue',
                                image: createImage(pipeConnectorBottom)
                            })
                        )
                        break
                    case '8':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: j * Boundary.width,
                                    y: i * Boundary.height
                                },
                                image: createImage(pipeConnectorLeft)
                            })
                        )
                        break

                    case '.':
                        pellets.push(
                            new Pellet({
                                position: {
                                    x: j * Boundary.width + Boundary.width / 2,
                                    y: i * Boundary.height + Boundary.height / 2
                                }
                            })
                        )
                        break
                }
            })
        })

        function circleCollidesWithRect({
            circle,
            rectangle
        }) {
            const padding = Boundary.width/2 - circle.radius - 1
            return (
                circle.position.y - circle.radius + circle.velocity.y + padding<= rectangle.position.y + rectangle.height &&
                circle.position.x + circle.radius + circle.velocity.x - padding>= rectangle.position.x &&
                circle.position.y + circle.radius + circle.velocity.y -padding>= rectangle.position.y &&
                circle.position.x - circle.radius + circle.velocity.x + padding<= rectangle.position.x + rectangle.width
            )
        }

        function animate() {
            requestAnimationFrame(animate)
            context.clearRect(0, 0, canvas.width, canvas.height)

            if (keys.w.pressed && lastkey === 'w') {

                for (let i = 0; i < boundaries.length; i++) {

                    const boundary = boundaries[i]
                    if (circleCollidesWithRect({
                        circle: {
                            ...player, velocity: {
                                x: 0,
                                y: -2
                            }
                        },
                        rectangle: boundary
                    })) {
                        player.velocity.y = 0
                        break
                    }
                    else {
                        player.velocity.y = -2
                    }
                }
            }

            else if (keys.a.pressed && lastkey === 'a') {
                for (let i = 0; i < boundaries.length; i++) {

                    const boundary = boundaries[i]
                    if (circleCollidesWithRect({
                        circle: {
                            ...player, velocity: {
                                x: -2,
                                y: 0
                            }
                        },
                        rectangle: boundary
                    })) {
                        player.velocity.x = 0
                        break
                    }
                    else {
                        player.velocity.x = -2
                    }
                }
            }

            else if (keys.s.pressed && lastkey === 's') {
                for (let i = 0; i < boundaries.length; i++) {

                    const boundary = boundaries[i]
                    if (circleCollidesWithRect({
                        circle: {
                            ...player, velocity: {
                                x: 0,
                                y: 2
                            }
                        },
                        rectangle: boundary
                    })) {
                        player.velocity.y = 0
                        break
                    }
                    else {
                        player.velocity.y = 2
                    }
                }
            }

            else if (keys.d.pressed && lastkey === 'd') {
                for (let i = 0; i < boundaries.length; i++) {

                    const boundary = boundaries[i]
                    if (circleCollidesWithRect({
                        circle: {
                            ...player, velocity: {
                                x: 2,
                                y: 0
                            }
                        },
                        rectangle: boundary
                    })) {
                        player.velocity.x = 0
                        break
                    }
                    else {
                        player.velocity.x = 2
                    }
                }
            }


            for (let i = pellets.length - 1; 0 < i; i--) {
                const pellet = pellets[i]
                pellet.draw()

                if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius) {
                    console.log('touching')
                    pellets.splice(i, 1)
                    scorePoints += 10
                    score.innerHTML = scorePoints

                }
            }

            boundaries.forEach((boundary) => {
                boundary.draw()
                if (circleCollidesWithRect({
                    circle: player,
                    rectangle: boundary
                })) {
                    console.log('we are colliding')
                    player.velocity.x = 0
                    player.velocity.y = 0
                }
            })

            player.update()

            ghosts.forEach(ghost => {
                ghost.update()

                const collisions = []
                boundaries.forEach((boundary) => {
                    if (
                        !collisions.includes('right') &&
                        circleCollidesWithRect({
                            circle: {
                                ...ghost, 
                                velocity: {
                                    x: Ghost.speed,
                                    y: 0
                                }
                            },
                            rectangle: boundary
                        })) {
                        // player.velocity.x = 0
                        collisions.push('right')

                    }

                    if (!collisions.includes('left') &&
                        circleCollidesWithRect({
                            circle: {
                                ...ghost, velocity: {
                                    x: -Ghost.speed,
                                    y: 0
                                }
                            },
                            rectangle: boundary
                        })) {
                        // player.velocity.x = 0
                        collisions.push('left')

                    }

                    if (!collisions.includes('top') &&
                        circleCollidesWithRect({
                            circle: {
                                ...ghost, velocity: {
                                    x: 0,
                                    y: -Ghost.speed
                                }
                            },
                            rectangle: boundary
                        })) {
                        // player.velocity.x = 0
                        collisions.push('top')

                    }

                    if (!collisions.includes('bottom') &&
                        circleCollidesWithRect({
                            circle: {
                                ...ghost, velocity: {
                                    x: 0,
                                    y: Ghost.speed
                                }
                            },
                            rectangle: boundary
                        })) {
                        // player.velocity.x = 0
                        collisions.push('bottom')

                    }
                })
                if (collisions.length > ghost.prevCollisions.length) {
                    ghost.prevCollisions = collisions
                }

                if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
                    console.log('go')
                    if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
                    
                    else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
    
                    else if (ghost.velocity.y > 0) ghost.prevCollisions.push('bottom')
    
                    else if (ghost.velocity.y < 0) ghost.prevCollisions.push('top')
    
                    const pathways = ghost.prevCollisions.filter((collision) => {
                        return !collisions.includes(collision)
                    })
                    console.log({pathways})
    
                    const direction = pathways[Math.floor(Math.random() * pathways.length)]
    
                    switch (direction) {
                        case 'bottom':
                            ghost.velocity.y = Ghost.speed
                            ghost.velocity.x = 0
                            break
    
                        case 'top':
                            ghost.velocity.y = -Ghost.speed
                            ghost.velocity.x = 0
                            break
    
                        case 'left':
                            ghost.velocity.y = 0
                            ghost.velocity.x = Ghost.speed
                            break
    
                        case 'right':
                            ghost.velocity.y = 0
                            ghost.velocity.x = -Ghost.speed
                            break
                    }
                    ghost.prevCollisions = []
                }

                

            })
        }

        animate()


        // boundaries.forEach((boundary) => {
        //     boundary.draw()


        // })

        // player.update()

        window.addEventListener('keydown', ({ key }) => {
            switch (key) {
                case 'w':
                    keys.w.pressed = true
                    lastkey = 'w'
                    break
                case 'a':
                    keys.a.pressed = true
                    lastkey = 'a'
                    break
                case 's':
                    keys.s.pressed = true
                    lastkey = 's'
                    break
                case 'd':
                    keys.d.pressed = true
                    lastkey = 'd'
                    break
            }
            console.log(player.velocity)
        })

        window.addEventListener('keyup', ({ key }) => {
            switch (key) {
                case 'w':
                    keys.w.pressed = false
                    break
                case 'a':
                    keys.a.pressed = false
                    break
                case 's':
                    keys.s.pressed = false
                    break
                case 'd':
                    keys.d.pressed = false
                    break
            }
            console.log(player.velocity)
        })
    }, [])


    return (
        // <div>
        //     <canvas
        //         id="myCanvas"
        //         // width="200"
        //         // height="100"
        //         style={{ border: "1px solid black" }}
        //     ></canvas>
        // </div>
        <div>
            <p id="score">
                <span>Score: </span><span id="scoreEl">0</span>
            </p>
            <canvas ref={ref} {...props} />
        </div>
    )
}