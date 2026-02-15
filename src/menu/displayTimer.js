class DisplayTimer {
  constructor(game, camera) {
    Object.assign(this, {game, camera});
    this.startTime = 0;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.removeFromWorld = false;

    this.hour = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
  }

  startTimer() {
    if(!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.isRunning = true;
    }
  }

  stopTimer() {
    if (this.isRunning) {
      this.elapsedTime = Date.now() - this.startTime;
      this.isRunning = false;
    }
  }

  draw(ctx) {
    
    const hrs = String(this.hour).padStart(2, "0");
    const min = String(this.minutes).padStart(2, "0");
    const sec = String(this.seconds).padStart(2, "0");
    const ms = String(this.milliseconds).padStart(2, "0");

    const textContent = `${hrs}:${min}:${sec}:${ms}`;

    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(textContent, this.camera.x + ctx.canvas.width, this.camera.y + 20);
  }

  update() {
    if (this.isRunning) {
      this.elapsedTime = Date.now() - this.startTime;
    }
    this.hour = Math.floor(this.elapsedTime / (1000 * 60 * 60));
    this.minutes = Math.floor(this.elapsedTime / (1000 * 60) % 60);
    this.seconds = Math.floor(this.elapsedTime / 1000 % 60);
    this.milliseconds = Math.floor(this.elapsedTime % 1000 / 10);
  }
}
