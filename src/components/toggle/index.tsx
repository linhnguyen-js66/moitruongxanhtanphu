import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectLanguage } from '@/stores/globalSlice';

import { TextBase } from '../text';
import { checkedIcon, uncheckedIcon } from './icon';
import ReactSwitch from './reactSwitch';
import type { ToggleTypes } from './type';

const Component = (props: ToggleTypes) => {
  const {
    label,
    isTranslate,
    disabled = false,
    offColor = '#A7A7A7',
    onColor = '#4F881E',
    offHandleColor = '#FFFF',
    onHandleColor = '#FFFF',
    boxShadow = null,
    activeBoxShadow = '0 0 2px 3px',
    height = 28,
    width = 56,
    textActive = '#fff',
    textColor = '#fff',
  } = props;
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const getTextWidth = useCallback(
    (text: string, fontSize: number) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = `${fontSize}px Inter`; // Thay đổi font family nếu cần
      const metrics = context?.measureText(text);

      return metrics?.width || 0;
    },
    [t]
  );

  const renderLabel = useCallback(
    (active?: Boolean) => {
      if (label) {
        return (
          <div
            className={`flex size-full ${language == 'en' && 'translate-x-1/2'} items-center justify-center`}
          >
            <TextBase
              id="label-toggle"
              style={{
                color: active ? textActive : textColor,
              }}
              // eslint-disable-next-line tailwindcss/no-custom-classname
              preset={`${active ? 'body-text-16-bold' : 'body-text-16-regular'}`}
            >
              {isTranslate ? t(label) : label}
            </TextBase>
          </div>
        );
      }
      return <div />;
    },
    [isTranslate, label, language, t, textActive, textColor]
  );
  if (label) {
    return (
      <ReactSwitch
        disable={disabled}
        offColor={offColor}
        onColor={onColor}
        offHandleColor={offHandleColor}
        uncheckedIcon={renderLabel(props?.checked)}
        checkedIcon={renderLabel(props?.checked)}
        onHandleColor={onHandleColor}
        boxShadow={boxShadow}
        activeBocShadow={activeBoxShadow}
        {...props}
        onChange={props?.onToggle}
        width={getTextWidth(label, 16) + 64}
        height={height}
        checkedHandleIcon={
          <div className="flex h-[100%] items-center justify-center">
            {props?.checkedHandleIcon}
          </div>
        }
        uncheckedHandleIcon={
          <div className="flex h-[100%] items-center justify-center">
            {props?.uncheckedHandleIcon}
          </div>
        }
      />
    );
  }
  return (
    <ReactSwitch
      disable={disabled}
      offColor={offColor}
      onColor={onColor}
      offHandleColor={offHandleColor}
      uncheckedIcon={uncheckedIcon}
      checkedIcon={checkedIcon}
      onHandleColor={onHandleColor}
      boxShadow={boxShadow}
      activeBocShadow={activeBoxShadow}
      {...props}
      onChange={props?.onToggle}
      height={height}
      width={width}
      checkedHandleIcon={
        <div className="flex h-[100%] items-center justify-center">{props?.checkedHandleIcon}</div>
      }
      unCheckedHandleIcon={
        <div className="flex h-[100%] items-center justify-center">
          {props?.uncheckedHandleIcon}
        </div>
      }
    />
  );
};

export const Toggle = memo(Component, isEqual);
