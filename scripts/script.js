
//reset origin to be the center of the Earth.
//application now calculates acceleration vector using position of the orbiter.
//application calculates height, as height above the planet Earth.
    $(document).ready(function(){

      var frameInterval = 0.033; //30 fps
      var frameIntervalM = frameInterval * 1000;
      var pixelRatio = 30000; //1px = 30km
      var start = 0;
      var myVar;
      var index = 0;
      var gravMag;
      var gravVect;
      var xVel = 10;
      var yVel = 20;
      var gravConst = 6.67E-11;
      var massEarth = 5.98E24;
      var centerDist = radius;
      var radius = 6378000;
      var xPos = 0;
      var yPos = radius;
      var xAcc = 0;
      var yAcc = 0;
      var height = centerDist - radius;
      var bottom;
      var left;
      var windowWidth = $('.drawArea').width();
      var windowHeight = $('.drawArea').height();
      //initialize telemetry panel
      updatePanel(frameInterval,xPos,yPos,xVel,yVel,xAcc,yAcc, height);
      $('button#startCommand').on('click', startFunction);
      $('button#stopCommand').on('click', stopFunction);


      function startFunction(){
        xVel = Number($('input#velocityInput').val().split(',')[0]);
        yVel = Number($('input#velocityInput').val().split(',')[1]);
        xPos = Number($('input#initialPositionInput').val().split(',')[0]);
        yPos = Number($('input#initialPositionInput').val().split(',')[1]);
        myVar = setInterval(main,frameIntervalM);
      }

      function stopFunction(){
        clearInterval(myVar);
      }

      function main(){

        function crunchPhysics(){
          index += 1;
          centerDist = Math.sqrt(Math.pow(xPos,2) + Math.pow(yPos,2));
          gravMag = gravConst * massEarth / Math.pow(centerDist,2);
          gravVect = [- 1 * xPos/centerDist,-1 * yPos/centerDist];
          height = (centerDist - radius);
          xAcc = gravMag * gravVect[0];
          yAcc = gravMag * gravVect[1];
          xPos += xVel * frameInterval;
          yPos += yVel * frameInterval;
          yVel += yAcc * frameInterval;
          xVel += xAcc * frameInterval;
          bottom = Math.round(yPos / pixelRatio + windowHeight / 2);
          left = Math.round(xPos / pixelRatio + windowWidth / 2);
        }


        if (yPos < 0 && yVel < 0){
          return;
        }

        crunchPhysics();
        updatePanel(frameInterval,xPos,yPos,xVel,yVel,xAcc,yAcc,height);
        redraw(left,bottom);

      }


      function updatePanel(frameInterval,xPos,yPos,xVel,yVel,xAcc,yAcc,height){
        $('li:nth-child(1)').text("Frame Number: " + index);
        $('li:nth-child(2)').text("T: : " + (index*frameInterval).toPrecision(3) + " s");
        $('li:nth-child(3)').text("Height: " + height.toPrecision(3) + " m");
        $('li:nth-child(4)').text("Horizontal Velocity: " + xVel.toPrecision(3) + " m/s");
        $('li:nth-child(5)').text("Vertical Velocity: " + yVel.toPrecision(3) + " m/s");
        $('li:nth-child(6)').text("Vertical Acceleration: " + yAcc.toPrecision(3) + " m/s2");
        $('li:nth-child(7)').text("Horizontal Acceleration: " + xAcc.toPrecision(3) + " m/s2");
        $('li:nth-child(8)').text("yPosition: " + yPos.toPrecision(3) + " m");
        $('li:nth-child(9)').text("xPosition: " + xPos.toPrecision(3) + " m");
      }

      function redraw(x,y){
        $('.sprite').css({'left': x, 'bottom':y});
      }
    });