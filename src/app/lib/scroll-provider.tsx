"use client";
import React, { PropsWithChildren } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

const Lenis = ({ children }: any) => {
	return (
		<ReactLenis
			options={{ duration: 2, autoResize: true }}
			>
			{children}
		</ReactLenis>
  );
};

export default Lenis;