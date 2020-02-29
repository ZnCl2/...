dir=$(mktemp -d)
eval $(ffprobe -v error -of flat=s=_ -select_streams v:0 -show_entries stream=height,width "$1")
size=${streams_stream_0_width}x${streams_stream_0_height}
ffmpeg -r 25 -i "$1" $dir/video.yuv 2> /dev/null
ffmpeg -i "$1" $dir/audio.wav 2> /dev/null
sox $dir/audio.wav -t cdda - | mrrcrypt -k "$2" | sox -t cdda - $dir/audio_mrr.wav 2> /dev/null
mrrcrypt -k "$2" < $dir/video.yuv > $dir/video_mrr.yuv
ffmpeg -video_size $size -r 25 -i $dir/video_mrr.yuv -i $dir/audio_mrr.wav -c copy "$3" 2> /dev/null
rm -r $dir