import React, { FC } from 'react';
import { useChannel, useAddonState } from '@storybook/api';
import { IconButton } from '@storybook/components';
import { styled } from '@storybook/theming';
import { ADDON_ID, SPIN } from '../constants';
import { initialState, useAddonChannelEvents } from './Panel';
import RouletteIcon from "./RouletteIcon";

const Tool: FC = () => {
  const [addonState, setAddonState] = useAddonState(ADDON_ID, initialState);
  const { spinIndex, items, loading, error } = addonState;
  const emit = useAddonChannelEvents(addonState, setAddonState);

  const hasItems = !!Object.keys(items?.data || {}).length;

  const label = 'Spin data roulette';

  const handleSpin = () => {
    emit(SPIN);
    setAddonState({ ...addonState, spinIndex: spinIndex + 1 });
  }

  return (
    <ToolButton
      aria-label={label}
      title={label}
      onClick={handleSpin}
      disabled={!hasItems || loading || error}
    >
      <RouletteIcon style={{ transform: `rotate(${spinIndex * 90}deg)` }} size="small" />
    </ToolButton>
  )
}

const ToolButton = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  svg {
    display: block;
    width: 16px;
    height: 16px;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export default Tool;
