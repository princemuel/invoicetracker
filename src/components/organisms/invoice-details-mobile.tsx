import { Invoice } from '@src/@types';
import { icons } from '@src/common';
import { datetime, formatPrice, grandTotal } from '@src/helpers';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { StatusButton, Text } from '../atoms';

type Props = {
  invoice?: Invoice;
};

const InvoiceDetailsMobile = ({ invoice }: Props) => {
  return (
    <React.Fragment>
      <section className='h-container md:hidden'>
        <Link
          to='/invoices'
          className='body-100 mt-20 flex items-center gap-8 font-bold'
        >
          <img src={icons.arrow.left} alt={''} />
          <span>Go back</span>
        </Link>

        <article className='mb-20 mt-10 grid gap-12'>
          <header className='flex items-center justify-between rounded-brand bg-neutral-100 px-10 py-8 shadow-100 dark:bg-brand-700'>
            <Text className='body-100 text-[#858BB2] dark:text-brand-100'>
              Status
            </Text>
            <StatusButton status={invoice?.status} className='px-14 py-6' />
          </header>

          <div className='flex flex-col gap-12 rounded-brand bg-neutral-100 px-10 py-12 shadow-100 dark:bg-brand-700'>
            <div className='> * + * space-y-2'>
              <Text className='body-100 font-bold'>
                <span className='text-brand-400'>#</span>
                <span className='text-brand-900 dark:text-neutral-100'>
                  {invoice?.id}
                </span>
              </Text>
              <Text className='body-100 text-brand-400 dark:text-brand-100 '>
                {invoice?.description}
              </Text>
            </div>

            <div>
              <Text className='body-200 text-brand-400 dark:text-brand-100 '>
                {invoice?.senderAddress?.street}
              </Text>
              <Text className='body-200 text-brand-400 dark:text-brand-100 '>
                {invoice?.senderAddress?.city}
              </Text>
              <Text className='body-200 text-brand-400 dark:text-brand-100 '>
                {invoice?.senderAddress?.postCode}
              </Text>
              <Text className='body-200 text-brand-400 dark:text-brand-100'>
                {invoice?.senderAddress?.country}
              </Text>
            </div>

            <div className='flex gap-8'>
              <div className='flex flex-1 flex-col gap-12'>
                <div className='> * + * space-y-4'>
                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    Invoice Date
                  </Text>
                  <Text className='body-300'>
                    {/* @ts-expect-error :this is just a placeholder to avoid errors until i'm getting data from the api*/}
                    {datetime.toDateString(invoice?.updatedAt)}
                  </Text>
                </div>

                <div className='> * + * space-y-4'>
                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    Payment Due
                  </Text>
                  <Text className='body-300'>
                    {datetime.toDateString(invoice?.paymentDue)}
                  </Text>
                </div>
              </div>

              <div className='> * + * flex-1 space-y-5'>
                <div className='> * + * space-y-4'>
                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    Bill To
                  </Text>
                  <Text className='body-300'>{invoice?.clientName}</Text>
                </div>

                <address>
                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    {invoice?.clientAddress?.street}
                  </Text>
                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    {invoice?.clientAddress?.city}
                  </Text>
                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    {invoice?.clientAddress?.postCode}
                  </Text>
                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    {invoice?.clientAddress?.country}
                  </Text>
                </address>
              </div>
            </div>

            <div className='> * + * space-y-4'>
              <Text className='body-100 text-brand-400 dark:text-brand-100 '>
                Sent to
              </Text>
              <Text className='body-300'>{invoice?.clientEmail}</Text>
            </div>

            <div className='flex flex-col gap-10 overflow-clip rounded-brand dark:bg-brand-600'>
              {invoice?.items?.map((item) => {
                return (
                  <article key={item.name} className='px-10 first:pt-10'>
                    <header className='flex items-center justify-between'>
                      <Text as='h4' className='font-bold'>
                        {item.name}
                      </Text>

                      <Text as='output' className='body-100 font-bold '>
                        {formatPrice(item?.total)}
                      </Text>
                    </header>

                    <Text
                      as='p'
                      className='body-100 mt-3 font-bold dark:text-brand-300'
                    >
                      <span>{item.quantity}&nbsp;x</span>
                      <span>&nbsp;{formatPrice(item?.price)}</span>
                    </Text>
                  </article>
                );
              })}

              <article className='flex items-center justify-between p-10 dark:bg-brand-900'>
                <Text as='h4'>Amount</Text>

                <Text
                  as='output'
                  className='text-700 font-bold leading-600 tracking-[-0.42px]'
                >
                  {formatPrice(grandTotal(invoice?.items))}
                </Text>
              </article>
            </div>
          </div>
        </article>
      </section>

      <div className='px-[2.4rem] py-9 dark:bg-brand-700 md:hidden'>
        <section className='flex items-center justify-between gap-4'>
          <button type='button' className='btn btn-edit font-bold'>
            Edit
          </button>
          <button type='button' className='btn btn-delete font-bold'>
            Delete
          </button>
          <button type='button' className='btn btn-invoice font-bold'>
            Mark as Paid
          </button>
        </section>
      </div>
    </React.Fragment>
  );
};

export { InvoiceDetailsMobile };
