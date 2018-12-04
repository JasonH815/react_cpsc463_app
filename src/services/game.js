import ApiService from './api';

/**
 * Service for interacting with API to manipulate game state
 */
class GameService {

  static async createGame() {
    const { post, players, decks, games } = ApiService;
    // create players
    const [player, opponent] = await post(players(), [{name: 'player'}, {name: 'opponent'}]);
    console.log('player: ', player);
    console.log('opponent: ', opponent);

    // create game
    const game = await post(games(), {
      playerId: player._id,
      opponentId: opponent._id
    });
    console.log('game: ', game);

    //create decks
    const [playerDeck, opponentDeck] = await post(decks(), [
      {playerId: player._id, gameId: game._id, count: 1, shuffle: true},
      {playerId: opponent._id, gameId: game._id, count: 1, shuffle: true}
    ]);
    console.log('playerDeck: ', playerDeck);
    console.log('opponentDeck: ', opponentDeck);

    // return structured data
    return {
      player: {
        player: player,
        deck: playerDeck
      },
      opponent: {
        player: opponent,
        deck: opponentDeck
      },
      game
    };
  }

  static resetGame(game) {
    // delete the existing game if it exists
    if(game) {
      ApiService.delete(`${ApiService.games()}/${game._id}`); // we don't need to wait for this to complete
    }
    return GameService.createGame();
  }

  static async drawCard(deck) {
    return ApiService.post(`${ApiService.decks()}/${deck._id}/next`);
  }
}

export default GameService;
