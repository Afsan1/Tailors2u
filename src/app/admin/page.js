export const dynamic = 'force-dynamic';

import { checkAdminAuthorization } from '@/lib/auth-admin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLogin from '@/components/admin/AdminLogin';

export default async function AdminPage() {
  const authCheck = await checkAdminAuthorization();

  if (!authCheck.authorized) {
    return <AdminLogin />;
  }

  return <AdminDashboard adminUserEmail={authCheck.user?.username || "admin"} />;
}
