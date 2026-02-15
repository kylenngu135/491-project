class ShopMenu {
     constructor(game, mainMenu) {
        this.game = game;
        this.mainMenu = mainMenu;
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
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';
        this.container.style.gap = '20px';
        this.container.style.zIndex = '1001';
    
        const tableImg = document.createElement('img');
        tableImg.src = ASSET_MANAGER.getAsset("./assets/Tiny Swords (Free Pack)/UI Elements/UI Elements/Wood Table/WoodTable_Slots.png").src;
        tableImg.style.width = '400px';
        this.container.appendChild(tableImg);

    
        document.body.appendChild(this.container); 
        this.game.ctx.canvas.focus();
    }
    // also stole this from khalid
    close() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
        this.mainMenu.closeShop();
    }
    // stole this from khalid
    update() {
        
        if (this.game.keys['Escape'] && this.isActive()) {
            this.close();
            this.game.keys['Escape'] = false;
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
}
