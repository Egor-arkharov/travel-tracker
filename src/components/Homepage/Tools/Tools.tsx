import styles from "./Tools.module.scss";
import Header from "@/components/UI/Header/Header";

const toolItems = [
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
  {
    title: "Search by name",
    description: "Find your trip in seconds using built-in search.",
    video: "search",
  },
];

const Tools = () => {
  return (
    <section className={styles.section}>
      <Header title="Powerful tools" icon="ship" />

      <div className={styles.grid}>
        {toolItems.map((tool, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.videoWrap}>
              <video
                className={styles.video}
                src={`/videos/${tool.video}.mp4`}
                autoPlay
                loop
                muted
                playsInline
                poster={`/videos/${tool.video}.jpg`}
              />
            </div>

            <div className={styles.content}>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
