import { GeneralLayout, useWrapWithTitle } from '@/components/Layout/Layout';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure, useDocumentTitle } from '@mantine/hooks';

export function SetupPage() {
  useWrapWithTitle(`工作台`)
  return (
    <div>this is setup</div>
  );
}