  public function executeDelete(sfWebRequest $request)
  {
    $request->checkCSRFProtection();

    $this->dispatcher->notify(new sfEvent($this, 'admin.delete_object', array('object' => $this->getRoute()->getObject())));

    $this->getRoute()->getObject()->delete();

    $this->getUser()->setFlash('notice-<?php echo $this->getModuleName() ?>-edit', 'The item was deleted successfully.');

    // Modificamos comportamiento si es AJAX
    if ($this->getRequest()->isXmlHttpRequest()) {
        $this->getUser()->setFlash('action2Notice', 'window.reload');
        return $this->renderPartial('<?php echo $this->getModuleName() ?>/item_deleted');
    }
    else $this->redirect('@<?php echo $this->getUrlForAction('list') ?>');
  }
