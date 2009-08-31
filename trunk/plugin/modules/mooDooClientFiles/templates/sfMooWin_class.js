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

    this.addEvent ('winDomReady', function () {
      this.options.box = this.serverOptions.dims;
      this.redims ();

      // Renderizamos win
      this.render();
      this.makeWin();

      this.show();
      this.fireEvent('renderComplete', this.nodeWin);
    });
  },

  // Configuracion Inicial
  initConf: function(){
    // nodeParentInsert. Nodo donde insertamos la ventana.
    this.nodeParentInsert = ($(this.options.node_insert));
    this.objParent = $win_now;                                        // <- Variable global

    // Cargamos el contenido de la ventana con AJAX ?
    if (this.options.loadWithAjax) {

      this.createAjaxConex();
      this.ajaxConex.send();

      this.addEvent ('winDomReady', function () {
        // Asignacion de datos en JSON del servidor
        this.dataJsonAssign();

        // Insertamos el nodo de la ventana dentro del nodo padre
        this.nodeWin = this.ajaxConex.response.elements[0];
        this.insertWinNode ();

        // Buscamos las referencias de los nodos asignados
        this.getWinNodes();
        this.getWinNodesContent();
        this.nodeBlock.setOpacity (0.3);
      });
    }
  },

  insertWinNode: function () {
    this.nodeWin.inject(this.nodeParentInsert, 'top');
  },

  // Tomamos los nodos principales de una ventana
  getWinNodes: function(){
    this.nodeBlock = this.nodeWin.getChildren()[0];
    this.nodeHandle = this.nodeWin.getChildren()[1];
    this.nodeContent = this.nodeWin.getElement('.win_content');
    this.nodesHeaderBottons = this.nodeHandle.getElements('ul li');
  },

  getWinNodesContent: function(){
    this.nodesObjectActions = this.nodeContent.getElements ('.btn_admin_actions');
  },

  /***  Metodos de Render  ***/
  render: function () {
    this.renderHeaderBottons();
    this.renderContent();
  },

  renderContent: function () {
    console.count ('<renderContent>');
    this.renderButtons(this.nodesObjectActions);
    this.renderAction2Buttons();
  },

  renderHeaderBottons: function () {
    // Botones del Header de la ventana.
    this.nodesHeaderBottons.each(function($btnWin, $iB){

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

  renderAction2Buttons: function () {
    console.count ('<renderAction2Buttons>');
    this.nodesObjectActions.each(function($btn, $iB){
      $btn.addEvents({
        'click': function(e){
          $editAction = this.serverObjectActions[$iB];                                                        // <- viene por Json

          if ($defined(this.serverOptions.win)) $editAction.objParent = (this.serverOptions.win.obj_parent == 'this') ? this : this.serverOptions.win.obj_parent;
          if ($editAction.type == 'delete_object') $editAction.formDelete = this.getWinNodeFormDelete                  // <- es para eliminar ?
          if ($editAction.execute !== undefined) eval ($editAction.execute+'($editAction, e, false)');
        }.bind (this)
      });
    }, this);
  },

  /*** Asignación de los datos JSON que vienen desde el server ***/
  dataJsonAssign: function () {
    console.count ('<dataJsonAssign>');
    this.serverOptions = $jsonData4Win;
    this.dataJsonContentAssign();
  },

  dataJsonContentAssign: function () {
    console.count ('<dataJsonContentAssign>');
    this.serverObjectActions = $actions;
  },

  /**************************
   * Metodos del objeto Win *
   **************************/
  show: function(){
    this.nodeWin.setStyle ('display', 'block');
  },

  hide: function(){
    this.nodeWin.setStyle ('display', 'none');
  },

  fadeIn: function(){
    this.nodeWin.setOpacity (1);
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

  refreshContent: function ($url) {
    console.count ('<refreshContent>');

    this.removeEvents ('winDomReady');            // <- Removemos todos las funcones asociadas al evento winDomReady

    $url = $url || false;
    this.ajaxConex.options.url = $url ? $url : this.options.linkLoadContent;

    this.addEvent ('winDomReady', function () {
      this.dataJsonContentAssign();
      this.nodeContent.set ('html', this.ajaxConex.response.html);
      this.getWinNodesContent();
      this.renderContent();
    });

    this.ajaxConex.send();
  },
  /**************************************/

  createAjaxConex: function () {
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

  // Creamos Ventana
  makeWin: function(){
    console.count ('<makeWin>');
    this.nodeWin.setStyle ('position', 'absolute');
    
    this.dragWin = new Drag.Move(this.nodeWin, {
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
  },

  getWinNodesContent: function(){
    this.parent();
    this.getWinFormNodes();
  },

  getWinFormNodes: function () {
    this.getWinNodeActions = this.nodeContent.getElement ('div.win_footer');
    this.getWinNodeFormEdit = this.nodeContent.getElement ('form');
    this.getWinNodeFormDelete = this.nodeWin.getElement ('form.hiddenForm');
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
    }
  },

  dataJsonContentAssign: function () {
    this.parent();
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

  renderContent: function () {
    this.parent();

    this.makeAccordions();
    this.makeWidgets ();
  },

  createAjaxConex: function () {
    this.parent ()

    this.editAjaxConex = new Request.HTML({
      url: this.getWinNodeFormEdit,
      method: 'GET',
      onFailure: function($xhr){
        console.debug ($xhr.responseText);
        $('content').set ('html', $xhr.responseText);
      },
      onSuccess: function($tree, $elems, $html, $js){
        this.fireEvent ('editIsReady', [$tree, $elems, $html, $js])
        this.serverEditResponse();        
      }.bind(this)
    });
  },

  save: function ($objAct, $ev) {
    this.editAjaxConex.options.url = this.getWinNodeFormEdit.get('action');
    this.editAjaxConex.post(this.getWinNodeFormEdit);
  },

  serverEditResponse: function () {
    var $isNewWin = (this.serverOptions.controller.action == "new") ? true : false;

    this.flashEditResponse = $flashEditResponse;                                        // <- Respuesta programada en _flashEdit

    this.nodeContent.set('html', this.editAjaxConex.response.html);

    console.debug (this.editAjaxConex.response.javascript);

    //this.getWinNodes();
    this.renderContent();

    this.blockOn();

    var $win_flashes = this.nodeContent.getElement ('div.win_flashes');
    //console.debug (this.flashEditResponse, this.serverOptions, $jsonData4Win);

    // Renderizamos el boton de aviso de la edicion
    if (this.flashEditResponse.action_state == 'error') {
      (function () {
        $win_flashes.dispose();
        this.blockOff();
      }).delay (1000, this);
    }
    else {

      if ($isNewWin) console.debug ('ojo, es nuevo');
      else console.debug('solo reedit');

      // Quitamos eventos asociados a winDomReady
      //this.removeEvents ('winDomReady');

      // Tomamos las dimensiones a partir del nodo actual.
      this.nodes2Dims();

      // Definimos nueva URL del nuevo objeto, ahora ya agregado.
      this.ajaxConex.options.url = this.flashEditResponse.actionToButtons[$iB].link;
      this.options.linkLoad = this.flashEditResponse.actionToButtons[$iB].link;
      this.options.linkLoadContent = this.flashEditResponse.actionToButtons[$iB].link_content;

      this.addEvent ('winDomReady', function ($tree, $elems, $html, $js) {
        this.serverOptions = $jsonData4Win;
        this.serverObjectActions = $actions;

        // Destruimos el nodo creado para la accion new
        this.nodeWin.destroy()

        this.nodeWin = $elems[0];
        this.insertWinNode();

        //this.options.node = $jsonData4Win.node.win;

        this.getWinNodes();
        this.getWinNodesContent();
        //this.getFormNodes($html, $js);

        this.makeWin();
        this.redims();
        this.makeAccordions();
        this.renderAction2Buttons();
        this.makeWidgets ();
        this.nodeBlock.setOpacity (0.3);

        this.show();
      });
      this.ajaxConex.send();

    };
    /*
    else if (this.flashEditResponse.actionToButtons[$iB].type == 'close_and_refresh') {
      if (this.objParent == window) window.location.reload();
      else this.objParent.refreshContent();

      this.hideAndDestroy();
    }
    */
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
  },

  // Asignación de los datos JSON que vienen desde el server
  dataJsonContentAssign: function () {
    this.parent();

    this.serverOptions2BarMenu = $jsonDataBarMenuList;
    this.serverOptions2Filter = $jsonDataFilter;
    this.serverObjectListActions = $jsonDataObjActionsList;
  },

  getWinNodesContent: function () {
    console.count ('<getListContentNodes>');
    this.parent();

    this.getWinListMenuNodes();
    this.getWinListNodesContent();

  },

  getWinListNodesContent: function () {
    this.nodeListContainer = this.nodeContent.getElement ('.list-container');
    this.nodeListContent = this.nodeListContainer.getElement ('.sf_admin_list');
    this.nodeListRows = this.nodeListContent.getElements('.sf_admin_row').flatten();
    this.nodeListBtnObjectAction = this.nodeListContent.getElements ('.btn-action').flatten();
    this.nodeListBlkObjectAction = this.nodeListContent.getElements ('ul.sf_admin_ul_actions').flatten();

    // head y foot de la tabla
    this.nodesListTHeadLinks = this.nodeListContent.getElements ('table thead tr th a').flatten();
    this.nodesListTFootLinks = this.nodeListContent.getElements ('table tfoot tr th a').flatten();
  },

  // Metodos de acceso a los nodos
  getWinListMenuNodes: function () {
    this.nodesMenuBottons = this.nodeContent.getElements ('.win_bar').getChildren('a').flatten();
    this.nodesMenuWins = this.nodeContent.getElements ('div.win_bar div.wins_bar').getChildren('div').flatten();

    // Hacemos todas las ventanas dentro de la barra de menu draggeables
    this.nodesMenuWins.each (function ($win, $iW){
      if ($win.hasClass('sf_admin_filter')) this.nodeAdminFilter = $win;
    }, this)
  },

  createAjaxConex: function () {
    this.parent();

    // Definimos objeto ajax para los request del listado
    this.listAjaxRequest = new Request.HTML({
      onSuccess: function(){
        this.serverObjectListActions = $jsonDataObjActionsList;       // <- Actulizamos solo los datos JSON del listado
        this.nodeListContainer.set('html', this.listAjaxRequest.response.html);
        this.getWinListNodesContent ();
        this.makeListContent();
      }.bind(this)
    });
  },

  renderContent: function () {
    this.parent();

    this.makeBarMenu();
    this.makeWinFilter();
    this.makeListContent();
  },

  makeBarMenu: function () {
    this.nodesMenuBottons.each(function ($nodeBtn, $iB){
      var $action2option = this.serverOptions2BarMenu[$iB];

      $action2option.enabled = true;                            // <- condicion inicial

      $nodeBtn.addEvents ({
        'click': function (ev) {
          ev.stop();
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
    // Ajax conex para los filtros
    var $nodeFilterForm = this.nodeAdminFilter.getElement ('form');

    this.winFilter = new Drag (this.nodeAdminFilter, {
      handle: this.nodeAdminFilter.getElement('.bar_menu')
    }, this);

    var $btns = this.nodeAdminFilter.getChildren('div.filter_btns').getChildren('a').flatten();

    $nodeFilterForm.addEvent ('submit', function ($ev){
      $ev.stop();
      $btns[0].fireEvent('click', $ev);
    })

    $btns.each(function($btn, $iB){

      $btn.addEvents({
        'click': function (ev) {
          ev.stop();
          if ($iB == 0) {
            this.listAjaxRequest.options.url = $nodeFilterForm.get('action');
            this.listAjaxRequest.post($($nodeFilterForm));
          }
          else if ($iB == 1) {
            this.listAjaxRequest.options.url = this.serverOptions2Filter[1].action;
            this.listAjaxRequest.post();
          } else {
            this.nodesMenuBottons[0].fireEvent('click', ev);
          }
        }.bind(this)
      })
    }, this);
  },

  makeListContent: function () {
    // Enlaces del thead de la tabla.
    this.nodesListTHeadLinks.each (function ($theadLink, $iT){
      $theadLink.addEvents ({
        click: function ($ev) {
          $ev.stop();
          this.listAjaxRequest.options.method = 'get';
          this.listAjaxRequest.options.url = $theadLink.get('href');
          this.listAjaxRequest.send('only_list=true');
        }.bind(this)
      })
    }, this);

    // Enlaces del tfoot de la tabla. Paginador.
    this.nodesListTFootLinks.each (function ($tfootLink, $iT){
      $tfootLink.addEvents ({
        click: function ($ev) {
          $ev.stop();
          this.listAjaxRequest.options.method = 'get';
          this.listAjaxRequest.options.url = $tfootLink.get('href');
          this.listAjaxRequest.send('only_list=true');
        }.bind(this)
      })
    }, this);

    // Simple animacion en los renglones
    this.nodeListRows.each (function ($row, $iR){
      $row.addEvents ({
        'mouseenter': function (e) {
          this.addClass('sf_admin_row-hover');
        },
        'mouseleave': function (e) {
          this.removeClass('sf_admin_row-hover');
        }
      })
    }, this);

    // Boton accion de cada objeto
    this.nodeListBtnObjectAction.each (function ($btn, $iB) {
      $btn.addEvents ({
        'mousedown': function (e) {
          this.nodeListBlkObjectActions = this.nodeListBlkObjectAction[$iB].getElements ('li.mooBOA');    // <- Nodos (li) de cada accion de UN objeto
          this.nodeListBlkObjectAction[$iB].setStyle('display', 'block');

          // Agregamos los eventos a cada action si no se ha hecho previemente
          if (!this.serverObjectListActions.objects[$iB].rendered) {
            this.serverObjectListActions.objects[$iB].rendered = true;      // <- Ya esta renderizado el bloque de acciones

            // Eventos de cada accion de UN Objeto
            this.nodeListBlkObjectActions.each (function ($nodeAction, $iA) {

              $nodeAction.addEvents ({
                'mouseenter': function () {
                  $nodeAction.addClass('mooBOA-hover');
                },
                'mouseleave': function () {
                  $nodeAction.removeClass('mooBOA-hover');
                },
                'mousedown': function () {
                  $nodeAction.addClass('mooBOA-down');
                },
                'mouseup': function () {
                  $nodeAction.removeClass('mooBOA-down');
                },
                'click': function () {
                  var $objAction = this.serverObjectListActions.objects[$iB];
                  var $action = $objAction.actions[$iA];

                  $action.obj_parent = this;
                  $action.node_insert = this.serverOptions.win.nodeId_winsEmbedded;

                  console.debug ($action.execute+'($action, e, false)');

                  if ($action.execute !== undefined) eval ($action.execute+'($action, e, false)');
                }.bind(this)
              })
            }, this);
          }
        }.bind(this)
      });
    }, this);

    // bloques de accines de cada objeto. Lo hacemos desaparecer cuando el mouse sale de su area
    this.nodeListBlkObjectAction.each (function ($block, $iB) {
      $block.addEvents ({
        mouseleave: function () {
          $block.setStyle ('display', 'none');
        }.bind(this)
      })
    }, this);
  },

  optFilter: function ($action2option, ev, $win) {

  },
  deleteObject: function ($action, $ev) {
    //console.debug ($(this.serverOptions.win.nodeId_formMethod));
    $objAct = $action;
    $objAct.formDelete = $(this.serverOptions.win.nodeId_formMethod);

    $ev.stop();
    if (confirm($action.msg)) {
      var $myHTMLRequest = new Request.HTML({
        evalScripts: false,
        method: 'GET',
        url: $objAct.link,
        onFailure: function($xhr){
          $('content').set('html', $xhr.responseText);
        },
        onComplete: function (tree, elems, html, js) {
          eval (js);                                              // <- $deleteResponse
          eval ($deleteResponse.action_delete+'()');
        }.bind(this)
      }).post($objAct.formDelete);
    }
  },

  closeAndRefreshParent: function () {
    this.hideAndDestroy();
  }
})