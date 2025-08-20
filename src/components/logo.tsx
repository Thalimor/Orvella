import type { SVGProps } from 'react';
import Image from 'next/image';

export function OrvellaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 170 50"
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
        </svg>
        <Image src="https://files.catbox.moe/76tlv9.png" alt="Orvella Logo" width={30} height={30} className="rounded-full" />
    </div>
  );
}
