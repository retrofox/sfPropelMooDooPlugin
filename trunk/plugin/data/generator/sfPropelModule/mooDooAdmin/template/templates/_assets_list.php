[?php use_javascript('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_js_dir').'/moo.js' ?>', 'first') ?]
[?php use_javascript('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_js_dir').'/moo-more.js' ?>', 'first') ?]

<?php if (isset($this->params['css'])): ?>
    [?php use_stylesheet('<?php echo $this->params['css'] ?>', 'first') ?]
<?php else: ?>
    [?php use_stylesheet('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_css_dir').'/global.css' ?>', 'first') ?]
    [?php use_stylesheet('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_css_dir').'/list.css' ?>', 'first') ?]

    [?php use_javascript('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_js_dir').'/global.js' ?>', 'last') ?]
    [?php use_javascript('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_js_dir').'/dxd-1.2.class.js' ?>', 'last') ?]
    [?php use_javascript('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_js_dir').'/doors.js' ?>', 'last') ?]
    [?php use_javascript('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_js_dir').'/list.js' ?>', 'last') ?]
<?php endif; ?>

[?php use_stylesheet('<?php echo sfConfig::get('sf_project_css_dir').'/css/'.$this->getModuleName().'.css' ?>', 'last') ?]
