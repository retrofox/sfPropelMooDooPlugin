var $wins = new Array ();

var renderAjaxWin = function ($objAct) {
  if (!$wins.contains ($objAct.link)) {
    new mooWin ($objAct);
    $wins.push($objAct.link);
  }
}

var renderAjaxEditWin = function ($objAct) {
  if (!$wins.contains ($objAct.link)) {
    $editWin = new mooWin.sfPropelEdit ($objAct);
    $wins.push($objAct.link);
  }
}

var renderAjaxNewWin = function ($objAct) {
  if (!$wins.contains ($objAct.link)) {
    $newWin = new mooWin.sfPropelNew ($objAct);
    $wins.push ($objAct.link);
  }
}

var renderAjaxListWin = function ($objAct) {
  if (!$wins.contains ($objAct.link)) {
    new mooWin.sfPropelList ($objAct);
    $wins.push ($objAct.link);
  }
}

var renderAjax = function ($objAct) {
  var ajaxConex = new Request.HTML({
    url: $objAct.link,
    method: 'GET',
    onFailure: function($xhr){
      $('content').set ('html', $xhr.responseText);
    },
    onSuccess: function(tree, elems, html, js){
      $($objAct.node_insert).set ('html', html);

      if ($ajaxResponse.action_state == 'ok') {
	if ($ajaxResponse.auto_action == 'close_and_parent_refresh') {
	  $objAct.obj_parent.refreshContent();
	  (function() {
	  $($objAct.node_insert).destroy();
	  $objAct.node_insert = null;
	  }).delay (3000);
	}
      }
    }
  }).send();
}