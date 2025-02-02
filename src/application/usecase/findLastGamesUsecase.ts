import { connectMySQL } from "../../infrastructure/connection";
import { FindLastGamesQueryModel, FindLastGamesQueryService } from "../query/findLastGamesQueryService";

const FIND_COUNT = 10

export class FindLastGamesUsecase {
    constructor(private _queryService: FindLastGamesQueryService) {}

    async run(): Promise<FindLastGamesQueryModel[]> {
        const conn = await connectMySQL()
        try {
            const res =  await this._queryService.query(conn, FIND_COUNT)
            console.log("[ユースケース]取得データ")
            console.log(res)
            console.log("-----------------")
            return res
        } finally {
            conn.end()
        }
    }
}