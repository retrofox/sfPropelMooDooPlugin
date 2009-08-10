/*
 Script: sfMooWin_class.js
 autor: Damian Suarez
 email: damian.suarez@xifox.net
 Contiene las clases <mooWin>
 Class: mooWin
  Clase para crear ventanas utilizando codigo HTML, CSS y JS
  Note:
  mooWin requiere un doctype XHTML.
  License:
  Licencia MIT-style.
 */

var mooWin = new Class({
  Implements: [Events, Options],
  options: {
    id: '',                                     // Identificador de la ventana
    loadWithAjax: true,
    linkLoad: '',
    linkLoadContent: '',
    nodeInf: '_parent',
    cssPrefix: 'mooWin',
    container: 'content',
    node_insert: '',
    obj_parent: window,
    fullComplete: true,
    box: {
      width: 450,
      left: 30,
      top: 30
    }
  },

  initialize: function(options){
    this.setOptions(options);
    this.initConf();

    this.id = this.options.id;

    this.wins = new Array ();

    this.addEvent ('winDomReady', function () {
      // Se debe generar una variable que viene del servidor
      this.serverOptions = $jsonData4Win;

      this.options.box = this.serverOptions.dims;
      this.redims ();
      this.makeWin();
      this.show();
      this.fireEvent('renderComplete', this.nodeWin);

    });
  },

  initConf: function(){
    // nodeParentInsert. Nodo donde insertamos la ventana.
    this.nodeParentInsert = ($(this.options.node_insert));
    this.objParent = $win_now;                                        // <- Variable global

    // Cargamos el contenido de la ventana con AJAX ?
    if (this.options.loadWithAjax) {

      this.makeAjaxConex();
      this.ajaxConex.send();

      this.addEvent ('winDomReady', function ($tree, $elems, $html, $js) {
        this.nodeWin = $elems[0];
        this.insertWinNode ();
        this.renderWinNodes();

        this.renderAction2Buttons(this.nodeContent.getElements ('.btn_admin_actions'));
        this.nodeBlock.setOpacity (0.3);
      });
    }
  },

  insertWinNode: function () {
    this.nodeWin.inject(this.nodeParentInsert, 'top');
  },

  renderWinNodes: function(){
    this.nodeBlock = this.nodeWin.getChildren()[0];
    this.nodeHandle = this.nodeWin.getChildren()[1];
    this.nodeContent = this.nodeWin.getChildren()[2];
  },

  show: function(){
    this.nodeWin.setStyle ('display', 'block');
  },

  hide: function(){
    this.nodeWin.setStyle ('display', 'none');
  },

  fadeIn: function(){
    this.nodeWin.setOpacity (1)
  },

  fadeOut: function(){
    this.nodeWin.setOpacity (0.3)
  },

  hideContent: function () {
    this.nodeContent.setStyle ('visibility', 'hidden');
  },

  showContent: function () {
    this.nodeContent.setStyle ('visibility', 'visible');
  },

  hideAndDestroy: function(){
    this.fadeOut();
    this.destroy();
  },

  contentDestroy: function(){
  },

  destroy: function(){
    this.nodeWin.destroy();
    $wins.erase(this.id);           // <- Ojo con esto pepe !!!
    this.fireEvent ('winDestroy', this.id);
  },

  blockOn: function () {
    var $styles = this.nodeWin.getStyles ('width', 'height');
    $styles.display = 'block';
    this.nodeBlock.setStyles ($styles);
  },

  blockOff: function () {
    this.nodeBlock.setStyle ('display', 'none');
  },

  refresh: function () {
    this.removeEvents ('winDomReady');
    this.addEvent ('winDomReady', function ($tree, $elems, $html, $js) {
      console.debug ('renderiza !!!', $html);
    })
    this.ajaxConex.send();
  },
  
  refreshContent: function () {
    this.removeEvents ('winDomReady');
    this.ajaxConex.options.url = this.options.linkLoadContent;

    console.debug(this.options);
    
    this.addEvent ('winDomReady', function ($tree, $elems, $html, $js) {
      //console.debug ('renderiza !!!', $html);
      //console.debug (this.ajaxConex);
    })
    this.ajaxConex.send();
  },

  // Creamos Ventana
  makeWin: function(){
    this.nodeWin.setStyle ('position', 'absolute');
    
    this.dragWin = new Drag(this.nodeWin, {
      handle: this.nodeHandle,
      container: $(this.options.container),

      onStart: function(e){
        this.fadeOut();
        this.hideContent();
      }.bind(this),

      onComplete: function(e){
        this.fadeIn();
        this.showContent();
      }.bind(this)
    });

    // Botones del Header de la ventana
    $winBtns = this.nodeHandle.getElements('ul li');

    $winBtns.each(function($btnWin, $iB){

      var bgPos = $btnWin.getStyle('background-position').split(' ');
      $btnWin.addEvents({
        'mouseenter': function(){
          $btnWin.setStyle('background-position', bgPos[0] + ' ' + (bgPos[1].toInt() - 20).toString() + 'px');
        },
        'mouseleave': function(){
          $btnWin.setStyle('background-position', bgPos[0] + ' ' + bgPos[1]);
        },
        'mousedown': function(e){
          e.stop();
          $btnWin.setStyles({
            'background-position': bgPos[0] + ' ' + (bgPos[1].toInt() - 40).toString() + 'px',
            'color': '#FFF'
          });
        },
        'mouseup': function(){
          $btnWin.setStyles({
            'background-position': bgPos[0] + ' ' + bgPos[1]
          })
        },
        'click': function(e){
          if ($btnWin.hasClass('btnHW03')) this.hideAndDestroy();
          if ($btnWin.hasClass('btnHW04')) this.refreshContent();
        }.bind(this)
      });
    }.bind(this));
  },

  renderButtons: function ($btns) {
    renderButtonsAction ($btns);
  },

  renderAction2Buttons: function ($btns) {
    this.renderButtons($btns);
    $btns.each(function($btn, $iB){
      $btn.addEvents({
        'click': function(e){

          $editAction = this.serverOptions.actions[$iB];                                                        // <- viene por Json

          if ($defined(this.serverOptions.win)) $editAction.objParent = (this.serverOptions.win.obj_parent == 'this') ? this : this.serverOptions.win.obj_parent;
          if ($editAction.type == 'delete_object') $editAction.formDelete = this.nodeFormDelete                  // <- es para eliminar ?
          if ($editAction.execute !== undefined) eval ($editAction.execute+'($editAction, e, false)');
        }.bind (this)
      });
    }, this);
  },


  makeAjaxConex: function () {
    this.ajaxConex = new Request.HTML({
      url: this.options.linkLoad,
      method: 'GET',
      onFailure: function($xhr){
        console.debug ($xhr);
        $('content').set ('html', $xhr.responseText);
      },
      onSuccess: function(tree, elems, html, js){
        this.fireEvent ('winDomReady', [tree, elems, html, js])
      }.bind(this)
    });
  },

  redims: function () {
    this.nodeWin.setStyles (this.options.box);
  },

  nodes2Dims: function () {
    this.options.box = this.nodeWin.getStyles ('width', 'height', 'top', 'left');
  }
});





mooWin.sfPropelEdit = new Class({
  Extends: mooWin,

  Implements: [Events, Options],

  options: {
  },

  initialize: function(options){
    this.parent(options);

    this.addEvent ('winDomReady', function (tree, elems, html, js) {
      this.renderFormNodes(html, js)
      this.makeAccordions();
      this.renderAction2Buttons(this.nodeActions.getElements ('.btn_admin_actions'));
      this.makeWidgets ();
    });

    this.addEvent ('responseIsReady', function (tree, elems, html, js) {
      this.flashEditResponse = $flashEditResponse;                                        // <- Respuesta programada en _flashEdit

      this.nodeContent.set('html', html);
      this.renderWinContent();

      this.blockOn();

      // Renderizamos el boton de aviso de la edicion
      $(this.flashEditResponse.flash_win.node).getElements ('.btn_admin_actions').each(function($btn, $iB){
        $btn.addEvents({
          'click': function(e){
            e.stop();

            if (this.flashEditResponse.actionToButtons[$iB].type == 'close') {
              $(this.flashEditResponse.flash_win.node).dispose();
            }
            else if (this.flashEditResponse.actionToButtons[$iB].type == 'close_and_reedit') {

              // Quitamos eventos asociados a winDomReady
              this.removeEvents ('winDomReady');

              // Tomamos las dimensiones a partir del nodo actual.
              this.nodes2Dims();

              // Definimos nueva URL del nuevo objeto, ahora ya agregado.
              this.ajaxConex.options.url = this.flashEditResponse.actionToButtons[$iB].link;
              this.options.linkLoad = this.flashEditResponse.actionToButtons[$iB].link;
              this.options.linkLoadContent = this.flashEditResponse.actionToButtons[$iB].link_content;

              this.addEvent ('winDomReady', function ($tree, $elems, $html, $js) {
                this.serverOptions = $jsonData4Win;

                // Destruimos el nodo creado para la accion new
                this.nodeWin.destroy()

                this.nodeWin = $elems[0];
                this.insertWinNode();
                
                //this.options.node = $jsonData4Win.node.win;

                this.renderWinNodes();
                this.renderFormNodes($html, $js);

                this.makeWin();
                this.redims();
                this.makeAccordions();
                this.renderAction2Buttons(this.nodeActions.getElements ('.btn_admin_actions'));
                this.makeWidgets ();
                this.nodeBlock.setOpacity (0.3);

                this.show();
              });
              this.ajaxConex.send();

            }
            else if (this.flashEditResponse.actionToButtons[$iB].type == 'close_and_refresh') {
              if (this.objParent == window) window.location.reload();
              else this.objParent.refreshContent();

              this.hideAndDestroy();
            }

            this.blockOff();
          }.bind (this)
        });
      }, this);
    });
  },

  makeWidgets: function () {
    // $propelChoiceWithAdd <- viene ejecutado en la respuesta por AJAX
    if (undefined!=window.$propelChoiceWithAdd) this.renderPropelChoiceWithAdd();
  },

  renderPropelChoiceWithAdd: function () {
    // Identificamos los bloques que tengan un selecto con comportamiento Add
    $content2Select = this.nodeContent.getElements ('div.select_with_add');

    // Recorremos, uno a uno, todos los bloques
    $content2Select.each (function ($selWAdd, $iS) {
      var $nodesWidget = $selWAdd.getChildren();

      var $popUp = $nodesWidget[0];
      var $select2Refresh = $nodesWidget[1];
      var $btn2PopUp = $nodesWidget[2];

      var $nodesPopUpWidget = $popUp.getChildren();

      var $input2Add = $nodesPopUpWidget[0];
      var $btn2Add = $nodesPopUpWidget[2];
      var $btn2Cancel = $nodesPopUpWidget[1];

      var $btns = new Array ($btn2PopUp, $btn2Cancel, $btn2Add);
      this.renderButtons ($btns);

      // Comportamiento de eventos de raton y teclado.
      $btn2PopUp.addEvent ('click', function (e) {
        $popUp.setStyle('display', 'block');
        $input2Add.focus();
      });

      $btn2Cancel.addEvent ('click', function (e) {
        e.stop();
        $popUp.setStyle('display', 'none');
      });

      // Teclas especiales
      $input2Add.addEvent ('keypress', function (e){
        if (e.code == 27) $btn2Cancel.fireEvent('click', e);
        if (e.code == 13) $btn2Add.fireEvent('click', e);
      });
      
      // Conexion de AJAX
      var addWAjax = new Request.HTML({
        onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript){
          $select2Refresh.set ('html', responseHTML);
          $popUp.setStyle('display', 'none');
        }.bind(this)
      });

      // Boton Agregar
      $btn2Add.addEvent ('click', function (e) {
        e.stop();
        addWAjax.options.url = $input2Add.get('link_to_add')+'?value='+$input2Add.get('value');
        addWAjax.send();
      }.bind(this));

    }.bind(this));
  },


  initConf: function () {
    this.parent();
    this.makeAjax4Send();
  },

  renderFormNodes: function () {
    this.nodeActions = this.nodeContent.getElement ('div.win_footer');
    this.nodeFormEdit = this.nodeContent.getElement ('form');
    this.nodeFormDelete = this.nodeWin.getElement ('form.hiddenForm');
  },

  makeAccordions: function(){
    if (this.nodeContent.getElements('h2.titleSection').length) {
      this.winAccordion = new Fx.Accordion(this.nodeContent.getElements('h2.titleSection'), this.nodeContent.getElements('div.fieldSection'), {
        show: 0,
        opacity: 0,
        onActive: function(toggler, element){
          toggler.addClass ('titleSection-hover')
        },
        onBackground: function(toggler, element){
          toggler.removeClass ('titleSection-hover');
        }
      });
    };
  },

  renderWinContent: function () {
    this.renderFormNodes();
    this.makeAccordions();
    this.renderAction2Buttons(this.nodeContent.getElements ('div.win_footer li.btn_admin_actions'));
    this.renderButtons (this.nodeContent.getElements ('div.win_flashes div.btn_admin_actions'));
  },

  save: function ($objAct, $ev) {
    this.ajax4Send.options.url = this.nodeFormEdit.get('action');
    this.ajax4Send.post(this.nodeFormEdit);
  },

  makeAjax4Send: function () {
    this.ajax4Send = new Request.HTML({
      url: this.nodeFormEdit,
      method: 'GET',
      onFailure: function($xhr){
        console.debug ($xhr.responseText);
        $('content').set ('html', $xhr.responseText);
      },
      onSuccess: function(tree, elems, html, js){
        this.fireEvent ('responseIsReady', [tree, elems, html, js])
      }.bind(this)
    });
  },

  refreshContent: function () {
    this.removeEvents ('winDomReady');
    this.ajaxConex.options.url =this.options.linkLoadContent;

    this.addEvent ('winDomReady', function ($tree, $elems, $html, $js) {
      this.nodeContent.set ('html', $html);
      this.renderFormNodes($html, $js)
      this.makeAccordions();
      this.renderAction2Buttons(this.nodeActions.getElements ('.btn_admin_actions'));      
    });
    this.ajaxConex.send();
  }
})


mooWin.sfPropelNew = new Class({
  Extends: mooWin.sfPropelEdit,

  Implements: [Events, Options],

  options: {
  },

  initialize: function(json, options){
    this.parent(json, options);
  },
  refreshContent: function () {
    return false;
  }
})


mooWin.sfPropelList = new Class({
  Extends: mooWin,

  Implements: [Events, Options],

  options: {
  },

  initialize: function(json, options){
    this.parent(json, options);

    this.addEvent ('winDomReady', function (tree, elems, html, js) {
      console.debug (js);


      this.serverOptions2BarMenu = $jsonDataBarMenuList;
      this.serverOptions2Filter = $jsonDataFilter;
      
      this.getListNodes(html, js);
      this.makeBarMenu();

      this.makeWinFilter();

    });

  
  },

  getListNodes: function () {
    this.nodesMenuBottons = this.nodeWin.getElements ('.win_bar').getChildren('a').flatten();
    this.nodesMenuWins = this.nodeWin.getElements ('div.win_bar div.wins_bar').getChildren('div').flatten();
    
    this.nodesMenuWins.each (function ($win, $iW){
      if ($win.hasClass('sf_admin_filter')) this.nodeAdminFilter = $win;
      new Drag($win, {
        container: $(this.options.container)
      });
    }, this)
  },

  makeBarMenu: function () {
    this.nodesMenuBottons.each(function ($nodeBtn, $iB){
      var $action2option = this.serverOptions2BarMenu[$iB];

      $action2option.enabled = true;
      
      $nodeBtn.addEvents ({
        'click': function (ev) {
          ev.stop();
          //$action2option.enabled = false;
          $win = this.nodesMenuWins[$iB];

          if ($action2option.enabled) {
            $nodeBtn.addClass ('linked');
            $win.setStyle ('display', 'block');
            $action2option.enabled = false;
          }
          else {
            $nodeBtn.removeClass ('linked');
            $win.setStyle ('display', 'none');
            $action2option.enabled = true;
          }

          if ($action2option.execute !== undefined && $action2option.enabled) eval ($action2option.execute+'($action2option, ev, $win)');

        }.bind(this)
      })
      
    }, this);
  },

  makeWinFilter: function () {

    var $nodeForm = this.nodeAdminFilter.getElement ('form');
    var $ajaxRequest = new Request.HTML({
      url:$nodeForm.get('action'),
      onSuccess: function(tree, elems, html, js){
        this.nodeContent.set('html', html);
      }.bind(this)
    });

    var $btns = this.nodeAdminFilter.getChildren('div.filter_btns').getChildren('a').flatten();
    $btns.each(function($btn, $iB){
      $btn.addEvents({
        'click': function (ev) {
          ev.stop();
          if ($iB == 0) {
            $ajaxRequest.post($($nodeForm));
          }
          else if ($iB == 1) {
            console.debug (this.serverOptions2Filter[1]);

            //var myHTMLRequest = new Request.HTML({url:this.serverOptions2Filter[1].action}).post("user_id=25&save=true");


            ev.stop();
            var f = document.createElement('form');
            f.style.display = 'none';
            $btn.parentNode.appendChild(f);
            f.method = 'POST';
            f.action = this.serverOptions2Filter[1].action;
            //f.submit();

            var myHTMLRequest = new Request.HTML({url:this.serverOptions2Filter[1].action}).post(f);


          } else {
            this.nodesMenuBottons[0].fireEvent('click', ev);
          }
        }.bind(this)
      })
    }, this);

  },

  optFilter: function ($action2option, ev, $win) {

  }
})