import mysql from 'mysql2/promise'
import { Game } from "./game";
import { GameGateway } from '../../../infrastructure/repository/game/gemeGateway';

const gameGateway = new GameGateway()

export interface GameRepository {
    findLatest(conn: mysql.Connection): Promise<Game | undefined>
    save(conn: mysql.Connection, game: Game): Promise<Game>
}