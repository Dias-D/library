<?php

namespace Fuel\Tasks;

class Alert {

    protected static $notifications = array(
        'warning' => array(),
        'control' => array(),
        'specification' => array()
    );

    public static function run()
    {
        $html = \View::forge('main/index', array(), false)->render();

        $rows = static::getRowsToAlert();

        if (count($rows)) {
            foreach ($rows as $row) {
                static::readVarLimits($row);
            }

            /* if (count(static::$notifications['warning'])) {
              static::sendMessage(static::$notifications['warning'], 'Alerta');
              }
              if (count(static::$notifications['control'])) {
              static::sendMessage(static::$notifications['control'], 'Controle');
              } */

            if (count(static::$notifications['specification'])) {
                static::sendMessage(static::$notifications['specification'], 'Especificação');
            }
        }
    }

    protected static function readVarLimits($varData)
    {
        $limits_to_alert = unserialize($varData['limits_to_alert']);

        if (empty($limits_to_alert)) {
            return false;
        }

        $varLimits = array_intersect_key($varData, $limits_to_alert);

        // If not exists limits, continue
        if (empty($varLimits)) {
            return false;
        }

        $emails = unserialize($varData['emails_to_alert']);

        foreach ($varLimits as $key => $limitValue) {
            switch ($key) {
                /* case 'usl':
                  if (($varData['variable_value'] > $varData['usl'])) {
                  static::setLimits($varData, 'specification', $varData['usl'], $varData['lsl'], 'usl', $emails['specification']);
                  }
                  break;

                  case 'ucl':
                  if (($varData['variable_value'] > $varData['ucl'])) {
                  static::setLimits($varData, 'control', $varData['ucl'], $varData['lcl'], 'ucl', $emails['control']);
                  }
                  break;

                  case 'uwl':
                  if (($varData['variable_value'] > $varData['uwl'])) {
                  static::setLimits($varData, 'warning', $varData['uwl'], $varData['lwl'], 'uwl', $emails['warning']);
                  }
                  break;

                  case 'lwl':
                  if (($varData['variable_value'] < $varData['lwl'])) {
                  static::setLimits($varData, 'warning', $varData['uwl'], $varData['lwl'], 'lwl', $emails['warning']);
                  }
                  break;

                  case 'lcl':
                  if (($varData['variable_value'] < $varData['lcl'])) {
                  static::setLimits($varData, 'control', $varData['ucl'], $varData['lcl'], 'lcl', $emails['control']);
                  }
                  break; */

                case 'usl':
                case 'lsl':
                    if (($varData['variable_value'] < $varData['lsl']) || ($varData['variable_value'] > $varData['usl'])) {
                        static::setLimits($varData, 'specification', $varData['usl'], $varData['lsl'], 'lsl', $emails['specification']);
                    }
                    break;
            }
        }
    }

    /**
     * Set linits
     * 
     * @param int $recipeId
     * @param array $varData
     */
    protected static function setLimits($varData, $notificationType, $upperLimit, $lowerLimit, $limitName, $email)
    {
        $groupingKey = $varData['grouping_key'];

        if (isset(static::$notifications[$notificationType][$groupingKey])) {
            static::$notifications[$notificationType][$groupingKey]['vars'][] = array(
                'name' => $varData['variable'],
                'value' => $varData['variable_value'],
                'lower' => $lowerLimit,
                'upper' => $upperLimit,
                'time' => $varData['variable_date'],
                'limit' => $limitName,
                'grouping_key' => $varData['grouping_key'],
                'variable_tag_id' => $varData['variable_tag_id'],
            );
        } else {
            static::$notifications[$notificationType][$groupingKey] = array(
                'production_line' => $varData['production_line'],
                'machine' => $varData['machine'],
                'recipe_name' => $varData['recipe'],
                'emails' => $email,
                'grouping_key' => $groupingKey,
                'vars' => array(
                    array(
                        'name' => $varData['variable'],
                        'value' => $varData['variable_value'],
                        'lower' => $lowerLimit,
                        'upper' => $upperLimit,
                        'time' => $varData['variable_date'],
                        'limit' => $limitName,
                        'grouping_key' => $varData['grouping_key'],
                        'variable_tag_id' => $varData['variable_tag_id'],
                    )
                )
            );
        }
    }

    protected static function getRowsToAlert()
    {
        $q = '
            SELECT
                pl.name production_line,
                m.name machine,
                r.id recipe_id,
                r.name recipe,
                r.emails_to_alert,
                vt.name variable,
                aq.date variable_date,
                aq.value variable_value,
                aq.grouping_key,
                aq.variable_tag_id,
                rd.lsl,
                rd.lcl,
                rd.lwl,
                rd.uwl,
                rd.ucl,
                rd.usl,
                rd.limits_to_alert
            FROM
                alert_queue aq
            INNER JOIN recipe r
                ON r.id = aq.recipe_id
            INNER JOIN recipe_data rd
                ON rd.recipe_id = r.id and  aq.variable_tag_id = rd.variable_tag_id
            INNER JOIN variable_tag vt
                ON rd.variable_tag_id = vt.id
            INNER JOIN machine m
                ON m.id = r.machine_id
            INNER JOIN production_line pl
                ON pl.id = m.production_line_id
            where 
                sent = 0
                
        ';

        $result = \DB::query($q)->execute();
        return $result->as_array();
    }

    protected static function sendMessage($data, $notificationType)
    {
        foreach ($data as $item) {
            $emails = array_map('trim', explode(',', $item['emails']));

            if (!count($emails)) {
                continue;
            }

            $tplData = array(
                'varData' => $item,
                'notificationType' => $notificationType,
            );

            $html = \View::forge('email/alert', $tplData, false)->render();

            \Package::load('email');
            $email = \Email::forge();

            // use a view file to generate the email message
            $email->html_body($html);

            // give it a subject
            $email->subject('[Alerta] SPC - BMS Tecnologia');

            // add from- and to address
            $email->from('naoresponda@bmstecnologia.com.br', 'BMS Tecnologia');


            $email->to($emails);
            // and off it goes (if all goes well)!
            try {
                // send the email
                $email->send();
                static::setVariablesToSent($item);
            }

            // this should never happen, a users email was validated, right?
            catch (\EmailValidationFailedException $e) {
                echo $e->getMessage();

                continue;
            }

            // what went wrong now?
            catch (\Exception $e) {
                // log the error so an administrator can have a look
                logger(\Fuel::L_ERROR, '*** Error sending email (' . __FILE__ . '#' . __LINE__ . '): ' . $e->getMessage());
                continue;
            }
        }
    }

    protected static function setVariablesToSent($data)
    {
        $vars = $data['vars'];
        $groupingKey = $data['grouping_key'];
        $variablesTagIdList = array();


        foreach ($vars as $v) {
            if (!in_array($v['variable_tag_id'], $variablesTagIdList)) {
                array_push($variablesTagIdList, $v['variable_tag_id']);
            }
        }

        $q = "
            UPDATE alert_queue SET sent = 1 WHERE variable_tag_id in (" . join(',', $variablesTagIdList) . ") and grouping_key = '{$groupingKey}';
        ";
        $query = \DB::query($q);
        $query->execute();
    }

}

/* End of file tasks/alert.php */
    