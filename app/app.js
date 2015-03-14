var app = angular.module("app", []);

app.controller('mainCtrl', ['$scope', function($scope){
  $scope.totalPins = 0;
  $scope.intersectingPins = 0;
  $scope.percentage = 0;
}]);

app.directive("drawing", function(){
  return {
    restrict: "A",
    link: function(scope, element){
      var ctx = element[0].getContext('2d');

      var d = 50;

      // create a bunch of vertical lines
      for (i = 0; i < 21; i++) {
        ctx.beginPath();
        drawLine(i * d, 0, i * d, 600);
      }

      var drawing = false;

      // drop a pin on the canvas
      element.bind('mousedown', function(event){

        drawing = true;

      });

element.bind('touchmove', function(event){
  var centerX = event.offsetX;
          var centerY = event.offsetY;
  ctx.beginPath();

          var angle = Math.random(0, 1);
          var endX = Math.cos(angle * 2 * Math.PI) * (d * .66) + centerX;
          var endY = Math.sin(angle * 2 * Math.PI) * (d * .66) + centerY;

          drawLine(centerX, centerY, endX, endY);
          scope.$apply(function() { scope.totalPins++});

for (i = 0; i < 21; i++) {
            if(lineIntersect(i * d, 0, i * d, 600, centerX, centerY, endX, endY)){
              scope.$apply(function() { scope.intersectingPins++});
            }
          }
          scope.$apply(function() { scope.percentage = scope.totalPins / scope.intersectingPins; });
});

      element.bind('mousemove', function(event){
        if(drawing){
          var centerX = event.offsetX;
          var centerY = event.offsetY;

          // begins new line
          ctx.beginPath();

          var angle = Math.random(0, 1);
          var endX = Math.cos(angle * 2 * Math.PI) * (d * .66) + centerX;
          var endY = Math.sin(angle * 2 * Math.PI) * (d * .66) + centerY;

          drawLine(centerX, centerY, endX, endY);
          scope.$apply(function() { scope.totalPins++});

          // check to see if any of the pins intersect
          for (i = 0; i < 21; i++) {
            if(lineIntersect(i * d, 0, i * d, 600, centerX, centerY, endX, endY)){
              scope.$apply(function() { scope.intersectingPins++});
            }
          }
          scope.$apply(function() { scope.percentage = scope.totalPins / scope.intersectingPins; });
        }
      });

      element.bind('mouseup', function(event){
          // stop drawing
          drawing = false;
      });

      // canvas reset
      function reset(){
       element[0].width = element[0].width;
      }


      function drawLine(startX, startY, endX, endY){

        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        // color
        ctx.strokeStyle = '#fff';
        // draw it
        ctx.stroke();
      }

      function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
          var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
          var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
          if (isNaN(x)||isNaN(y)) {
              return false;
          } else {
              if (x1>=x2) {
                  if (!(x2<=x&&x<=x1)) {return false;}
              } else {
                  if (!(x1<=x&&x<=x2)) {return false;}
              }
              if (y1>=y2) {
                  if (!(y2<=y&&y<=y1)) {return false;}
              } else {
                  if (!(y1<=y&&y<=y2)) {return false;}
              }
              if (x3>=x4) {
                  if (!(x4<=x&&x<=x3)) {return false;}
              } else {
                  if (!(x3<=x&&x<=x4)) {return false;}
              }
              if (y3>=y4) {
                  if (!(y4<=y&&y<=y3)) {return false;}
              } else {
                  if (!(y3<=y&&y<=y4)) {return false;}
              }
          }
          return true;
      }

      function draw(startX, startY, currentX, currentY){
        reset();
        var sizeX = currentX - startX;
        var sizeY = currentY - startY;

        ctx.rect(startX, startY, sizeX, sizeY);
        ctx.lineWidth = 3;
        // color
        ctx.strokeStyle = '#fff';
        // draw it
        ctx.stroke();
      }
    }
  };
});
