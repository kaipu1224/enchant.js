var Enemy = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        enchant.Sprite.call(this,32,32);
        this.image = game.assets[enemy_image];
        this.x = x;
        this.y = y;
        this.frame = 0;
        
        // 定期イベント設定
        this.addEventListener('enterframe',function(e){
            if(game.frame % 3 == 0){
                // アニメーション
                this.frame++;
                if(this.frame > 2) this.frame = 0;
            }
            // 左に移動していく
            this.x -= 1;
            if(this.x < -16){
                // 左端までいったらダメージを与えて消える
                game.life -= 1;
                this.remove();
            }
        });
        this.addEventListener('touchstart',function(e){
            // タッチされたら爆発して消える
            new Bomb(this.x, this.y);
            this.remove();
            game.score += 10;
        });
        // シーンに登録
        game.rootScene.addChild(this);
    },
    remove : function(){
        game.rootScene.removeChild(this);
        delete enemies[this.key];
    },
});