import { PlatformerGameType } from '../../gameTypePresets/PlatformerGameType.js';
// import { ClickerGameType } from './gameTypes/ClickerGameType.js';

export class GameTypeFactory {
  constructor(core) {
    this.core = core;
  }

  loadGameType(gameType) {
    switch (gameType) {
      case 'platformer':
        return new PlatformerGameType(this.core);
      // case 'clicker':
      //   return new ClickerGameType(this.core);
      // Добавьте другие типы игр по необходимости
      default:
        console.warn(`Неизвестный тип игры: ${gameType}`);
        return null;
    }
  }
}