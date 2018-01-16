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
      var frameInterval = 0.033; //30 fps
      var frameIntervalM = frameInterval * 1000;
      var pixelRatio = 0.2; //1px = 0.2m
      var start = 0;
      var myVar;

      $('button#startCommand').on('click', startFunction);
      $('button#stopCommand').on('click', stopFunction);

      function startFunction(){
        myVar = setInterval(main,frameIntervalM);
      }

      function stopFunction(){
        clearInterval(myVar);
      }

      function main(){
        if (bottom <= 0 && yVel < 0){
          return;
        }

        updatePanel();
        calculatePhysics();
        redraw(left,bottom);
      }


      function updatePanel(){
        $('li:nth-child(1)').text("Frame Number: " + index);
        $('li:nth-child(2)').text("T: : " + (index*frameInterval).toPrecision(3) + " s");
        $('li:nth-child(3)').text("Height: " + yPos.toPrecision(3) + " m");
        $('li:nth-child(4)').text("Down Range Distance: " + xPos.toPrecision(3) + " m");
        $('li:nth-child(5)').text("Horizontal Velocity: " + xVel.toPrecision(3) + " m/s");
        $('li:nth-child(6)').text("Vertical Velocity: " + yVel.toPrecision(3) + " m/s");
      }

      function calculatePhysics(){
        index += 1;
        xPos += xVel * frameInterval;
        yPos += yVel * frameInterval;
        yVel += yAcc * frameInterval;
        xVel += xAcc * frameInterval;
      }

      function redraw(x,y){
        bottom = Math.round(yPos / pixelRatio);
        left = Math.round(xPos / pixelRatio);
        $('.sprite').css({'left': x, 'bottom':y});
      }
    });