[?php use_javascript('<?php echo '/mooDoo/moo-123.js' ?>', 'first') ?]
[?php use_javascript('<?php echo '/mooDoo/moo-more-123.js' ?>', 'first') ?]
[?php use_javascript('<?php echo '/mooDoo/sfMoo-global.js' ?>', 'last') ?]
[?php //use_javascript('<?php echo '/mooDoo/list.js' ?>', 'last') ?]
[?php use_javascript('<?php echo '/mooDoo/sfMooWin_class.js' ?>', 'last') ?]
[?php //use_javascript('<?php echo '/mooDoo/doors.js' ?>', 'last') ?]

[?php use_javascript('<?php echo '/mooDoo/'.$this->getModuleName().'/data_json-list.json' ?>', 'first') ?]

<?php if (isset($this->params['css'])): ?>
    [?php use_stylesheet('<?php echo $this->params['css'] ?>', 'first') ?]
<?php else: ?>
    [?php use_stylesheet('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_css_dir').'/global.css' ?>', 'first') ?]
    [?php use_stylesheet('<?php echo sfConfig::get('app_sfPropelMooDooPlugin_css_dir').'/list.css' ?>', 'first') ?]
<?php endif; ?>

[?php use_stylesheet('<?php echo sfConfig::get('sf_project_css_dir').'/css/'.$this->getModuleName().'.css' ?>', 'last') ?]
