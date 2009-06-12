<?php
class sfPropelMooDooAdminGenerator extends sfAdminGenerator {

   /**
   * Returns PHP code to add to a URL for primary keys.
   *
   * @param string $prefix The prefix value
   *
   * @return string PHP code
   */
  public function getPrimaryKeyUrlParams($prefix = '', $full = false)
  {
    $params = array();
    foreach ($this->getPrimaryKey() as $pk)
    {
      $phpName   = $pk->getPhpName();
      $fieldName = sfInflector::underscore($phpName);
      if ($full)
      {
        $params[]  = "$fieldName='.".$prefix.'->'.$this->getColumnGetter($pk, false).'()';
      }
      else
      {
        $params[]  = "$fieldName='.".$this->getColumnGetter($pk, true, $prefix);
      }
    }

    return implode(".'&", $params);
  }
}