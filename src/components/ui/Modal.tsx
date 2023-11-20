"use client";

import React, { useEffect, useState } from "react";
import { CloseSvg } from "@/assets/svg";
import styles from "@/styles/Modal.module.scss";

interface Props {
  children: React.ReactNode;
  open: boolean;
  title?: string;
}

export default function Modal({ children, open, title }: Props) {
  const [isClose, setIsClose] = useState<boolean>(true);
  const close = isClose ? open : !open;

  useEffect(() => {
    if (open) {
      setIsClose(true);
    }
  }, [open]);

  useEffect(() => {
    if (close) {
      document.body.classList.add("modal_open");
    } else {
      document.body.classList.remove("modal_open");
    }
    return () => {
      document.body.classList.remove("modal_open");
    };
  }, [close]);

  return (
    <>
      <div
        className={
          close
            ? `${styles.modal_wrappper} ${styles.active}`
            : styles.modal_wrappper
        }
        onClick={() => setIsClose(!isClose)}>
        <div className={styles.box} onClick={(e) => e.stopPropagation()}>
          <div className={styles.head}>
            <h2 className={styles.title}>{title}</h2>

            <CloseSvg
              className={styles.close}
              onClick={() => setIsClose(!isClose)}
            />
          </div>

          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
}
