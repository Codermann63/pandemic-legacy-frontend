import { Network } from "./Network";
import { Player } from "./Player";

export class GameState {
    players: Player[];
    currentPlayerIndex: number
    network: Network;
    constructor(players: Player[], currentPlayerIndex: number, network: Network){
        this.players = players;
        this.currentPlayerIndex = currentPlayerIndex;
        this.network = network;
    }
}