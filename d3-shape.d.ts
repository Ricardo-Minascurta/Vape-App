declare module 'd3-shape' {
    export function line(): Line<[number, number]>;
    export const curveCatmullRom: {
      alpha(alpha: number): CurveFactory;
    };
    
    interface Line<T> {
      x(): (d: T) => number;
      x(x: number | ((d: T, i: number, data: T[]) => number)): Line<T>;
      y(): (d: T) => number;
      y(y: number | ((d: T, i: number, data: T[]) => number)): Line<T>;
      defined(): (d: T) => boolean;
      defined(defined: (d: T, i: number, data: T[]) => boolean): Line<T>;
      curve(): CurveFactory;
      curve(curve: CurveFactory): Line<T>;
      context(): CanvasRenderingContext2D | null;
      context(context: CanvasRenderingContext2D): Line<T>;
      (data: T[]): string | null;
    }
  
    interface CurveFactory {
      (context: CanvasRenderingContext2D): Curve;
    }
  
    interface Curve {
      lineStart(): void;
      lineEnd(): void;
      point(x: number, y: number): void;
    }
  }