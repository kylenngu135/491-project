class MainMenu {
    constructor(game, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.active = true;
        
        this.createButton();
    }
    
    createButton() {
        const canvas = this.game.ctx.canvas;
        const rect = canvas.getBoundingClientRect();
        
        this.button = document.createElement('button');
        this.button.textContent = 'START';
        this.button.style.position = 'absolute';
        
        this.button.style.left = (rect.left + canvas.width / 2 -100) + 'px';
        this.button.style.top = (rect.top + 250) + 'px';

        this.button.style.width = '200px';
        this.button.style.height = '60px';
        this.button.style.fontSize = '24px';
        this.button.style.fontWeight = 'bold';
        this.button.style.backgroundColor = 'darkgrey';
        this.button.style.color = 'white';
        
        this.button.style.zIndex = '1000';
        
        this.button.onmouseover = () => {
            this.button.style.backgroundColor = 'red';
        };
        this.button.onmouseout = () => {
            this.button.style.backgroundColor = 'darkgrey';
        };
        
        this.button.onclick = () => {
            this.startGame();
        };
        
        document.body.appendChild(this.button);
    }
    
    startGame() {
        this.active = false;
        this.button.remove();
        this.game.ctx.canvas.focus();
        this.sceneManager.loadLevel();
    }
    
    update() {
    }
    
    draw(ctx) {
        if (this.active) {
         
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('MIDROUGE', ctx.canvas.width / 2, 200);
        }
    }
}
