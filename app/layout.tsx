import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bug Tracker — Group 6',
  description: 'Report a bug or submit feedback for the TCSS 460 Group 6 API.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
