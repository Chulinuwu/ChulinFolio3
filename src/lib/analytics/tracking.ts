const isBrowser = typeof window !== 'undefined';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export class TrackingService {
  private static instance: TrackingService;

  static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService();
    }
    return TrackingService.instance;
  }

  // Send events to Google Analytics with proper structure
  private sendToGoogleAnalytics(eventName: string, data: any = {}) {
    if (!isBrowser || typeof window.gtag !== 'function') return;

    const cleanData: { [key: string]: string | number } = {};

    for (const key in data) {
      const value = data[key];
      if (typeof value === 'object' && value !== null) {
        cleanData[key] = JSON.stringify(value);
      } else if (typeof value === 'string' || typeof value === 'number') {
        cleanData[key] = value;
      } else if (typeof value === 'boolean') {
        cleanData[key] = value ? 'true' : 'false';
      }
    }

    // Send to Google Analytics with custom event structure
    window.gtag('event', eventName, {
      event_category: 'custom_tracking',
      event_label: window.location.pathname,
      ...cleanData
    });
  }

  // Track user interactions
  // Event: 'user_interaction'
  // {
  //   event_category: 'custom_tracking',
  //   event_label: '/current/path',
  //   element: 'navbar_link',
  //   action: 'click',
  //   href: '/about',
  //   label: 'About',
  //   fromPath: '/home',
  //   toPath: '/about',
  //   clickCoordinates: { x: 123, y: 456 }
  // }
  trackInteraction(element: string, action: string, data: any = {}) {
    const eventData = {
      element,
      action,
      ...data
    };

    this.sendToGoogleAnalytics('user_interaction', eventData);
  }

  // Track navigation events
  // Event: 'navigation'
  // {
  //   event_category: 'custom_tracking',
  //   event_label: '/current/path',
  //   from: '/previous/path',
  //   to: '/new/path', 
  //   method: 'navigation', // หรือ 'click'
  //   timestamp: 1695312000000
  // }
  trackNavigation(fromPath: string, toPath: string, method: string = 'click') {
    const navData = {
      from: fromPath,
      to: toPath,
      method,
      timestamp: Date.now()
    };

    this.sendToGoogleAnalytics('navigation', navData);
  }
}

export const tracker = TrackingService.getInstance();

export const trackInteraction = (element: string, action: string, data?: any) => tracker.trackInteraction(element, action, data);
export const trackNavigation = (from: string, to: string, method?: string) => tracker.trackNavigation(from, to, method);