import { createContext, useContext, useState } from "react";

export const themes = [
  { name: "White", background: "#ffffff", text: "#000000", button: "#112255", buttonText: "#ffffff", isDark: false },
  { name: "Black", background: "#000000", text: "#ffffff", button: "#333333", buttonText: "#ffffff", isDark: true },
  { name: "Purple", background: "#f3e8ff", text: "#3b0764", button: "#6b21a8", buttonText: "#ffffff", isDark: false },
  { name: "pink", background: "##fce7f3", text: "#831843", button: "#db2777", buttonText: "#ffffff", isDark: true },
  { name: "Green", background: "#ecfdf5", text: "#064e3b", button: "#047857", buttonText: "#ffffff", isDark: false },
  { name: "Blue", background: "#0f172a", text: "#dbeafe", button: "#1d4ed8", buttonText: "#ffffff", isDark: true },
]

const ThemeContext = createContext({
  theme: themes[0],
  setTheme: (theme: (typeof themes)[0]) => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
const [theme, setTheme] = useState(themes[0]);

return (
  <ThemeContext.Provider value={{ theme, setTheme }}>
    {children}
  </ThemeContext.Provider>
);
}


export function useTheme() {
    return useContext(ThemeContext);
  }