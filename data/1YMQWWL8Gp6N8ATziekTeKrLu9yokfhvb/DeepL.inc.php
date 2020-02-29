<?php

/**
* Minimal class autoloader
*
* @param string $class Full qualified name of the class
*/
function miniAutoloader($class)
{
  $class = str_replace('\\', '/', $class);
  require __DIR__ . '/DeepLy/src/' . $class . '.php';
}

// If the Composer autoloader exists, use it. If not, use our own as fallback.
$composerAutoloader = __DIR__.'/DeepLy/vendor/autoload.php';
if (is_readable($composerAutoloader)) {
  require $composerAutoloader;
} else {
  spl_autoload_register('miniAutoloader');
}

function DeepL_translate($text, $to = 'EN', $from = 'DE'){
  $deepLy = new ChrisKonnertz\DeepLy\DeepLy();
  
  if ($text !== null and $to !== null) {
    try {
      $result = $deepLy->translate($text, $to, $from);
    } catch (\Exception $exception) {
      echo "\n DeepL ERROR: ".$exception->getMessage()."\n";
    }
  }
  $result=str_replace("Add a ", "Add one ", $result);
  $result=str_replace("spontaneous magic", "instant", $result);
  $result=str_replace("creature deprivation", "creature disenchantment", $result);
  $result=str_replace("dream magic", "dream spell", $result);
  $result=str_replace("mana stock", "mana pool", $result);
  $result=str_replace("Flies.", "Can fly.", $result);
  $result=str_replace("Forgotten.", "Forget.", $result);
  $result=str_replace("an edged", "a tapped", $result);
  $result=str_replace("edged", "tapped", $result);
  $result=str_replace("Signum", "counter", $result);
  $result=str_ireplace("summoning frenzy", "summoning dizzyness", $result);
  $result=str_replace("scarcity", "rarity", $result);
  $result=str_replace("card of stay", "continuance card", $result);
  $result=str_replace("residence card", "continuance card", $result);
  $result=str_ireplace("life points", "Health", $result);
  $result=preg_replace("/\bdealt\b/", "inflicted", $result);
  $result=preg_replace("/\bdeal\b/", "inflict", $result);
  $result=preg_replace("/\bdeals\b/", "inflicts", $result);
  $result=preg_replace("/\bMage\b/", "Magician", $result);
  $result=preg_replace("/\bmage\b/", "magician", $result);
  $result=preg_replace("/\bmap\b/", "card", $result);
  $result=preg_replace("/\bmaps\b/", "cards", $result);
  $result=preg_replace("/\country\b/", "land", $result);
  $result=preg_replace("/\countries\b/", "lands", $result);
  return $result;
}
