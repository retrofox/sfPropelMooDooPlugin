[?php use_helper('I18N', 'Date', 'mooDooUrl') ?]
[?php include_partial('<?php echo $this->getModuleName() ?>/assets_list') ?]
<div  options="{'box': '500x400x50x50'}" id="vtn-<?php echo $this->getModuleName() ?>-index" class="vtnPopUp"></div>

<div id="sf_admin_container" class="sf_admin_container <?php echo $this->getModuleName() ?>-index">
  [?php include_partial('<?php echo $this->getModuleName() ?>/flashes') ?]

  <div id="sf_admin_header">
    [?php include_partial('<?php echo $this->getModuleName() ?>/list_header', array('pager' => $pager)) ?]
  </div>

<?php if ($this->configuration->hasFilterForm()): ?>
  <div id="sf_admin_bar">
    <div id="sf_filter_admin_bar">
      [?php include_partial('<?php echo $this->getModuleName() ?>/filters', array('form' => $filters, 'configuration' => $configuration)) ?]
    </div>
  </div>
<?php endif; ?>

  <div id="sf_admin_content">
  <?php // Usamos este forulario eventualmente para las acciones de las list_td_actions. No usamos el metodo de symfony intrusivo. ?>
    <form id="sf_admin_list_td_actions_form" method="post">
      <input value="delete" name="sf_method" type="hidden">
    </form>
  
  
<?php if ($this->configuration->getValue('list.batch_actions')): ?>
    <form id="sf_admin_content_form" action="[?php echo url_for('<?php echo $this->getUrlForAction('collection') ?>', array('action' => 'batch')) ?]" method="post">
<?php endif; ?>
    [?php include_partial('<?php echo $this->getModuleName() ?>/list', array('pager' => $pager, 'sort' => $sort, 'helper' => $helper)) ?]
    <ul class="sf_admin_actions">
      [?php include_partial('<?php echo $this->getModuleName() ?>/list_batch_actions', array('helper' => $helper)) ?]
      [?php include_partial('<?php echo $this->getModuleName() ?>/list_actions', array('helper' => $helper)) ?]
    </ul>
<?php if ($this->configuration->getValue('list.batch_actions')): ?>
    </form>
<?php endif; ?>
  </div>

  <div id="sf_admin_footer">
    [?php include_partial('<?php echo $this->getModuleName() ?>/list_footer', array('pager' => $pager)) ?]
  </div>
</div>
