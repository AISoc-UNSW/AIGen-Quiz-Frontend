#!/usr/bin/env bash
# Download 7-second video clips (no audio, HD) using yt-dlp
# Naming: Video_AI_1..10, Video_Real_1..10 (same as assets/Videos)
#
# Requires: yt-dlp, ffmpeg (for segment extraction)
#   brew install yt-dlp ffmpeg

set -e
cd "$(dirname "$0")"

if ! command -v ffmpeg &>/dev/null; then
  echo "ERROR: ffmpeg is required for segment extraction. Install with: brew install ffmpeg"
  exit 1
fi

# Video only, HD (prefer 1080p mp4), no audio
FMT='bestvideo[height<=1080][ext=mp4]/bestvideo[height<=1080]/bestvideo[ext=mp4]/bestvideo'

# --- AI Clips ---
yt-dlp -f "$FMT" --no-audio --download-sections '*0-7' \
  -o "Video_AI_1.mp4" "https://www.youtube.com/watch?v=gcZwE5cM4xs"

yt-dlp -f "$FMT" --no-audio --download-sections '*2:44.5-2:51.5' \
  -o "Video_AI_2.mp4" "https://www.youtube.com/watch?v=ta1aSVk95HE"

yt-dlp -f "$FMT" --no-audio --download-sections '*3:16.5-3:23.5' \
  -o "Video_AI_3.mp4" "https://www.youtube.com/watch?v=ta1aSVk95HE"

yt-dlp -f "$FMT" --no-audio --download-sections '*4:12.5-4:19.5' \
  -o "Video_AI_4.mp4" "https://www.youtube.com/watch?v=ta1aSVk95HE"

yt-dlp -f "$FMT" --no-audio --download-sections '*6:12.5-6:19.5' \
  -o "Video_AI_5.mp4" "https://www.youtube.com/watch?v=ta1aSVk95HE"

yt-dlp -f "$FMT" --no-audio --download-sections '*8:29-8:36' \
  -o "Video_AI_6.mp4" "https://www.youtube.com/watch?v=ta1aSVk95HE"

yt-dlp -f "$FMT" --no-audio --download-sections '*13:04.5-13:11.5' \
  -o "Video_AI_7.mp4" "https://www.youtube.com/watch?v=ta1aSVk95HE"

yt-dlp -f "$FMT" --no-audio --download-sections '*13:29-13:36' \
  -o "Video_AI_8.mp4" "https://www.youtube.com/watch?v=ta1aSVk95HE"

yt-dlp -f "$FMT" --no-audio --download-sections '*2:16.5-2:23.5' \
  -o "Video_AI_9.mp4" "https://www.youtube.com/watch?v=5IOnqo98qhs"

yt-dlp -f "$FMT" --no-audio --download-sections '*5:08.5-5:15.5' \
  -o "Video_AI_10.mp4" "https://www.youtube.com/watch?v=5IOnqo98qhs"

# --- Real Clips ---
yt-dlp -f "$FMT" --no-audio --download-sections '*25:34.5-25:41.5' \
  -o "Video_Real_1.mp4" "https://www.youtube.com/watch?v=gD5Rxr_5Jws"

yt-dlp -f "$FMT" --no-audio --download-sections '*8:40-8:47' \
  -o "Video_Real_2.mp4" "https://www.youtube.com/watch?v=gWZ8PwO0CkQ"

yt-dlp -f "$FMT" --no-audio --download-sections '*14:06.5-14:13.5' \
  -o "Video_Real_3.mp4" "https://www.youtube.com/watch?v=39ColarOWKo"

yt-dlp -f "$FMT" --no-audio --download-sections '*16:58-17:05' \
  -o "Video_Real_4.mp4" "https://www.youtube.com/watch?v=39ColarOWKo"

yt-dlp -f "$FMT" --no-audio --download-sections '*7:10.5-7:17.5' \
  -o "Video_Real_5.mp4" "https://www.youtube.com/watch?v=cRienev1J3Q"

yt-dlp -f "$FMT" --no-audio --download-sections '*0:35-0:42' \
  -o "Video_Real_6.mp4" "https://www.youtube.com/watch?v=ZOZOqbK86t0"

yt-dlp -f "$FMT" --no-audio --download-sections '*0:16-0:23' \
  -o "Video_Real_7.mp4" "https://www.youtube.com/watch?v=uOcJL5BGCKQ"

yt-dlp -f "$FMT" --no-audio --download-sections '*3:06-3:13' \
  -o "Video_Real_8.mp4" "https://www.youtube.com/watch?v=1xLIyFaSPPI"

yt-dlp -f "$FMT" --no-audio --download-sections '*22:14.5-22:21.5' \
  -o "Video_Real_9.mp4" "https://www.youtube.com/watch?v=1xLIyFaSPPI"

yt-dlp -f "$FMT" --no-audio --download-sections '*15:35-15:42' \
  -o "Video_Real_10.mp4" "https://www.youtube.com/watch?v=1xLIyFaSPPI"

echo "All clips downloaded."
