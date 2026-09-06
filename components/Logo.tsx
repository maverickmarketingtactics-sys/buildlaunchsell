export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    // Static SVG lockup — next/image does not optimize SVGs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/bls-logo.svg"
      alt="BuildLaunchSell"
      width={203}
      height={40}
      className={`w-auto ${className}`}
    />
  );
}
