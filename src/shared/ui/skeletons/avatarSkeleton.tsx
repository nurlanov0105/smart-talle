"use client";

import React from "react";

import styles from "./styles.module.scss";
import { useThemeStore } from "@/shared/store/themeStore";

const AvatarSkeleton = () => {
   const theme = useThemeStore((state) => state.theme);
   return (
      <div className={styles.skeleton}>
         <div className={styles.skeleton__avatar} />
         <div className={styles.skeleton__info}>
            <h4 className={styles.skeleton__name} />
            <div>
               <p className={styles.skeleton__text} />
            </div>
         </div>
      </div>
   );
};

export default AvatarSkeleton;
