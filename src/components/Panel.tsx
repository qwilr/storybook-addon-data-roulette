import React, { FC, Fragment } from 'react';
import { useChannel, useAddonState } from '@storybook/api';
import { AddonPanel, Button, ActionBar } from '@storybook/components';
import { styled } from '@storybook/theming';
import { Transition, TransitionGroup } from 'react-transition-group';
import { SPIN, SET_ITEMS, RESET, SET_LOADING, REFETCH, SET_ERROR, SET_SHEET, ADDON_ID } from '../constants';
import RouletteIcon from './RouletteIcon';
import Spinner from './Spinner';

interface IPanelProps {
  active: any;
  api: any;
}

export const initialState = {
  spinIndex: 0,
  loading: false,
  items: {},
  error: '',
  sheetUrl: '',
}

const Panel: FC<IPanelProps> = ({ active, api }) => {
  const [addonState, setAddonState] = useAddonState(ADDON_ID, initialState);
  const { spinIndex, loading, items, error, sheetUrl } = addonState;
  const emit = useAddonChannelEvents(addonState, setAddonState);

  const hasItems = !!Object.keys(items?.data || {}).length;

  const handleSpin = () => {
    setAddonState({ ...addonState, spinIndex: spinIndex + 1 });
    emit(SPIN);
  };

  const handleReset = () => {
    setAddonState({ ...addonState, spinIndex: 0 });
    emit(RESET);
  };

  const handleView = () => {
    window.open(sheetUrl, '_blank');
  }

  return (
    <AddonPanel active={active}>
      {hasItems && !error && (
        <Fragment>
          <PanelContent>
            <Button tertiary onClick={handleSpin}>
              <ButtonContent>
                <RouletteIcon
                  style={{ transform: `rotate(${spinIndex * 90}deg)` }}
                />
                Spin the wheel
              </ButtonContent>
            </Button>
          </PanelContent>
          <TransitionGroup>
            {loading && (
              <Transition
                timeout={400}
                onEnter={(node: HTMLElement) => node && node.offsetHeight}
              >
                {(status) => (
                  <PanelOverlay status={status}>
                    <Spinner />
                  </PanelOverlay>
                )}
              </Transition>
            )}
          </TransitionGroup>
          <ActionBar
            actionItems={[
              { title: 'Reset', onClick: handleReset },
              { title: 'View Data', onClick: handleView },
              { title: 'Refetch Data', onClick: () => emit(REFETCH) },
            ]}
          />
        </Fragment>
      )}
      {!hasItems && !loading && !error && (
        <PanelContent>No roulette-able content found</PanelContent>
      )}
      {!!error && (
        <PanelContent>{error}</PanelContent>
      )}
    </AddonPanel>
  );
};

export function useAddonChannelEvents(addonState: any, setAddonState: (state: any) => void) {
  const emit = useChannel({
    [SET_ITEMS]: (items: any[]) => {
      setAddonState({ ...addonState, items });
    },
    [SET_LOADING]: (loading: boolean) => {
      setAddonState({ ...addonState, loading });
    },
    [SET_ERROR]: (error: string) => {
      setAddonState({ ...addonState, error });
    },
    [SET_SHEET]: (sheetUrl: string) => {
      setAddonState({ ...addonState, sheetUrl });
    },
  });

  return emit;
}

const PanelContent = styled.div`
  display: grid;
  grid-gap: 16;
  padding: 32;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100%;
`;

const PanelOverlay = styled.div`
  background-color: ${(props: any) => props.theme.background.content};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.4s ease;
  opacity: ${(props: any) =>
    props.status === 'entering' || props.status === 'entered' ? 1 : 0};
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    display: block;
    position: relative;
    left: -4px;
    margin-right: 2px;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.7;
  }
`;

export default Panel;
