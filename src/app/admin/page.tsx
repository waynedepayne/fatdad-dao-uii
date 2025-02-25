import { redirect } from 'next/navigation';
import Image from 'next/image'

export default function AdminPage() {
  // Redirect /admin to /admin/dashboard
  redirect('/admin/dashboard');
} 