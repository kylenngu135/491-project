class MainMenu {
    constructor(game, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.active = true;
        this.paused = false;
        this.buttons = [];
        this.title = 'MIDROUGE';
        this.showingControls = false;
        this.menuIdx = 0;
        this.charSelect = new CharacterSelect(this.game, this);     
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
        this.menuIdx = 0;
        this.title = 'MIDROUGE';
        const startButton = this.createButton('START', this.menuIdx++, () => {
            this.startGame();
        });
        this.buttons.push(startButton);
        document.body.appendChild(startButton);

        const charSelectButton = this.createButton('SELECT CHARACTER', this.menuIdx++, () => {
            this.showCharacterSelect();
        });
        this.buttons.push(charSelectButton);
        document.body.appendChild(charSelectButton);
        this.commonMenu();
    }

// Pause Menu
    createPauseMenu() {
        this.clearButtons();
        this.menuIdx = 0;
        this.title = 'PAUSED';
        const resumeButton = this.createButton('RESUME', this.menuIdx++, () => {
            this.resumeGame();
        });
        this.buttons.push(resumeButton);
        document.body.appendChild(resumeButton);

        const quitButton = this.createButton('Quit', this.menuIdx++, () => {
             window.location.reload();
        });
        this.buttons.push(quitButton);
        document.body.appendChild(quitButton);

        this.commonMenu();
    }

    commonMenu() {        
        const controlButton = this.createButton('CONTROLS', this.menuIdx++, () => {
            this.showingControls = true;
            this.title = 'CONTROLS';
            this.buttons.forEach(btn => btn.style.display = 'none')
            this.game.ctx.canvas.focus();
        });
        this.buttons.push(controlButton);
        document.body.appendChild(controlButton);

    }



// Starting menu
    startGame() {
        this.sceneManager.initGame(this.charSelect.selectedCharacter);
        this.active = false;
        this.clearButtons();
        this.game.ctx.canvas.focus();
    }

    
    showCharacterSelect() {
        this.buttons.forEach(button => button.style.display = 'none');
        this.charSelect.show();
    }

    closeCharacterSelect() {
        this.buttons.forEach(button => button.style.display = 'block');
        this.game.ctx.canvas.focus();
    }
// Pause and resume
    pauseGame() {
        this.paused = true;
        this.active = true;
        this.createPauseMenu();
        this.game.ctx.canvas.focus();
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
        }  else if (this.game.keys['Escape'] && this.showingControls) {
            this.showingControls = false;
           // this.title = 'PAUSED';
            this.title = this.paused ? 'PAUSED' : 'MIDROUGE';
            this.buttons.forEach(btn => btn.style.display = 'block');
            this.game.keys['Escape'] = false;
        } else if (this.game.keys['Escape'] && this.charSelect.isActive()) {
            this.charSelect.close();
            this.game.keys['Escape'] = false;
        } else if (this.game.keys['Escape'] && this.paused) {
            this.resumeGame();
            this.game.keys['Escape'] = false;
        }
    }
    
    draw(ctx) {
        if (this.charSelect.isActive()) {
            this.charSelect.draw(ctx);
        } else if (this.active) {
         
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.title, ctx.canvas.width / 2, 200);
            //const text = this.paused ? 'PAUSED' : 'MIDROUGE';
            if (this.showingControls) {
                ctx.fillStyle = 'white';
                ctx.font = '24px Arial';
                
                const controls = [
                    'Arrow Keys - Move',
                    'Right Click - Attack',
                    'ESC - Pause/Resume',
                    '',
                    'Press ESC to exit'
                ];
                
                controls.forEach((control, i) => {
                    ctx.fillText(control, ctx.canvas.width / 2, 300 + i * 40);
                });
                
            }
        }
    }
}
