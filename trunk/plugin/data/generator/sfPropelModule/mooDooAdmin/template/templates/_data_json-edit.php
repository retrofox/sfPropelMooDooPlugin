<script type="text/javascript">
  // JsonData edit
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
    },
    actions: [
      [?php include_partial('<?php echo $this->getModuleName() ?>/data_json-edit_or_new-actions', array('<?php echo $this->getSingularName() ?>' => $<?php echo $this->getSingularName() ?>, 'form' => $form, 'configuration' => $configuration, 'helper' => $helper)) ?]
    ]
  };
</script>