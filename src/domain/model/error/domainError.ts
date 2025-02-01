type DomainErrorType = 
    | 'SelectedPointIsNotEmpty'
    | 'FlipPointIsEmpty'
    | 'SelectedDiscIsNotFound'
    | 'SpecifiedTurnNotFound'
    | 'SelectedDiscIsNotNextDisc'
    | 'InvalidPoint'
    | 'InvalidDiscValue'
    | 'InvalidWinnerDiscValue'

export class DomainError extends Error {
    constructor(private _type: DomainErrorType, message: string) {
        super(message)
    }

    get type() {
        return this._type
    }
}