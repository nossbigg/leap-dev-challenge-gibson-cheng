"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  path: string;
  wait?: number;
}

export const Redirect: React.FC<Props> = (props) => {
  const { path, wait } = props;

  const router = useRouter();
  useEffect(() => {
    if (wait) {
      setTimeout(() => {
        router.push(path);
      }, wait);
      return;
    }

    router.push(path);
  });

  return <></>;
};
