"use client";

import Tippy from "@tippyjs/react";
import Link from "next/link";

import styles from "./ModeTooltip.module.scss";

import { useAuth } from "@/hooks/useAuth";
import { NoticeIcon } from "@/components/icons";

interface ModeTooltipProps {
  mode: "demo" | "auth";
}

const ModeTooltip = ({ mode }: ModeTooltipProps) => {
  const { isLoggedIn, login } = useAuth();

  if (mode === "auth" && isLoggedIn) {
    return null;
  }

  const demoContent = (
    <div className={styles.tooltipContent}>
      <p>
        You’re viewing a&nbsp;<b>demo collection</b>.
      </p>
      <p>
        To see your own trips go to{" "}
        <Link href="/trips" className={styles.link}>
          My&nbsp;Trips
        </Link>
      </p>
    </div>
  );

  const authContent = (
    <div className={styles.tooltipContent}>
      <p>
        You are currently in&nbsp;<b>Demo mode</b>.
      </p>
      <p>
        Your data is&nbsp;saved only in&nbsp;your browser and may be&nbsp;
        <strong>lost</strong>.
      </p>
      <p>
        Please{" "}
        <button onClick={login} className={styles.loginButton}>
          log in
        </button>{" "}
        to&nbsp;save your trips permanently.
      </p>
    </div>
  );

  const content = mode === "demo" ? demoContent : authContent;

  return (
    <Tippy
      content={content}
      interactive
      arrow={false}
      placement="top"
      duration={0}
      trigger="mouseenter click"
      hideOnClick
      appendTo={document.body}
      className={styles.tooltip}
    >
      <button
        type="button"
        className={styles.tooltipButton}
        aria-label={`${mode === "demo" ? "Demo" : "Auth"} notice`}
      >
        <NoticeIcon width={40} height={40} />
      </button>
    </Tippy>
  );
};

export default ModeTooltip;
