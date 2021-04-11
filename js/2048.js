var game = {
    boolean : 'false',
    // 初始化游戏
    init(){
        var content = document.getElementById('content'),
        str = '',
        id = 1;
        for(var i = 0;i < 4;i++){
            str += `<div class="item-content">`;
            for(var j = 0; j < 4;j++){
                str += `<div id="${id++}" class="item"></div>`;
            }
            str += "</div>";
        }
        content.innerHTML = str;
        this.randomNum()
        this.randomNum()
        this.result()
    },
    // 随机数字封装
    myrandom(min, max){
        return Math.round(Math.random() * (max-min) + min);
    },
    // 随机生成数字
    randomNum(){
        const num = this.myrandom(1,16);
        const item = document.getElementById(num);
        if(!item.innerHTML) {
            item.innerHTML = this.myrandom(2,4) % 3 ? 2 :4;
        } else {
            this.randomNum();
        }
    },
    // 左键
    left(){
        for (let i = 1; i <= 13; i += 4) {
            for (let j = i; j <= i+3; j++) {
                for (let k = j; k > i; k--){
                    this.change(document.getElementById(k-1),document.getElementById(k))
                }
            }
        }
    },
    // 上键
    up(){
        for (let i = 1; i <= 4; i++) {
            for (let j=i; j <= i+12; j += 4) {
                for (let k = j; k > 4; k -= 4) {
                    this.change(document.getElementById(k-4),document.getElementById(k))
                }
            }
        }
    },
    // 右键
    right(){
        for (let i = 16; i >= 4; i -= 4) {
            for (let j = i; j >= i-3; j--) {
                for (let k = j; k < i; k++) {
                    this.change(document.getElementById(k+1),document.getElementById(k))
                }
            }
        }
    },
    // 下键
    down(){
        for (let i = 16; i >= 13; i--) {
            for (let j = i; j >= i-12; j -= 4) {
                for (let k = j; k < i; k += 4) {
                    this.change(document.getElementById(k+4),document.getElementById(k))
                }
            }
        }
    },
    // 移动，合并
    change(before,after){
        if(!before.innerHTML && after.innerHTML){
            before.innerHTML = after.innerHTML;
            after.innerHTML = ''
            this.boolean = true
        }else if (before.innerHTML && before.innerHTML === after.innerHTML){
            before.innerHTML *= 2;
            after.innerHTML = ''
            this.boolean = true
        }
    },
    // 改变颜色
    result(){
        let color = {'':'#fff','2':'#00BFFF','4':'#696969','8':'#7CFC00',
                    '16':'#FF69B4','32':'#9932CC','64':'#00BFFF','128':'#FFBBFF',
                    '256':'#EE30A7','512':'#EEEE00','1024':'#00EE00','2048':'#00F5FF'};
        let num = 0;
        let n = 16;
        const score = document.getElementById('score')
        for(let i = 1; i <= 16; i++){
            const items = document.getElementById(i)
            items.style.background = color[items.innerHTML]
            num += items.innerHTML*10
            // 游戏胜利判断
            if(items.innerHTML == '2048') {
                alert('游戏胜利，分数为'+num)
                this.init()
            }
            // 游戏失败判断
            if(!items.innerHTML) {
                n -= 1;
            }
        }
        // 游戏失败判断
        if(n == 16) {
            m = 0;
            for(let i = 1;i <= 4; i++) {
                for (let j = (i + 4); j <= i+12; j += 4) {
                    if(document.getElementById(j-4).innerHTML == document.getElementById(j).innerHTML){
                        m += 1
                    }
                }
            }
            for(let i = 1; i <= 13; i += 4) {
                for(let j = (i+1); j <= i+3; j++){
                    if(document.getElementById(j-1).innerHTML == document.getElementById(j).innerHTML){
                        m += 1
                    }
                }
            }
            if(m == 0) {
                alert('游戏结束,分数为'+num)
                this.init()
            }
        }
        score.innerHTML = num;
        this.boolean = false;
        n = 16;
    }
}
window.onload = game.init();
document.onkeydown = function(e){
    if(/37/.test(e.keyCode))game.left()
    if(/38/.test(e.keyCode))game.up()
    if(/39/.test(e.keyCode))game.right()
    if(/40/.test(e.keyCode))game.down()
    if(game.boolean) {
        game.randomNum()
    }
    if(/32/.test(e.keyCode)){
        game.init()
    }
    game.result()
}

