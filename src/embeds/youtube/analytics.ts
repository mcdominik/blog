interface YouTubePlayer {
  getPlayerState(): number;
  getCurrentTime(): number;
  getDuration(): number;
  addEventListener(name: "onStateChange", listener: (event: { data: number }) => void): void;
}

interface YouTubeEmbed extends HTMLElement {
  getYTPlayer(): Promise<YouTubePlayer>;
}

export function trackYouTubeVideos() {
  const captured = new Set<string>();

  document.querySelectorAll<YouTubeEmbed>("lite-youtube[js-api]").forEach((embed) => {
    let connecting = false;

    const connect = async () => {
      if (connecting) return;
      connecting = true;

      try {
        // Activate before the embed's own click handler so getYTPlayer waits
        // for API loading and player readiness, including on desktop browsers.
        const player = await embed.getYTPlayer();
        const videoId = embed.getAttribute("videoid");
        let timer: number | undefined;
        let started = false;

        const capture = (event: string, percent?: number) => {
          const key = `${videoId}:${event}:${percent ?? ""}`;
          if (captured.has(key)) return;
          captured.add(key);

          window.posthog?.capture(event, {
            video_id: videoId,
            video_title: embed.dataset.title || undefined,
            video_provider: "youtube",
            video_current_time: player.getCurrentTime(),
            video_duration: player.getDuration(),
            page_path: window.location.pathname,
            ...(percent === undefined ? {} : { video_percent: percent }),
          });
        };

        const captureProgress = () => {
          const duration = player.getDuration();
          if (!started || !Number.isFinite(duration) || duration <= 0) return;

          // Milestones describe playhead position, including seeking.
          const percent = (player.getCurrentTime() / duration) * 100;
          for (const milestone of [25, 50, 75]) {
            if (percent >= milestone) capture("video_progress", milestone);
          }
        };

        const stopTimer = () => {
          window.clearInterval(timer);
          timer = undefined;
        };

        const onStateChange = ({ data }: { data: number }) => {
          stopTimer();
          if (data === 1) {
            started = true;
            capture("video_started");
            captureProgress();
            timer = window.setInterval(captureProgress, 1000);
          } else if (started) {
            captureProgress();
            if (data === 0) capture("video_completed", 100);
          }
        };

        player.addEventListener("onStateChange", onStateChange);
        // Playback can start before getYTPlayer resolves.
        onStateChange({ data: player.getPlayerState() });
        window.addEventListener("pagehide", stopTimer);
        window.addEventListener("pageshow", () => {
          onStateChange({ data: player.getPlayerState() });
        });
      } catch (error) {
        console.warn("YouTube video analytics could not initialize", error);
      }
    };

    embed.addEventListener("click", connect, { capture: true });
    embed.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        void connect();
      }
    }, { capture: true });
  });
}
