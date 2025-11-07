// TravelCardActions.tsx

"use client";

import Link from "next/link";
import Tippy from "@tippyjs/react";
import { useRouter } from "next/navigation";

import styles from "./TravelCard.module.scss";

import { Travel } from "@/types/travel";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  travel: Travel;
  onDelete?: () => void;
}

const TravelCardActions = ({ travel, onDelete }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const { login } = useAuth();
  const router = useRouter();

  const isMock = travel.meta.isMock;
  const isLoggedIn = Boolean(user);

  const isDisabled = !isLoggedIn || isMock;

  const handleLogin = async () => {
    try {
      await login();
      router.push("/trips");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const tooltipContent = isMock ? (
    "This is just a demo trip and cannot be edited or removed."
  ) : !isLoggedIn ? (
    <span>
      Available only for authorized users.{" "}
      <button onClick={handleLogin} className={styles.loginButton}>
        Log in
      </button>
    </span>
  ) : null;

  const EditButton = (
    <Link
      href={`/edit/${travel.id}`}
      className="button button--triary"
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
    >
      Edit
    </Link>
  );

  const RemoveButton = (
    <button
      className="button button--danger"
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled && onDelete) onDelete();
      }}
    >
      Remove
    </button>
  );

  const wrapWithTippy = (content: React.ReactNode, child: React.ReactNode) =>
    content ? (
      <Tippy
        content={content}
        interactive={true}
        arrow={false}
        maxWidth={'null'}
        duration={0} 
        appendTo={document.body}
        className={styles.tooltip}
      >
        <span>{child}</span>
      </Tippy>
    ) : (
      child
    );

  return (
    <div className={styles.actions}>
      {wrapWithTippy(tooltipContent, EditButton)}
      {wrapWithTippy(tooltipContent, RemoveButton)}
    </div>
  );
};

export default TravelCardActions;
