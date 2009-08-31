[?php use_helper('I18N', 'Date') ?]

<div id="edit_win-<?php echo $this->params['route_prefix'] ?>-[?php echo <?php echo $this->getPKeysStringIdentifiers() ?> ?]" class="win">
  <div class="block_win"></div>
  [?php include_partial('<?php echo $this->getModuleName()?>/winHandle', array ('title' => <?php echo $this->getI18NString('edit.title') ?>)) ?]

  <div class="sf_admin_form win_content">
    [?php include_partial('<?php echo $this->getModuleName() ?>/formWin', array('<?php echo $this->getSingularName() ?>' => $<?php echo $this->getSingularName() ?>, 'form' => $form, 'configuration' => $configuration, 'helper' => $helper)) ?]
  </div>
</div>

[?php include_partial('<?php echo $this->getModuleName() ?>/data_json-edit', array('<?php echo $this->getSingularName() ?>' => $<?php echo $this->getSingularName() ?>, 'form' => $form, 'configuration' => $configuration, 'helper' => $helper)) ?]

[?php if ($sf_request->getParameter('isCommingEdit') == 'true') : ?>
  <script type="text/javascript">
  $flashEditResponse = new Array ();
  $flashEditResponse = {
    action_state: 'ok',
    was_new: true
  }
  </script>
  [?php endif; ?]