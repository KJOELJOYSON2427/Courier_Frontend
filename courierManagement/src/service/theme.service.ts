// src/app/services/theme.service.ts
import { Injectable, signal, effect, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  // Initialize theme based on localStorage or default to system preference
  private readonly themeSignal = signal<'light' | 'dark' | 'system'>(this.getInitialTheme());

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    // Effect to apply the 'dark' class and update localStorage whenever the theme changes
    effect(() => {
      const theme = this.themeSignal();
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
          this.renderer.addClass(document.documentElement, 'dark');
        } else {
          this.renderer.removeClass(document.documentElement, 'dark');
        }
        localStorage.setItem('theme', theme);
      }
    });
  }

  private getInitialTheme(): 'light' | 'dark' | 'system' {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
        return savedTheme;
      }
    }
    return 'system'; // Default to system preference if no explicit choice is saved
  }

  toggleTheme() {
    this.themeSignal.update(currentTheme => {
      if (currentTheme === 'light') return 'dark';
      // if (currentTheme === 'dark') return 'system';
      return 'light';
    });
  }

  // Expose the theme state
  get theme() {
    return this.themeSignal.asReadonly();
  }
}
