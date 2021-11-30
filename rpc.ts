import RPC from 'discord-rpc';
import { getTelemetry } from './main';

let rpc;
let setActivityInterval: NodeJS.Timeout;

const setActivity = () => {
    const telemetry = getTelemetry();
    const horsePower = telemetry?.power * 0.00134102 ?? 0;
    const speed = telemetry?.speed * 2.23694 ?? 0;
    const torque = telemetry?.torque * 0.73756 ?? 0;
    const gear = telemetry?.gear ?? 0;
    const boost = telemetry?.boost ?? 0;
    const rpm = telemetry?.currentEngineRpm ?? 0;

    const details = `${speed.toFixed(1)}mph ${horsePower.toFixed(
        0
    )}hp ${torque.toFixed(0)}ft-lb`;

    const state = `${rpm.toFixed(0)}rpm ${boost.toFixed(1)}psi Gear ${gear}`;

    console.log({ details, state });

    rpc.setActivity({
        details,
        state,
        largeImageKey: 'forza',
        largeImageText: 'Forza Telemetry'
    });
};

const rpcReady = () => {
    console.log('RPC Connected');
    setActivity();

    setActivityInterval = setInterval(setActivity, 15000);
};

export const startRPC = () => {
    rpc = new RPC.Client({ transport: 'ipc' });
    rpc.login({ clientId: '858933970120343562' }).catch(console.error);
    rpc.on('ready', rpcReady);
};

export const stopRPC = () => {
    clearInterval(setActivityInterval);
    rpc.destroy();
};
