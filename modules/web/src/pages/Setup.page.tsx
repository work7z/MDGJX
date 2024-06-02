import { GeneralLayout, useWrapWithTitle } from '@/components/Layout/Layout';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure, useDocumentTitle } from '@mantine/hooks';

export function SetupPage() {
  useWrapWithTitle(`工作台`)
  return (
    <div>欢迎来到秒达工具箱，地址是{location.href}</div>
  );
}