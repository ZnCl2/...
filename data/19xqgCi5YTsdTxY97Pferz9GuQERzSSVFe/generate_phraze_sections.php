<?php

$translate_to="EN";
// Melde alle Fehler außer E_NOTICE
error_reporting(E_ALL & ~E_NOTICE); ini_set('display_errors', 1);
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

?>### Incantata Übersetzungen zerschneiden ###<pre><?php

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

echo "\ncheck for empty Types...".PHP_EOL;
foreach($stats['types'] as $single=>$eachnum) if($single){
  if(empty($trans['type'][$single])) {
    echo "\n\$trans['type']['$single'] ".PHP_EOL;
  }
}

echo "\nsplit body texts...".PHP_EOL;
foreach($cards as $id=>$card){# if($card['title']=="Gespenst"){
  if(!empty($card['body'])){
    echo $card['title'].PHP_EOL.$card['body'].PHP_EOL;
    $card['body']=str_replace("...","…",$card['body']);
    $bodyparts=preg_split("/\./",$card['body']);
    $parts=array();
    #var_export($bodyparts);
    foreach($bodyparts as $i=>$by_dot){
      $one_line='';
      if($i==0) {
        $one_line=$by_dot;
      } else{
        preg_match_all('/^(\s*(?:<br>)+\s*|\s)(.*)$/', $by_dot, $part_end);
        $parts[]=".".$part_end[1][0]; // trenner
        if($by_dot!="") $one_line=$part_end[2][0]; // ein part ev. mit doppelpunkten
      }
      $by_semicolon=preg_split("/; [A-Z]/", $one_line);
      if(count($by_semicolon)>1){
        $by_semicolon=preg_split("/; /", $one_line);
        foreach($by_semicolon as $scount=>$bs){
          if ($scount>0) $parts[]="; ";
          $parts[]=$bs;
        }
        #var_export($by_semicolon);
        #var_export($parts);
      }elseif(strstr($one_line,":") and !strstr($one_line,"Nachwirkung")
          and !strstr($one_line,"Alternative Beschwörungskosten")
          and !strstr($one_line,"Einmalig")
          and !strstr($one_line,"bitcoin")
          and !strstr($one_line,"Kraftaufwand")
          and !strstr($one_line,"Versorgung")){
        // Kosten
        $cost_effect=explode(": ",$one_line,2);
        $parts[]=$cost_effect[0];
        $parts[]=": ";
        $parts[]=$cost_effect[1];
      }elseif($one_line!=""){
        $parts[]=$one_line;
      }
    }
    #var_export($parts);
    foreach($parts as $p){
      @$bodytrans[$p]++;
    }
    $cards[$id]['p']=$parts;
    
    #check:
    #$cards[$id]['p']=implode("",$parts);
    #if($cards[$id]['p']!=$cards[$id]['body']){
    #  var_export($cards[$id]);
    #  die;
    #}
  }
}
#var_export($bodytrans);
recursive_print('$cards',$cards);
$fp = fopen('data.inc.php', 'a'); # store new translations in tmp file

ob_start(); {
  recursive_print('$cards',$cards);
} $var_str=ob_get_clean();
fwrite($fp, $var_str);
            
            
            
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

echo "\n\n\n\n\n# Neue Übersetzungen:\n=================".PHP_EOL;
echo "# add these to the file 'translations.inc.php'\n".PHP_EOL;
recursive_print('$trans',$new_trans);

echo "\n".PHP_EOL;
