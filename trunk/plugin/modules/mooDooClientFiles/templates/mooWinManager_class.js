/*
 Script: mooWinManager_class.js
 autor: Damian Suarez
 email: damian.suarez@xifox.net
 Contiene las clases <mooWinManager>
  License:
  Licencia MIT-style.
 */
var mooWinManager = new Class({

  Implements: [Events, Options],

  options: {
    injectTo: false,
    injectWinWrapper: false,

    showFirst: false,
    showOne: false,

    autoAdjust: true,

    zIndexTop: 100,
    zIndexBottom: 10,
    css: ''
  },

  initialize: function(element, options){
    this.setOptions(options);
    this.element = element;
    this.wins = [];
    this.winIds = [];

    // DOMSubtreeModified
    //this.watchWins = this.watchWins.bind(this);
    //this.element.addEventListener('DOMSubtreeModified', this.watchWins, false);
  },

  create: function (element, atts) {

  },

  watchWins: function (ev, b, c) {
  },

  add: function (atts) {
    atts.id = atts.id || atts.link;

    if (this.winIds.contains(atts.id)) return false;

    this.current = new mooWin[atts.winClass](atts);
    this.winIds.include (atts.id);
    this.wins.include(this.current);

    this.current.prps.number = this.wins.length - 1;

    this.current.addEvents ({
      destroyed: this.close.bind(this, this.current),
      
      mousedown: this.focus.bind(this, this.current),

      winDomReady: function () {
        this.focus(this.current);
      }.bind(this)
    })

  },

  close: function (win) {
    this.wins.erase (win);
  },

  focus: function (win) {
    if (this.current == win) return false;
    this.current = win;
    this.levelWins();
    this.raseUpWin(win);
  },

  raseUpWin: function(win){
    win.element.setStyle('z-index', this.options.zIndexTop);
  },

  levelWins: function(win) {
    this.wins.each(function (win, iE) {
      win.element.setStyle('z-index', this.options.zIndexBottom + win.prps.number)
    }, this)
  },

  setWinEvents: function (win) {
  }

});