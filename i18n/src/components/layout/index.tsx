import classNames from "classnames/bind";
import { FC, PropsWithChildren } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import styles from "./styles.module.css";

const cx = classNames.bind(styles);

export const Layout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <Header />
        <main className={cx("main")}>{children}</main>
        <Footer />
    </>
);
