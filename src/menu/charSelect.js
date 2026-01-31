class CharacterSelect {
    constructor(game, mainMenu) {
        this.game = game;
        this.mainMenu = mainMenu;
        this.selectedCharacter = 'warrior';
        this.container = null;
    }

    show() {
        this.createCharacterCards();
    }

    createCharacterCards() {
        const canvas = this.game.ctx.canvas;
        const rect = canvas.getBoundingClientRect();
        
        this.container = document.createElement('div');
        this.container.id = 'char-select-container';
        this.container.style.position = 'absolute';
        this.container.style.left = rect.left + 'px';
        this.container.style.top = rect.top + 'px';
        this.container.style.width = canvas.width + 'px';
        this.container.style.height = canvas.height + 'px';
        this.container.style.display = 'flex';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';
        this.container.style.gap = '20px';
        this.container.style.zIndex = '1001';
        
        const characters = [
            {
                name: 'Warrior',
                value: 'warrior',
                image: './assets/Tiny Swords (Free Pack)/UI Elements/UI Elements/Human Avatars/Avatars_01.png'
            },
            {
                name: 'Lancer',
                value: 'lancer',
                image: './assets/Tiny Swords (Free Pack)/UI Elements/UI Elements/Human Avatars/Avatars_02.png'
            }
        ];
        
        characters.forEach(char => {
            const card = this.createCard(char);
            this.container.appendChild(card);
        });
               
        document.body.appendChild(this.container);
        this.game.ctx.canvas.focus();
    }

    createCard(char) {
        const card = document.createElement('div');
        card.style.width = '200px';
        card.style.height = '250px';
        card.style.backgroundColor = this.selectedCharacter === char.value ? 'red' : 'darkgrey';
        card.style.border = '3px solid white';
        card.style.borderRadius = '10px';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'center';
        card.style.alignItems = 'center';
        card.style.cursor = 'pointer';
        card.style.color = 'white';
        card.style.fontSize = '24px';
        card.style.fontWeight = 'bold';

        const img = document.createElement('img');
        img.src = char.image;
        img.style.width = '120px';
        img.style.height = '120px';
        img.style.objectFit = 'contain';
        img.style.marginBottom = '10px';
        card.appendChild(img);        
        
        const name = document.createElement('div');
        name.textContent = char.name;
        card.appendChild(name);
        
        card.onmouseover = () => {
            if (this.selectedCharacter !== char.value) {
                card.style.backgroundColor = 'grey';
            }
        };
        card.onmouseout = () => {
            if (this.selectedCharacter !== char.value) {
                card.style.backgroundColor = 'darkgrey';
            }
        };
        card.onclick = () => {
            this.selectedCharacter = char.value;
            this.close();
        };
        
        return card;
    }


    close() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
        this.mainMenu.closeCharacterSelect();
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SELECT CHARACTER', ctx.canvas.width / 2, 150);
    }

    isActive() {
        return this.container !== null;
    }
}
