const gamesTableBodyElement = document.getElementById('games-table-body')

async function showGames() {
    const response = await fetch('/api/games')
    const responseBody = await response.json()
    console.log("[フロント]取得jsonデータ")
    console.log(responseBody)
    console.log("-----------------")
    const games = responseBody.games
    console.log("[フロント]取得jsongamesデータ")
    console.log(games)
    console.log("-----------------")

    while (gamesTableBodyElement.firstChild) {
        gamesTableBodyElement.removeChild(gamesTableBodyElement.firstChild)
    }

    games.forEach((game) => {
        const trElement = document.createElement('tr')

        const appendTdElement = (innerText) => {
            const tdElement = document.createElement('td')
            tdElement.innerText = innerText
            trElement.appendChild(tdElement)
        }

        appendTdElement(game.darkMoveCount)
        appendTdElement(game.lightMoveCount)
        appendTdElement(game.winnerDisc)
        appendTdElement(game.startedAt)
        appendTdElement(game.endAt)

        gamesTableBodyElement.appendChild(trElement)
    })
    console.log("[フロント]tableBodyElementデータ")
    console.log(gamesTableBodyElement)
    console.log("-----------------")
}

showGames()