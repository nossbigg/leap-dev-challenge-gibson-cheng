"use client";

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./CommonLayout.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  title: string;
  children: React.ReactNode;
  showBackIcon?: boolean;
}

export const CommonLayout: React.FC<Props> = (props) => {
  const { title, children, showBackIcon } = props;

  const router = useRouter();
  const onLinkClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const onBackClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className={styles.titleContainer}>
            {showBackIcon && (
              <Button
                onClick={onBackClick}
                className={styles.backButton}
                sx={{ color: "#fff" }}
              >
                <ArrowBackIcon></ArrowBackIcon>
              </Button>
            )}
            <b>{title}</b>
          </div>
          <div>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => onLinkClick("/prompts")}
              >
                Prompts
              </Button>
            </Box>
          </div>
        </Toolbar>
      </AppBar>

      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};
