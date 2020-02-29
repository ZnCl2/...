<?php

$translate_to="EN";
$maxcount=10000; # stop after some deepL calls
$minsleep=0; # wait min seconds between api calls to prevent blocking

// Melde alle Fehler außer E_NOTICE
error_reporting(E_ALL & ~E_NOTICE); ini_set('display_errors', 1);

require('DeepL.inc.php');
require('translations.inc.php');


function recursive_print ($varname, $varval) {
  if (! is_array($varval)):
    print $varname . ' = ' . var_export($varval, true) . ";".PHP_EOL;
  else:
    #print $varname . " = array();<br>".PHP_EOL;
    foreach ($varval as $key => $val):
      recursive_print ($varname . "[" . var_export($key, true) . "]", $val);
    endforeach;
  endif;
}

?>### Incantata Übersetzungen ###<pre><?php

# load data from german data_de.json
$data_json=file_get_contents('data/data_de.json');
$data=json_decode($data_json,TRUE);

# go through data from json, find errors and collect data in $stats
foreach($data["cards"] as $card){
  if(!empty($cards[$card['card_id']])){
    echo "Error:ID ".$card['card_id']." ist doppelt!".PHP_EOL;
  }
  foreach($card as $k=>$v){
    if (in_array($k, array('title','rule_title')) and isset($stats[$k][$v]) and $v){
      echo "Error: $k '$v' in ".$card['card_id']." ist doppelt!".PHP_EOL;
    }
    @$stats[$k][$v]++;
    if($v and $k=="type"){
      $t=explode(", ",$v);
      foreach ($t as $value) {
        # collect single types from list of types on each card
        @$stats['types'][$value]++;
      }
    }
  }
  $cards[$card['card_id']]=$card;
}
unset($stats['card_id']); # not needed

echo "\nStatistik:\n=================".PHP_EOL;
foreach ($stats as $key => $each_stats) {
  $num=sizeof($each_stats);
  echo "$key: ".$num.PHP_EOL;
}

echo "\nTypes:\n=================".PHP_EOL;

foreach($stats['types'] as $single=>$eachnum) if($single){
  if(empty($trans['type'][$single])) {
    echo "\n# $count / $maxcount - in 1 s: \$trans['type']['$single'] ".PHP_EOL;
    echo "############################################################".PHP_EOL;
    sleep(1);
    if($tr=DeepL_translate($single, $translate_to)){
      $tr=ucwords($tr);
      $new_trans['type'][$single]=$tr;
      recursive_print('$trans',$new_trans);
    }
  }
}

# write out english json file
$en_json = fopen('data/data.json', 'w'); # store new translations in tmp file
fwrite ($en_json,'{"cards": ['.PHP_EOL);
foreach($cards as $id=>$card){
  if(!empty($card['type'])){
    $types_en=array();
    foreach(explode(", ",$card['type']) as $type){
      if(isset($trans['type'][$type])) {
        $types_en[]=$trans['type'][$type];
      }else{
        $types_en[]="DE:".$type;
      }
    }
    $card['type']=implode(", ",$types_en);
  }
  if(isset($trans[$id])) {
    foreach ($trans[$id] as $key => $t) {
      # go throut all available translations for the card
      if(isset($t[$card[$key]])){
        # replace german text with english
        $card[$key]=$t[$card[$key]];
      }
    }
  }
  # mark all missing translations with DE:
  foreach (array('title' ,'body' ,'extra' ,'rule_title', 'rule') as $key) {
    if(strlen($card[$key])>2 and !isset($trans[$id][$key])) {
      $card[$key]="DE:".$card[$key];
    } else if (in_array($key, array('title')) and strlen($card[$key].$card['cost'])>26) { #,'rule_title'
      echo "bei id (".$card['card_id'].") '".$cards[$card['card_id']][$key]."' ergibt sich eine Übersetzung+Kosten mit ".strlen($card[$key].$card['cost'])." Zeichen:".PHP_EOL;
      echo "$key:".$card[$key].PHP_EOL.PHP_EOL;
      #var_export($card['cost']);
    }
  }
  fwrite ($en_json,PHP_EOL.json_encode($card, JSON_PRETTY_PRINT).",".PHP_EOL);
}
fwrite ($en_json,PHP_EOL.'{}'.PHP_EOL.']}');

echo "Automatisch fehlende Übersetzungen mit DeepL holen:
=======================================".PHP_EOL;
$count=0;
$fp = fopen('translations_tmp.inc.php', 'a'); # store new translations in tmp file
foreach($cards as $id=>$card) { #if($id>840 or in_array(842-$id,array(414,567,582,605,606,615,618,623,624,628,629))){
  foreach(array('title' ,'body' ,'extra' ,'rule_title', 'rule') as $key){
    if(!empty($card[$key])){
      $t=$card[$key];
      if(empty($trans[$id][$key][$t])) {
        if(strlen($t)>2) # and strstr($t," ")) 
					if($count++<$maxcount){
          $sleep=$minsleep+(rand(1,30)/10); # between each deepL call
          echo "\n# $count / $maxcount - in $sleep s: \$trans[$id]['$key']['$t'] ".PHP_EOL;
          echo "############################################################".PHP_EOL;
          if(@$not_firsttime++){
            sleep($sleep);
          }
          if($tr=DeepL_translate($t, $translate_to)){
            # translate successfull
            $tr=ucfirst($tr);
            if(in_array($key, array('title','rule_title' ))) {
              $tr=ucwords($tr);
            }
            $new_trans[$id][$key][$t]=$tr;
            $tmp=array();
            $tmp[$id][$key][$t]=$tr;
            ob_start(); {
              recursive_print('$trans',$tmp);
            } $var_str=ob_get_clean();
            $var_str=trim($var_str)." # ".date("ymd").PHP_EOL;
            fwrite($fp, $var_str);
            echo $var_str;
          }
          flush();
        }
      }
    }
  }
}

echo "\n\n\n\n\n# Neue Übersetzungen:\n=================".PHP_EOL;
echo "# add these to the file 'translations.inc.php'\n".PHP_EOL;
recursive_print('$trans',$new_trans);

echo "\n".PHP_EOL;
/*

title: 253
cost: 71
color: 15
type: 42
body: 240
strength: 22
extra: 128
rule_title: 210
rule: 215
date: 1
pic: 2
token: 24
taken: 1
minting_cost: 4
zite: 2


*/
