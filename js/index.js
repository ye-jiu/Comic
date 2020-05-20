window.onload = function() {
    var swiper = document.querySelector(".swiper");
    var btnLR = document.querySelectorAll(".swiper>div>span");
    var img = document.querySelectorAll(".swiper>li>img");
    var btnStyle = document.querySelectorAll(".swiper>ol>div>li");
    var filter = document.querySelector(".filter");
    var header = document.querySelector(".header");
    var switchVideoBtns = document.querySelectorAll(".main-sole-header>div i");
    var switchVideoPage = document.querySelectorAll(".main-sole-header>div span");

    var heatImg = document.querySelectorAll(".main-heat-content>li>a");
    // var vipImg = document.querySelectorAll(".main-vip-content>li>a");
    var loveImg = document.querySelectorAll(".main-love-content>li>a");

    var bool = true;
    var index = 0;
    var autoTime;
    var imgArr = [
        "https://image.zymkcdn.com/file/news/000/004/335.jpg-1920x560",
        "https://image.zymkcdn.com/file/news/000/004/334.jpg-1920x560",
        "https://image.zymkcdn.com/file/news/000/004/333.jpg-1920x560",
        "https://image.zymkcdn.com/file/news/000/004/332.jpg-1920x560",
        "https://image.zymkcdn.com/file/news/000/004/331.jpg-1920x560"
    ];
    var randomImgArr = [
        "https://image.zymkcdn.com/file/cover/000/002/632.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/002/062.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/003/682.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/002/749.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/002/991.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/001/441.jpg-300x400"
    ];

    var heatImgArr = [
        "https://image.zymkcdn.com/file/cover/000/002/522.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/002/845.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/002/809.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/003/123.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/003/067.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/004/101.jpg-300x400"
    ];

    var loveImgArr = [
        "https://image.zymkcdn.com/file/cover/000/002/380.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/003/681.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/003/688.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/002/819.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/003/180.jpg-300x400",
        "https://image.zymkcdn.com/file/cover/000/002/462.jpg-300x400"
    ];


    // 左右按钮切换
    btnLR[0].onclick = function() {
        if (bool) {
            index <= 0 ? index = 4 : index--
        }
        time();
        bool = false;
    }
    btnLR[1].onclick = function() {
        if (bool) {
            index >= 4 ? index = 0 : index++
        }
        time();
        bool = false;
    }

    // 小按钮切换

    for (var i = 0; i < btnStyle.length; i++) {
        btnStyle[i].index = i
        btnStyle[i].onclick = function() {
            if (bool) {
                index = this.index;
                time();
                bool = false;
            }
        }
    }


    autoSwiper();
    boolFilter = true;

    function autoSwiper() {
        autoTime = setInterval(function() {
            if (bool) {
                index >= 4 ? index = 0 : index++;
                time();
                bool = false;
            }
        }, 2000);
    }

    // 左右按钮隐藏/显示 + 暂停/播放轮播
    swiper.onmouseover = function() {
        for (var i = 0; i < btnLR.length; i++) {
            btnLR[i].style.display = "block";
        }
        clearInterval(autoTime);
    }
    swiper.onmouseout = function() {
        for (var i = 0; i < btnLR.length; i++) {
            btnLR[i].style.display = "none";
        }
        autoSwiper();
    }

    function time() {
        for (var i = 0; i < img.length; i++) {
            img[i].style.opacity = 0;
            img[i].style.filter = "alpha(opacity=0)";
        }

        // 透明过渡显示
        var tranNum = 0;
        var time = setInterval(function() {
            tranNum = tranNum + 0.1;
            if (tranNum > 1) {
                clearInterval(time);
                bool = true;
            }
            img[index].style.opacity = tranNum;
            img[index].style.filter = "alpha(opacity=" + tranNum * 100 + ")";
        }, 30);

        // 按钮切换样式
        for (var i = 0; i < btnStyle.length; i++) {
            btnStyle[i].className = "";
        }
        btnStyle[index].className = "btnstyle";

        // 导航模糊
        if (boolFilter) {
            filter.style.backgroundImage = "url(" + imgArr[index] + ")";
        }

    }

    // 监听滚动条，改变导航
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (scrollTop > 50) {
            boolFilter = false;
            header.style.background = "white";
            filter.style.backgroundImage = "none";
        } else {
            boolFilter = true;
            filter.style.backgroundImage = "url(" + imgArr[index] + ")";
        }
    }

    for (var i = 0; i < switchVideoBtns.length; i++) {
        switchVideoBtns[i].index = i;
        switchVideoBtns[i].onclick = function() {
            if (this.index == 0) {
                switchImg(heatImg, heatImgArr, this.index);
            } else if (this.index == 1) {
                switchImg(heatImg, randomImgArr, this.index);
            } else if (this.index == 2) {
                switchImg(loveImg, loveImgArr, this.index);
            } else if (this.index == 3) {
                switchImg(loveImg, randomImgArr, this.index);
            }

        }

    }

    function switchImg(ele, switchImgName, eleIndex) {
        for (var j = 0; j < switchImgName.length; j++) {
            ele[j].style.backgroundImage = "url(" + switchImgName[j] + ")";
            ele[j].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + switchImgName[j] + ", sizingMethod='scale')";

        }
        if (eleIndex == 0) {
            switchVideoPage[0].innerHTML = "1 / 2";
        } else if (eleIndex == 1) {
            switchVideoPage[0].innerHTML = "2 / 2";
        } else if (eleIndex == 2) {
            switchVideoPage[1].innerHTML = "1 / 2";
        } else if (eleIndex == 3) {
            switchVideoPage[1].innerHTML = "2 / 2";
        } else if (eleIndex == 4) {
            switchVideoPage[2].innerHTML = "1 / 2";
        } else if (eleIndex == 5) {
            switchVideoPage[2].innerHTML = "2 / 2";
        }
    };


    var oLi = document.getElementById("in-content-noe").getElementsByTagName("li");
    var oUl = document.getElementById("in-conblock").getElementsByTagName("ul");
    var ctiem = new Date();
    var dany = ctiem.getDay();
    // console.log(dany);

    for (var i = 0; i < oLi.length; i++) {
        for (var n = 0; n < oLi.length; n++) oLi[n].className = "";

        oLi[dany].className = "current"
        oLi[i].index = i;
        oLi[i].onmouseover = function() {
            for (var n = 0; n < oLi.length; n++) oLi[n].className = "";

            this.className = "current";
            for (var n = 0; n < oUl.length; n++) oUl[n].style.display = "none";
            oUl[this.index].style.display = "block"
        }
    };

 
}