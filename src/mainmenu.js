class MainMenu {
    constructor(game, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.active = true;
        this.paused = false;
        this.buttons = [];
        this.title = 'MIDROUGE';
      
        this.createStartMenu();
    }
  
    createButton(text, bIndex, onClick) {
        const canvas = this.game.ctx.canvas;
        const rect = canvas.getBoundingClientRect();
        const bHeight = 60;
        const spacing = 20;
        const startPos = 250
        const yPos = startPos + (bIndex * (bHeight + spacing));
        const button = document.createElement('button');


        
        button.textContent = text;
        button.style.position = 'absolute';
        button.style.left = (rect.left + canvas.width / 2 -100) + 'px';
        button.style.top = (rect.top + yPos) + 'px';
        button.style.width = '200px';
        button.style.height = bHeight + 'px';
        button.style.fontSize = '24px';
        button.style.fontWeight = 'bold';
        button.style.backgroundColor = 'darkgrey';
        button.style.color = 'white';
        button.style.zIndex = '1000';
        
        button.onmouseover = () => {
            button.style.backgroundColor = 'red';
        };
        button.onmouseout = () => {
            button.style.backgroundColor = 'darkgrey';
        };


        button.onclick = onClick;
        return button;
    }

// clear the menu
    clearButtons() {
        this.buttons.forEach(button => button.remove());
        this.buttons = [];
    }


// Start Menu
    createStartMenu() {
        this.clearButtons();
        this.title = 'MIDROUGE';

        const startButton = this.createButton('START', 0, () => {
            this.startGame();
        });
        this.buttons.push(startButton);
        document.body.appendChild(startButton);
    }

// Pause Menu
    createPauseMenu() {
        this.clearButtons();

// pause button
        this.title = 'PAUSED';
        const resumeButton = this.createButton('RESUME', 0, () => {
            this.resumeGame();
        });
        this.buttons.push(resumeButton);
        document.body.appendChild(resumeButton);

        this.title = 'CONTROLS';
        const controlButton = this.createButton('CONTROLS', 1, () => {
            // TODO: implement a pop up with the controls
        });
        this.buttons.push(controlButton);
        document.body.appendChild(controlButton);
    }




// Starting menu
    startGame() {
        this.active = false;
        this.clearButtons();
        this.game.ctx.canvas.focus();
        this.sceneManager.loadLevel();
    }


// Pause and resume
    pauseGame() {
        this.paused = true;
        this.active = true;
        this.createPauseMenu();
    }
    
    resumeGame() {
        this.paused = false;
        this.active = false;
        this.clearButtons();
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
            
            ctx.fillText(this.title, ctx.canvas.width / 2, 200);
        }
    }
}
