import { startRPC, stopRPC } from './rpc';
import { startServer, gameState, TelemetryData } from './socket';

startServer();

gameState.on('start', startRPC);
gameState.on('end', stopRPC);

export const getStatus = (data: TelemetryData) => {
    const { horsePower, speed, torque, gear, boost, rpm } = data;

    return [
        `${speed.toFixed(1)}mph ${horsePower.toFixed(0)}hp ${torque.toFixed(
            0
        )}ft-lb`,
        `${rpm.toFixed(0)}rpm ${boost.toFixed(1)}psi Gear ${gear}`
    ];
};
