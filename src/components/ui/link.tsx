import React from 'react';
import NextLink from 'next/link';
import { buttonVariants } from './button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

export type LinkProps = React.ComponentPropsWithoutRef<typeof NextLink> &
  VariantProps<typeof buttonVariants>;

function Link({ className, variant, size, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export default Link;
