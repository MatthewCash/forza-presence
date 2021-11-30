import dgram from 'dgram';
import { EventEmitter } from 'stream';

export type Offsets = string[];

export interface Telemetry {
    [key: string]: number;
}

const getBufferMethod = (
    buffer: Buffer,
    type: string
): [(offset: number) => number, number] => {
    switch (type) {
        case 's32':
            return [buffer.readInt32LE, 4];
        case 'u32':
            return [buffer.readUInt32LE, 4];
        case 'f32':
            return [buffer.readFloatLE, 4];
        case 'u16':
            return [buffer.readInt16LE, 2];
        case 'u8':
            return [buffer.readUInt8, 1];
        case 's8':
            return [buffer.readInt8, 1];
        default:
            return [buffer.readFloatLE, 4];
    }
};

export interface GameConstructor {
    id: string;
    name: string;
    socketPort: number;
    offsets: Offsets;
}

export class Game extends EventEmitter {
    id: string;
    name: string;
    private socketPort: number;
    private offsets: Offsets;
    private socket: dgram.Socket;
    active: boolean;

    constructor({ id, name, socketPort, offsets }: GameConstructor) {
        super();

        this.id = id;
        this.name = name;
        this.socketPort = socketPort;
        this.offsets = offsets;
        this.active = false;
    }

    startSocket() {
        this.socket = dgram.createSocket('udp4');
        this.socket.bind(this.socketPort, '0.0.0.0');

        this.socket.on('listening', this.onSocketListening.bind(this));
        this.socket.on('message', this.onSocketMessage.bind(this));
    }

    onSocketListening() {
        const address = this.socket.address();
        console.log(
            'UDP Server listening on ' + address.address + ':' + address.port
        );
    }

    onSocketMessage(raw: Buffer) {
        const telemetry = this.parseTelemetry(raw);

        this.emit('telemetry', telemetry);
    }

    parseTelemetry(raw: Buffer): Telemetry {
        const telemetry = {};
        let offset = 0;

        const length = raw.byteLength;

        for (const datum in this.offsets) {
            if (offset > length - (length % 8)) break;

            const type = this.offsets[datum] as string;

            if (type.includes('skip')) {
                offset += Number(type.split('skip')[1]) / 8 ?? 4;
                continue;
            }

            const [bufferMethod, offsetDelta] = getBufferMethod(raw, type);

            telemetry[datum] = bufferMethod.bind(raw)(offset);

            offset += offsetDelta;
        }

        return telemetry;
    }
}
