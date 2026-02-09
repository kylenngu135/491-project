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
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Recovery.png");

// Minotaur assets
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Idle.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Walk.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Attack.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Guard.png");

// Lancer assets
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Free Pack)/Units/Blue Units/Lancer/Lancer_Idle.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Free Pack)/Units/Blue Units/Lancer/Lancer_Run.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Free Pack)/Units/Blue Units/Lancer/Lancer_Right_Attack.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Free Pack)/Units/Blue Units/Lancer/Lancer_Right_Defence.png");

// Shaman assets
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Idle.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Run.png");
ASSET_MANAGER.queueDownload("./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Attack.png");

// music assets
ASSET_MANAGER.queueDownload("./assets/music/002. Start Menu (UNDERTALE Soundtrack) - Toby Fox.mp3");
ASSET_MANAGER.queueDownload("./assets/music/012. Home (UNDERTALE Soundtrack) - Toby Fox.mp3");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	// sets these to auto repeat
	ASSET_MANAGER.autoRepeat("./assets/music/002. Start Menu (UNDERTALE Soundtrack) - Toby Fox.mp3");
	ASSET_MANAGER.autoRepeat("./assets/music/012. Home (UNDERTALE Soundtrack) - Toby Fox.mp3");
	

	gameEngine.init(ctx);

    const sceneManager = new SceneManager(gameEngine);

    gameEngine.addEntity(sceneManager);

    sceneManager.init();

	gameEngine.start();
	 document.getElementById("mute").addEventListener("change", function() {
        ASSET_MANAGER.muteAudio(this.checked);
    });
    
    document.getElementById("volume").addEventListener("input", function() {
        ASSET_MANAGER.adjustVolume(this.value);
    });
});
