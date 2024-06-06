import { GeneralLayout, useWrapWithTitle } from '@/containers/Layout/Layout';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure, useDocumentTitle } from '@mantine/hooks';
import { SetupLayout } from './unused-setup/SetupLayout';

export function SetupPage() {
  useWrapWithTitle(`工作台`)
  return (
    <GeneralLayout />
  );
}