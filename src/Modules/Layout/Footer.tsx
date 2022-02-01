interface ThemeProps {
  themeToggle: () => void;
  theme: string;
}

function Footer({ themeToggle, theme }: ThemeProps) {
  return (
    <div>
      <button onClick={themeToggle}>Toggle Theme from {theme}</button>
    </div>
  );
}

export default Footer;
