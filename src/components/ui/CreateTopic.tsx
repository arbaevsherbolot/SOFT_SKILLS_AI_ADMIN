"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  errorNotification,
  successNotification,
} from "@/lib/utils/notification";
import * as API from "../../../api";
import Button from "@/components/ui/Button";
import styles from "@/styles/CreateTopic.module.scss";

interface Props {
  session: string;
}

type FormData = {
  title: string;
  date: string;
  prompt: string;
};

export default function CreateTopic({ session }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setLoading(true);

    try {
      const data = await API.topics.create(formData, session);

      if (data) {
        successNotification("Successfully created");
        setValue("date", "");
        setValue("prompt", "");
        setValue("title", "");
        router.refresh();
      }
    } catch (e) {
      errorNotification("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h2 className={styles.title}>Create Topic</h2>

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              <span className={styles.label}>Title</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={loading}
                  className={
                    loading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Tell me about yourself"
                  {...register("title", {
                    required: "Title required",
                    pattern: {
                      value: /^[a-zA-Z0-9 ]+$/,
                      message:
                        "Title must contain only letters, numbers, and spaces",
                    },
                  })}
                />
              </div>

              {errors.title && (
                <span className={styles.error}>{errors.title.message}</span>
              )}
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Date</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={loading}
                  autoComplete="off"
                  className={
                    loading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="17-11-2023"
                  {...register("date", {
                    required: "Date required",
                    pattern: {
                      value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
                      message:
                        "Please enter a valid date in the format DD-MM-YYYY",
                    },
                  })}
                />
              </div>

              {errors.date && (
                <span className={styles.error}>{errors.date.message}</span>
              )}
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Propmt</span>

              <div className={styles.input_wrapper}>
                <textarea
                  disabled={loading}
                  className={
                    loading
                      ? `${styles.input} ${styles.load} ${styles.password}`
                      : `${styles.input} ${styles.password}`
                  }
                  placeholder="Enter a prompt..."
                  {...register("prompt", {
                    required: "Propmt required",
                    maxLength: {
                      value: 8192,
                      message: "Prompt cannot exceed 8192 characters",
                    },
                    minLength: {
                      value: 10,
                      message: "Prompt must contain at least 10 characters",
                    },
                  })}
                />
              </div>

              {errors.prompt && (
                <span className={styles.error}>{errors.prompt.message}</span>
              )}
            </div>

            <Button type="submit" load={loading}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
