enchant();
window.onload = initialize;

// ゲームに関する変数
var game;
var scoreLabel;
var spawnTime = 30;
var levelLabel;
var lifelabel;

// 敵キャラ
var enemy_image = 'http://enchantjs.com/assets/images/chara2.gif';
var enemies = new Array();
// 爆破イメージ
var bomb_image = 'effect0.gif';

// 初期化処理
function initialize(){
    game = new Game(320,320);
    //game.twitterRequest('account/verify_credentials');
    game.fps = 30;
    game.score = 0;
    game.level = 1;
    game.tick = 0;
    game.life = 5;
    game.preload(enemy_image, bomb_image);
    game.onload = main;
    game.rootScene.backgroundColor = 'white';
    game.start();
}

// メイン処理
function main(){
    game.rootScene.addEventListener('enterframe', function(e){
        // 出現時間になったら敵をランダム生成
        if(game.frame % spawnTime == 0){
            createEnemy();
        }
        // 一定時間毎に出現時間を短縮
        if(game.tick >= 300){
            spawnTime -= 5;
            if(spawnTime < 5){
                spawnTime = 5;
            }
            game.tick = 0;
            game.level++;
        }
        // ラベル類を設定
        scoreLabel.score = game.score;
        levelLabel.level = game.level;
        lifeLabel.life = game.life;
        // 終了判定
        if(game.life <= 0){
            game.end(game.score, 'レベルは ' + game.level + ' で得点は ' + game.score + 'だったよ！');
        }
        game.tick++;
    });
    
    // スコア・レベル・ライフを登録
    scoreLabel = new ScoreLabel(8, 8);
    game.rootScene.addChild(scoreLabel);
    levelLabel = new LevelLabel(170, 8);
    game.rootScene.addChild(levelLabel);
    lifeLabel = new LifeLabel(8, 290, 5);
    game.rootScene.addChild(lifeLabel);
    
    //var sprite = game.twitterAssets['account/verify_credentials'][0].toSprite(48, 48);
    //sprite.x = 8;
    //sprite.y = (320-56);
    //game.rootScene.addChild(sprite);
    
    // ゲームパッドは使わないかなぁ
    //addGamePad();
}

// 敵キャラ生成処理
function createEnemy(){
    var x = 320;
    var y = Math.floor(Math.random() * 290);
    var enemy = new Enemy(x,y);
    enemy.key = game.frame;
    enemies[enemy.key] = enemy;
}