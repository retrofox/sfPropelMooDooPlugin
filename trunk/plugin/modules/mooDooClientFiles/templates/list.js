var $wins = new Array ();
var $win_now;

var renderAjaxWin = function ($objAct, $ev) {
  $win_now = $objAct.objParent;
  if (!$wins.contains ($objAct.link)) {
    var $editWin = new mooWin.sfPropelEdit ({
      obj_parent: $objAct.objParent,
      id: $objAct.link,
      node_insert: $objAct.node_insert,
      linkLoad: $objAct.link,
      linkLoadContent: $objAct.link_content
    });
    $wins.push($objAct.link);
  }
}

var renderAjaxEditWin = function ($objAct, $ev) {

  console.debug ($objAct);

  $win_now = $objAct.obj_parent;

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
  }
}

var renderAjaxNewWin = function ($objAct, $ev) {
  $win_now = $objAct.objParent;
  $ev.stop();
  if (!$wins.contains ($objAct.link)) {
    $newWin = new mooWin.sfPropelNew ({
      obj_parent: $wins,
      id: $objAct.link,
      node_insert: $objAct.node_insert,
      linkLoad: $objAct.link,
      linkLoadContent: $objAct.link_content
    });

    $wins.push ($objAct.link);
  }
}

var renderAjaxListWin = function ($objAct, $ev) {
  $win_now = $objAct.objParent;

  $ev.stop();
  if (!$wins.contains ($objAct.link)) {
    var $listWin = new mooWin.sfPropelList ({
      obj_parent: $wins,
      id: $objAct.link,
      node_insert: $objAct.node_insert,
      linkLoad: $objAct.link,
      linkLoadContent: $objAct.link_content
    });

    $wins.push ($objAct.link);
  }
}