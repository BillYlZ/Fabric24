module.exports = class Helper {
  visible = false; 
  clipImage = false;
  color = 'pink';

  constructor(opts) {   
    if (opts) {
      if (opts.hasOwnProperty('visible')) {
        this.visible = opts.visible;
      }
      
      if (opts.hasOwnProperty('color')) {
        this.color = opts.color;
      }
      
    }
  }

  setVisible(visible) {
    this.visible = visible;    
  }

  setClipImage(clipImage) {   
    this.clipImage = clipImage;   
  }

  

};
