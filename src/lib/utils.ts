import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type CatchErrorResponse<T> =
  | {
      success: false;
      error: Error | string;
    }
  | {
      success: true;
      data: T;
    };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function priceToEuro(price: number | null) {
  return (price ?? 0) / 100;
}

export async function catchError<T>(
  promise: Promise<T>,
): Promise<CatchErrorResponse<T>> {
  try {
    const data = await promise;

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error,
      };
    }

    return {
      success: false,
      error: String(error),
    };
  }
}
