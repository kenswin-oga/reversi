import express from 'express'
import { StartNewGameUsecase } from '../application/usecase/startNewGameUsecase'
import { GameMySQLRepository } from '../infrastructure/repository/game/gameMySQLRepository'
import { TurnMySQLRepository } from '../infrastructure/repository/turn/turnMySQLRepository'

export const gameRouter = express.Router()

const gameService = new StartNewGameUsecase(
  new GameMySQLRepository(),
  new TurnMySQLRepository()
)

gameRouter.post('/api/games', async (req, res) => {
    await gameService.run()
  
    res.status(201).end()
  })