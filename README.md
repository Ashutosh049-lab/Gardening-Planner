**Gardening Planner**

**Context**: Isabella had a passion for gardening but often found it hard to keep track of when and how to care for her various plants throughout the year. To simplify her gardening routine and ensure healthier plants, she started using a gardening planner app that helps her manage all aspects of her garden, from plant care to pest control.

### **Project Goal**

- The goal is to build a comprehensive gardening management platform that provides plant care reminders, helps users design their garden layout, and tracks seasonal tasks. It should offer a personalized and intuitive interface, allowing gardeners to improve plant health while making gardening more organized and efficient.

- This **Gardening Planner** project aims to make gardening a seamless and enjoyable experience by integrating personalized care reminders, weather updates, a plant library, and community sharing, all in one app. It’s designed to help gardeners like Isabella stay on top of their tasks and improve the health of their plants year-round.

### **Features**

- **Personalized Plant Care Reminders**: The app sends Isabella timely reminders for plant care tasks like watering, fertilizing, pruning, and repotting based on each plant’s specific needs and the current season. This ensures she never misses an essential step in keeping her plants healthy.

- **Comprehensive Plant Library**: The app includes a vast plant library with detailed information on each plant species, including care instructions, ideal growing conditions (such as sunlight and soil type), common issues, and troubleshooting tips. This helps her understand the requirements of each plant she owns.

- **Garden Layout Planner**: A visual layout tool allows Isabella to design her garden, planning where to place each plant based on sunlight, soil quality, and spacing needs. She can experiment with different designs and ensure her plants thrive in the right conditions.

- **Pest and Disease Tracker**: The app offers an integrated pest and disease tracker that alerts her to common problems in her area, providing tips for early prevention and solutions. She can also log any issues she encounters, making it easy to track and manage outbreaks.

- **Seasonal Task Planner**: The platform allows Isabella to plan out her gardening tasks by season, so she knows exactly when to plant, harvest, or prepare for changes in weather. It ensures she stays ahead of crucial tasks like planting new crops or pruning shrubs.

- **Weather Integration**: The app integrates real-time weather forecasts, giving her information on upcoming conditions like rain, frost, or heatwaves. This allows her to adjust her gardening schedule accordingly, ensuring her plants are protected and well-cared-for.

- **Gardening Journal**: The journal feature enables Isabella to log her daily gardening experiences, document plant growth, and track changes over time. She can add photos, notes, and milestones, making it easy to reflect on her gardening journey and learn from past seasons.

- **Plant Health Monitoring**: Isabella can track each plant’s health by logging changes, growth, and symptoms, allowing her to spot potential problems early and respond appropriately.

- **Harvest Planning and Tracking**: For gardeners growing vegetables or fruits, the app allows users to plan harvests, track yield amounts, and predict future harvest dates based on current growth progress.

- **Gardening Tips and Resources**: The app provides seasonal gardening tips, tutorials, and expert advice to help her improve her gardening techniques. It offers a curated set of articles based on the plants in her garden and the current time of year.

- **Community Sharing and Support**: Isabella can share her garden layout, plant care tips, and experiences with a community of fellow gardeners. She can ask for advice, exchange knowledge, and stay inspired by seeing others’ gardens.















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

