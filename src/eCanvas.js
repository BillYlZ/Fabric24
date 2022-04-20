const eEdit = require("./eEdit.js");
const ePlacer = require("./ePlacer.js");
const eImage = require("./eImage.js");
const ePosition = require("./ePosition.js");
const eHelper = require("./eHelper.js");
const eMask = require("./eMask.js");
const URL = require("~/repositories/repository.js");


module.exports = class eCanvas {
  static WIDTH_MOTIV = 100; // Urkunde/Scanner width = 100mm 
  static WIDTH_PAPIER = 210; // Urkunde/Scanner width = 210mm 
  static ZOOM_RATIO = 10; // 1-5 <> 1-100
  static ZOOM_START = 30;

  static TYPE_PRODUCT = 'product';
  static TYPE_PRODUCT_PLACER = 'product_placer';
  static TYPE_MOTIV = 'motiv';
  static TYPE_MOTIV_PLACER = 'motiv_placer';
  static TYPE_MOTIV_MASK = 'motiv_mask';

  static TYPE_EDIT = 'text_group';
  static TYPE_TEXT = 'text';
  static TYPE_TEXT_PLACER = 'text_placer';


  COLOR_PRODUCT = 'gray';
  COLOR_MOTIV = 'blue';
  COLOR_TEXT = 'green';

  COLOR_MOTIV_HELPER = 'black';
  COLOR_PRODUCT_HELPER = 'orange';
  COLOR_TEXT_HELPER

  id = 'canvasId';
  width = 210; //mm
  height = 297;
  elements = [];
  canvasData = null;

  productName = null;
  motivGruppeId = null;
  motivName = null;

  constructor(opts) {
    if (opts) {
      if (opts.hasOwnProperty('id')) {
        this.id = opts.id;
      }
    }

    this.productName = opts.state.productName;
    this.motivGruppeId = opts.state.motivGruppeId;
    this.motivName = opts.state.motivName;

    this.canvasData = opts.state.canvasData;


  }

  init() {
    let _this = this;

    return new Promise((resolve, reject) => {

      // //image load
      let imageUrlUrkunde = URL.imgProductUrl(_this.productName, "print"); //urkunden url
      let imageUrlMotiv = URL.imgMotivUrl(_this.motivGruppeId, _this.motivName, "print"); //motiv url

      _this.addUrkunde(imageUrlUrkunde).then((result) => {
        _this.addMotiv(imageUrlMotiv).then((result) => {



          let _DP = _this.canvasData.druck_papier;

          let placerProduct = {
            name: 'placerProduct',
            elementType: eCanvas.TYPE_PRODUCT_PLACER,
            color: _this.COLOR_PRODUCT,
            visible: false,
            position: new ePosition(),
            helper: new eHelper({
              color: _this.COLOR_PRODUCT,
              visible: false,
            }),
          }
          _this.addPlacer(placerProduct);


          let placerMotiv = {
            name: 'placerMotiv',
            elementType: eCanvas.TYPE_MOTIV_PLACER,
            productName: this.productName,
            motivGruppeId: this.motivGruppeId,
            motivName: this.motivName,
            color: _this.COLOR_MOTIV,
            visible: false,
            position: new ePosition(),
            helper: new eHelper({
              color: _this.COLOR_MOTIV,
              visible: false,
              clipImage: false,
            }),
          }
          _this.addPlacer(placerMotiv);



          let placerText = {
            name: 'placerText',
            elementType: eCanvas.TYPE_TEXT_PLACER,
            color: _this.COLOR_TEXT,
            visible: true,
            position: new ePosition(),
            helper: new eHelper({
              color: _this.COLOR_TEXT,
              visible: false,
            }),

          }
          _this.addPlacer(placerText);


          _this.addText(3); // lagertext 3
 
          _this.setElementPosition();
          resolve();
        });
      });
    });
  }

  addText(lagerTextNummer) { 
    let eID = this.elements.length;
    let obj = new eEdit({
      elementType: eCanvas.TYPE_EDIT,
      eID : eID,
      'lagerTextNummer': lagerTextNummer,      
    });    
    this.elements.push(obj); 
  }

  async addUrkunde(imageUrl) {
    if (!imageUrl) {
      return null;
    }

    let _this = this;
    await this.getBase64FromUrl(imageUrl).then((result) => {
      _this.addImage({
        name: 'background',
        elementType: eCanvas.TYPE_PRODUCT,
        selectable: false,
        imageUrl: imageUrl,
        imageBlob: result,
        position: new ePosition(),
        helper: new eHelper({
          color: _this.COLOR_PRODUCT_HELPER,
          visible: false,
        }),
        mask: null,

      });
    });

  }

  async addMotiv(imageUrl) {
    if (!imageUrl) {
      return null;
    }
    let _this = this;
    let _DP = this.canvasData.druck_papier;
    let _MAP = this.canvasData.druck_map_motivgruppe;
    let _DM = this.canvasData.druck_map_motiv;

    //Motiv
    await this.getBase64FromUrl(imageUrl).then((result) => {
      let opts = {
        name: 'motiv',
        elementType: eCanvas.TYPE_MOTIV,
        imageBlob: result,
        imageUrl: _this.imageUrl,
        placerCenterFix: true,

        position: new ePosition(),
        helper: new eHelper({
          color: _this.COLOR_MOTIV_HELPER,
          visible: false,
        }),
        mask: new eMask({
          productName: this.productName,
          motivGruppeId: this.motivGruppeId,
          motivName: this.motivName,
          canvasData: this.canvasData,
          visible: false,
        }),

      };
      _this.addImage(opts);



    });

  }

  addPlacer(opts) {
    let a = new ePlacer(opts);
    a.eID = this.elements.length;
    this.elements.push(a);
  }

  addImage(opts) {
    let a = new eImage(opts);
    a.eID = this.elements.length;
    this.elements.push(a);
  }

  setElementPosition() {
    let _DP = this.canvasData.druck_papier;
    let _MAP = this.canvasData.druck_map_motivgruppe;
    let _DM = this.canvasData.druck_map_motiv;


    this.elements.forEach(eElement => {
      let pos = {};


      if (eElement.elementType == eCanvas.TYPE_PRODUCT) {
        eElement.setData({
          imageScale: eCanvas.WIDTH_PAPIER,
        });
        pos = {
          left: 0,
          top: 0,
          width: this.width,
          height: this.height,
        };
        eElement.setPosition(pos);


      } else if (eElement.elementType == eCanvas.TYPE_MOTIV) {
        eElement.setData({
          imageScale: (_MAP.rDelta * _DM.rM) * eCanvas.WIDTH_MOTIV,
          imageDX: (_MAP.xDelta + _DM.xM),
          imageDY: (_MAP.yDelta + _DM.yM),
          placerWidth: _DP.widthMotiv,
          placerHeight: _DP.heightMotiv,
        });

        pos = eElement.position.getPosition();
        pos.left = _DP.xMotiv;
        pos.top = _DP.yMotiv;

        eElement.setPosition(pos);

      } else if (eElement.elementType == eCanvas.TYPE_PRODUCT_PLACER) {
        pos = {
          left: 0,
          top: 0,
          width: this.width,
          height: this.height,
        };
        eElement.setPosition(pos);

      } else if (eElement.elementType == eCanvas.TYPE_MOTIV_PLACER) {
        pos = {
          left: _DP.xMotiv,
          top: _DP.yMotiv,
          width: _DP.widthMotiv,
          height: _DP.heightMotiv,
        };
        eElement.setPosition(pos);

      } else if (eElement.elementType == eCanvas.TYPE_TEXT_PLACER) {
        pos = {
          left: _DP.xText,
          top: _DP.yText,
          width: _DP.widthText,
          height: _DP.heightText,
        };
        eElement.setPosition(pos);

      } else if (eElement.elementType == eCanvas.TYPE_EDIT) {
       
        pos = {
          left: _DP.xText,
          top: _DP.yText,
          width: _DP.widthText,
          height: _DP.heightText,
        };

        
        eElement.setPosition(pos);

      }
     
    });

  }

  setUI(state) {
    this.canvasData = state.canvasData;
    this.actionData = state.actionData;
    this.setElementPosition();

  }

  getTreeData() {

    let items = [];

    let index = 1000;
    this.elements.forEach(item => {
      let name = "";
      let vSwitch = "";
      let children = [];
      index++;
      if (item.type == 'image' && item.name == 'background') {
        name = "Urkunde";
        vSwitch = "drawProdukt";
        if (item.helper) {
          children.push({
            id: index,
            name: 'Helper'
          });
        }

      } else if (item.type == 'image' && item.name == 'motiv') {
        name = "Motiv";
        vSwitch = "drawMotiv";

        if (item.helper) {
          children.push({
            id: index,
            name: 'Helper'
          });
        }

      } else if (item.type == 'placer' && item.name == 'motiv') {
        name = "P-Motiv";
        vSwitch = "drawMotivPlacer";
      } else if (item.type == 'placer' && item.name == 'text') {
        name = "P-Text";
        vSwitch = "drawTextPlacer";
      }
 
      name = item.eID + " " + name;
      let eObj = {
        id: item.eID,
        name: name,
        vSwitch: vSwitch,
        children: children,
      };

      items.push(eObj);
    });

    return items;
  }

  async getBase64FromUrl(url) {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  }

};
