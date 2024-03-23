import {
  NovaposhtaShipping,
  StandardShipping,
  UkrposhtaShipping,
} from '@/components/screens/checkout';
import { ShippingVariant } from '@/shared/types';

type OptionProps = {
  className?:string
}

type TypeVariant = {
  value: ShippingVariant;
  Option: (props: OptionProps) => JSX.Element;
  Form: () => JSX.Element;
};

export const variants: TypeVariant[] = [
  {
    value: 'standard',
    Option: (props:OptionProps) => <StandardShipping.Option {...props} />,
    Form: () => <StandardShipping.Form />,
  },
  {
    value: 'ukrposhta',
    Option: (props:OptionProps) => <UkrposhtaShipping.Option {...props} />,
    Form: () => <UkrposhtaShipping.Form />,
  },
  {
    value: 'novaposhta',
    Form: () => <NovaposhtaShipping.Form />,
    Option: (props:OptionProps) => <NovaposhtaShipping.Option {...props} />,
  },
];
