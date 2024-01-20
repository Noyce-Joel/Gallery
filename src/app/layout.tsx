import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { fetchData } from "./components/actions";
import SessionWrapper from "./components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });
export type Album = {
  name: string;
  path: string;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { results, usage } = await fetchData();

  return (
    <SessionWrapper>
      <html lang="en">
        <body id='body' className={inter.className}>
          <div className="flex">
            <Nav rootFolders={results} usage={usage} />
          </div>
          <div className="flex w-screen h-screen overflow-scroll justify-center">
            {children}
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
