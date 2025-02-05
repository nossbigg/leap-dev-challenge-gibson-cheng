"use client";

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./CommonLayout.module.css";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const CommonLayout: React.FC<Props> = (props) => {
  const { title, children } = props;

  const router = useRouter();
  const onLinkClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flex: 1 }}>
            <b>{title}</b>
          </div>
          <div>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button sx={{ color: "#fff" }} onClick={() => onLinkClick("/")}>
                Home
              </Button>
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
