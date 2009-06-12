[?php include_partial('<?php echo $this->getModuleName() ?>/feedback_editWin') ?]
[?php use_helper('I18N', 'Date') ?]

<div id="sf_admin_container-<?php echo $this->getModuleName() ?>" class="win">
  [?php include_partial('<?php echo $this->getModuleName()?>/winHandle', array ('title' => <?php echo $this->getI18NString('edit.title') ?>)) ?]
  
  <div class="flashes_<?php echo $this->getModuleName() ?> win_flashes">
    [?php include_partial('<?php echo $this->getModuleName() ?>/flashes') ?]
  </div>

  <div class="sf_admin_form win_content" id="sf_admin_form-<?php echo $this->getModuleName()?>">
    [?php include_partial('<?php echo $this->getModuleName() ?>/formWin', array('<?php echo $this->getSingularName() ?>' => $<?php echo $this->getSingularName() ?>, 'form' => $form, 'configuration' => $configuration, 'helper' => $helper)) ?]
  </div>

    <?php // Usamos este formulario eventualmente para eliminar el objeto/registro. No usamos el metodo intrusivo de symfony. ?>
    <form class="hiddenForm" method="post">
      <input value="delete" name="sf_method" type="hidden">
    </form>
</div>