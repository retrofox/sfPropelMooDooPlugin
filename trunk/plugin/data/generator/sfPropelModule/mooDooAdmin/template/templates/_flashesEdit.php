[?php if ($sf_user->hasFlash('notice-<?php echo $this->getModuleName() ?>-edit')): ?]
<div class="win_notice" id="flash_win-<?php echo $this->params['route_prefix'] ?>-[?php echo <?php echo $this->getPKeysStringIdentifiers() ?> ?]">
  <div class="notice_msg">[?php echo __($sf_user->getFlash('notice-<?php echo $this->getModuleName() ?>-edit'), array(), 'sf_admin') ?]
    <div class="btn_admin_actions"><div class="icn icn-accept"></div>[?php echo __('close') ?]</div>
    <div class="btn_admin_actions"><div class="icn icn-accept"></div>[?php echo __('reedit') ?]</div>
  </div>
</div>

  <script type="text/javascript">
  $flashEditResponse = new Array ();
  [?php if($sf_user->getFlash('isNew')) : ?]
  $flashEditResponse = {
    'flash_win': {
      'node': 'flash_win-<?php echo $this->params['route_prefix'] ?>-[?php echo <?php echo $this->getPKeysStringIdentifiers() ?> ?]'
    },
    'actionToButtons': [
      [?php echo $helper->mooJsonDataFlashToCloseAndRefresh () ?]
      [?php echo $helper->mooJsonDataFlash2ReEditANew ($<?php echo $this->getSingularName() ?>) ?]
    ]
  }
  [?php else: ?]
  $flashEditResponse = {
    'flash_win': {
      'node': 'flash_win-<?php echo $this->params['route_prefix'] ?>-[?php echo <?php echo $this->getPKeysStringIdentifiers() ?> ?]'
    },
    'actionToButtons': [
      [?php echo $helper->mooJsonDataFlashToCloseAndRefresh () ?]
      [?php echo $helper->mooJsonDataFlashToClose () ?]
    ]
  }  
  [?php endif; ?]

  </script>

[?php endif; ?]

[?php if ($sf_user->hasFlash('error-<?php echo $this->getModuleName() ?>-edit')): ?]
<div class="win_error" id="flash_win-<?php echo $this->params['route_prefix'] ?>">
  <div class="error_msg">[?php echo __($sf_user->getFlash('error-<?php echo $this->getModuleName() ?>-edit'), array(), 'sf_admin') ?]
    <div class="btn_admin_actions"><div class="icn icn-close"></div>[?php echo __('close') ?]</div>
  </div>
</div>

  <script type="text/javascript">
  $flashEditResponse = new Array ();
  $flashEditResponse = {
    'flash_win': {
      'node': 'flash_win-<?php echo $this->params['route_prefix'] ?>'
    },
    'actionToButtons': [
      [?php echo $helper->mooJsonDataFlashToClose () ?]
    ]
  }
  </script>
[?php endif; ?]