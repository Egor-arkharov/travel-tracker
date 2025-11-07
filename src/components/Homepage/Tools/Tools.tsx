"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import styles from "./Tools.module.scss";

import Header from "@/components/UI/Header/Header";

const toolItems = [
  { title: "Search by&nbsp;name", description: "Find your trip in&nbsp;seconds using built-in search.", video: "search" },
  { title: "Sort by&nbsp;country or&nbsp;budget", description: "Quickly organize your trips by&nbsp;different parameters.", video: "sort" },
  { title: "Switch between views", description: "Toggle between grid and list layouts to&nbsp;match your style.", video: "view" },
  { title: "Explore on&nbsp;map", description: "See all your trips on&nbsp;an&nbsp;interactive world map.", video: "map" },
];

const VIDEO_SPEED = 0.7;

function AutoVideo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    let loaded = false;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (!entry) return;

      if (entry.isIntersecting) {
        if (!loaded) {
          const dataSrc = video.getAttribute("data-src");
          if (dataSrc && !video.getAttribute("src")) {
            video.setAttribute("src", dataSrc);
          }
          loaded = true;
          video.load();
        }

        const setSpeed = () => (video.playbackRate = VIDEO_SPEED);
        const tryPlay = async () => {
          try {
            await video.play();
            video.playbackRate = VIDEO_SPEED;
          } catch {}
        };

        if (video.readyState >= 2) {
          tryPlay();
        } else {
          const onCanPlay = () => {
            video.removeEventListener("canplay", onCanPlay);
            tryPlay();
          };
          video.addEventListener("canplay", onCanPlay, { once: true });
        }
        video.addEventListener("play", setSpeed, { once: true });
      } else {
        if (!video.paused) video.pause();
      }
    };

    const io = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "200px 0px",
      threshold: 0.2,
    });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={styles.videoWrap}>
      <video
        ref={videoRef}
        className={className ?? styles.video}
        data-video={name}
        data-src={`/videos/${name}.mp4`}
        preload="none"
        autoPlay
        loop
        muted
        playsInline
        poster={`/videos/${name}.jpg`}
        onLoadedMetadata={(e) => (e.currentTarget.playbackRate = VIDEO_SPEED)}
        onPlay={(e) => (e.currentTarget.playbackRate = VIDEO_SPEED)}
      />
    </div>
  );
}

const Tools = () => {
  return (
    <section>
      <Header title="Powerful tools" icon="ship" />

      <div className={styles.grid}>
        {toolItems.map((tool, index) => (
          <motion.div
            key={tool.video}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
          >
            <AutoVideo name={tool.video} />

            <div className={styles.content}>
              <h3 dangerouslySetInnerHTML={{ __html: tool.title }} />
              <p dangerouslySetInnerHTML={{ __html: tool.description }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
