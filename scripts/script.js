    $(document).ready(function(){
      var index = 0;
      var xVel = 10;
      var yVel = 20;
      var xPos = 0;
      var yPos = 0;
      var yAcc = -9.8;
      var xAcc = 0;
      var bottom;
      var left;
      var frameInterval = 0.033;
      var frameIntervalM = frameInterval * 1000;
      var pixelRatio = 0.2; //1px = 0.2m

      setInterval(onTimerTick,frameIntervalM); //33 milliseconds = ~ 30 frames per second

      function onTimerTick(){
        if (bottom <= 0 && yVel < 0){
          return;
        }
        index += 1;
        updateTelemetry(xPos,yPos,xVel,yVel,index,frameInterval);

        xPos += xVel * frameInterval;
        yPos += yVel * frameInterval;
        yVel += yAcc * frameInterval;
        xVel += xAcc * frameInterval;

        bottom = Math.round(yPos / pixelRatio);
        left = Math.round(xPos / pixelRatio);
        redraw(left,bottom);
      }

      function redraw(x,y){
        $('.sprite').css({'left': x, 'bottom':y});
      }

      function updateTelemetry(xPos,yPos,xVel,yVel,index,frameInterval){
        $('li:nth-child(1)').text("Frame Number: " + index);
        $('li:nth-child(2)').text("T: : " + (index*frameInterval).toPrecision(3) + " s");
        $('li:nth-child(3)').text("Height: " + yPos.toPrecision(3) + " m");
        $('li:nth-child(4)').text("Down Range Distance: " + xPos.toPrecision(3) + " m");
        $('li:nth-child(5)').text("Horizontal Velocity: " + xVel.toPrecision(3) + " m/s");
        $('li:nth-child(6)').text("Vertical Velocity: " + yVel.toPrecision(3) + " m/s");
      }

    });