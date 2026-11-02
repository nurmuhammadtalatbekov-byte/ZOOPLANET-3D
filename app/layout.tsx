
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZOOPLANET 3D | Hayvonot olami',
  description: 'Bolalar uchun interaktiv 3D hayvonot olami',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
