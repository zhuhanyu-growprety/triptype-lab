import { Outlet } from 'react-router-dom';

export default function AppShell() {
  return (
    <div className="app-shell">
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
