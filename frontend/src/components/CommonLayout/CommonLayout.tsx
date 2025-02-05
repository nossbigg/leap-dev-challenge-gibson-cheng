"use client";

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  title: string;
  children: React.ReactNode;
  showBackIcon?: boolean;
}

// ref: https://v3.mui.com/getting-started/page-layout-examples/
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
          <div className='flex flex-1 items-center'>
            {showBackIcon && (
              <Button
                onClick={onBackClick}
                sx={{ color: "#fff" }}
              >
                <ArrowBackIcon></ArrowBackIcon>
              </Button>
            )}
            <span className="font-bold">{title}</span>
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

      <div className='py-5 px-10'>{children}</div>
    </div>
  );
};
