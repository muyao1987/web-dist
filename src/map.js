//create 2017-8-25 by muyao(qq:346819890)

document.body.style.cursor = 'none';
document.getElementById("list2").innerHTML = document.getElementById("list1").innerHTML;


var speedpic = 20; //速度，越小越快

//从左到右移动播放
var workRight2LeftMove = {
    isStart: false,
    timeIdx: -1,
    startOrStop: function () {
        if (this.isStart)
            this.stop();
        else
            this.start();
    },
    start: function () {
        this.isStart = true;
        this.timeIdx = setInterval(this.moveImage, speedpic);
    },
    stop: function () {
        if (this.timeIdx != -1)
            clearInterval(this.timeIdx);
        this.timeIdx = -1;
        this.isStart = false;
    },
    moveImage: function () {
        if (document.getElementById("list2").offsetWidth - document.getElementById("list").scrollLeft <= 0) {
            document.getElementById("list").scrollLeft -= document.getElementById("list1").offsetWidth;
        }
        else {
            document.getElementById("list").scrollLeft++;
        }
    }
};

//从右到左移动播放
var workLeft2RightMove = {
    isStart: false,
    timeIdx: -1,
    startOrStop: function () {
        if (this.isStart)
            this.stop();
        else
            this.start();
    },
    start: function () {
        this.isStart = true;
        this.timeIdx = setInterval(this.moveImage, speedpic);
    },
    stop: function () {
        if (this.timeIdx != -1)
            clearInterval(this.timeIdx);
        this.timeIdx = -1;
        this.isStart = false;
    },
    moveImage: function () {
        if (document.getElementById("list").scrollLeft <= 0) {
            document.getElementById("list").scrollLeft += document.getElementById("list2").offsetWidth;
        } else {
            document.getElementById("list").scrollLeft = document.getElementById("list").scrollLeft - 0.5;
        }   
    }
};


document.getElementById("list").scrollLeft = 2500;
//默认启动
workLeft2RightMove.startOrStop();


document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];

    if (window.event.altKey && e.keyCode == 115) //Ctrl + R
        window.event.returnValue = false;

    if (e && e.keyCode == 40) { // 按下
        workLeft2RightMove.stop();
        workRight2LeftMove.startOrStop();
    }
    if (e && e.keyCode == 38) { // 按 上'
        workRight2LeftMove.stop();
        workLeft2RightMove.startOrStop();
    }
    else if (e.keyCode != 122) {
        //全部屏蔽
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
};


function flash() {
    var visibility = document.getElementById("imgFlash").style.visibility;

    if (visibility == "visible")
        //如果可见，则隐藏
        document.getElementById("imgFlash").style.visibility = "hidden";
    else
        document.getElementById("imgFlash").style.visibility = "visible"; 
}
setInterval(flash, 500);