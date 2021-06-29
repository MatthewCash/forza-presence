import dgram from 'dgram';
import { EventEmitter } from 'stream';

const client = dgram.createSocket('udp4');

const rawData: any = {};

let lastMessageTimestamp: Date;

setInterval(() => {
    if (!gameState.gameOpen) return;
    if (Date.now() - lastMessageTimestamp.getTime() > 5000) {
        gameState.stop();
    }
});

client.on('message', message => {
    lastMessageTimestamp = new Date();
    if (!gameState.gameOpen) gameState.start();

    let position = 0;

    rawData.isRaceOn = message.readInt32LE(position);
    position += 4;
    rawData.timestampMS = message.readUInt32LE(position);
    position += 4;
    rawData.engineMaxRpm = message.readFloatLE(position);
    position += 4;
    rawData.engineIdleRpm = message.readFloatLE(position);
    position += 4;
    rawData.currentEngineRpm = message.readFloatLE(position);
    position += 4;

    rawData.accelerationX = message.readFloatLE(position);
    position += 4;
    rawData.accelerationY = message.readFloatLE(position);
    position += 4;
    rawData.accelerationZ = message.readFloatLE(position);
    position += 4;

    rawData.velocityX = message.readFloatLE(position);
    position += 4;
    rawData.velocityY = message.readFloatLE(position);
    position += 4;
    rawData.velocityZ = message.readFloatLE(position);
    position += 4;

    rawData.angularVelocityX = message.readFloatLE(position);
    position += 4;
    rawData.angularVelocityY = message.readFloatLE(position);
    position += 4;
    rawData.angularVelocityZ = message.readFloatLE(position);
    position += 4;

    rawData.yaw = message.readFloatLE(position);
    position += 4;
    rawData.pitch = message.readFloatLE(position);
    position += 4;
    rawData.roll = message.readFloatLE(position);
    position += 4;

    rawData.normalizedSuspensionTravelFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.normalizedSuspensionTravelFrontRight =
        message.readFloatLE(position);
    position += 4;
    rawData.normalizedSuspensionTravelRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.normalizedSuspensionTravelRearRight = message.readFloatLE(position);
    position += 4;

    rawData.tireSlipRatioFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.tireSlipRatioFrontRight = message.readFloatLE(position);
    position += 4;
    rawData.tireSlipRatioRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.tireSlipRatioRearRight = message.readFloatLE(position);
    position += 4;

    rawData.wheelRotationSpeedFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.wheelRotationSpeedFrontRight = message.readFloatLE(position);
    position += 4;
    rawData.wheelRotationSpeedRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.wheelRotationSpeedRearRight = message.readFloatLE(position);
    position += 4;

    rawData.wheelOnRumbleStripFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.wheelOnRumbleStripFrontRight = message.readFloatLE(position);
    position += 4;
    rawData.wheelOnRumbleStripRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.wheelOnRumbleStripRearRight = message.readFloatLE(position);
    position += 4;

    rawData.wheelInPuddleDepthFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.wheelInPuddleDepthFrontRight = message.readFloatLE(position);
    position += 4;
    rawData.wheelInPuddleDepthRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.wheelInPuddleDepthRearRight = message.readFloatLE(position);
    position += 4;

    rawData.surfaceRumbleFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.surfaceRumbleFrontRight = message.readFloatLE(position);
    position += 4;
    rawData.surfaceRumbleRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.surfaceRumbleRearRight = message.readFloatLE(position);
    position += 4;

    rawData.tireSlipAngleFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.tireSlipAngleFrontRight = message.readFloatLE(position);
    position += 4;
    rawData.tireSlipAngleRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.tireSlipAngleRearRight = message.readFloatLE(position);
    position += 4;

    rawData.tireCombinedSlipFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.tireCombinedSlipFrontRight = message.readFloatLE(position);
    position += 4;
    rawData.tireCombinedSlipRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.tireCombinedSlipRearRight = message.readFloatLE(position);
    position += 4;

    rawData.suspensionTravelMetersFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.suspensionTravelMetersFrontRight = message.readFloatLE(position);
    position += 4;
    rawData.suspensionTravelMetersRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.suspensionTravelMetersRearRight = message.readFloatLE(position);
    position += 4;

    rawData.carOrdinal = message.readInt32LE(position);
    position += 4;
    rawData.carClass = message.readInt32LE(position);
    position += 4;
    rawData.carPerformanceIndex = message.readInt32LE(position);
    position += 4;
    rawData.drivetrainType = message.readInt32LE(position);
    position += 4;
    rawData.numCylinders = message.readInt32LE(position);
    position += 4;

    position += 12;

    rawData.positionX = message.readFloatLE(position);
    position += 4;
    rawData.positionY = message.readFloatLE(position);
    position += 4;
    rawData.positionZ = message.readFloatLE(position);
    position += 4;

    rawData.speed = message.readFloatLE(position);
    position += 4;
    rawData.power = message.readFloatLE(position);
    position += 4;
    rawData.torque = message.readFloatLE(position);
    position += 4;

    rawData.tireTempFrontLeft = message.readFloatLE(position);
    position += 4;
    rawData.tireTempFrontRight = message.readFloatLE(position);
    position += 4;
    rawData.tireTempRearLeft = message.readFloatLE(position);
    position += 4;
    rawData.tireTempRearRight = message.readFloatLE(position);
    position += 4;

    rawData.boost = message.readFloatLE(position);
    position += 4;
    rawData.fuel = message.readFloatLE(position);
    position += 4;
    rawData.distanceTraveled = message.readFloatLE(position);
    position += 4;
    rawData.bestLap = message.readFloatLE(position);
    position += 4;
    rawData.lastLap = message.readFloatLE(position);
    position += 4;
    rawData.currentLap = message.readFloatLE(position);
    position += 4;
    rawData.currentRaceTime = message.readFloatLE(position);
    position += 4;

    rawData.lapNumber = message.readUInt16LE(position);
    position += 2;
    rawData.racePosition = message.readUInt8(position);
    position += 1;

    rawData.accel = message.readUInt8(position);
    position += 1;
    rawData.brake = message.readUInt8(position);
    position += 1;
    rawData.clutch = message.readUInt8(position);
    position += 1;
    rawData.handBrake = message.readUInt8(position);
    position += 1;
    rawData.gear = message.readUInt8(position);
    position += 1;
    rawData.steer = message.readUInt8(position);
    position += 1;

    rawData.normalizedDrivingLine = message.readUInt8(position);
    position += 1;
    rawData.normalizedAIBrakeDifference = message.readUInt8(position);
    position += 1;
});

client.on('listening', function () {
    const address = client.address();
    console.log(
        'UDP Server listening on ' + address.address + ':' + address.port
    );
});

export interface TelemetryData {
    horsePower: number;
    speed: number;
    torque: number;
    gear: number;
    boost: number;
    rpm: number;
    maxRpm: number;
}

export const fetchData = (): TelemetryData => {
    const horsePower = rawData.power * 0.00134102 ?? 0;
    const speed = rawData.speed * 2.23694 ?? 0;
    const torque = rawData.torque * 0.73756 ?? 0;

    const gear = rawData.gear ?? 0;
    const boost = rawData.boost ?? 0;

    const rpm = rawData.currentEngineRpm ?? 0;
    const maxRpm = rawData.engineMaxRpm ?? 0;

    return { horsePower, speed, torque, gear, boost, rpm, maxRpm };
};

export const startServer = () => client.bind(9997, '0.0.0.0');

class GameState extends EventEmitter {
    public gameOpen: boolean;

    constructor() {
        super();
        this.gameOpen = false;
    }

    public start(force = false): void {
        if (this.gameOpen && !force) return;

        console.log('Starting RPC');

        this.gameOpen = true;
        this.emit('start');
    }

    public stop(force = false): void {
        if (!this.gameOpen && !force) return;

        console.log('Stopping RPC');

        this.gameOpen = false;
        this.emit('end');
    }
}

export const gameState = new GameState();
