<script type="text/javascript">
  // JsonData edit
  var $jsonData4Win = new Array ();
  $jsonData4Win = {
    controller: {
      moduleName: '<?php echo $this->getModuleName() ?>',
      action: 'new'},
    node: {
      win: 'winWin_<?php echo $this->params['route_prefix'] ?>_[?php echo $<?php echo $this->getSingularName() ?>->getId() ?]'
    },
    dims: {
      width: 450,
      left: 100,
      top: 40
    }
  };

// Actions
var $actions = new Array ();
$actions = [
  [?php include_partial('<?php echo $this->getModuleName() ?>/data_json-edit_or_new-actions', array('<?php echo $this->getSingularName() ?>' => $<?php echo $this->getSingularName() ?>, 'form' => $form, 'configuration' => $configuration, 'helper' => $helper)) ?]
]

</script>