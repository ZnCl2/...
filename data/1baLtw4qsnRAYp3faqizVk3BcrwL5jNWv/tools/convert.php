<?php

require "/var/www/bors/composer/vendor/autoload.php";
require BORS_CORE.'/inc/texts.php';

foreach(glob("/var/sync/BalancerData/Twitter/Balancer73/*.json") as $f)
{
	$data = json_decode(file_get_contents($f), true);

	// Пока обрабатываем только оригинальные посты, не ответы.
	if(!empty($data['in_reply_to_status_id']))
		continue;

	// Ретвиты тоже скипаем
	if(!empty($data['retweeted_status']))
		continue;

	$ts = strtotime($data['created_at']);

	$dir = __DIR__.'/../data/'.date('Y/Y-m', $ts);
	mkpath($dir);

	$exporter = new \Infonesy\Transport\ObjectExporter($dir);

	$user = \B2\Obj::create_from_array([
		'title' => $data['user']['name'],
		'infonesy_uuid' => 'twitter.user.' . $data['user']['screen_name'],
	]);

	$node = \B2\Obj::create_from_array([
	]);

	if(empty($data['full_text']))
		$text = $data['text'];
	else
		$text = $data['full_text'];

	// Двойное декодирование — хак или так и надо? Разобраться.
	$text = blib_string::wordwrap(html_entity_decode(html_entity_decode($text)), 60);

	$title = clause_truncate_ceil(preg_replace('/(?!\w)#(\w)/u', '$1', str_replace("\n", ' ', $text)), 80);

	$tweet = \B2\Obj::create_from_array([
		'infonesy_uuid' => 'twitter.'.$data['id'],
		'title' => $title,
		'source' => $text,
		'infonesy_user' => $user,
		'infonesy_node' => $node,
		'infonesy_type' => 'Post',
		'infonesy_markup_type' => 'Text',
	]);

	$tweet->set_create_time($ts);
	$tweet->set_modify_time($ts);

	$slug = URLify::filter($title, 24, "", true);
	$file = date('Y-md-Hi-', $ts).$data['id']."-$slug.md";
	$exporter->export_md($tweet, $file);

	echo "$title\n";
}
