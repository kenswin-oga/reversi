import express from 'express'
import { StartNewGameUsecase } from '../application/usecase/startNewGameUsecase'
import { GameMySQLRepository } from '../infrastructure/repository/game/gameMySQLRepository'
import { TurnMySQLRepository } from '../infrastructure/repository/turn/turnMySQLRepository'
import { FindLastGamesUsecase } from '../application/usecase/findLastGamesUsecase'
import { FindLastGamesMySQLQueryService } from '../infrastructure/query/findLastGamesMySQLQueryService'

export const gameRouter = express.Router()

const gameService = new StartNewGameUsecase(
  new GameMySQLRepository(),
  new TurnMySQLRepository()
)

const findLastGamesUsecase = new FindLastGamesUsecase(
  new FindLastGamesMySQLQueryService()
)

interface GetGamesResponseBody {
  games: {
    id: number
    darkMoveCount: number
    lightMoveCount: number
    winnerDisc: number
    startedAt: Date
    endAt: Date
  }[]
}

gameRouter.get(
  '/api/games', 
  async (req, res: express.Response<GetGamesResponseBody>) => {
    const output = await findLastGamesUsecase.run()

    console.log("[コントローラ]取得データ")
    console.log(output)
    console.log("-----------------")

    const responseBodyGames = output.map((g) => {
      return {
        id: g.gameId,
        darkMoveCount: g.darkMoveCount,
        lightMoveCount: g.lightMoveCount,
        winnerDisc: g.winnerDisc,
        startedAt: g.startedAt,
        endAt: g.endAt
      }
    })

    const responseBody = {
      games: responseBodyGames
    }

    console.log("[コントローラ]実際に返すデータ")
    console.log(responseBody)
    console.log("-----------------")

    res.json(responseBody)
  }
)

gameRouter.post('/api/games', async (req, res) => {
    await gameService.run()
  
    res.status(201).end()
  })