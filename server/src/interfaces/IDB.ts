import { BOARDGAME } from '../state';
import { List } from 'immutable';

interface IDB {
    addGame(game: BOARDGAME): void;
    getGame(game: string, callback: (game: BOARDGAME) => void): void;
    getAllGames(callback: (games: List<string>) => void): void;
    removeGame(game: string): void;
} 

export default IDB;