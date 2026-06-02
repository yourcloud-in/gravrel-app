# GravRel Mobile App

> Customer-facing Android + iOS app for GravRel cloud platform
> React Native · One codebase · Both platforms

## Features

- Account management — signup, login, profile
- VM management — create, start, stop, monitor
- Live dashboard — solar output, usage stats
- Billing — invoices, Razorpay payments
- DPDP dashboard — compliance + Green Certificate
- Notifications — alerts, billing reminders
- Support — raise tickets, Talk to Babrit

## 12 Screens

1. Splash / Onboarding
2. Login / Register
3. Dashboard (home)
4. My VMs
5. Create VM
6. Databases
7. Storage
8. Billing & Invoices
9. DPDP Dashboard
10. Green Certificate
11. Support
12. Profile / Settings

## Stack

React Native 0.75 · TypeScript · Zustand · React Navigation
Razorpay React Native · Axios · Vector Icons

## Setup

```bash
git clone https://github.com/yourcloud-in/gravrel-app
cd gravrel-app
npm install
npm run android   # Android
npm run ios       # iOS (Mac only)
```

## Build for Stores

```bash
# Android APK
cd android && ./gradlew assembleRelease

# Android AAB (Play Store)
cd android && ./gradlew bundleRelease
```

## Publish Timeline

- Google Play Store: Month 5
- Apple App Store: Month 6

## Built by GravRel

gravrel.com · Bhubaneswar, Odisha · UDYAM-OD-03-0020346
Zero carbon · Zero water waste · Solar-powered ☀️
