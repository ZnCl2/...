#!/bin/bash

# Пример работы с VKAPI в shell-скрипте.
 # Скрипт для работы с музыкой ВКонтакте. by snoopcatt.
   _version="0.03a"

# Системные переменные
id="5807425" # системная переменная. ID создателя приложения. Взято из VK_Search Amarok Script (c)
method='audio.search' # метод поиска музыки ВКонтакте.
secret='dTckAoaSzH' # системная переменная. Секретный код приложения. Взято из VK_Search Amarok Script (c)
query="$1" # запрос на сервер. По-умолчанию это $1, то есть первый аргумент программы.
tmp='/tmp' # временная директория. По-умолчанию это /tmp.
debug='0'  # выводить отладочные сообщения в STDERR. По-умолчанию 1.
ffbuffer='65536'  # сколько байт закачивать для попытки определения лучшего битрета. по умолчанию 65536 байт, идеально работает с битрейтом <320kbps.
delete_time_doubles='1' # удалять одинаковые по времени. По-умолчанию 1.
noterasem3u='0' # не удалять предыдущую M3U
noterasetmpfiles='0' # не удалять временные файлы перед запуском
update_url='http://sctt.ath.cx/projects/vksearch/vksearch.sh'

# Пользовательские переменные
playlist="$HOME/vk.playlist" ## плейлист
getdir="$HOME"  ## папка для сохранения файлов
count='200' ## сколько искать для глоб.поиска
singlecount='15' ## сколько искать для одиноч.поиска
player='mplayer -playlist' # плеер, обрабатывающий плейлисты
download="wget -cqO" # менеджер загрузок
random='0' #  рандом?
detect_best_song='0' # определять лучшие песни 
tag_id3='1' # записывать ли теги в свежескачанные mp3
m3u='0' # экспорт плейлиста в M3U
mode='play' # дефолтный режим работы

  
   

 
 
  # удаление темповых файлов
    [ "$noterasetmpfiles" != "1" ] && rm $tmp/vk.* 2>/dev/null

 showHelp() {
   echo ' 
    VKontakte Search '"$_version"'
      VKSearch - Shell-скрипт для поиска, сортировки и закачки музыки с сайта VKontakte.ru. 
        Наличие учетной записи на VK не требуется.
          Возможности:
* Поиск
* Сортировка: удаление дублей, рандомизация
* Проигрывание: создание m3u
* Закачка: Определение трека с лучшим битрейтом; Запись ID3v1, ID3v2 в UTF-8, отправка на проигрывание в любой плеер
  Для определения возможностей, используемых по умолчанию, просто откройте исполняемый файл и измените секцию "Пользовательские переменные".

   Зависимости:
      coreutils; curl; ffmpeg; id3*; mplayer*; wget
*(id3 - не обязательная зависимость. Просто отключите поддержку tag_id3 в скрипте в секции "Пользовательские переменные"
mplayer - не обязательная зависимость. Просто исправьте переменную player в секции "Пользовательские переменные")

   Пример использования: 
       vksearch "Ваш Запрос" Опции
 Например, для поиска "Театр Яда" в количестве 1000 штук, с рандомизацией и последущей отправкой плейлиста в плеер mplayer:
       vksearch "Театр Яда" --count=1000 --random --play --player="mplayer -playlist"
   для закачки песен "Театр Яда" в кол-ве 100 штук делаем:
       vksearch "Театр Яда" --count=100 --get
   а для закачки одной песни "Театр Яда - Курс к наилучшему худшему" с наилучшим качеством делаем:
       vksearch "Театр Яда - Курс к наилучшему худшему" --get-one --best

   По-умолчанию скрипт работает в режиме "Play" (найти и проиграть). 
    Вы можете изменить режим работы либо запустив с параметром --get, --get-one, --play, --play-one, --playlist, либо изменив переменную $mode в скрипте в секции "Пользовтельские переменные"

   Все опции:
     $1 (первый аргумент) - строка поиска. 
     --help - показать эту страницу
     --getdir="путь" - папка для сохранения mp3 и плейлистов
     --count="число" - сколько песен искать
     --singlecount="число" - сколько песен искать для "одиночного" поиска (одной песни) (для последущего выбора из этих песен трека с лучшим битрейтом)
     --play - установка режима работы "Создать плейлист и отправить в плеер"
     --playlist - установка режима работы "Создать плейлист"
     --update - автообновление скрипта
     --player="плейер" - плеер, в котором будем открывать плейлист
     --dloader="менеджер закачек" - программа, которая будет закачивать плейлист/трек
     --get - установка режима работы "Создать плейлист и скачать его"
     --get-one - установка режима рабтоы "
     --random - случайное воспроизведение
     --best - определить трек с лучшим кач-вом 
     --id3 - разрешить запись ID3 после закачки
     --debug - показывать отладочные сообщения
'
 exit 0
}

 #Умертвление (;
die() { 
 echo "$@"
  exit 1
}


for param in $@ ;
do
  case $param in
    --help) showHelp ;;
    --getdir=*) getdir=$( echo $param | cut -d '=' -f 2 ) ;;
    --count=*) count=$( echo $param | cut -d '=' -f 2 ) ;;
    --singlecount=*) singlecount=$( echo $param | cut -d '=' -f 2 ) ;;
    --play) mode=play ;;
    --play-one) mode=play_one ;;
    --update) mode=update ;;
    --get) mode=get ;;
    --dloader=*) download=$( echo $param | cut -d '=' -f 2 ) ;;
    --player=*) player=$( echo $param | cut -d '=' -f 2 ) ;;
    --get-one) mode=get_one ;;
    --random) random=1;;
    --playlist) mode=playlist ;;
    --best) detect_best_song=1 ;;
    --id3) tag_id3=1 ;;
    --debug) debug=1 ;;
  esac
done

[ -n "`echo $mode|grep one`" ] && count=$singlecount

# Приветствие. Проверка хэшей, возможности работы, итд
 sayHello() {
  echo "[`date +%k:%M:%S`] Добро пожаловать в VKSearch!"
     [ -z "$query" ] && die "[`date +%k:%M:%S`] Пустой запрос...Наберите '$0 --help' для получения помощи"
# проверка id3
 if [ "$tag_id3" == "1" ]; then
   id3 >/dev/null 2>&1 
   [ "$?" == "127" ] && die "[`date +%k:%M:%S`] Не найдена утилита ID3! Установите её или отключите режим tag_id3!"
fi
 
 if [ "$count" -gt "300" ]; 
  then  
    echo "[`date +%k:%M:%S`] Warning: Указано число поиска больше 300...Установлено максимальное (300) значение."
    count=300
 fi
 
# Получение сигнатуры
sig=`echo -n "${id}api_id=1696393count=${count}method=${method}q=${query}test_mode=1v=2.0${secret}"|md5sum|awk '{ print $1 }'`
# Получение списка
wget "http://api.vkontakte.ru/api.php?api_id=1696393&count=${count}&v=2.0&method=${method}&sig=$sig&test_mode=1&q=$query" -qO $tmp/vk.out
allcount=`cat $tmp/vk.out | grep count|grep -oE "[0-9]*"`  
  if [ "$allcount" == "0" ] 
   then die "[`date +%k:%M:%S`] Не найдено ни одной композиции..." 
     else 
       [ "$allcount" -gt "$count" ] || count=$allcount # если найдено меньше, чем запрошено
       echo "[`date +%k:%M:%S`] По запросу $query найдено $allcount композиций. Обрабатываю первых $count композиций."
   fi
}

# Создать плейлист
createPlaylist() {
cat $tmp/vk.out|grep -o -E "http://[^ ]+\.mp3" > $playlist
echo "[`date +%k:%M:%S`] Плейлист создан - $(cat $playlist|wc -l) трек(ов)" 
}

# Получение mp3 лучшего качества. Переменные: singlecount (кол-во одинаковых mp3's)
getBestmp3() {
  tnum=1
  num=$[$singlecount+1]
    [ "$num" -gt "`cat $playlist|wc -l`" ] && num=`cat $playlist|wc -l` 
    [ "$debug" == "1" ] && echo "[`date +%k:%M:%S`] Обрабатываю $num песен..."
if [ "$num" == "1" ]; 
 then 
    best=`cat $playlist`
 else
  while [ "$tnum" != "$num" ]; 
    do 
      [ "$debug" == "1" ] && echo "[`date +%k:%M:%S`] <MOD: getBestmp3> Обработка $tnum " 1>&2
      rate=$(curl --range 0-${ffbuffer} "`cat $playlist | head -n $tnum|tail -n 1`"  2>/dev/null | ffmpeg -i - 2>&1|grep Stream|grep -oE "[0-9]{1,3} kb/s"|awk '{ print $1 }')
      echo -n "$rate" >> $tmp/vk.bitrate
      echo -n " $tnum">> $tmp/vk.bitrate
      echo >> $tmp/vk.bitrate
      tnum=$[$tnum+1]
    done
  bestnum=$(cat $tmp/vk.bitrate|sort -n | tail -n 1 | awk '{ print $2 }')
  echo "[`date +%k:%M:%S`] ${bestnum}-й трек с лучшим качеством"
  best=`cat $playlist|sed -n ${bestnum}p`
 fi
}

# Получение информации вида 'Исполнитель - Композиция Длительность' для парсинга
 # или вида 'Длительность,Исполнитель - Композиция' для m3u-списочка
getNameByID() {
if [ -n "$1" ] ; then 
   num=`cat $tmp/vk.out |grep -n "$1"|grep -o ".*[0-9]:"| sed 's/\://'` #| awk '{ print $1 }'
   [ -n "`echo $num|awk '{ print $2 }'`" ] && num=`echo $num|awk '{ print $1 }'`
   artist=` cat $tmp/vk.out | head -n $num|tail -n 4|sed -n 's|<artist>\(.*\)</artist>|\1|p'|sed 's/^[ \t]*//'` 
   title=` cat $tmp/vk.out | head -n $num|tail -n 4|sed -n 's|<title>\(.*\)</title>|\1|p'|sed 's/^[ \t]*//'` 
   secs=` cat $tmp/vk.out| head  -n $num|tail -n 4|sed -n 's|<duration>\(.*\)</duration>|\1|p'|sed 's/^[ \t]*//'`  
  [ "$debug" == "1" ] && echo "Обработана $num-я песенка - $artist - $title - $secs сек" 1>&2
  [ -z "$2" ] && echo "$secs $artist - $title " 
  [ "$2" == "m3u" ] && echo "$secs,$artist - $title"    
  [ "$2" == "get" ] && echo "$artist - $title"    
  [ "$2" == "artist" ] && echo "$artist"    
  [ "$2" == "title" ] && echo "$title"    
  fi
 }

# Парсинг XML-листа. Рандомизация, если требуетса. Удаление дублей. 
parseList() {
  num=$[$count+1]
    tnum=1
      
# Сортируем все в $tmp/vk.playlist-sorted
 bylo=$(cat $playlist|wc -l)
 while [ "$tnum" != "$num" ]; 
       do
      [ "$debug" == "1" ] && echo "[`date +%k:%M:%S`] Парсинг. $tnum из $num" 1>&2
        curr=`cat $playlist|sed -n ${tnum}p`
        echo -n " `getNameByID $curr`" >> $tmp/vk.playlist
        echo -n "$curr" >> $tmp/vk.playlist # сначала http в конец для sort-а
        echo >> $tmp/vk.playlist
      #getNameByID $curr
         tnum=$[$tnum+1]
      done
     cat $tmp/vk.playlist | sort -f -o $tmp/vk.playlist-sorted # отсортировали, теперь перенести http:// ... влево ;)
  
#  Переносим ссылки влево
  tnum=1
   while [ "$tnum" != "$num" ]; 
     do 
      [ "$debug" == "1" ] && echo "[`date +%k:%M:%S`] Вторичный Парсинг. $tnum из $num"
      echo -n "$(cat $tmp/vk.playlist-sorted | sed -n ${tnum}p | awk '{ print $NF }') " >> $playlist.parsed
      echo -n "$(cat $tmp/vk.playlist-sorted | sed -n ${tnum}p |sed -e 's/http.*//')" >> $playlist.parsed
     echo >> $playlist.parsed
     tnum=$[$tnum+1]
    done  

#  Парсим
   cat $playlist.parsed | uniq -f 1 -i > $playlist.uniq; 
if [ "$delete_time_doubles" == "1" ]; then
  cat $playlist.uniq | awk '{ print $2" "$1 }' | sort -n | awk '{ print $2" "$1 }' | uniq -f 1 | awk '{ print $1 }' > $playlist.parsed

else  
  cat $playlist.uniq | awk '{ print $1 }' > $playlist.parsed
fi
  cat $playlist.parsed | sort | uniq > $playlist
  [ "$random" == "1" ] && cat $playlist|sort -R -o $playlist
  rm $playlist.uniq $playlist.parsed 2>/dev/null # удаление лишних
  stalo=$(cat $playlist|wc -l)
  echo "[`date +%k:%M:%S`] Парсинг завершён. Удалено $[$bylo-$stalo] дублей, сейчас в плейлисте $stalo треков"
} 

mkm3ulist() {
  [ "$noterasem3u" == "1" ] || rm $getdir/playlist.m3u 2>/dev/null
  [ -f "$getdir/playlist.m3u" ] || echo "#EXTM3U" >> $getdir/playlist.m3u
  [ -f "$getdir/playlist.m3u" ] ||  echo >> $getdir/playlist.m3u
 num=$[$(cat $playlist|wc -l)+1]
   tnum=1
    while [ "$tnum" != "$num" ]; do
        curr=`cat $playlist|sed -n ${tnum}p`
       [ "$debug" = "1" ] && echo Добавляю песню $curr под номером $tnum 1>&2
        echo "#EXTINF:`getNameByID "$curr" m3u`" >> $getdir/playlist.m3u
        echo $curr >> $getdir/playlist.m3u
       tnum=$[$tnum+1]
    done
echo "[`date +%k:%M:%S`] M3U-плейлист сохранён как $getdir/playlist.m3u"
}

# аутоупдате :p
update() { 
# обновление 
wget $update_url -o /dev/null -O $tmp/vk.update
 if [ "$?" != "0" ]; 
  then
     echo "[`date +%k:%M:%S`] Неудача. Не могу загрузить файл. Проверьте UpdateUrl."
  else
     _new=`cat $tmp/vk.update|grep '_version='|head -n 1|sed 's/\_ver=//' | sed 's/\"//g'`
    if [ "$_version" == "$_new" ];
      then 
          echo "[`date +%k:%M:%S`] Обновление не требуется!"
       else
         echo "[`date +%k:%M:%S`] Сейчас будет завершено обновление с версии $_version на $_new. Наберите 'go' для продолжения."
         read _accept
         if [ "$_accept" != "go" ] ; 
             then
                echo "[`date +%k:%M:%S`] Обновление отменено!"
                rm $tmp/vk.update
             else
                [ -f "$0" ] && _bin="$0"
                [ -f "`which $0`" ] && _bin="$0"
                [ -z "$_bin" ] && die "[`date +%k:%M:%S`] Ошибка: Не могу найти исполняемый файл"
                [ -r "$_bin" ] || die "[`date +%k:%M:%S`] Ошибка: Нет прав на запись исполняемого файла"
               mv $_bin $_bin-saved 2>/dev/null #backup\
               [ "$?" != "0" ] && die "[`date +%k:%M:%S`] Ошибка: Не могу переместить файл"
               mv $tmp/vk.update $_bin 2>/dev/null
               [ "$?" != "0" ] && die "[`date +%k:%M:%S`] Ошибка: Не могу переместить файл"
               [ -x "$_bin" ] || chmod +x $_bin 2>/dev/null
               [ "$?" != "0" ] && echo "[`date +%k:%M:%S`] Обновление завершено, но невозможно дать скрипту права на выполнение. Сделайте это вручную. "
               echo "[`date +%k:%M:%S`] Обновление завершено успешно. Работоспособность скрипта не гарантируется *_*"
              rm $tmp/vk.update
         fi
    fi           
fi          # end 'обновление'
#exit 0;
#saved.
 }

#вообщемта обновление \=
if [ "$mode" == "update" ];
 then
   update
fi

# это вообщем режим такой: обрабатываем плейлист, генерим мтриушку и передаем в мплеер(%
 if [ "$mode" == "play" ]; 
   then
      sayHello ;
      createPlaylist ;
      parseList;
      mkm3ulist; 
      echo "[`date +%k:%M:%S`] Передаю управлению плееру..."
       # да некавай\=
           # йа знаю :P
        [ "$debug" == "1" ] && $player $getdir/playlist.m3u || $player $getdir/playlist.m3u 2>/dev/null
fi

# ну а это тупо одну штучкуЪ
 if [ "$mode" == "play_one" ];
 then
   sayHello
    createPlaylist 
     parseList
      head -n 1 $playlist | tee $playlist >/dev/null
      mkm3ulist
      echo "[`date +%k:%M:%S`] Передаю управлению плееру..."
      [ "$debug" == "1" ] && $player $getdir/playlist.m3u || $player $getdir/playlist.m3u 2>/dev/null
fi

# проста сохраняем плейлист
 if [ "$mode" == "playlist" ];     
  then 
    sayHello; 
     createPlaylist;
     parseList;
     mkm3ulist;
     rm $playlist;
 fi
 
#гетаем все песни
 if [ "$mode" == "get" ]; 
  then 
       sayHello; 
       createPlaylist;
       parseList;
       #$download -i $playlist -O $getdir  
          # так тоже конечшна можна..но это НЕКАвай впринципе.
             tnum=1
             num=$[$(cat $playlist|wc -l)+1]
             echo "[`date +%k:%M:%S`] Начинаю закачку. Всего $[$num-1] песен..."
               while [ "$tnum" != "$num" ]; 
                 do
                   curr=`cat $playlist|sed -n ${tnum}p`
                    iname=`getNameByID $curr get`
                      echo "[`date +%k:%M:%S`] Закачиваю $iname ($[$tnum-1] из $[$num-1] выполнено)"
                      $download "$getdir/$iname.mp3" "$curr"
                        echo "[`date +%k:%M:%S`] Закачка $iname завершена!"
                     if [ "$tag_id3" == "1" ]; then  id3 -1 -2 -a "$(getNameByID $curr artist)" -t "$(getNameByID $curr title)" "$getdir/$iname.mp3";
                       [ "$?" == "0" ] && echo "[`date +%k:%M:%S`] Теги записаны!"; fi
                tnum=$[$tnum+1] 
               done
 fi

#или только одну
 if [ "$mode" == "get_one" ]; 
  then 
       sayHello; 
       createPlaylist;
       parseList;
            if [ "$detect_best_song" == "1" ]; 
                then 
                     getBestmp3
                     iname=`getNameByID $best get`
                     echo "[`date +%k:%M:%S`] Начинаю закачку..."
                     echo "[`date +%k:%M:%S`] Закачиваю $iname"
                      $download "$getdir/$iname.mp3" "$best"
                     echo "[`date +%k:%M:%S`] Закачка завершена!"
                      if [ "$tag_id3" == "1" ]; then  id3 -1 -2 -a "$(getNameByID $best artist)" -t "$(getNameByID $best title)" "$getdir/$iname.mp3";
                       [ "$?" == "0" ] && echo "[`date +%k:%M:%S`] Теги записаны!"; fi
               else
                     song=`cat $playlist|head -n 1`
                     echo "[`date +%k:%M:%S`] Начинаю закачку..."
                     iname=`getNameByID $song get`
                     echo "[`date +%k:%M:%S`] Закачиваю $iname"
                      $download "$getdir/$iname.mp3" "$song"
                     echo "[`date +%k:%M:%S`] Закачка завершена!"
                      if [ "$tag_id3" == "1" ]; then  id3 -1 -2 -a "$(getNameByID $song artist)" -t "$(getNameByID $song title)" "$getdir/$iname.mp3";
                       [ "$?" == "0" ] && echo "[`date +%k:%M:%S`] Теги записаны!"; fi
           fi
 fi
 
# дел лишнее
rm $tmp/vk.* 
exit 0
