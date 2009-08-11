var $wins = new Array ();
var $win_now;

window.addEvent ('domready', function () {

  var $sfAdminContainer = $($jsonDataList.win.nodeId_container);
  var sfAdminContent = $('sf_admin_content');

  //  Filtros del listado del generator.
  var $filerAdminBar = $('sf_filter_admin_bar');

  var btnToggleFilerSlide = $('toggleFilerSlide');
  var btnFilterOn = $('btnFilterOn');
  var btnFilterOff = $('btnFilterOff');
  var btnSubmit = $('sf_admin_batch_actions_choice_go');

  var chkSelectAll = $('sf_admin_list_batch_checkboxAll');
  var chkSelectInvert = $('sf_admin_list_batch_checkboxInvert');

  var sfAdminFilerForm = $('sf_admin_filter_form'); 			// Formulario de filtros
  var sfAdminContentForm = $('sf_admin_content_form');		// Formulario de Batch

  if ($filerAdminBar != null) {

    // Efecto de Slide de la solapa de los filtros
    var filterSlide = new Fx.Slide('sf_admin_filter_slide', {
      onComplete: function () {
        if (this.open) {
          btnToggleFilerSlide.getElement('div').addClass('icn-flecha-arriba');
          btnToggleFilerSlide.getElement('div').removeClass('icn-flecha-abajo');
        }
        else {
          btnToggleFilerSlide.getElement('div').addClass('icn-flecha-abajo');
          btnToggleFilerSlide.getElement('div').removeClass('icn-flecha-arriba');
        }
      }
    });

    // Escondemos el slide
    filterSlide.hide();

    // Comportamiento de boton de toggle para la solapa del filtro
    btnToggleFilerSlide.addEvent ('mousedown', function (e) {
      //e.stop();
      filterSlide.toggle();
    });

    // envío del filtro del list
    btnFilterOn.addEvent ('click', function (e) {
      //e.stop();
      sfAdminFilerForm.submit();
    });

    // Disparamos el formulario tambien cuando apretamos 'Enter' en campo de formulario
    sfAdminFilerForm.addEvent ('keydown', function (e){
      if (e.code == 13) btnFilterOn.fireEvent('click', e);
    });

    /* Implementamos de otra manera el reset de formulario
     * La idea es la misma que la usada por symfony 1.2.1, que es crear un formulario mediante DOM y llamar el script PHP actual (modulo/accion)
     * pero con el fomulario vacio (con metodo POST).
     * Esto hace que se 'limpien' los filtros.
     */
    btnFilterOff.addEvent ('click', function (e) {
      e.stop();
      var f = document.createElement('form');
      f.style.display = 'none';
      this.parentNode.appendChild(f);

      console.debug (this);
      console.debug (this.parentNode);

      f.method = 'POST';
      f.action = this.get('hrefreset');
      f.submit();
    });
  /** Fin Filtros del Listado **/
  }

  // Batch Actions

  // Todos los checkboxs del list
  var checks = sfAdminContent.getElements('table tbody input[type=checkbox]');
	
  // Limpiamos los botones
  if (chkSelectAll != null) {
    chkSelectInvert.setProperty ('checked', '');											// desCheck
    // Boton selecciona/deselecciona Todo
    chkSelectAll.addEvent ('click', function (e){
      checks.each (function (check, iC) {
        check.setProperty ('checked', chkSelectAll.getProperty ('checked'));
      });
    });
    chkSelectAll.setProperty('checked', '');
  }

  if (chkSelectInvert != null) {
    chkSelectInvert.setProperty('checked', '');
    // Boton invierte seleccion
    chkSelectInvert.addEvent ('click', function (e){
      checks.each (function (check, iC) {
        var chkState = (check.getProperty ('checked')) ? '' : 'checked';
        check.setProperty ('checked', chkState);
      });
    });
  }

  checks.each (function (check, iC) {
    check.setProperty ('checked', '');
  });

  // Boton Submit
  btnSubmit.addEvent ('click', function (e) {
    e.stop()
    sfAdminContentForm.submit();
  });
  /** fin Acciones del Formulario **/

  // Acciones del Listado
  var $btnsActions = $sfAdminContainer.getElements('ul.sf_admin_actions li.btn_admin_actions');
  renderButtonsAction ($btnsActions);
  $btnsActions.each (function ($btnAct, $iB) {
    $btnAct.addEvents ({
      'click': function (e) {
        // Tomamos accion de los datos que vienen por Json
        $objectAction = $jsonDataActionsList[$iB];
        $objectAction.objParent = $jsonDataList.win.obj_parent;
        if ($objectAction.execute !== undefined) eval ($objectAction.execute+'($objectAction, e, false)');
      }
    })
  }, this);


  // Acciones de objetos del listado
  var $btnsObjActions = sfAdminContent.getElements('.sf_admin_list td.sf_admin_td_actions div.btn-action');
  var $blqsActions = sfAdminContent.getElements('.sf_admin_list td.sf_admin_td_actions ul.sf_admin_ul_actions');

  $btnsObjActions.each (function ($btn, $iB) {
    var $btnActionsLi = $blqsActions[$iB].getElements ('li');

    $btnActionsLi.each (function ($btnLi, $iL) {
      $btnLi.addEvents ({
        'mouseenter': function () {
          $btnLi.addClass('mooBOA-hover');
        },
        'mouseleave': function () {
          $btnLi.removeClass('mooBOA-hover');
        },
        'mousedown': function () {
          $btnLi.addClass('mooBOA-down');
        },
        'mouseup': function () {
          $btnLi.removeClass('mooBOA-down');
        },

        'click': function (e) {
          // escondemos el menu emergente
          $blqsActions[$iB].fireEvent ('mouseleave');

          // Tomamos accion de los datos que vienen por Json
          $objectAction = $jsonDataObjActionsList[$iB].actions[$iL];
          $objectAction.objParent = $jsonDataList.win.obj_parent;
          
          if ($objectAction.type == 'delete_object') $objectAction.formDelete = $($jsonDataList.win.nodeId_formMethod);          // <- es para eliminar ?
          if ($objectAction.update == '_new') $objectAction.node_insert = $($jsonDataList.win.nodeId_winsEmbedded);
          if ($objectAction.execute !== undefined) eval ($objectAction.execute+'($objectAction, e, false)');
        }
      });
    });

    $btn.addEvents ({
      'mousedown': function (e) {
        $blqsActions[$iB].setStyle('display', 'block');
      }
    });

    $blqsActions[$iB].addEvents ({
      'mouseleave': function (e) {
        //e.stop();
        $blqsActions[$iB].setStyle ('display', 'none');
      }
    })
  });

  // Efecto hover sobre las filas del listado
  var $rows = sfAdminContent.getElements('.sf_admin_list tr.sf_admin_row');
  $rows.each (function ($row, $iR){
    $row.addEvents ({
      'mouseenter': function (e) {
        this.addClass('sf_admin_row-hover');
      },
      'mouseleave': function (e) {
        this.removeClass('sf_admin_row-hover');
      }
    })
  }, this);

  //  Ventana Principal de Mensajes
  var $vtnMainError = $sfAdminContainer.getElements ('div.error');
  if ($vtnMainError != '') {
    var $btnFlashError = $('btn_flash_error');

    // Construimos ventana de bloqueo
    var $vtnDims = $sfAdminContainer.getStyles ('height', 'width');
    var $vtnContainerBlock = new Element('div', {
      'class': 'blk_sf_admin_container',
      'styles': $vtnDims
    });

    $vtnContainerBlock.setStyle ('opacity', 0.3);
    $vtnContainerBlock.inject($sfAdminContainer, 'top');

    $vtnMainError.setStyles ($vtnDims);

    // Boton de Cerrar
    $btnFlashError.addEvent ('click', function (e) {
      e.stop;
      $vtnContainerBlock.destroy();
      $vtnMainError.destroy();
    });
  }
/** fin Ventana Principal de Errores **/
});

var renderAjaxWin = function ($objAct, $ev) {
  $win_now = $objAct.objParent;
  if (!$wins.contains ($objAct.link)) {
    $editWin = new mooWin.sfPropelEdit ({
      obj_parent: $objAct.objParent,
      id: $objAct.link,
      node_insert: $objAct.node_insert,
      linkLoad: $objAct.link,
      linkLoadContent: $objAct.link_content
    });

    $wins.push($objAct.link);
  };
}

var renderAjaxEditWin = function ($objAct, $ev) {
  $win_now = $objAct.objParent;
  $ev.stop();
  if (!$wins.contains ($objAct.link)) {
    var $editWin = new mooWin.sfPropelEdit ({
      obj_parent: $objAct.objParent,
      id: $objAct.link,
      node_insert: $objAct.node_insert,
      linkLoad: $objAct.link,
      linkLoadContent: $objAct.link_content
    });

    $wins.push($objAct.link);
  };

}

var renderAjaxNewWin = function ($objAct, $ev) {
  $win_now = $objAct.objParent;
  $ev.stop();
  if (!$wins.contains ($objAct.link)) {
    new mooWin.sfPropelNew ({
      obj_parent: $wins,
      id: $objAct.link,
      node_insert: $objAct.node_insert,
      linkLoad: $objAct.link,
      linkLoadContent: $objAct.link_content
    });
    $wins.push ($objAct.link);
  };
}


var renderAjaxListWin = function ($objAct, $ev) {
  $win_now = $objAct.objParent;
  $ev.stop();
  if (!$wins.contains ($objAct.link)) {
    new mooWin.sfPropelList ({
      obj_parent: $wins,
      id: $objAct.link,
      node_insert: $objAct.node_insert,
      linkLoad: $objAct.link,
      linkLoadContent: $objAct.link_content
    });
    $wins.push ($objAct.link);
  };
}