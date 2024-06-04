import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React from 'react';

import ScrollBox from '@/components/molecules/ScrollBox';
import locales, { defaultLocale } from '@/i18n';

export default function LanguageSelector() {
  const t = useTranslations();

  const router = useRouter();

  const [listboxOpen, setListboxOpen] = React.useState<boolean>(false);

  return (
    <Select
      value={router.locale}
      onChange={(event, newValue) => {
        router.push('/', '/', { locale: newValue || defaultLocale });
      }}
      slotProps={{
        listbox: {
          placement: 'top-end',
        },
      }}
      listboxOpen={listboxOpen}
      onListboxOpenChange={() => setListboxOpen(true)}
      onClose={() => setListboxOpen(false)}
      variant="outlined"
      size="sm"
    >
      <ScrollBox dependency={listboxOpen}>
        {Object.keys(locales).map((locale, index) => (
          <Option key={index} value={locale}>
            {t(`languages.${locale}`)}
          </Option>
        ))}
      </ScrollBox>
    </Select>
  );
}
