import { GeneralLayout } from '@/components/Layout/Layout';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function ToolsPage() {

  return (
    <GeneralLayout

      body={() => {
        return <div> this is API </div>
      }}

    />
  );
}