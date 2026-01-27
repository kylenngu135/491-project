const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

/*
ASSET_MANAGER.queueDownload("./assets/16x16/16x16 Idle-Sheet.png");
ASSET_MANAGER.queueDownload("./assets/16x16/16x16 Walk-Sheet.png");
*/

// Warrior assets 
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Idle.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Run.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Attack1.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Attack2.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Guard.png");

// Thief assets
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Idle.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Run.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Attack.png");

// paddle fish assets
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Idle.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Run.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Attack.png");

// Lizard assets 
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Idle.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Run.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Attack.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Hit.png");

// Troll assets
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Idle.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Walk.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Attack.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Windup.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Dead.png");

// Minotaur assets
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Idle.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Walk.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Attack.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Guard.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

    const sceneManager = new SceneManager(gameEngine);

    gameEngine.addEntity(sceneManager);

	gameEngine.start();
});
