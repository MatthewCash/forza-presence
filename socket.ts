import dgram from 'dgram';
import { EventEmitter } from 'stream';
import { parseTelemetry } from './parseTelemetry';

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

    Object.assign(rawData, parseTelemetry(message));
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
