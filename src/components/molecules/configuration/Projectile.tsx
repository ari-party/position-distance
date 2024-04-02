import todec from '2dec';
import UnfoldMore from '@mui/icons-material/UnfoldMore';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import DataContainer from '../../atoms/configuration/DataContainer';
import ScrollBox from '../ScrollBox';
import { projectiles } from '@/config/projectiles';
import { useDataStore } from '@/stores/data';

import type { Projectile } from '@/config/projectiles';

export default function ProjectileSelection() {
  const tooltip = React.useRef<HTMLDivElement | null>(null);
  const selectionChanged = React.useRef<number>(0);
  const [selectionOpen, setSelectionOpen] = React.useState<boolean>(false);
  const [selectionTab, setSelectionTab] = React.useState<number>(0);
  const [projectileIndex, setProjectileIndex] = useDataStore((s) => [
    s.projectileIndex,
    s.setProjectileIndex,
  ]);

  function canChangeSelection() {
    const can = selectionChanged.current + 250 < performance.now();

    if (!can) return false;

    selectionChanged.current = performance.now();

    return true;
  }

  const projectileCategories = React.useMemo(() => {
    const categories: Record<string, Projectile[]> = {
      // Add array in advance so that it always will be index 0
      no_name: [],
    };

    for (const projectile of projectiles) {
      const gunName = projectile.gun?.name || 'no_name';
      if (!categories[gunName]) categories[gunName] = [];
      categories[gunName].push(projectile);
    }

    return categories;
  }, []);

  useOnClickOutside(
    tooltip,
    () => {
      if (selectionOpen && canChangeSelection()) setSelectionOpen(false);
    },
    'mouseup',
  );

  React.useEffect(
    () =>
      setSelectionTab(
        Object.keys(projectileCategories).findIndex((categoryKey) =>
          projectileCategories[categoryKey].find(
            (projectile) => projectile === projectiles[projectileIndex],
          ),
        ),
      ),
    [setSelectionTab, projectileCategories, projectileIndex],
  );

  return (
    <DataContainer>
      <Typography level="title-md">Projectile</Typography>

      <Tooltip
        slotProps={{ root: { ref: tooltip, open: selectionOpen } }}
        placement="top-end"
        size="lg"
        variant="outlined"
        keepMounted
        sx={(theme) => ({
          backgroundColor: theme.palette.background.body,
          paddingLeft: 0,
          paddingRight: 0,
        })}
        title={
          <Tabs
            orientation="vertical"
            size="sm"
            sx={{ backgroundColor: 'unset', maxHeight: 200 }}
            value={selectionTab}
            onChange={(event, newTab) => setSelectionTab(newTab as number)}
          >
            {Object.values(projectileCategories).map((category, index) => (
              <TabPanel value={index} key={index} sx={{ padding: 0 }}>
                <ScrollBox dependency={selectionOpen}>
                  <Stack direction="column">
                    {category.map((projectile, thisIndex) => {
                      const trueIndex = projectiles.indexOf(projectile);

                      return (
                        <Button
                          key={thisIndex}
                          color="neutral"
                          variant="plain"
                          sx={(theme) => ({
                            borderRadius: 0,
                            fontWeight: 400,

                            ...(projectileIndex === trueIndex && {
                              backgroundColor:
                                theme.palette.neutral.plainActiveBg,
                            }),
                          })}
                          size="sm"
                          onClick={() => setProjectileIndex(trueIndex)}
                        >
                          <Stack
                            sx={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              gap: 2,
                            }}
                          >
                            <Typography>{projectile.name}</Typography>

                            <Typography level="body-sm">
                              {todec(projectile.velocity)} m/s
                            </Typography>
                          </Stack>
                        </Button>
                      );
                    })}
                  </Stack>
                </ScrollBox>
              </TabPanel>
            ))}

            <TabList underlinePlacement="left">
              <ScrollBox dependency={selectionOpen}>
                {Object.keys(projectileCategories).map((key, index) => (
                  <Tab
                    variant="plain"
                    color="neutral"
                    key={index}
                    indicatorPlacement="left"
                    sx={{
                      width: '100%',

                      ...(projectileCategories[key].length < 1 && {
                        display: 'none',
                      }),
                    }}
                  >
                    {key === 'no_name' ? 'Other' : key}
                  </Tab>
                ))}
              </ScrollBox>
            </TabList>
          </Tabs>
        }
      >
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            if (!selectionOpen && canChangeSelection()) setSelectionOpen(true);
          }}
          sx={(theme) => ({
            backgroundColor: theme.palette.background.surface,
            paddingInline: '0.75rem',
            fontSize: 16,
            fontWeight: 400,
          })}
          endDecorator={
            <UnfoldMore
              style={{
                color: 'var(--joy-palette-text-icon)',
              }}
            />
          }
        >
          {projectiles[projectileIndex]?.name ?? 'Select a projectile...'}
        </Button>
      </Tooltip>
    </DataContainer>
  );
}
