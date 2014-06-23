window.onload=function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    window.requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var CreatorElements = {
        circle : function (ctx, x, y, radius, r, g, b, transparent){
            ctx.fillStyle = 'rgba('+r+', '+g+', '+b+', .'+transparent+')';
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
        },
        circle_Grad : function circle_Grad(ctx, x, y, radius){
            var circle_gradient = ctx.createRadialGradient(x-3,y-3,1,x,y,radius);
            circle_gradient.addColorStop(0, "#A87FEF");
            circle_gradient.addColorStop(1, "#77B6F4");
            ctx.fillStyle = circle_gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
        },
        rand : function (min, max){
            min = parseInt(min);
            max = parseInt(max);
            return Math.floor( Math.random() * (max - min + 1)) + min;
        },
        square : function (ctx, x,y, width, height, bgColor, brColor, brWidth){
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.fillStyle = bgColor;
            ctx.fill();
            ctx.lineWidth = brWidth;
            ctx.strokeStyle = brColor;
            ctx.stroke();
        },
        addText : function (text,x,y,size){
            ctx.font = size+'px Arial';
            ctx.textAlign = "center";
            ctx.fillStyle = "#fff";
            ctx.fillText(text,x,y);
            ctx.textAlign = "left";
            ctx.textBaseline = "bottom";
        },
        drawLine : function (ctx, x1, y1, x2, y2, thickness, color) {
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.lineWidth = thickness;
            ctx.strokeStyle = color;
            ctx.stroke();
        }

    };
    function clear(ctx) {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    }
    function CircleCreation(ctx, x, y, radius){
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

    // Смещение жука по клику
    var x,y;
    canvas.onmousemove = function(e){
        x = e.clientX - (canvas.offsetParent.offsetLeft + canvas.offsetLeft);
        y = e.clientY - (canvas.offsetParent.offsetTop + canvas.offsetTop);

        randX = randX+((x-randX)/150);
        randY = randY+((y-randY)/150);
    };
    function randMove(axis, bugSpeed){
        if(!bugSpeed) bugSpeed = 2;
        var i = CreatorElements.rand(0,1,2);
        if(i==0){
            if(axis>=width-50) return axis;
            axis = axis+bugSpeed;
            return axis;
        } else if(i==1) {
            if(axis<=50) return axis;
            axis = axis-bugSpeed;
            return axis;
        } else if(i==2) {
            return false;
        }
    }

    var stop = false;
    var randBugX = [];
    var randBugY = [];
    function createBadBugs(count){
        for(var i=1; i<=count; i++){
            if(!stop){
                randBugX[i] = CreatorElements.rand(50,width-50);
                randBugY[i] = CreatorElements.rand(50,height-50);
                CreatorElements.circle(ctx, randBugX[i], randBugY[i], 4, 220, 0,0, 9);
            } else {
                CreatorElements.circle(ctx, randBugX[i], randBugY[i], 4, 220, 0,0, 9);
            }
            randBugX[i] = randMove(randBugX[i]);
            randBugY[i] = randMove(randBugY[i]);

        }
        stop = true;
    }

    // Стартовые координаты жука
    var randX = CreatorElements.rand(50,width-50);
    var randY = CreatorElements.rand(50,height-50);


    function start(){
        clear(ctx);

        createBadBugs(50);
        // Рисуем чужего жука
        /*CreatorElements.circle(ctx, randBugX, randBugY, 4, 220, 0,0, 9);
        randBugX = randMove(randBugX, CreatorElements.rand(1,6));
        randBugY = randMove(randBugY, CreatorElements.rand(1,6));
        */


        // Рисуем нашего жука
        CreatorElements.circle(ctx, randX, randY, 6, 0, 0,0, 9);
        randX = randMove(randX);
        randY = randMove(randY);

    }

    /*(function animationLoop(){
        start();
        requestAnimationFrame(animationLoop,'#canvas');
    })();*/
    setInterval(start, 100);


};