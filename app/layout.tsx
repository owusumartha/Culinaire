import './globals.css';
import './styles.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Culinaire Kitchenware',
  description: 'Premium kitchenware store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
