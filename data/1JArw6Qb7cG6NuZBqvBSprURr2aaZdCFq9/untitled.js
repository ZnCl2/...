SELECT comment.*
, user.value AS user_name
, user_json_content.directory AS user_address
, (SELECT COUNT(*) FROM comment_vote WHERE comment_vote.comment_uri = comment.comment_id || '_' || user_json_content.directory)+1 AS votes 
FROM comment 
LEFT JOIN json AS user_json_data ON (user_json_data.json_id = comment.json_id) 
LEFT JOIN json AS user_json_content ON (user_json_content.directory = user_json_data.directory 
	AND user_json_content.file_name = 'content.json') 
LEFT JOIN keyvalue AS user ON (user.json_id = user_json_content.json_id AND user.key = 'cert_user_id') 
WHERE comment.topic_uri = '" + this.topic_id + "_" + this.topic_user_address + "' 
ORDER BY added DESC





SELECT COUNT(comment_id) AS comments_num , MAX(comment.added) AS last_comment , topic.added as last_added , CASE WHEN MAX(comment.added) IS NULL THEN topic.added ELSE MAX(comment.added) END as last_action, topic.*,topic_creator_user.value AS topic_creator_user_name,topic_creator_content.directory AS topic_creator_address,topic.topic_id || '_' || topic_creator_content.directory AS row_topic_uri,NULL AS row_topic_sub_uri, (SELECT COUNT(*) FROM topic_vote WHERE topic_vote.topic_uri = topic.topic_id || '_' || topic_creator_content.directory)+1 AS votes FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) LEFT JOIN json AS topic_creator_content ON (topic_creator_content.directory = topic_creator_json.directory AND topic_creator_content.file_name = 'content.json') LEFT JOIN keyvalue AS topic_creator_user ON (topic_creator_user.json_id = topic_creator_content.json_id AND topic_creator_user.key = 'cert_user_id') LEFT JOIN comment ON (comment.topic_uri = row_topic_uri) WHERE topic.type IS NULL AND topic.parent_topic_uri IS NULL  GROUP BY topic.topic_id, topic.json_id ORDER BY added DESC LIMIT 1;
UNION ALL

SELECT COUNT(comment_id) AS comments_num, MAX(comment.added) AS last_comment, MAX(topic_sub.added) AS last_added, CASE WHEN MAX(topic_sub.added) > MAX(comment.added) THEN MAX(topic_sub.added) ELSE MAX(comment.added) END as last_action,topic.*,topic_creator_user.value AS topic_creator_user_name,topic_creator_content.directory AS topic_creator_address,topic.topic_id || '_' || topic_creator_content.directory AS row_topic_uri,topic_sub.topic_id || '_' || topic_sub_creator_content.directory AS row_topic_sub_uri,(SELECT COUNT(*) FROM topic_vote WHERE topic_vote.topic_uri = topic.topic_id || '_' || topic_creator_content.directory)+1 AS votes FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) LEFT JOIN json AS topic_creator_content ON (topic_creator_content.directory = topic_creator_json.directory AND topic_creator_content.file_name = 'content.json') LEFT JOIN keyvalue AS topic_creator_user ON (topic_creator_user.json_id = topic_creator_content.json_id AND topic_creator_user.key = 'cert_user_id') LEFT JOIN topic AS topic_sub ON (topic_sub.parent_topic_uri = topic.topic_id || '_' || topic_creator_content.directory) LEFT JOIN json AS topic_sub_creator_json ON (topic_sub_creator_json.json_id = topic_sub.json_id) LEFT JOIN json AS topic_sub_creator_content ON (topic_sub_creator_content.directory = topic_sub_creator_json.directory AND topic_sub_creator_content.file_name = 'content.json') LEFT JOIN comment ON (comment.topic_uri = row_topic_sub_uri) WHERE topic.type = "group" GROUP BY topic.topic_id  ORDER BY added DESC LIMIT 1;

CREATE TABLE topic (topic_id INTEGER,title TEXT,body TEXT,type TEXT,parent_topic_uri TEXT,added DATETIME,json_id INTEGER REFERENCES json (json_id))



1| comments_num
1455384452|last_comment
1455382641|last_added
1455384452|last_action
1|topic_id
Raitos blog|title  
http://127.0.0.1:43110/raito.bit|body
|type
|parent_topic_uri
1455382641|added
8|json_id
raito@zeroid.bit|topic_creator_user_name
12uS7AbHMQEc4YKxoPpASsmDSy6fRtEhrw|topic_creator_address
1_12uS7AbHMQEc4YKxoPpASsmDSy6fRtEhrw|row_topic_uri
|2 votes



SELECT COUNT(comment_id) AS comments_num , MAX(comment.added) AS last_comment , topic.added as last_added , CASE WHEN MAX(comment.added) IS NULL THEN topic.added ELSE MAX(comment.added) END as last_action, topic.*,topic_creator_user.value AS topic_creator_user_name,topic_creator_content.directory AS topic_creator_address,topic.topic_id || '_' || topic_creator_content.directory AS row_topic_uri,NULL AS row_topic_sub_uri, (SELECT COUNT(*) FROM topic_vote WHERE topic_vote.topic_uri = topic.topic_id || '_' || topic_creator_content.directory)+1 AS votes FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) LEFT JOIN json AS topic_creator_content ON (topic_creator_content.directory = topic_creator_json.directory AND topic_creator_content.file_name = 'content.json') LEFT JOIN keyvalue AS topic_creator_user ON (topic_creator_user.json_id = topic_creator_content.json_id AND topic_creator_user.key = 'cert_user_id') LEFT JOIN comment ON (comment.topic_uri = row_topic_uri) WHERE topic.type IS NULL AND topic.parent_topic_uri IS NULL  GROUP BY topic.topic_id, topic.json_id  UNION ALL SELECT COUNT(comment_id) AS comments_num, MAX(comment.added) AS last_comment, MAX(topic_sub.added) AS last_added, CASE WHEN MAX(topic_sub.added) > MAX(comment.added) THEN MAX(topic_sub.added) ELSE MAX(comment.added) END as last_action,topic.*,topic_creator_user.value AS topic_creator_user_name,topic_creator_content.directory AS topic_creator_address,topic.topic_id || '_' || topic_creator_content.directory AS row_topic_uri,topic_sub.topic_id || '_' || topic_sub_creator_content.directory AS row_topic_sub_uri,(SELECT COUNT(*) FROM topic_vote WHERE topic_vote.topic_uri = topic.topic_id || '_' || topic_creator_content.directory)+1 AS votes FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) LEFT JOIN json AS topic_creator_content ON (topic_creator_content.directory = topic_creator_json.directory AND topic_creator_content.file_name = 'content.json') LEFT JOIN keyvalue AS topic_creator_user ON (topic_creator_user.json_id = topic_creator_content.json_id AND topic_creator_user.key = 'cert_user_id') LEFT JOIN topic AS topic_sub ON (topic_sub.parent_topic_uri = topic.topic_id || '_' || topic_creator_content.directory) LEFT JOIN json AS topic_sub_creator_json ON (topic_sub_creator_json.json_id = topic_sub.json_id) LEFT JOIN json AS topic_sub_creator_content ON (topic_sub_creator_content.directory = topic_sub_creator_json.directory AND topic_sub_creator_content.file_name = 'content.json') LEFT JOIN comment ON (comment.topic_uri = row_topic_sub_uri) WHERE topic.type = "group" GROUP BY topic.topic_id  ORDER BY added DESC LIMIT 1;



2|1455742992|1455731358|1455742992|2|test|http://127.0.0.1:43110/15LS6faxCHDd45FW8Cy6jCqWHVpYjUAJj1|||1455731358|63|maggie@zeroid.bit|1FzQ2ZsCgLRL4PTqPKtomrzSpKLTuNRXRo|2_1FzQ2ZsCgLRL4PTqPKtomrzSpKLTuNRXRo||3

2|1455742992|1455731358|1455742992|2|test|http://127.0.0.1:43110/15LS6faxCHDd45FW8Cy6jCqWHVpYjUAJj1|||1455731358|63|maggie@zeroid.bit|1FzQ2ZsCgLRL4PTqPKtomrzSpKLTuNRXRo|2_1FzQ2ZsCgLRL4PTqPKtomrzSpKLTuNRXRo||3

0||1455744947|1455744947|3|myquotes|http://127.0.0.1:43110/14LPKMNiDdgvSyhcboimzaALEeVYDvZ7qe|||1455744947|63|maggie@zeroid.bit|1FzQ2ZsCgLRL4PTqPKtomrzSpKLTuNRXRo|3_1FzQ2ZsCgLRL4PTqPKtomrzSpKLTuNRXRo||1
0||1455744947|1455744947|3|myquotes|http://127.0.0.1:43110/14LPKMNiDdgvSyhcboimzaALEeVYDvZ7qe|||1455744947|63|maggie@zeroid.bit|1FzQ2ZsCgLRL4PTqPKtomrzSpKLTuNRXRo|3_1FzQ2ZsCgLRL4PTqPKtomrzSpKLTuNRXRo||1
