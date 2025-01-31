import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import mysql from 'mysql2/promise'
import { GameGateway } from './infrastructure/gemeGateway'
import { GameRecord } from './infrastructure/gameRecord'
import { TurnGateway } from './infrastructure/turnGateway'
import { MoveGateway } from './infrastructure/moveGateway'
import { SquareGateway } from './infrastructure/squareGateway'
import { gameRouter } from './presentation/gameRouter'
import { turnRouter } from './presentation/turnRouter'
import { DomainError } from './domain/model/error/domainError'
import { ApplilcationError } from './application/error/applicationError'

const PORT = 3000

const app = express()

app.use(morgan('dev'))
app.use(express.static('static', { extensions: ['html'] }))
app.use(express.json())

app.use(gameRouter)
app.use(turnRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Reversi application started: http://localhost:${PORT}`)
})

function errorHandler(
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  if (err instanceof DomainError) {
    res.status(400).json({
      type: err.type,
      message: err.message
    })
    return
  }
  if (err instanceof ApplilcationError) {
    switch(err.type) {
      case 'LatestGameNotFound':
        res.status(404).json({
          type: err.type,
          message: err.message
        })
        return
    }
  }

  console.error('Unexpected error occurred', err)
  res.status(500).send({
    message: 'Unexpected error occurred'
  })
}
