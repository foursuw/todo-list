
# Todo Calendar

A vibrant todo list application with calendar integration inspired by Microsoft Todo. Organize your tasks efficiently with multiple lists, priority settings, and a beautiful user interface.

## Features

- 📝 **Multiple Task Lists**: Organize tasks into different categories (Work, Personal, Groceries, etc.)
- ⭐ **Priority Tasks**: Mark important tasks with star indicators
- 📅 **Calendar Integration**: View tasks with due dates
- ✅ **Task Management**: Add, edit, delete, and complete tasks
- 🎨 **Beautiful UI**: Colorful gradients and smooth animations
- ⚙️ **Settings**: Customize notifications, auto-sort, and theme preferences
- 🔐 **User Authentication**: Sign in/sign up functionality (demo mode)

## Technologies Used

- **React** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **Shadcn UI** - Component library
- **Vite** - Build tool and development server
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-git-url>
cd todo-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Sign In**: Use any email and password to access the demo
2. **Create Lists**: Add new task lists using the "+" button in the sidebar
3. **Add Tasks**: Click "Add a task" to create new tasks
4. **Manage Tasks**: 
   - Click the circle to mark tasks as complete
   - Click the star to mark tasks as important
   - Use the edit icon to modify task text
   - Use the trash icon to delete tasks
5. **Settings**: Access settings via the gear icon to customize your experience

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── SignInPage.tsx # Authentication component
├── pages/
│   └── Index.tsx     # Main application page
├── hooks/
│   └── use-toast.ts  # Toast notifications
└── lib/
    └── utils.ts      # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Demo Features

This is a demo application with the following characteristics:
- Any email/password combination works for sign-in
- Tasks are stored in local state (not persisted between sessions)
- All features are functional for demonstration purposes

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by Microsoft Todo's design and functionality
- Built with modern React and TypeScript best practices
- Uses Tailwind CSS for responsive design
