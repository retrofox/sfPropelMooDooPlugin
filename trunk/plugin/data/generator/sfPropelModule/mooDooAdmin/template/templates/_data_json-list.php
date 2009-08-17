<script type="text/javascript">
  // JsonData list
  var $jsonData4Win = new Array ();
  $jsonData4Win = [?php echo json_encode($jsonData4Win) ?]

 var $jsonDataBarMenuList = new Array ();
    $jsonDataBarMenuList = [
      {execute: 'this.optFilter'}
    ]

  var $jsonDataFilter = new Array ();
    $jsonDataFilter = [
      {filter: 'filter'},
      {action: '[?php echo moo_json_data_link_to_filters(__('Reset', array(), 'sf_admin'), '<?php echo $this->getUrlForAction('collection') ?>', array('action' => 'filter')) ?]'},
      {cancel: 'cancel'}
    ];

// JsonData Actions list
  var $jsonDataObjActionsList = new Array ();
    $jsonDataObjActionsList = {
      global: {
        update: '_new'
      },
      objects: [
  [?php foreach ($pager->getResults() as $i => $<?php echo $this->getSingularName() ?>): ?]
  <?php if ($this->configuration->getValue('list.object_actions')): ?>
    [?php include_partial('<?php echo $this->getModuleName() ?>/data_json-list_actions', array('<?php echo $this->getSingularName() ?>' => $<?php echo $this->getSingularName() ?>, 'helper' => $helper, 'line' => $i)) ?]
  <?php endif; ?>
  [?php endforeach; ?]
 ]};

// JsonData Actions
var $jsonDataActionsList = new Array ();
$jsonDataActionsList = [
<?php if ($actions = $this->configuration->getValue('list.actions')): ?>
<?php foreach ($actions as $name => $params): ?>
<?php if ('_new' == $name): ?>
  <?php echo $this->addCredentialCondition('[?php echo $helper->mooJsonDataToNew('.$this->asPhp($params).') ?]', $params) ?>
<?php endif; ?>
<?php endforeach; ?>
<?php endif; ?>
 ]

</script>