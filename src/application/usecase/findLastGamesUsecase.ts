import { connectMySQL } from "../../infrastructure/connection";
import { FindLastGamesQueryModel, FindLastGamesQueryService } from "../query/findLastGamesQueryService";

const FIND_COUNT = 10

export class FindLastGamesUsecase {
    constructor(private _queryService: FindLastGamesQueryService) {}

    async run(): Promise<FindLastGamesQueryModel[]> {
        const conn = await connectMySQL()
        try {
            const res =  await this._queryService.query(conn, FIND_COUNT)
            return res
        } finally {
            conn.end()
        }
    }
}