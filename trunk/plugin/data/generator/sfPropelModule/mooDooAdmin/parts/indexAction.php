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

    // Ajax Request ?
    if ($this->getRequest()->isXmlHttpRequest()) {

      $this->jsonData4Win = array (
        'controller' => array (
          'moduleName' => 'compra',
          'action' => 'list'
        ),
        win => array (
          'nodeId_formMethod'=> 'sf_admin_list_form_method-<?php echo $this->getModuleName() ?>',
          'nodeId_container' => 'sf_admin_container-index-<?php echo $this->getModuleName() ?>',
          'nodeId_winsEmbedded'=> 'winsEmbedded_index-<?php echo $this->getModuleName() ?>',
          'obj_parent' => 'window'
        ),
        'dims' => array (
          'width' => 800,
          'left' => 100,
          'top' => 40
        )
      );

      if ($request->getParameter('win_container')) {
        $this->setTemplate('indexWinContent');
      }
      else {
        $this->setTemplate('indexWin');
      };
    }

    if ($request->getParameter('isAjax')) return $this->renderPartial('<?php echo $this->getModuleName() ?>/win_list_content', array ('pager' => $this->pager, 'sort' => $this->sort, 'helper' => $this->helper));
  }