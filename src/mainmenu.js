class MainMenu {
    constructor(game, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.active = true;
        this.paused = false;
        
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
            if (this.paused) {
                this.resumeGame();
            } else {
                this.startGame();
            }
        };
        
        document.body.appendChild(this.button);
    }
    
    startGame() {
        this.active = false;
        this.button.remove();
        this.game.ctx.canvas.focus();
        this.sceneManager.loadLevel();
    }

    pauseGame() {
        this.paused = true;
        this.active = true;

        this.button.textContent = 'RESUME';
        if (!document.body.contains(this.button)) {
            document.body.appendChild(this.button);
        }
    }
    
    resumeGame() {
        this.paused = false;
        this.active = false;
        this.button.remove();
        this.game.ctx.canvas.focus();
    }
    update() {
        if (this.game.keys['Escape'] && !this.active) {
            this.pauseGame();
            this.game.keys['Escape'] = false;
        }
        if (this.game.keys['Escape'] && this.paused) {
            this.resumeGame();
            this.game.keys['Escape'] = false;
        }
    }
    
    draw(ctx) {
        if (this.active) {
         
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';

            const text = this.paused ? 'PAUSED' : 'MIDROUGE';
            
            ctx.fillText(text, ctx.canvas.width / 2, 200);
        }
    }
}
