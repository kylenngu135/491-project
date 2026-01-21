const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("../assets/16x16/16x16 Idle-Sheet.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

    const sceneManager = new SceneManager(gameEngine);

    gameEngine.addEntity(sceneManager);

	gameEngine.start();
});
