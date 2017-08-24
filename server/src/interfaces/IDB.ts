import { BOARDGAME, BOARDGAME_UPDATE } from '../state';
import { List } from 'immutable';

interface IDB {
    updateGame(game: BOARDGAME_UPDATE, callback: (success: boolean, game: BOARDGAME | undefined) => void): void;
    addGame(game: BOARDGAME, callback: (success: boolean, game: BOARDGAME | undefined) => void): void;
    getGame(game: string, callback: (game: BOARDGAME_UPDATE) => void): void;
    getAllGames(callback: (games: List<string>) => void): void;
    removeGame(game: string): void;
} 

export default IDB;