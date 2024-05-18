import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigateTo(name: string, params: any = {}): void {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name as never, params as never);
    }
}

export function goBack(): void {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
}

export function resetRoot(name: string): void {
    if (navigationRef.isReady()) {
        navigationRef.resetRoot({
            index: 0,
            routes: [{ name }],
        });
    }
}

export function getCurrentRoute(): any {
    if (navigationRef.isReady()) {
        return navigationRef.getCurrentRoute();
    }
}
