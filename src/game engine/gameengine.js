// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
//
class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // Options and the Details
        this.options = options || {
            debugging: false, };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e); 
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Get the scene manager
        let sceneManager = this.entities[0];
        
        // Draw all entities
        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (i === 0) {
                // SceneManager at index 0 - draw UI/menus without camera
                this.entities[i].draw(this.ctx, this);
            } else if (sceneManager && sceneManager.hero) {
                // Game entities - apply camera offset
                this.ctx.save();
                this.ctx.translate(-sceneManager.camera.x, -sceneManager.camera.y);
                this.entities[i].draw(this.ctx, this);
                this.ctx.restore();
            }
        }
    };

    update() {
        let sceneManager = this.entities[0];

        if (sceneManager.mainMenu && (sceneManager.mainMenu.paused || sceneManager.mainMenu.active)) {
            if (sceneManager.mainMenu) {
                sceneManager.mainMenu.update();
            }
            return;
        }

        if (!sceneManager.mainMenu.active && !sceneManager.gameLaunched) {
            sceneManager.loadLevel();
            sceneManager.gameLaunched = true;
            // Update camera immediately after game launches so hero is centered
            sceneManager.updateCamera();
        }

        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];


            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        // specifies that warrior is main character
        let main_character = this.entities[0].hero;
        if (!main_character) {
            return;
        }

        if (this.keys['ArrowLeft'] || this.keys['a']) {
            main_character.updateVelocityX(true);
        } else if (this.keys['ArrowRight'] || this.keys['d']) {
            main_character.updateVelocityX(false);
        } else {
            main_character.degradeVelocityX();
        }
         
        if (this.keys['ArrowUp'] || this.keys['w']) {
            main_character.updateVelocityY(true);
        } else if (this.keys['ArrowDown'] || this.keys['s']) {
            main_character.updateVelocityY(false);
        } else {
            main_character.degradeVelocityY();
        }

        if (this.click) {
            main_character.attack();
            this.click = null;
        }

        // Clamp hero to world bounds
        const bounds = sceneManager.getWorldBounds();
        if (main_character.destX !== undefined) {
            main_character.destX = Math.max(bounds.minX, Math.min(main_character.destX, bounds.maxX));
            main_character.destY = Math.max(bounds.minY, Math.min(main_character.destY, bounds.maxY));
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};

// KV Le was here :)