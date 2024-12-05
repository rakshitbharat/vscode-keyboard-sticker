# VSCode Keyboard Shortcuts Visualizer

An interactive keyboard shortcut visualizer for Visual Studio Code, showing different shortcuts across macOS, Windows, and Ubuntu. Built with Next.js and styled-components.

![VSCode Keyboard Shortcuts Visualizer](./public/preview.png)

## Features

- 🎨 Interactive keyboard layout
- 💻 OS-specific shortcuts (macOS, Windows, Ubuntu)
- 🎯 Multiple themes (VSCode Purple, VSCode Blue)
- 🔄 Real-time theme switching
- 📱 Responsive design
- 🚀 Fast and lightweight

## Demo

Check out the live demo: [VSCode Keyboard Shortcuts Visualizer](https://your-username.github.io/vscode-keyboard-shortcuts)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/vscode-keyboard-shortcuts.git
cd vscode-keyboard-shortcuts
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Themes

You can add new themes by creating a new config file in `src/data/stickerConfigs/`:

```javascript
export default {
  id: "yourTheme",
  name: "Your Theme",
  description: "Your theme description",
  styles: {
    // OS-specific styles
  },
  layout: {
    // Shortcut mappings
  },
};
```

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - Styling
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Redux Persist](https://github.com/rt2zz/redux-persist) - Persistence

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Visual Studio Code
- Icons from [Material Design Icons](https://materialdesignicons.com/)
- Font from [Inter](https://rsms.me/inter/)

## Support

If you like this project, please consider giving it a ⭐️!

## Author

Your Name - [@your-twitter](https://twitter.com/your-twitter)

Project Link: [https://github.com/your-username/vscode-keyboard-shortcuts](https://github.com/your-username/vscode-keyboard-shortcuts)
