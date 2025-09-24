import type { Config } from "tailwindcss";
const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
  	extend: {
  		colors: {
  			'wwwwwwck-44-4comdaintree': 'var(--wwwwwwck-44-4comdaintree)',
  			'wwwwwwck-44-4comfire': 'var(--wwwwwwck-44-4comfire)',
  			'wwwwwwck-44-4comwhite': 'var(--wwwwwwck-44-4comwhite)',
  			'wwwwwwck444comblue-stone': 'var(--wwwwwwck444comblue-stone)',
  			'wwwwwwck444combright-turquoise': 'var(--wwwwwwck444combright-turquoise)',
  			'wwwwwwck444comfrosted-mint': 'var(--wwwwwwck444comfrosted-mint)',
  			'wwwwwwck444comselective-yellow': 'var(--wwwwwwck444comselective-yellow)',
  			'wwwwwwck444comvis-vis-50': 'var(--wwwwwwck444comvis-vis-50)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			'www-wwwck444-com-segoe-UI-regular': 'var(--www-wwwck444-com-segoe-UI-regular-font-family)',
  			'www-wwwck444-com-segoe-UI-regular-underline': 'var(--www-wwwck444-com-segoe-UI-regular-underline-font-family)',
  			'www-wwwck444-com-semantic-button': 'var(--www-wwwck444-com-semantic-button-font-family)',
  			'www-wwwck444-com-semantic-heading-6': 'var(--www-wwwck444-com-semantic-heading-6-font-family)',
  			'www-wwwck444-com-semantic-input': 'var(--www-wwwck444-com-semantic-input-font-family)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), flowbiteReact],
} satisfies Config;