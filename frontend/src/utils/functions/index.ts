export const variantResolver = <V extends string = any>(
  variant: V | undefined,
  variants: Record<V, string>,
  fallback: string = '',
) => {
  if (!variant) return '';

  return variants[variant] || fallback;
};
