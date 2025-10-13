"use client";

import Tippy from "@tippyjs/react";
import { useAuth } from "@/hooks/useAuth";
import { NoticeIcon } from "@/components/icons";
import styles from "./DemoTooltip.module.scss";

interface DemoTooltipProps {
  size?: number;
}

const DemoTooltip = ({ size = 40 }: DemoTooltipProps) => {
  const { isLoggedIn, login } = useAuth();

  if (isLoggedIn === true) return null;

  const content = (
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
          <b>log in</b>
        </button>{" "}
        to&nbsp;save your trips permanently.
      </p>
    </div>
  );

  return (
    <Tippy
      content={content}
      interactive
      arrow={false}
      placement="top"
      duration={0}
      className={styles.tooltip}
    >
      <button type="button" className={styles.noticeButton} aria-label="Demo mode notice">
        <NoticeIcon width={size} height={size} />
      </button>
    </Tippy>
  );
};

export default DemoTooltip;
