[?php if ($sf_user->hasFlash('notice-<?php echo $this->getModuleName() ?>-edit')): ?]
<div class="notice_msg">
  [?php echo __($sf_user->getFlash('notice-<?php echo $this->getModuleName() ?>-edit'), array(), 'sf_admin') ?]
</div>

  <script type="text/javascript">
  $flashEditResponse = new Array ();
  $flashEditResponse = {
    action_state: 'ok'
  }
  </script>

[?php endif; ?]

[?php if ($sf_user->hasFlash('error-<?php echo $this->getModuleName() ?>-edit')): ?]
<div class="error_msg">
  [?php echo __($sf_user->getFlash('error-<?php echo $this->getModuleName() ?>-edit'), array(), 'sf_admin') ?]
</div>

  <script type="text/javascript">
  $flashEditResponse = new Array ();
  $flashEditResponse = {
    action_state: 'error'
  }
  </script>
[?php endif; ?]