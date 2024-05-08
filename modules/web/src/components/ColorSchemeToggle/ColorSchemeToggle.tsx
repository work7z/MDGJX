import { ActionIcon, Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconAdjustments, IconMoon, IconSun } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <ActionIcon variant='default' size='lg' aria-label="Theme" onClick={() => {
      setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
    }}>
      {
        colorScheme === 'dark' ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />
      }
    </ActionIcon>
  );
}
