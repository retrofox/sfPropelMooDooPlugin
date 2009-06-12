<?php
class sfPropelMooDooGenerator extends sfPropelGenerator {
	
  /**
   * Returns getBtnToAction HTML code <li> for an action link.
   *
   * @param string  $actionName     The action name
   * @param array   $params         The parameters
   * @param boolean $pk_link        Whether to add a primary key link or not
   * @param string  $class_suffix   Sufijo de clase para conformar el nombre sf_admin_actions_$class_suffix
   * @param string  $icnClass       Clase css agregada al odo hijo que funciona como icono del boton
   * @param string  $tagHtmlParent  Tag HTML padre. Por defecto es un li
   * @param string  $tagHtmlChild   Tag HTML Hijo. Por defecto es un div
   *
   * @return string HTML code
   */
  public function getBtnToAction($actionName, $params, $pk_link = false, $class_suffix, $tagHtmlParent = 'li', $tagHtmlChild = 'div', $btnClass='btn_admin_actions')
  {

  	// Definimos propiedad del boton en funcion de inWinPopUp=true 
  	if (isset ($params['inWinPopUp'])) {
  		if ($params['inWinPopUp']) {
  			$isAjaxBtn = 'ajax_btn_to ';
  			$actionToButtom = 'ajax_link';

  			$arr2Json = array ('update'=> 'vtn-'.$this->getModuleName().'-index');
			$ajaxOptions = json_encode($arr2Json);
			$ajaxOptions = str_ireplace("\"", "\'", $ajaxOptions);
			$ajaxOptions = 'options="'.$ajaxOptions.'" ';

  		}
  		else {
  			$isAjaxBtn = '';
  			$actionToButtom = 'enlace';
  			$ajaxOptions = '';
  		}
  	}
  	
    $action = isset($params['action']) ? $params['action'] : 'List'.sfInflector::camelize($actionName);
    $url_params = $pk_link ? '?'.$this->getPrimaryKeyUrlParams() : '\'';
    return '[?php echo \'<'.$tagHtmlParent.' '.$ajaxOptions.' '.$actionToButtom.'="\'.url_for(\''.$this->getModuleName().'/'.$action.$url_params.', '.$this->asPhp($params['params']).', \''.$this->getI18nCatalogue().'\').\'" class="'.$isAjaxBtn.'sf_admin_actions_'.$class_suffix.' '.$btnClass.'"><'.$tagHtmlChild.' class="icn icn-'.$class_suffix.'"></'.$tagHtmlChild.'>\'.__(\''.$params['label'].'\').\'</'.$tagHtmlParent.'>\' ?]';
  }

  public function getBtnToTdAction($actionName, $params, $pk_link = false, $class_suffix, $tagHtmlParent = 'li', $tagHtmlChild = 'div', $btnClass='btn_object_action')
  {
  	$action = isset($params['action']) ? $params['action'] : 'List'.sfInflector::camelize($actionName);
    $url_params = $pk_link ? '?'.$this->getPrimaryKeyUrlParams() : '\'';
    return '[?php echo \'<'.$tagHtmlParent.' enlace="\'.url_for(\''.$this->getModuleName().'/'.$action.$url_params.', '.$this->asPhp($params['params']).', \''.$this->getI18nCatalogue().'\').\'" class="sf_admin_td_actions_'.$class_suffix.' btn_admin_td_actions '.$btnClass.'"><'.$tagHtmlChild.' class="icn icn-'.$class_suffix.'"></'.$tagHtmlChild.'>\'.__(\''.$params['label'].'\').\'</'.$tagHtmlParent.'>\' ?]';
  }

  public function getAjaxBtnToTdAction($actionName, $params, $pk_link = false, $class_suffix, $tagHtmlParent = 'li', $tagHtmlChild = 'div', $btnClass='btn_object_action')
  {
  	$action = isset($params['action']) ? $params['action'] : 'List'.sfInflector::camelize($actionName);
    $url_params = $pk_link ? '?'.$this->getPrimaryKeyUrlParams() : '\'';
    

    $arrJson = array ('update'=> 'vtn-'.$this->getModuleName().'-index');
    
	$options = json_encode($arrJson);
	$options = str_ireplace("\"", "\'", $options);

    return '[?php echo \'<'.$tagHtmlParent.' options="'.$options.'" ajax_link="'.$this->getModuleName().'/'.$action.$url_params.'.\'" class="sf_admin_td_actions_'.$class_suffix.' ajax_btn_to '.$btnClass.'"><'.$tagHtmlChild.' class="icn icn-'.$class_suffix.'"></'.$tagHtmlChild.'>\'.__(\''.$params['label'].'\').\'</'.$tagHtmlParent.'>\' ?]';

    // Original
    //return '[?php echo link_to(__(\''.$params['label'].'\'), \''.$this->getModuleName().'/'.$action.$url_params.', '.$this->asPhp($params['params']).', \''.$this->getI18nCatalogue().'\') ?]';
  }
}