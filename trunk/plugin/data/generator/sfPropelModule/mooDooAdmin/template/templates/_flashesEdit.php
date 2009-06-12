[?php
	$action2ButtomNotice = (!$sf_user->hasFlash('action2Notice')) ? 'action2Buttom = ""' : 'action2Buttom = "'.$sf_user->getFlash('action2Notice').'"';
	$params2Notice = (!$sf_user->hasFlash('params2Notice')) ? '' : ' params2Buttom = "'.$sf_user->getFlash('params2Notice').'"';
	
	$action2ButtomError = (!$sf_user->hasFlash('action2Error')) ? 'action2Buttom = ""' : 'action2Buttom = "'.$sf_user->getFlash('action2Error').'"';
	$params2Error = (!$sf_user->hasFlash('params2Error')) ? '' : ' params2Buttom = "'.$sf_user->getFlash('params2Error').'"';
?]

[?php if ($sf_user->hasFlash('notice-<?php echo $this->getModuleName() ?>-edit')): ?]
  <div class="win_notice">
    <div class="notice_msg">[?php echo __($sf_user->getFlash('notice-<?php echo $this->getModuleName() ?>-edit'), array(), 'sf_admin') ?]
  		<div id="btn_flash_notice-<?php echo $this->getModuleName() ?>" class="btn_admin_actions" [?php echo $action2ButtomNotice.$params2Notice ?]><div class="icn icn-accept"></div>[?php echo __('close') ?></div>
  	</div>
  </div>
[?php endif; ?]


[?php if ($sf_user->hasFlash('error-<?php echo $this->getModuleName() ?>-edit')): ?]
  <div class="win_error">
    <div class="error_msg">[?php echo __($sf_user->getFlash('error-<?php echo $this->getModuleName() ?>-edit'), array(), 'sf_admin') ?]
  		<div id="btn_flash_error-<?php echo $this->getModuleName() ?>" class="btn_admin_actions" [?php echo $action2ButtomError.$params2Error ?]><div class="icn icn-close"></div>[?php echo __('close') ?></div>
  	</div>
  </div>
[?php endif; ?]