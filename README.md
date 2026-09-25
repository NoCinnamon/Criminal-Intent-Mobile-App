# Criminal Intent

## Prerequisites

To run this app locally, you’ll need:

### 1. Node.js and npm

Node.js includes npm (the package manager).

- Download: [https://nodejs.org/](https://nodejs.org/) (LTS version recommended)
Note: for clone repository, check under line 67 'Installateion'.  
- Check install:

```bash
node -v
npm -v

* For update npm flobally: 
npm install npm@latest -g

```

### 2. Need Git

Needed to clone the repo.

Download: [https://git-scm.com/](https://git-scm.com/)
Check install:

```bash
`git --version` 
```

### 3. Expo (via this project)

You don’t need a global Expo install. After npm install, use:

```bash
npx expo start` 
```



### 4. A way to open the app (pick one)

- Option A — Phone (easiest)

Install Expo Go from the App Store (iOS) or Google Play (Android)
Scan the QR code from the terminal after npx expo start

- Option B — iOS Simulator (Mac only)

Install Xcode from the Mac App Store
Open Device Hub (Xcode 27+) or Simulator and boot an iPhone
Then press i in the Expo terminal

- Option C — Android Emulator

Install Android Studio
Set up an emulator, then press a in the Expo terminal

- Option D — Web

Press w in the Expo terminal after starting the project

## Installation



### 1. Clone the repo

```bash
git clone git@github.com:NoCinnamon/Criminal-Intent-Mobile-App.git
```



### 2. Install project package

```bash
npm install
```

Note: you dont need a global Expo install.

### 3. Start the app

```bash
npx expo start
```

Then open it with one of the options in Prerequisites section 4 (Expo Go, simulator, emulator, or web).

## Usage

When you see a criminal activity, wether having a picture or not, you can write a report using app, then save it on the board. 
If solved: With a open handcaf icon, 
Not solved: No icon present.

## Some External package used:

1. @expo/vector-icons
2. @react-native-async-storage/async-storage
3. @react-native-community/datetimepicker
4. expo-checkbox
5. expo-image-picker
6. FlatList( built-in compunent )



## Multi Color Themes:

In setting-page.tsx, there are 6 theme buttons, when click, the theme will change to the color the buttons says. context concept is used for this part.

Create a themeContext in `src/theme.tsx` using createContext. The theme obj example:

```bash
export const themes = [
  { name: "White", background: "#ffffff", text: "#000000", button: "#112255", buttonText: "#ffffff", isDark: false },
  { name: "Black", background: "#000000", text: "#ffffff", button: "#333333", buttonText: "#ffffff", isDark: true },
  { name: "Purple", background: "#f3e8ff", text: "#3b0764", button: "#6b21a8", buttonText: "#ffffff", isDark: false },
]
```



ThemeProvider holds the current theme in useState and passes the state { theme, setTheme } to every child through ThemeContext.Provider. 

The useTheme() function will return the context value { theme, setTheme } or in setting-page.tsx can just do useContext(ThemeContext).

in Layout.tsx, insite return, wrap everything in `<ThemeProvider>` is needed, because the provider is above every route(every screen), and we do want it to apply to every screen. So, now the context is avaliable for every screen, but they have to call `useTheme()` to apply to apply the changes! `useTheme()`is the connector for all color theme context!

When click a theme color button, it calls the 'setTheme(item)', the item is one of the object of theme in 'theme.tsx' ( Example, the first one is: 

```bash
{ name: "White", background: "#ffffff", text: "#000000", button: "#112255", buttonText: "#ffffff", isDark: false },
```

)

Then, this will update the state inside of the `themeProvider`, React re-renders every component under the provider, so the settings screen immediately uses the new colors:

- the page background becomes `theme.background`
- the title and button labels become `theme.text`

* In _layout.tsx, the RootNaigator function is created to wraps around all the stacks, screens, then put `const {theme} = useTheme();` inside here.


```bash
function RootNavigator(){
  const {theme} = useTheme();
  return (
    <Stack>...</Stack>
  );
}
```

It is necessary, because the `const {theme} = useTheme();` is Javascript, it is not allowed to be put in  `export default function RootLayout() {...}` . It can only be elements.
