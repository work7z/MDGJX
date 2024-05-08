import { Layout } from '@/components/Layout/Layout';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function HomePage() {

  return (
    <Layout body={
      <div>this is home page</div>
    } />
  );
}