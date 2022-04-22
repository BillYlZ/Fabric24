'use strict'



Image.prototype = {}
Image.fImage = null;
Image.fCanvas = null;
Image.element = null;


function Image(fCanvas, element) {
  this.fCanvas = fCanvas;
  this.element = element;
}

Image.prototype.init = function () {
  let coolStuff = 'still boring';

  return new Promise((resolve, reject) => {
    let _this = this;
     let url = this.element.FABRIX.imageBlob;
  

    fabric.Image.fromURL(url, function (img) {
      _this.fImage = img;
      _this.fCanvas.add(img);

      resolve(_this.element.ID);
    });


  });

}

module.exports = Image;
