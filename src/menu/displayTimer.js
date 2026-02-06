class DisplayTimer {
  constructor(game) {
    this.game = game;
    this.removeFromWorld = false;
  }

  draw() {  
  }

  update() {
    console.log("THE GAME TIME IS: ", Math.round(this.game.timer.gameTime));
  }
}
