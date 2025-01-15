import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h2>Welcome to the Contact Management System</h2>
      <Link href="/contacts">Go to Contacts</Link>
    </div>
  );
}
