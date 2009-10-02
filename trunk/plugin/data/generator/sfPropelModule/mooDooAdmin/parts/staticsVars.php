// Variables Estaticas
  static public $win = array (
    'nodeId_formMethod'=> 'sf_admin_list_form_method-<?php echo $this->getModuleName() ?>',
    'nodeId_container' => 'sf_admin_container-index-<?php echo $this->getModuleName() ?>',
    'nodeId_winsEmbedded'=> 'embedded_win-<?php echo $this->getModuleName() ?>',
    'obj_parent' => 'this'
  );

  static public $controller = array (
    'moduleName' => 'compra',
    'action' => 'list'
  );

  static public $dims = array (
    'width' => 800,
    'left' => 100,
    'top' => 40
  );



  static public $winEdit = array (
    'win' => 'edit_win-<?php echo $this->params['route_prefix'] ?>-[?php echo $<?php echo $this->getSingularName() ?>->getId() ?]'
  );

  static public $winEdit_controller = array (
    'moduleName' => '<?php echo $this->getModuleName() ?>',
    'action' => 'edit'
  );

  static public $winEdit_dims = array (
    'width' => 450,
    'left' => 100,
    'top' => 40
  );
/******************************************/