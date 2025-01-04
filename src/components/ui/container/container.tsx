import { cn } from '@/lib/utils';
import { type ContainerVariantProps, containerVariants } from './index';

export type ContainerProps = React.ComponentPropsWithoutRef<'div'> &
  Partial<ContainerVariantProps>;

export default function Container({
  children,
  className,
  contentWidth = 'large',
}: ContainerProps) {
  return (
    <div className={cn(containerVariants({ contentWidth }), className)}>
      {children}
    </div>
  );
}
