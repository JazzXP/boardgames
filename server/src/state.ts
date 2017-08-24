export type BOARDGAME = {
    name: string,
    minPlayers: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string
}

export type BOARDGAME_UPDATE = {
    name: string,
    minPlayers?: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string
}
