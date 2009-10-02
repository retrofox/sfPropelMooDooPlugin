  public function executeIndex(sfWebRequest $request)
  {
    // sorting
    if ($request->getParameter('sort'))
    {
      $this->setSort(array($request->getParameter('sort'), $request->getParameter('sort_type')));
    }

    // pager
    if ($request->getParameter('page'))
    {
      $this->setPage($request->getParameter('page'));
    }

    $this->pager = $this->getPager();
    $this->sort = $this->getSort();


    $this->jsonData4Win = array (
      'controller' => array (
        'moduleName' => 'compras'
      )
    );

    // Only List ?
    if ($request->hasParameter('only_list')) {
      if ($request->getParameter('only_list')) {
        return $this->renderPartial('<?php echo $this->getModuleName() ?>/win_list_content', array ('pager' => $this->pager, 'sort' => $this->sort, 'helper' => $this->helper, 'only_list' => true));
      }
    }

    // Ajax Request ?
    if ($this->getRequest()->isXmlHttpRequest()) {

      $this->jsonData4Win = array (
        controller => <?php echo $this->getGeneratedModuleName() ?>Actions::$controller,
        win => <?php echo $this->getGeneratedModuleName() ?>Actions::$win,
        dims => <?php echo $this->getGeneratedModuleName() ?>Actions::$dims
      );

      if ($request->getParameter('win_container')) {
        $this->setTemplate('indexWinContent');
      }
      else {
        $this->setTemplate('indexWin');
      };
    }
  }