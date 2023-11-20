"use client";

import React, { useEffect, useState } from "react";
import Account from "@/components/ui/Account";
import CreateTopic from "@/components/ui/CreateTopic";
import * as API from "../../../(api)";
import { errorNotification } from "@/lib/utils/notification";
import { WedevxSvg } from "@/assets/svg";
import styles from "@/styles/Home.module.scss";

type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isVerified: boolean;
  email: string;
  password: string;
  resetPasswordSecret?: string | null;
  role: UserRole;
  requests: number;
  lastRequest?: Date | null;
  firstName: string;
  lastName: string;
  bio?: string | null;
  photo?: string | null;
  phone?: string | null;
  refreshToken?: string | null;
};

interface Props {
  user: User;
  session: string;
}

export default function HomeClient({ user, session }: Props) {
  const [topicsLength, setTopicsLength] = useState<number>(0);
  const [usersLength, setUsersLength] = useState<number>(0);
  const [videosLength, setVideosLength] = useState<number>(0);

  const getTopics = async () => {
    try {
      const data = await API.topics.getAll(session);

      setTopicsLength(data.length);
    } catch (e) {
      errorNotification("Something went wrong");
      console.error(e);
    }
  };

  const getUsers = async () => {
    try {
      const data = await API.users.getAll(session);

      setUsersLength(data.count);
    } catch (e) {
      errorNotification("Something went wrong");
      console.error(e);
    }
  };

  const getVideos = async () => {
    try {
      const data = await API.videos.getAll(session);

      setVideosLength(data.length);
    } catch (e) {
      errorNotification("Something went wrong");
      console.error(e);
    }
  };

  useEffect(() => {
    getTopics();
    getUsers();
    getVideos();
  }, [getTopics, getUsers, getVideos]);

  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.head}>
          <WedevxSvg className={styles.icon} />

          <Account user={user} />
        </div>

        <div className={styles.content}>
          <div className={styles.right}>
            <div className={styles.wrapper}>
              <div className={styles.panel}>
                <div className={`${styles.table} ${styles.users}`}>
                  Users: <span>{usersLength}</span>
                </div>

                <div className={`${styles.table} ${styles.topics}`}>
                  Topics: <span>{topicsLength}</span>
                </div>

                <div className={`${styles.table} ${styles.videos}`}>
                  Videos: <span>{videosLength}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.left}>
            <CreateTopic session={session} />
          </div>
        </div>
      </div>
    </>
  );
}
