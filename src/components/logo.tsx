import type { SVGProps } from 'react';

export function OrvellaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      {...props}
    >
      <style>
        {`
          .orvella-text {
            font-family: 'Inter', sans-serif;
            font-size: 40px;
            font-weight: 700;
            fill: url(#orvella-gradient);
            letter-spacing: -1px;
          }
          .orvella-dot {
            fill: hsl(var(--primary));
          }
        `}
      </style>
      <defs>
        <linearGradient id="orvella-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
        </linearGradient>
      </defs>
      <text x="0" y="38" className="orvella-text">
        Orvella
      </text>
      <circle cx="185" cy="35" r="5" className="orvella-dot" />
    </svg>
  );
}
