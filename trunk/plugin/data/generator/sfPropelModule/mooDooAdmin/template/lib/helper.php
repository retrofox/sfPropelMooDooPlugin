[?php

/**
 * <?php echo $this->getModuleName() ?> module configuration.
 *
 * @package    ##PROJECT_NAME##
 * @subpackage <?php echo $this->getModuleName()."\n" ?>
 * @author     ##AUTHOR_NAME##
 * @version    SVN: $Id: helper.php 12482 2008-10-31 11:13:22Z fabien $
 */
class Base<?php echo ucfirst($this->getModuleName()) ?>GeneratorHelper extends sfModelGeneratorHelper
{
  public function linkToNew($params)
  {
    return '<li class="sf_admin_action_new">'.link_to(__($params['label'], array(), 'sf_admin'), $this->getUrlForAction('new')).'</li>';
  }
  
  public function mooLinkToNew($params, $cssClass='btn_admin_actions')
  {
      	if ($params['inWinPopUp']) {
  			$isAjaxBtn = 'ajax_btn_to ';
  			$actionToButtom = 'ajax_link';

  			$arr2Json = array ('update'=> 'vtn-<?php echo $this->getModuleName() ?>-index');
			$ajaxOptions = json_encode($arr2Json);
			$ajaxOptions = str_ireplace("\"", "'", $ajaxOptions);
			$ajaxOptions = 'options="'.$ajaxOptions.'" ';

  		}
  		else {
  			$isAjaxBtn = '';
  			$actionToButtom = 'enlace';
  			$ajaxOptions = '';
  		};
  		
    return '<li '.$ajaxOptions.' class="'.$isAjaxBtn.$cssClass.' sf_admin_action_new" '.$actionToButtom.'="'.url_for($this->getUrlForAction('new')).'"><div class="icn icn-new"></div>'.__($params['label'], array(), 'sf_admin').'</li>';
  }

  public function linkToEdit($object, $params)
  {
    return '<li class="sf_admin_action_edit">'.link_to(__($params['label'], array(), 'sf_admin'), $this->getUrlForAction('edit'), $object).'</li>';
  }

  public function mooLinkToEdit($object, $params, $cssClass='btn_admin_actions', $icnClass = 'icn-edit')
  {
        if ($params['inWinPopUp']) {
  			$isAjaxBtn = 'ajax_btn_to ';
  			$actionToButtom = 'ajax_link';

  			$arr2Json = array ('update'=> 'vtn-<?php echo $this->getModuleName() ?>-index');
			$ajaxOptions = json_encode($arr2Json);
			$ajaxOptions = str_ireplace("\"", "'", $ajaxOptions);
			$ajaxOptions = 'options="'.$ajaxOptions.'" ';

  		}
  		else {
  			$isAjaxBtn = '';
  			$actionToButtom = 'enlace';
  			$ajaxOptions = '';
  		};
  		 
    return '<li '.$ajaxOptions.' class="'.$isAjaxBtn.$cssClass.' sf_admin_action_new" '.$actionToButtom.'="'.url_for($this->getUrlForAction('edit'), $object).'"><div class="icn '.$icnClass.'"></div>'.__($params['label'], array(), 'sf_admin').'</li>';
  }
  
  public function mooAjaxLinkToEdit($object, $params, $cssClass = 'icn-edit')
  {
	    //$arrJson = array ('update'=> 'vtn-'.$this->getModuleName().'-index');
	    echo $this->params['route_prefix'];
/*	    
		$options = json_encode($arrJson);
		$options = str_ireplace("\"", "\'", $options);
*/
    //return '<li class="sf_admin_action_edit" options="'.$options.'" ajax_enlace="'.url_for($this->getUrlForAction('edit'), $object).'"><div class="icn '.$cssClass.'"></div>'.__($params['label'], array(), 'sf_admin').'</li>';
    return '<li class="sf_admin_action_edit" enlace="'.url_for($this->getUrlForAction('edit'), $object).'"><div class="icn '.$cssClass.'"></div>'.__($params['label'], array(), 'sf_admin').'</li>';
  }
  

  public function linkToDelete($object, $params)
  {
    if ($object->isNew())
    {
      return '';
    }

    return '<li class="sf_admin_action_delete">'.link_to(__($params['label'], array(), 'sf_admin'), $this->getUrlForAction('delete'), $object, array('method' => 'delete', 'confirm' => $params['confirm'])).'</li>';
  }

  public function mooLinkToDelete($object, $params, $btnClass='btn_object_action', $icnClass='icn-delete')
  {

    if ($object->isNew())
    {
      return '';
    }

    return '<li class="sf_admin_action_delete '.$btnClass.'" msg="'.$params['confirm'].'" link_delete="'.url_for($this->getUrlForAction('delete'), $object).'"><div class="icn '.$icnClass.'"></div>'.__($params['label'], array(), 'sf_admin').'</li>';
  }


  public function linkToList($params)
  {
    return '<li class="sf_admin_action_list">'.link_to(__($params['label'], array(), 'sf_admin'), $this->getUrlForAction('list')).'</li>';
  }

  public function mooLinkToList($params, $cssClass="btn_admin_actions", $icnClass='icn-delete')
  {
    return '<li class="sf_admin_action_list '.$cssClass.'" enlace="'.url_for($this->getUrlForAction('list')).'"><div class="icn icn-'.$params['label'].'"></div>'.__($params['label'], array(), 'sf_admin').'</li>';
  }

  public function mooLinkToCancel($params, $cssClass="btn_admin_actions", $icnClass='icn-delete')
  {
    return '<li class="sf_admin_action_cancel '.$cssClass.'" enlace="vtnClose"><div class="icn icn-'.$params['label'].'"></div>'.__($params['label'], array(), 'sf_admin').'</li>';
  }

  public function linkToSave($object, $params)
  {
    return '<li class="sf_admin_action_save"><input type="submit" value="'.__($params['label'], array(), 'sf_admin').'" /></li>';
  }

  public function mooLinkToSave($object, $params, $cssClass="btn_admin_actions", $icnClass = 'icn-save')
  {
    return '<li class="sf_admin_action_save '.$cssClass.'" link_save="save"><div class="icn '.$icnClass.'"></div>'.__($params['label'], array(), 'sf_admin').'</li>';
  }

  public function linkToSaveAndAdd($object, $params)
  {
    if (!$object->isNew())
    {
      return '';
    }

    return '<li class="sf_admin_action_save_and_add"><input type="submit" value="'.__($params['label'], array(), 'sf_admin').'" name="_save_and_add" /></li>';
  }

  public function getUrlForAction($action)
  {
    return 'list' == $action ? '<?php echo $this->params['route_prefix'] ?>' : '<?php echo $this->params['route_prefix'] ?>_'.$action;
  }
}
