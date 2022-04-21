module.exports = class Position {

  left = -1;
  top = -2;
  width = -3;
  height = -4;
  centerX = 0;
  centerY = 0;

  constructor(opts) {
    if (opts) {
      if (opts.hasOwnProperty('left')) {
        this.left = opts.left;
      }
      if (opts.hasOwnProperty('top')) {
        this.top = opts.top;
      }
      if (opts.hasOwnProperty('width')) {
        this.width = opts.width;
      }
      if (opts.hasOwnProperty('height')) {
        this.height = opts.height;
      }
    }
    this.calcCenter();
  }

  calcCenter() {
    this.centerX = this.left + (this.width / 2);
    this.centerY = this.top + (this.height / 2);
  }


  getPosition(f = 1) {
    return {
      left: this.left * f,
      top: this.top * f,
      width: this.width * f,
      height: this.height * f,
      centerX: (this.left + (this.width / 2)) * f,
      centerY: (this.top + (this.height / 2)) * f,
    };
  }

  setPosition(pos) {
    
    this.left = pos.left;
    this.top = pos.top;
    this.width = pos.width;
    this.height = pos.height;
    this.calcCenter();
  }

};
