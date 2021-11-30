import { startRPC } from './rpc';
import fs from 'fs/promises';
import { Game, Telemetry } from './Game';

const games: Game[] = [];
let lastTelemetry: Telemetry;

export const getTelemetry = () => lastTelemetry;

const loadGames = async () => {
    const files = await fs.readdir('games/');
    const gameFiles = files.filter(file => file.endsWith('.json'));

    gameFiles.forEach(async gameFile => {
        const gameData = await import(`./games/${gameFile}`);

        const game = new Game(gameData);
        game.startSocket();

        game.on('telemetry', telemetry => (lastTelemetry = telemetry));

        games.push(game);
    });
};

loadGames();
startRPC();
