# AI Chatbot Onboarding Platform

This project is an onboarding platform for an AI chatbot service, designed to guide users through the process of setting up and integrating a chatbot for their website.

## Live Demo

You can view the live demo of this project at: [https://chatbot-demoo.netlify.app/]

## Project Overview

The onboarding process consists of four main steps:

1. User Registration
2. Organization Setup
3. Chatbot Integration and Testing
4. Success and Admin Panel Access

### 1. User Registration

- Users can enter their name, email, and password.
- Option to "Continue with Google" is available.
- Email verification is required to ensure genuine registrations.

### 2. Organization Setup

- Users enter their company name, website URL, and company description.
- The platform attempts to auto-fetch meta-description from the provided website URL.
- A UI displays all detected webpages from the client's website, showing which have been scraped and which are pending.
- Users can view detailed data chunks scraped from each webpage.
- Users can proceed to the next step while chatbot training continues in the background.

### 3. Chatbot Integration and Testing

This section provides three main options:

1. **Test Chatbot**
   - Opens the client's website with a dummy chatbot integration.
   - Includes a topbar for user feedback.

2. **Integrate on Your Website**
   - Provides easy-to-follow instructions for integrating the chatbot.
   - Option to mail instructions to the client's developer.

3. **Test Integration**
   - Confirms successful integration with a celebratory UI.

### 4. Success and Admin Panel Access

- Displays a success message with confetti or similar UI.
- Provides buttons for:
  - Exploring the Admin Panel
  - Starting a conversation with the chatbot
  - Sharing on social media

## Technical Details

This project is built using:

- React for the frontend
- Next.js as the React framework
- TypeScript for type-safe code
- Tailwind CSS for styling

The main component (`app/page.tsx`) manages the state of the onboarding process and renders the appropriate step based on the user's progress.

