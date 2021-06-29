import RPC from 'discord-rpc';
import { getStatus } from './main';
import { fetchData } from './socket';

let rpc;
let setActivityInterval: NodeJS.Timeout;

const setActivity = () => {
    const data = fetchData();
    const [details, state] = getStatus(data);
    rpc.setActivity({
        details,
        state,
        largeImageKey: 'fh4',
        largeImageText: 'Forza Horizon 4'
    });
};

const rpcReady = () => {
    console.log('RPC Connected');
    setActivity();

    setActivityInterval = setInterval(setActivity, 1000);
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
