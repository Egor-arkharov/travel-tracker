"use client";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import styles from "./TechStack.module.scss";

type SvgIcon = React.FC<React.SVGProps<SVGSVGElement>>;

type StackItem = { 
  name: string; 
  Icon: SvgIcon;
};

import {
  FirebaseIcon,
  FramerMotionIcon,
  GoogleMapsIcon,
  NextJSIcon,
  ReactIcon,
  ReduxIcon,
  SCSSIcon,
  TypeScriptIcon,
  JavaScriptIcon,
} from "@/components/icons";

const baseStack: StackItem[] = [
  { name: "Next.js", Icon: NextJSIcon },
  { name: "React", Icon: ReactIcon },
  { name: "TypeScript", Icon: TypeScriptIcon },
  { name: "Redux", Icon: ReduxIcon },
  { name: "SCSS", Icon: SCSSIcon },
  { name: "Firebase", Icon: FirebaseIcon },
  { name: "JavaScript", Icon: JavaScriptIcon },
  { name: "Framer Motion", Icon: FramerMotionIcon },
  { name: "Google Maps", Icon: GoogleMapsIcon },
];

const STEP_DEG = 20;
const START_DEG = 0;
const WHEEL_SENS = 0.15;

export default function TechStack() {
  const stackIcons = [...baseStack, ...baseStack];
  const count = stackIcons.length; // 18

  const wheelRef = useRef<HTMLDivElement | null>(null);
  const [rot, setRot] = useState(START_DEG);
  const draggingRef = useRef(false);
  const lastAngleRef = useRef(0);

  useEffect(() => {
    wheelRef.current?.style.setProperty("--wheel-rot", `${rot}deg`);
  }, [rot]);

  // active
  const activeIndex = useMemo(() => {
    const deg = ((-rot % 360) + 360) % 360;   // 0..360
    return Math.round(deg / STEP_DEG) % count;
  }, [rot, count]);

  // angle
  const getPointerAngle = useCallback((clientX: number, clientY: number) => {
    const el = wheelRef.current!;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = cy - clientY;
    const rad = Math.atan2(dy, dx);
    return ((rad * 180) / Math.PI + 90 + 360) % 360;
  }, []);

  // wheel
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const onWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      setRot(prev => prev + e.deltaY * WHEEL_SENS);
    };

    el.addEventListener("wheel", onWheelNative, { passive: false });

    return () => el.removeEventListener("wheel", onWheelNative as EventListener);
  }, []);

  // drag
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    draggingRef.current = true;
    lastAngleRef.current = getPointerAngle(e.clientX, e.clientY);
  }, [getPointerAngle]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const a = getPointerAngle(e.clientX, e.clientY);
    let delta = a - lastAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    lastAngleRef.current = a;
    setRot(prev => prev + delta);
  }, [getPointerAngle]);

  const onPointerUp = useCallback(() => {
    draggingRef.current = false;
    setRot(prev => Math.round(prev / STEP_DEG) * STEP_DEG);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        ref={wheelRef}
        className={styles.wheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {stackIcons.map(({ name, Icon }, i) => (
          <div
            key={`${name}-${i}`}
            className={styles.slide}
            data-active={i === activeIndex}
            style={{ "--rotation": `${i * STEP_DEG}deg` } as React.CSSProperties}
          >
            <div className={styles.inner}>
              <div className={styles.iconWrapper}>
                <Icon className={styles.icon} width={110} height={110} />
              </div>
              <p className={styles.name}>{name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
