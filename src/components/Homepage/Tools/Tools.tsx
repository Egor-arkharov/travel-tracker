"use client";

import { motion } from "framer-motion";
import styles from "./Tools.module.scss";
import Header from "@/components/UI/Header/Header";

const toolItems = [
  {
    title: "Search by name",
    description: "Find your trip in seconds using built-in search.",
    video: "search",
  },
  {
    title: "Sort by country or budget",
    description: "Quickly organize your trips by different parameters.",
    video: "sort",
  },
  {
    title: "Switch between views",
    description: "Toggle between grid and list layouts to match your style.",
    video: "view",
  },
  {
    title: "Explore on map",
    description: "See all your trips on an interactive world map.",
    video: "map",
  },
];

const VIDEO_SPEED = 0.8;

const Tools = () => {

  return (
    <section className={styles.section}>
      <Header title="Powerful tools" icon="ship" />

      <div className={styles.grid}>
        {toolItems.map((tool, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} 
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
          >
            <div className={styles.videoWrap}>
              <video
                className={styles.video}
                data-video={tool.video}
                src={`/videos/${tool.video}.mp4`}
                autoPlay
                loop
                muted
                playsInline
                poster={`/videos/${tool.video}.jpg`}
                onLoadedMetadata={(e) =>
                  (e.currentTarget.playbackRate = VIDEO_SPEED)
                }
                onPlay={(e) => (e.currentTarget.playbackRate = VIDEO_SPEED)}
              />
            </div>

            <div className={styles.content}>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
