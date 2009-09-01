  public function executeEdit(sfWebRequest $request)
  {
    $this-><?php echo $this->getSingularName() ?> = $this->getRoute()->getObject();
    $this->form = $this->configuration->getForm($this-><?php echo $this->getSingularName() ?>);

    // Ajax Request ?
    if ($this->getRequest()->isXmlHttpRequest() OR $request->getParameter('isCommingEdit')=='true') {
      $this->setTemplate('editWin');
    }
  }