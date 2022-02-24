namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    darts = [assets.image`Dart1`, assets.image`Dart2`, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . 5 . 5 . . . . . . 
        . . . . . . . 2 9 2 . . . . . . 
        . . . . . . . . 9 . . . . . . . 
        . . . . . . . . 9 . . . . . . . 
        . . . . . . . . 9 . . . . . . . 
        . . . . . . . 5 5 5 . . . . . . 
        . . . . . . 5 . . . 5 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `]
    projectile = sprites.createProjectileFromSprite(darts._pickRandom(), mySprite, 0, -150)
    projectile.startEffect(effects.fire, 100)
    music.zapped.play()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.ashes, 100)
    otherSprite.destroy()
    info.changeScoreBy(1)
    music.smallCrash.play()
    if (info.score() == 10) {
        info.changeScoreBy(5)
        mySprite.sayText("+5 Level Atlama Bonusu", 2000, false)
        enemySpeed = 70
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.spray, 500)
    scene.cameraShake(4, 500)
    music.bigCrash.play()
})
let projectile2: Sprite = null
let projectile3: Sprite = null
let projectile: Sprite = null
let darts: Image[] = []
let enemySpeed = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 10)
mySprite = sprites.create(assets.image`Rocket`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Rocket`,
100,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -30, 0)
enemySpeed = 50
game.onUpdateInterval(5000, function () {
    projectile3 = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 80)
    projectile3.x = randint(5, 155)
    projectile3.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(2000, function () {
    projectile2 = sprites.createProjectileFromSide(assets.image`Spider`, 0, enemySpeed)
    projectile2.x = randint(5, 115)
    projectile2.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    projectile2,
    assets.animation`Flying Spider`,
    100,
    true
    )
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
