# Smart Field Survey App 📋🏗️

A comprehensive, modern React Native mobile application built with [Expo](https://expo.dev/) designed to streamline on-site field surveys, data collection, and resource management for field workers and engineers.

## Features ✨

*   **Modern Dashboard**: A highly interactive home screen featuring student/employee details, survey statistics, and quick action shortcuts.
*   **Quick Actions**: Instantly access frequently used tools:
    *   📝 **New Survey**: Jump straight into creating a new field report.
    *   📷 **Camera**: Capture on-site photos and evidence.
    *   📍 **Location**: Fetch, view, and copy your current GPS coordinates.
    *   👥 **Contacts**: Manage client and team contact information.
*   **Intuitive Navigation**: Seamless bottom tab navigation for quick access to Home, Profile, Survey Creation, and History.
*   **Cross-Platform UI**: Beautiful, premium interface with subtle micro-interactions, utilizing native elements and seamless icon fallbacks (SF Symbols on iOS, Material Icons on Android).
*   **Recent Surveys Tracker**: Easily view the status (Pending, Completed), priority, and timestamp of recently assigned survey tasks.

## Tech Stack 🛠️

*   **Framework**: [React Native](https://reactnative.dev/)
*   **Platform**: [Expo](https://expo.dev/)
*   **Routing**: [Expo Router](https://docs.expo.dev/router/introduction) (File-based routing)
*   **Icons**: Expo Vector Icons (MaterialCommunityIcons, SF Symbols via `expo-symbols`)
*   **Styling**: React Native StyleSheet (Custom premium UI)

## Getting Started 🚀

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn
*   Expo Go app installed on your physical device (iOS/Android), or an Android Emulator / iOS Simulator.

### Installation

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/Jivan-Patel/ReactNativeMiniProjectAssignment.git
    cd SmartFieldSurveyApp
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npx expo start
    ```

4.  **Run the App**:
    *   Open the **Expo Go** app on your phone and scan the QR code generated in your terminal.
    *   Alternatively, press `a` to run on an Android emulator or `i` to run on an iOS simulator.

## Project Structure 📁

```text
app/
 ├── (tabs)/          # Bottom tab screens (Home, Profile, Survey, History)
 ├── _layout.tsx      # Root layout and navigation config
 ├── camera.jsx       # Camera utility screen
 ├── clipboard.jsx    # Clipboard utility screen
 ├── contacts.jsx     # Contacts management screen
 ├── location.jsx     # GPS/Location tracking screen
 ├── previewSurway.jsx# Survey preview screen
 └── settings.jsx     # App settings screen
components/           # Reusable UI components (Icons, Tabs, etc.)
assets/               # Images, fonts, and other static files
```

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## License 📄

This project is open-source and available under the [MIT License](LICENSE).
