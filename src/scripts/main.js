import physics from '@nonphoto/physics'
import _ from 'lodash'

const canvas = document.getElementById('intro-canvas')
const context = canvas.getContext('2d')

const speed = 0.2
const width = 100
const height = 100
const halfWidth = width / 2
const halfHeight = height / 2

let animationRequest = null



function createRandomForce() {
    const dx = (Math.random() * speed * 2) - speed
    const dy = (Math.random() * speed * 2) - speed
    return [dx, dy]
}

const circleA = new physics.Circle(-30, -30, 24, '#A454ED')
circleA.applyForce(createRandomForce())

const circleB = new physics.Circle(30, 30, 20, '#37C1FF')
circleB.applyForce(createRandomForce())

const rectA = new physics.Rect(30, -30, 18, 18, '#ED523B')
rectA.applyForce(createRandomForce())

const rectB = new physics.Rect(-30, 30, 16, 16, '#FFE548')
rectB.applyForce(createRandomForce())

const entities = [circleA, circleB, rectA, rectB]

entities.push(new physics.Line(-halfWidth, 0, 1, 0))
entities.push(new physics.Line(halfWidth, 0, -1, 0))
entities.push(new physics.Line(0, -halfHeight, 0, 1))
entities.push(new physics.Line(0, halfHeight, 0, -1))



function calculateCanvasDimensions() {
    const deviceScale = window.devicePixelRatio || 1
    canvas.width = canvas.clientWidth * deviceScale
    canvas.height = canvas.clientHeight * deviceScale

    const horizontalScale = canvas.width / width
    const verticalScale = canvas.height / height
    const scale = Math.max(horizontalScale, verticalScale) * deviceScale
    context.translate(canvas.width / 2, canvas.height / 2)
    context.scale(scale, scale)
}

function start() {
    if (!animationRequest) {
        animationRequest = requestAnimationFrame(draw)
    }
}

function stop() {
    if (animationRequest) {
        cancelAnimationFrame(animationRequest)
        animationRequest = null
    }
}

function draw() {
    context.clearRect(-halfWidth, -halfHeight, width, height)

    context.fillStyle = '#3D45E0'
    context.fillRect(-halfWidth, -halfHeight, width, height)

    entities.forEach((entity) => {entity.needsUpdate = true})
    entities.forEach((entity) => {update(entity)})

    animationRequest = requestAnimationFrame(draw)
}

function update(entity) {
    entities.forEach((pairedEntity) => {
        if (pairedEntity.needsUpdate && pairedEntity !== entity) {
            const manifold = entity.collide(pairedEntity)
            physics.resolveCollision(manifold)
        }
    })

    entity.needsUpdate = false
    entity.draw(context)
}

function handleResizeEnd() {
    calculateCanvasDimensions()
}

window.addEventListener('resize', _.debounce(handleResizeEnd, 500))

setTimeout(function() {
    calculateCanvasDimensions()
    start()
}, 1000)