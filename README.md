# Typing Speed Test - React Coding Challenge

A typing speed test application built with React and TypeScript that challenges users to type sentences as quickly and accurately as possible.

## 🎯 Project Overview

This project was built as a React coding challenge with the following core requirements:

Display The Sentence: Show either a fixed sentence or random quotes from an API
Typing Area: User types directly into an input field
Timer: Display millisecond-precision timer that starts when typing begins and stops when complete
Restart Button: Allow users to start a new round after completion

### Bonus Features Implemented

- Real-time Character Highlighting: Correct letters appear green, incorrect ones red
- Live Statistics: Words Per Minute (WPM) calculation and display
- Modern Styling: Clean, responsive UI with visual feedback
- API Integration: Fetches random quotes from API Ninjas

### 🛠️ Technical Stack

- React 18 with TypeScript
- Lucide React for icons
- Axios for API requests
- CSS3 with responsive design
- API Ninjas for random quotes

## 🧠 Problem-Solving Approach

Initial Planning & Thoughts

When approaching this challenge, I broke it down into manageable pieces:

```javascript

My initial thought process:

1. Fetch random sentence from API (or start with hardcoded)
2. Create input field ✓
3. Display timer on screen ✓
4. Start timer when input is not empty ✓
5. Stop timer when input === sentence ✓
6. Add restart functionality ✓

```

### Development Strategy

- Start Simple: Began with a hardcoded sentence to establish core functionality
- Incremental Development: Added features one by one (timer → input validation → styling)
- API Integration: Enhanced with external quote API after core features worked
- Polish & UX: Added real-time feedback and responsive design

### Key Technical Decisions

#### Timer Implementation

- Used setInterval with 10ms precision for smooth updates
- Implemented proper cleanup to prevent memory leaks
- Format: MM:SS:CS (Minutes:Seconds:Centiseconds)

#### Character Matching Logic

```typescript

Real-time character validation

{sentence.split("").map((char, i) => {
  let className = "test-sentence";
  if (textInput[i] !== undefined) {
    className = textInput[i] === char ? "correct-letter" : "incorrect-letter";
  }
  return <span key={i} className={className}>{char}</span>;
})}

```

#### WPM Calculation

```typescript
const minutes = time / 60000;
const wordsTyped =
  textInput.trim().length === 0 ? 0 : textInput.trim().split(/\s+/).length;
const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
```

### 📋 Features

**Current Features**

- Real-time typing validation with color-coded feedback
- Millisecond-precision timer (MM:SS:CS format)
- Live WPM calculation
- Random quote fetching from API
- Responsive design for mobile and desktop
- Loading states and error handling
- Auto-complete detection

#### Planned Enhancements (To-Do)

- Accuracy percentage calculation
- Difficulty settings (case-sensitive mode)
- Performance optimization with requestAnimationFrame
- Comprehensive unit tests
- User statistics persistence
- Multiple language support
- Custom sentence input

## 🚀 Getting Started

**Prerequisites**

Node.js (v14 or higher)
npm or yarn

**Installation**

Clone the repository

```bash
git clone https://github.com/yourusername/typing-speed-test.git
cd typing-speed-test
```

Install dependencies

```bash
npm install
```

Set up environment variables

```bash
Create .env file in root directory
REACT_APP_API_KEY=your_api_ninjas_key_here
```

Start the development server

```bash
npm start
```

Open http://localhost:3000 in your browser

### Configuration

**API Setup**

Sign up for a free account at API Ninjas
Get your API key
Add it to your .env file as REACT_APP_API_KEY

**Environment Variables**
envREACT_APP_API_KEY=your_api_key_here

### Testing

```bash
npm test
```

#### Run tests with coverage

npm test -- --coverage

### Contributing

- Fork the repository
- Create a feature branch `git checkout -b feature/amazing-feature`
- Commit your changes `git commit -m 'Add amazing feature'`
- Push to the branch `git push origin feature/amazing-feature`
- Open a Pull Request

### Status: 🚧 Work in Progress
