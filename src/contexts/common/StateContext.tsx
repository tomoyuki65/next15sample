"use client";

import { getSessionCookie } from "@/libs/cookie/cookie";
import { createContext, useContext, useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

interface StateContext {
  windowSize: WindowSize;
  isLoding: boolean;
  isLogin: boolean;
  token: string;
  setToken: (token: string) => void;
}

type StateContextProviderProps = {
  children: React.ReactNode;
};

const StateCtx = createContext({} as StateContext);

export const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [isLoding, setIsLoding] = useState(true);
  const [isLogin, setIsLogin] = useState(false); /* eslint-disable-line */
  const [token, setToken] = useState("");
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!isLogin) {
      (async () => {
        try {
          const sessionCookie = await getSessionCookie();

          if (sessionCookie) {
            setToken(sessionCookie);
            // 再認証処理
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoding(false);
        }
      })();
    }

    // クライアントサイドのみ実行
    if (typeof window !== "undefined") {
      // Windowのサイズを取得して設定
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      handleResize();

      // 画面サイズが変更されたら再取得
      window.addEventListener("resize", handleResize);

      // クリーンアップ関数
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    if (!isLoding) {
      if (isLogin) {
        // ログイン済みの場合
      } else {
        // 未ログインの場合
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isLoding]);

  const StateContextValues = {
    windowSize: windowSize,
    isLoding: isLoding,
    isLogin: isLogin,
    token: token,
    setToken: setToken,
  };

  return <StateCtx.Provider value={StateContextValues}>{children}</StateCtx.Provider>;
};

export const useStateContext = () => useContext(StateCtx);
