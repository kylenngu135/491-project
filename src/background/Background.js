const TILESET_PATH = "./assets/Tiny Swords (Free Pack)/Terrain/Tileset/Tilemap_color2.png";
const FOAM_PATH = "./assets/Tiny Swords (Free Pack)/Terrain/Tileset/Water Foam.png";

class Background {
    constructor(game, rows = 30, cols = 100, tileSize = 64) {
        this.game = game;
        this.tileSize = tileSize;
        this.tilesetPath = TILESET_PATH;
        this.foamPath = FOAM_PATH;

        // Foam Animation Settings
        this.foamFrameWidth = 192;
        this.foamFrameHeight = 192;
        this.foamFrameCount = 16; // Tiny Swords foam usually has 8 frames
        this.foamDuration = 0.1; // Speed of animation
        
        // Generate the map with given dimensions
        this.generateMap(rows, cols);
        this.width = this.cols * this.tileSize;
        this.height = this.rows * this.tileSize;
    }


    /**
     * messy code for generating a map with the correct borders and corners.
     * 
     * @param {number} rows 
     * @param {number} cols 
     */
    generateMap(rows, cols) {
        const newMap = Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => {
                const isTop = r === 0;
                const isBottom = r === rows - 1;
                const isLeft = c === 0;
                const isRight = c === cols - 1;

                // Handle Top Row
                if (isTop) {
                    if (isLeft) return 0;
                    if (isRight) return 2;
                    return 1;
                }

                // Handle Bottom Row
                if (isBottom) {
                    if (isLeft) return 18;
                    if (isRight) return 20;
                    return 19;
                }

                // Handle Left/Right Edges
                if (isLeft) return 9;
                if (isRight) return 11;

                // Everything else is the interior
                return 10;
            })
        );

        this.setMap(newMap);
    }


    // replace the map with a new 2D array
    setMap(newMap) {
        this.map = newMap;
        this.rows = newMap.length;
        this.cols = newMap[0].length;
    }

    draw(ctx) {
        // draw foam first
        this.drawFoam(ctx);

        // then draw land
        const tileset = ASSET_MANAGER.getAsset(this.tilesetPath);
        if (!tileset) return;

        const tilesetCols = Math.floor(tileset.width / this.tileSize);
        ctx.imageSmoothingEnabled = false;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const tileIndex = this.map[row][col];
                
                const srcX = (tileIndex % tilesetCols) * this.tileSize;
                const srcY = Math.floor(tileIndex / tilesetCols) * this.tileSize;
                
                // draw tile at world position
                ctx.drawImage(
                    tileset,
                    srcX, srcY, this.tileSize, this.tileSize,
                    col * this.tileSize, row * this.tileSize,
                    this.tileSize + 1, this.tileSize + 1 // add 1px bleed to fix gaps
                );
            }
        }
    }


    drawFoam(ctx) {
        const foamSheet = ASSET_MANAGER.getAsset(this.foamPath);
        if (!foamSheet || !this.game) return;

        // use game timer for consistent animation speed
        const time = this.game.timer.gameTime; 

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                // animate all tiles that are not inside land 
                if (this.map[row][col] !== 10) {
                    
                    // --- SINE WAVE OFFSET ---
                    // This creates a wave-like variation in the animation frames
                    // based on the tile's position.
                    const waveOffset = Math.sin(col * 0.8 + row * 0.3) * 2;
                    
                    // Calculate frame using Timer and the offset
                    const totalTime = time + waveOffset;
                    const frameIndex = Math.floor(totalTime / this.foamDuration) % this.foamFrameCount;
                    const currentFrame = (frameIndex + this.foamFrameCount) % this.foamFrameCount;

                    // Center the 192x192 sprite over the 64x64 tile
                    // (192 - 64) / 2 = 64px offset
                    const x = (col * this.tileSize) - 64;
                    const y = (row * this.tileSize) - 64;

                    ctx.drawImage(
                        foamSheet,
                        currentFrame * this.foamFrameWidth, 0,
                        this.foamFrameWidth, this.foamFrameHeight,
                        x, y,
                        this.foamFrameWidth, this.foamFrameHeight
                    );
                }
            }
        }
    }

    update() {
        // TODO: IDK WHAT TO USE THIS FOR
    }

    
}
