
# 🌱 Gardening Planner

An innovative web application designed to enhance the gardening experience.  
It helps users manage plant health, schedule care tasks, and document their gardening journey, all in a modern, responsive interface.

---

## 📖 Project Summary
The Gardening Planner project provides:

- **Plant Inventories & Care Reminders** – Track plants, set personalized reminders, and maintain their health.
- **Garden Layouts** – Create interactive garden designs with a drag-and-drop interface.
- **Community Module** – Share tips, ask questions, and showcase gardening achievements.
- **Modern UI** – Recent updates improved the **Plant Library** with enhanced styling and functionality.

Built with **React** and **Firebase**, the app supports secure user authentication and real-time data updates.

---

## 🧩 Project Modules

| Module | Description |
|--------|-------------|
| **Authentication** | Sign-up, login, and profile management using Firebase. |
| **Plant Management** | Add, edit, delete plants, view details, and upload images. |
| **Garden Designer** | Drag-and-drop interface for garden layouts. |
| **Plant Journal** | Log care activities and observations with optional image uploads. |
| **Dashboard** | Summary view of plant statistics and recent activities. |
| **Reminders** | Create and manage care reminders with improved styling. |
| **Plant Library** | Comprehensive plant database with detailed care instructions and a modern UI. |
| **Weather Integration** | Weather forecasts and gardening recommendations based on current conditions. |
| **Pest & Disease Tracker** | Report and manage plant health issues. |
| **Seasonal Planner** | Plan and track seasonal gardening tasks with a redesigned interface. |
| **Harvest Tracker** | Log and track harvests with improved functionality. |
| **Gardening Tips** | Expert advice and tips for better gardening practices. |
| **Community** | Platform for sharing knowledge and connecting with fellow gardeners. |

---




### Key `src` Directories

- **components/auth/** – LoginForm, SignupForm, etc.  
- **components/layout/** – Header, Sidebar navigation.  
- **components/plants/** – AddPlantForm, PlantCard, etc.  
- **components/ui/** – Buttons, inputs, dialogs, cards.  
- **pages/** – Dashboard, PlantInventory, GardenDesigner, Reminders, PlantLibrary, PestTracker, WeatherIntegration, SeasonalPlanner, HarvestTracker, GardeningTips, Community, AddPlant, PlantJournal, NotFound.  
- **hooks/** – Custom hooks for authentication and global plant state.  
- **lib/** – Firebase setup and utility functions.  
- **types/** – TypeScript types (GardeningTip, Plant, HarvestRecord, SeasonalTask, JournalEntry, Reminder, PlantLibraryEntry).

---

## 🛠 Technology Stack
- **Frontend:** React, TypeScript, Tailwind CSS, React Router  
- **Backend:** Firebase (Auth, Firestore, Storage)  
- **External APIs:** OpenWeatherMap (weather data)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm installed globally (`npm install -g pnpm`)

### Installation
```bash
pnpm install

