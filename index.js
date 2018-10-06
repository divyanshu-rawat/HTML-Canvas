

window.requestAnimFrame = (() => {
	return window.requestAnimationFrame ||	function( cb ) { window.setTimeout(cb, 1000 /60); };
})();

	var canvas = document.getElementById('Canvas')
	var ctx = canvas.getContext('2d');
	var crankColor = 'green';

	var clockwise = true;
    var antiClockwise = false;
	var radius = 50;
	var x_centre = 150;
	var y_centre = 150;

	var sAngle = 1.5 * Math.PI;
	var eAngle = Math.asin(0.4);
	var caseY = 105
	var caseWidth = 20
	var caseHeight = 85;
	var angle = 2;
	var dAngle = 0.1;
	var rodLength = 80;
	var pistonHeight = 30;

	crank = {
		draw : function () {
      		// crankcase
			ctx.strokeStyle = 'black';
			ctx.fillStyle = 'black';
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.arc(x_centre, y_centre, radius,  sAngle + eAngle, sAngle - eAngle,false); 
			//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
			ctx.stroke(); //The stroke() method actually draws the path 

			//crankCase left
			ctx.moveTo(x_centre - caseWidth, caseY + ctx.lineWidth / 2);
			ctx.lineTo(x_centre - caseWidth, caseY - caseHeight);
			//crankCase right
			ctx.moveTo(x_centre + caseWidth, caseY + ctx.lineWidth / 2);
			ctx.lineTo(x_centre + caseWidth, caseY - caseHeight);
			// top
			ctx.moveTo(x_centre + caseWidth + ctx.lineWidth / 2, caseY - caseHeight);
			ctx.lineTo(x_centre - caseWidth - ctx.lineWidth / 2, caseY - caseHeight);
			ctx.stroke();

			// crank

			 if(clockwise) {
		        angle += dAngle;
		        if(angle > 2.7) {
		          
		          antiClockwise = true;
		          clockwise = false;
		        }
		      } else if(antiClockwise) {
		        angle -= dAngle;

		        if(angle < -2.7) {

		          antiClockwise = false;
		          clockwise = true;
		        }
		      }

			var rodX = x_centre + Math.sin(angle) * radius * 0.3;
			var rodY = y_centre + Math.cos(angle) * radius * 0.3;

			ctx.strokeStyle = 'green';
			ctx.lineWidth = 8;
			ctx.beginPath();
			ctx.moveTo(rodX, rodY);

			var rodMotion = rodY - Math.sqrt(Math.pow(rodLength, 2) - Math.pow(rodX - x_centre, 2));
			ctx.lineTo(x_centre, rodMotion);
			ctx.stroke();

			// crankshaft
			ctx.beginPath();
			ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
			ctx.arc(x_centre, y_centre, radius * 0.9 - ctx.lineWidth,  0, 2 * Math.PI);
			ctx.fill();
			ctx.fillStyle = 'rgba(255, 0, 0, .9)';
			ctx.beginPath();
			ctx.arc(rodX, rodY, radius * 0.1,  0, 2 * Math.PI);
			ctx.fill();

			// piston
			ctx.fillStyle = 'yellow';
			ctx.fillRect(x_centre - caseWidth + ctx.lineWidth / 2, rodMotion - pistonHeight / 2, 2 * caseWidth - ctx.lineWidth, pistonHeight);
		}
	};

(function frame(){
	requestAnimFrame(frame);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	crank.draw();
})();