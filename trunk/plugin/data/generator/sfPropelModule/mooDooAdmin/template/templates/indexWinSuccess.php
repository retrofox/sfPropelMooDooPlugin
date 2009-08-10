[?php use_helper('I18N', 'Date', 'mooDooUrl') ?]
[?php include_partial('<?php echo $this->getModuleName() ?>/assets_list') ?]


<div id="list_win-<?php echo $this->getModuleName() ?>" class="win <?php echo $this->getModuleName() ?>-index">
  <div class="block_win"></div>
  [?php include_partial('<?php echo $this->getModuleName()?>/winHandle', array ('title' => <?php echo $this->getI18NString('list.title') ?>)) ?]

  <div id="embWins-iWin-<?php echo $this->getModuleName() ?>"></div>

  [?php include_partial('<?php echo $this->getModuleName() ?>/flashes') ?]

  <div class="sf_admin_conten win_container">

    <div class="win_bar bar_menu">
      <?php if ($this->configuration->hasFilterForm()): ?>
        <a href="#" title="Filtro" >Filtro</a>
      <?php endif; ?>

      <div class="wins_bar">
      <?php if ($this->configuration->hasFilterForm()): ?>
        [?php include_partial('<?php echo $this->getModuleName() ?>/win_filters', array('form' => $filters, 'configuration' => $configuration)) ?]
      <?php endif; ?>
      </div>

    </div>

    <div id="sf_admin_content">
      <?php // Usamos este formulario eventualmente para las acciones de las list_td_actions. No usamos el metodo de symfony intrusivo. ?>
      <form id="sf_admin_list_form_method-<?php echo $this->getModuleName() ?>" class="hiddenForm" method="post">
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
</div>

[?php include_partial('<?php echo $this->getModuleName() ?>/data_json-list', array ('jsonData4Win' => $jsonData4Win, 'pager' => $pager, 'helper' => $helper)) ?]