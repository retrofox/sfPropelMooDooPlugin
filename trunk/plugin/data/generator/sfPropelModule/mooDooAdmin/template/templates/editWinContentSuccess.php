[?php include_partial('<?php echo $this->getModuleName() ?>/feedback_editWin') ?]
[?php use_helper('I18N', 'Date') ?]

[?php include_stylesheets_for_form($form) ?]
[?php include_javascripts_for_form($form) ?]

  <div id="flashes_<?php echo $this->getModuleName() ?>" class="win_flashes">
    [?php include_partial('<?php echo $this->getModuleName() ?>/flashesEdit') ?]
  </div>

[?php echo form_tag_for($form, '@<?php echo $this->params['route_prefix'] ?>') ?]

    [?php echo $form->renderHiddenFields() ?]

    [?php if ($form->hasGlobalErrors()): ?]
      [?php echo $form->renderGlobalErrors() ?]
    [?php endif; ?]

    [?php foreach ($configuration->getFormFields($form, $form->isNew() ? 'new' : 'edit') as $fieldset => $fields): ?]
      [?php include_partial('<?php echo $this->getModuleName() ?>/form_fieldset', array('<?php echo $this->getSingularName() ?>' => $<?php echo $this->getSingularName() ?>, 'form' => $form, 'fields' => $fields, 'fieldset' => $fieldset)) ?]
    [?php endforeach; ?]

    [?php include_partial('<?php echo $this->getModuleName() ?>/form_actionsWin', array('<?php echo $this->getSingularName() ?>' => $<?php echo $this->getSingularName() ?>, 'form' => $form, 'configuration' => $configuration, 'helper' => $helper)) ?]
</form>
