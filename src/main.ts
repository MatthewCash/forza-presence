import Forza from 'forza.js';
import { startRPC } from './rpc';

const forza = new Forza();

export const getLatestTelemetry = forza.getLatestTelemetry.bind(forza);

const main = async () => {
    await forza.loadGames();
    forza.startAllGameSockets();

    startRPC();
};

if (require.main === module) main();
