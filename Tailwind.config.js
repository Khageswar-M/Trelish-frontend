/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // optional if using flowbite-react
    "node_modules/flowbite-datepicker/**/*.{js,jsx,ts,tsx}", // datepicker scripts
    "node_modules/flowbite/**/*.js",
];
export const theme = {
  extend: {},
};
export const plugins = [
   require('flowbite/plugin')
];