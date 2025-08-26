import './styles/style.css';

class App {
  constructor() {
    this.init();
  }

  private init(): void {
    console.log('App initialized with TypeScript!');
    this.renderContent();
  }

  private renderContent(): void {
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.innerHTML += `
        <div>
          <p>Welcome to TypeScript Webpack setup!</p>
          <button id="clickMe">Click me!</button>
        </div>
      `;

      const button = document.getElementById('clickMe');
      if (button) {
        button.addEventListener('click', () => {
          alert('Button clicked! Webpack is working!');
        });
      }
    }
  }
}

// Запуск приложения
new App();