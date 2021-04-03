import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
     
    
    const gameArray = await this.repository
      .createQueryBuilder("games")
      .where("games.title ILIKE :title", {title: `%${param}%`})
      .getMany()

    return gameArray;
      
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(GAMES.ID) FROM GAMES`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {

    const users = await this.repository
    .createQueryBuilder("users")
    .leftJoinAndSelect("users.games", "games")
    .where("games.id =: gamesId", {gamesId: id})
    .select(["user"])
    .getMany()

    return users;
      // Complete usando query builder
  }
}
