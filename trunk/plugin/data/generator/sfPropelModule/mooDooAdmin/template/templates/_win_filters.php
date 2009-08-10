  <?php /*
     <ul class="sf_admin_bar_menu">
      <li class="btn110" id="btnFilterOn"><div class="icn icn-filter"></div>[?php echo __('filter') ?]</li>

      [?php echo moo_btn_to_filters(__('Reset', array(), 'sf_admin'), '<?php echo $this->getUrlForAction('collection') ?>', array('action' => 'filter')) ?]
      </ul>
   */
  ?>

  <?php
      /*  Esto es lo que hacia el boton de reset.
      * Me parece una garcha.
      *
      * (1) Crea un formulario vacio                     var f = document.createElement('form');
      * (2) Lo Esconde                                     f.style.display = 'none';
      * (3) Lo agrega en un nodo paralelo al acual         this.parentNode.appendChild(f);
      * (4) Define el metodo de envio de datos             f.method = 'POST';
      * (5) Define el action con la URI actual             .action = this.href;
      * (6) Lo envia                                       f.submit();
      * (7) Deshabilita el link del anchor                 return false;
      */
  ?>


<div class="sf_admin_filter win green">
	  [?php if ($form->hasGlobalErrors()): ?]
	    [?php echo $form->renderGlobalErrors() ?]
	  [?php endif; ?]
  <form action="[?php echo url_for('<?php echo $this->getUrlForAction('collection') ?>', array('action' => 'filter')) ?]" method="post">
	        [?php foreach ($configuration->getFormFilterFields($form) as $name => $field): ?]
                <div class="filter_block">
	        [?php if ((isset($form[$name]) && $form[$name]->isHidden()) || (!isset($form[$name]) && $field->isReal())) continue ?]
	          [?php include_partial('<?php echo $this->getModuleName() ?>/filters_field', array(
	            'name'       => $name,
	            'attributes' => $field->getConfig('attributes', array()),
	            'label'      => $field->getConfig('label'),
	            'help'       => $field->getConfig('help'),
	            'form'       => $form,
	            'field'      => $field,
	            'class'      => 'sf_admin_form_row sf_admin_'.strtolower($field->getType()).' sf_admin_filter_field_'.$name,
	          )) ?]
                </div>
	        [?php endforeach; ?]

	      [?php echo $form->renderHiddenFields() ?]
  </form>

    <div class="bar_menu filter_btns">
      <a href="#" title="Filtro" >Filtrar</a>
      <a href="#" title="Filtro" >Limpiar</a>
      <a href="#" title="Filtro" >Cancelar</a>
    </div>

</div>