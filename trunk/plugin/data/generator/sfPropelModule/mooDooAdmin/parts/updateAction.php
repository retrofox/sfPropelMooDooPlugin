  public function executeUpdate(sfWebRequest $request)
  {
    $this-><?php echo $this->getSingularName() ?> = $this->getRoute()->getObject();
    $this->form = $this->configuration->getForm($this-><?php echo $this->getSingularName() ?>);

    $this->processForm($request, $this->form);

	// Ojo aca ... no se si es lo mejor
    if ($this->getRequest()->isXmlHttpRequest()) $this->setTemplate('editWinContent');
  }
