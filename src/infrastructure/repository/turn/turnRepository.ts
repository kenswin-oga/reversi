import mysql from 'mysql2/promise'
import { Turn } from "../../../domain/model/turn/turn";

export interface TurnRepository {
    findForGameIdTurnCount(
        conn: mysql.Connection,
        gameId: number,
        turnCount: number
    ): Promise<Turn>

    save(
        conn: mysql.Connection,
        turn: Turn
    ): Promise<void>
}