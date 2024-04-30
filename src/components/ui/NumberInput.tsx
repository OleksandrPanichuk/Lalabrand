'use client';

import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface INumberInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'max' | 'min' | 'onChange' | 'value'
  > {
  // Кількість символів після крапки
  precision?: number;

  max?: number;
  min?: number;
  value?: number;
  onChange?: (value?: number) => void;
}

//Only works for positive numbers
export const NumberInput = ({
  min,
  max,
  precision = 0,
  value: val,
  onChange,
  ...props
}: INumberInputProps) => {
  const [value, setValue] = useState<string>(val ? `${val}` : '');

  const parseValue = useCallback(
    (newValue: string): string | undefined => {
      if (!newValue.length) {
        return newValue;
      }

      const lastChar = newValue[newValue.length - 1];
      const dots = newValue
        .split('')
        .map((val) => (val === '.' ? val : undefined))
        .filter((val) => !!val);

      if (!precision && dots.length) {
        return;
      }

      let valueToTest = newValue;

      if (dots.length > 1) {
        return;
      }

      if (lastChar === '.') {
        valueToTest = valueToTest.slice(0, valueToTest.length - 1);
      }

      const isValidNumber = /^\d+(\.\d+)?$/.test(valueToTest);

      if (!isValidNumber) {
        return;
      }

      const valueBeforeDot = newValue.split('.')[0];
      const valueAfterDot = newValue.split('.')[1];
      if (valueAfterDot && valueAfterDot.length > precision) return;

      const parsedValue =
        parseFloat(valueBeforeDot) +
        (!!dots.length ? '.' : '') +
        (valueAfterDot || '');

      if (min) {
        const isBiggerThanMinimum = +parsedValue >= min;
        if (!isBiggerThanMinimum) {
          if (parsedValue.toString().length < value.length) {
            return '';
          }

          return `${min}`;
        }
      }

      if (max) {
        const isLessThanMaximum = +parsedValue <= max;
        if (!isLessThanMaximum) return;
      }

      return parsedValue;
    },
    [min, max, precision, value],
  );

  const onValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const typedValue = e.target.value.trim();

      const parsedValue = parseValue(typedValue);

      if (parsedValue === undefined) {
        return;
      }

      setValue(parsedValue);
      onChange?.(parseFloat(parsedValue) || undefined);
    },
    [parseValue, onChange],
  );

  useEffect(() => {
    if (val === parseFloat(value)) {
      return;
    }
    if (!val) {
      return;
    }
    const parsedValue = parseValue(val.toString());
    if (parsedValue) {
      setValue(parsedValue);
    }
  }, [val, parseValue, value]);

  return (
    <input type="text" value={value} onChange={onValueChange} {...props} />
  );
};
