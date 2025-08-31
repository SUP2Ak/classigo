import { describe, it, expect } from 'vitest';
import classigo from '../src/index';

// Need more implementations and tests
// To be sure that classigo is working correctly
// But for now, this is a good start

describe('classigo', () => {
  it('should combine basic classes', () => {
    expect(classigo('button', 'primary', 'large')).toBe('button primary large');
  });

  it('should handle empty strings', () => {
    expect(classigo('button', '', 'large')).toBe('button large');
  });

  it('should handle falsy values', () => {
    expect(classigo('button', false, 'large')).toBe('button large');
    expect(classigo('button', null, 'large')).toBe('button large');
    expect(classigo('button', undefined, 'large')).toBe('button large');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;

    expect(classigo('button', isActive && 'active', isDisabled && 'disabled'))
      .toBe('button active');
  });

  it('should handle template literals', () => {
    const variant = 'primary';
    expect(classigo('button', `button--${variant}`)).toBe('button button--primary');
  });

  it('should handle CSS Modules', () => {
    const styles = {
      button: 'button_abc123',
      primary: 'primary_def456',
      large: 'large_ghi789'
    };

    expect(classigo(styles.button, styles.primary, styles.large))
      .toBe('button_abc123 primary_def456 large_ghi789');
  });

  it('should handle mixed types', () => {
    expect(classigo('button', 'primary', false, 'large', null, 'rounded'))
      .toBe('button primary large rounded');
  });

  it('should return empty string for all falsy values', () => {
    expect(classigo(false, null, undefined, '')).toBe('');
  });

  it('should handle single class', () => {
    expect(classigo('button')).toBe('button');
  });

  it('should handle no arguments', () => {
    expect(classigo()).toBe('');
  });
});
