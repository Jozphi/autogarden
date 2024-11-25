input.onButtonPressed(Button.A, function () {
    Setpoint += -10
    basic.showIcon(IconNames.Yes)
    basic.pause(100)
    if (Setpoint < 0) {
        Setpoint = 0
    }
    basic.showIcon(IconNames.Diamond)
    basic.showNumber(Setpoint / 10)
    basic.pause(2000)
    basic.clearScreen()
    basic.pause(1000)
})
function Pump2 () {
    fwdMotors.pump.fwdTimedRun(2000)
    basic.pause(2100)
}
input.onButtonPressed(Button.B, function () {
    Setpoint += 10
    basic.showIcon(IconNames.Yes)
    basic.pause(100)
    if (Setpoint > 50) {
        Setpoint = 50
    }
    basic.showIcon(IconNames.Diamond)
    basic.showNumber(Setpoint / 10)
    basic.pause(2000)
    basic.clearScreen()
    basic.pause(1000)
})
function Pump () {
	
}
input.onLogoEvent(TouchButtonEvent.Released, function () {
    for (let index = 0; index < 1; index++) {
        basic.showIcon(IconNames.Duck)
        Pump()
        basic.showIcon(IconNames.Yes)
        basic.pause(2000)
        fwdMotors.pump.fwdSetActive(false)
        basic.pause(100)
        basic.clearScreen()
        basic.pause(100)
    }
})
let Light = 0
let Soil_moisture = 0
let Setpoint = 0
basic.showString("Hi Sophie")
basic.pause(100)
basic.showIcon(IconNames.Heart)
basic.pause(100)
Setpoint = 20
basic.pause(100)
input.setSoundThreshold(SoundThreshold.Loud, 168)
basic.pause(1000)
basic.clearScreen()
basic.pause(1000)
basic.forever(function () {
    Soil_moisture = fwdSensors.soilMoisture1.fwdMoistureLevel() / 10
    Light = input.lightLevel() / 14
    fwdSensors.ledRing.fwdSetAllPixelsColour(0x7f00ff)
    fwdSensors.ledRing.fwdSetBrightness(1 / Light)
    if (fwdMotors.pump.fwdIsActive()) {
        basic.pause(100)
        basic.showIcon(IconNames.Duck)
        basic.pause(100)
    } else {
        basic.pause(5000)
        if (fwdSensors.soilMoisture1.fwdMoistureLevel() < Setpoint - 2) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                # . . . .
                `)
            basic.pause(5000)
        }
        if (fwdSensors.soilMoisture1.fwdMoistureLevel() < Setpoint - 1) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . # . . .
                # . . . .
                `)
            fwdMotors.pump.fwdSetActive(false)
            basic.pause(5000)
        }
        if (fwdSensors.soilMoisture1.fwdMoistureLevel() >= Setpoint) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . # . .
                . # . . .
                # . . . .
                `)
            fwdMotors.pump.fwdSetActive(false)
            basic.pause(200)
        }
        if (fwdSensors.soilMoisture1.fwdMoistureLevel() > Setpoint + 5) {
            basic.showLeds(`
                . . . . .
                . . . # .
                . . # . .
                . # . . .
                # . . . .
                `)
            fwdMotors.pump.fwdSetActive(false)
            basic.pause(5000)
        }
        if (fwdSensors.soilMoisture1.fwdMoistureLevel() > Setpoint + 10) {
            basic.showLeds(`
                . . . . #
                . . . # .
                . . # . .
                . # . . .
                # . . . .
                `)
            basic.pause(100)
            fwdMotors.pump.fwdSetActive(false)
            basic.pause(60000)
        }
    }
})
