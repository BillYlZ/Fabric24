'use strict'
   
function Globals() {
}
Globals.prototype = {}

Globals.WIDTH_MOTIV = 100;
Globals.WIDTH_PAPIER = 210;
Globals.ZOOM_RATIO = 10;
Globals.ZOOM_START = 30;
Globals.TYPE_PRODUCT = 'product';
Globals.TYPE_MOTIV = 'motiv'; // fix motiv
Globals.TYPE_TEXT = 'text';
Globals.TYPE_IMAGE = 'image'; // bilder, logo, motiv...
Globals.TYPE_PRODUCT_PLACER = 'product_placer';
Globals.TYPE_MOTIV_PLACER = 'motiv_placer';
Globals.TYPE_MOTIV_MASK = 'motiv_mask';
Globals.TYPE_EDIT = 'text_group';
Globals.TYPE_TEXT_PLACER = 'text_placer';

module.exports = Globals