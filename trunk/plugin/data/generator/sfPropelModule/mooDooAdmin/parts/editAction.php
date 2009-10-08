  public function executeEdit(sfWebRequest $request)
  {

    $this->winEdit = array (
      'win' => 'edit_win-<?php echo $this->params['route_prefix'] ?>-[?php echo $<?php echo $this->getSingularName() ?>->getId() ?]'
    );

    $this->winEdit_controller = array (
      'moduleName' => '<?php echo $this->getModuleName() ?>',
      'action' => 'edit'
    );

    $this->winEdit_dims = array (
      'width' => 450,
      'left' => 100,
      'top' => 40
    );

    $this-><?php echo $this->getSingularName() ?> = $this->getRoute()->getObject();
    $this->form = $this->configuration->getForm($this-><?php echo $this->getSingularName() ?>);

    // Ajax Request ?
    if ($this->getRequest()->isXmlHttpRequest()) {
      $this->setTemplate('editWin');

      $this->jsonData4Win = array (
        controller => $this->winEdit_controller,
        win => $this->winEdit,
        dims => $this->winEdit_dims
      );
    }

    // Viene de edicion ?
    if ($request->getParameter('isCommingEdit')=='true') {
      $this->setTemplate('editWinContent');
      $this->setLayout(false);
    }
  }