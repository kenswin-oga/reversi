type applicationErrorType = 'LatestGameNotFound'

export class ApplilcationError extends Error {
    constructor(private _type: applicationErrorType, message: string) {
        super(message)
    }

    get type() {
        return this._type
    }
}