var Bomb = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        enchant.Sprite.call(this,16,16);
        this.image = game.assets[bomb_image];
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.scale(2,2);
        
        // 定期イベント設定
        this.addEventListener('enterframe',function(e){
            if(game.frame % 3 == 0){
                // アニメーション
                this.frame++;
                if(this.frame > 4){
                	this.remove();
                }
            }
        });
        // シーンに登録
        game.rootScene.addChild(this);
    },
    remove : function(){
        game.rootScene.removeChild(this);
    },
});