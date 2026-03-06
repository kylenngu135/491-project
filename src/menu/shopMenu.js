class ShopMenu {
     constructor(game, mainMenu, sceneManager) {
        this.game = game;
        this.mainMenu = mainMenu;
        this.sceneManager = sceneManager;
        if(this.sceneManager.hero !== null){
            this.hero = this.sceneManager.hero;
        }
        this.container = null; 
    }
    
    open() {
        this.createShopDisplay(); 
    }

    // stole this from khalid idk
    createShopDisplay() {
        const canvas = this.game.ctx.canvas;
        const rect = canvas.getBoundingClientRect();
    
        this.container = document.createElement('div');
        this.container.id = 'shop-container'; 
        this.container.style.position = 'absolute';
        this.container.style.left = rect.left + 'px';
        this.container.style.top = rect.top + 'px';
        this.container.style.width = canvas.width + 'px';
        this.container.style.height = canvas.height + 'px';
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';
        this.container.style.gap = '20px';
        this.container.style.zIndex = '1001';
        // this forces the shop to be the default canvas 
        this.container.addEventListener('mousedown', (e) => {  
            e.preventDefault();
        });
        
        // this is all the current prices of the shop 
        const prices = this.getPrices();

        const items = [
            {
                name: 'Potion ' + prices.potion + ' gold',
                value: 'potion',
                image: './assets/Shop/Health potion.png'
            },
            {
                name: 'More health ' + prices.health + ' gold',
                value: 'health',
                image: './assets/Shop/Health UI Gold.png'
            },
            {
                name: 'More attack ' + prices.attack + ' gold',
                value: 'attack',
                image: './assets/Tiny Swords (Free Pack)/UI Elements/UI Elements/Icons/Icon_05.png'
            }
        ];
        const cardsContainer = document.createElement('div');
        cardsContainer.style.display = 'flex';
        cardsContainer.style.flexDirection = 'row';
        cardsContainer.style.gap = '20px';
        cardsContainer.style.position = 'absolute';
        cardsContainer.style.top = '250px';
        cardsContainer.style.left = '50%';
        cardsContainer.style.transform = 'translateX(-50%)';
        cardsContainer.style.zIndex = '1002';

        items.forEach(item => {
            const card = this.createCard(item);
            cardsContainer.appendChild(card);
        });

        const tableImg = document.createElement('img');
        tableImg.src = ASSET_MANAGER.getAsset("./assets/Tiny Swords (Free Pack)/UI Elements/UI Elements/Wood Table/WoodTable_Slots.png").src;
        tableImg.style.width = '400px';
        tableImg.style.position = 'absolute';
        tableImg.style.top = '130px';
        tableImg.style.left = '50%';
        tableImg.style.transform = 'translateX(-50%)';
        tableImg.style.zIndex = '1001';

        this.container.appendChild(tableImg);
        this.container.appendChild(cardsContainer);

        document.body.appendChild(this.container); 
        this.game.ctx.canvas.focus();
    }

    // again stole this from khalid just changed the names and values 
    createCard(item) {
        const card = document.createElement('div');
        card.style.width = '90px';
        card.style.height = '100px';
        card.style.backgroundColor = 'darkgrey';
        card.style.border = '3px solid white';
        card.style.borderRadius = '10px';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'center';
        card.style.alignItems = 'center';
        card.style.cursor = 'pointer';
        card.style.color = 'white';
        card.style.fontSize = '15px';
        card.style.fontWeight = 'bold';
    
        const img = document.createElement('img');
        img.src = item.image;
        img.style.width = '80%';
        img.style.height = '60%';
        img.style.objectFit = 'contain';
        img.style.marginBottom = '5px';
        card.appendChild(img);        
    
        const name = document.createElement('div');
        name.textContent = item.name;
        card.appendChild(name);
    
        card.onmouseover = () => {
            card.style.backgroundColor = 'grey';
        };
        card.onmouseout = () => {
            card.style.backgroundColor = 'darkgrey';
        };
        card.onclick = () => {
            this.purchaseUpgrade(item.value);
        };
    
        return card;
    }

    // this makes sure you can buy stufff and adds values to the health and stuff we need to figure out how to balance this
    purchaseUpgrade(upgradeType) {
    
        const hero = this.sceneManager.hero;
    
        const prices = this.getPrices();

        if(upgradeType === 'attack' && hero.shopMoney() >= prices.attack){
            hero.subMoney(prices.attack);
            hero.increaseAttack(35);
        }
        if(upgradeType === 'potion' && hero.shopMoney() >= prices.potion){
            this.healAmount = hero.currentMaxHp() * .15;
            hero.heal(this.healAmount, prices.potion);
        }
        if(upgradeType === 'health' && hero.shopMoney() >= prices.health) {
            hero.subMoney(prices.health);
            hero.increaseMaxHp(30);
        }
        this.game.click = null; 
        this.game.ctx.canvas.focus();
    }

    // also stole this from khalid
    close() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
        this.mainMenu.closeShop();
        // this makes it so that clicking outside the canvas and or using the button doesnt
        // mess up the game
        this.game.click = null;  
        this.game.keys = {};     
        this.game.ctx.canvas.focus(); 
    }

    // stole this from khalid
    update() {
        
        if (this.game.keys['Escape'] && this.isActive() || this.game.keys['m'] && this.isActive())  {
            this.close();
            this.game.keys['Escape'] = false;
            this.game.keys['m'] = false;
            this.game.ctx.canvas.focus();
        }
    }

    // stole this from khalid
    draw(ctx) {
        if (this.isActive()) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('SHOP', ctx.canvas.width / 2, 150);
        }
    }

    //stole this from khalid
    isActive() {
        return this.container !== null;
    }

    // this get the time in the game that has passed then uses that to increase the price 
    getPrices() {
        const timePassed = Math.floor(this.sceneManager.displayTime.elapsedTime / 1000);
        const multi = 1 + Math.floor(timePassed / 30); // increases every 30 seconds
        return {
            potion: 3 * multi,
            health: 10 * multi,
            attack: 15 * multi
    };
}
    
}
