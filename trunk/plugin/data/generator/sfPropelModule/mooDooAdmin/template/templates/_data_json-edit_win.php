  // JsonData editWin
  var $jsonData4Win = new Array ();
  $jsonData4Win = {
    controller: {
      moduleName: '<?php echo $this->getModuleName() ?>',
      action: 'edit'},
    node: {
      win: 'edit_win-<?php echo $this->params['route_prefix'] ?>-[?php echo $<?php echo $this->getSingularName() ?>->getId() ?]'
    },
    dims: {
      width: 450,
      left: 100,
      top: 40
    }
  };
