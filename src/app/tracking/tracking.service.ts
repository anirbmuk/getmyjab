import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import firebase from 'firebase/app';
import 'firebase/analytics';

import { DoseType, FeeType } from './../data/data.interface';
import { environment } from './../../environments/environment';

export type TrackingAction =
  | 'refresh'
  | 'statechange'
  | 'agechange'
  | 'dosechange'
  | 'datechange'
  | 'feechange';
export type Tracking = firebase.analytics.Analytics;

export type ExternalLink =
  | 'twitter'
  | 'linkedin'
  | 'github'
  | 'cowin'
  | 'blogger'
  | 'angular'
  | 'gcp';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface TrackingParams {
  city?: string;
  age?: number | string;
  dose?: DoseType;
  fee?: FeeType;
  screen?: string;
}

export interface PageViewParams {
  page_title?: string;
  page_location?: string;
  page_path?: string;
  source?: 'user' | 'bot' | null;
}

export interface ExternalTrackingParams extends PageViewParams {
  tag: ExternalLink;
}

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private analytics: Tracking | null;

  constructor(@Inject(PLATFORM_ID) private readonly platformId) {
    if (isPlatformBrowser(platformId)) {
      this.analytics = this.initFirebase(
        environment.config as FirebaseConfig | null
      );
    }
  }

  logEvent(event: TrackingAction, params?: TrackingParams): void {
    if (isPlatformBrowser(this.platformId)) {
      this.analytics?.logEvent(event, params);
    }
  }

  logExternalClickEvent(params?: ExternalTrackingParams): void {
    if (isPlatformBrowser(this.platformId)) {
      this.analytics?.logEvent('extclick', params);
    }
  }

  logPageViewEvent(params?: PageViewParams): void {
    if (isPlatformBrowser(this.platformId)) {
      this.analytics?.logEvent('page_view', params);
    }
  }

  get source(): 'user' | 'bot' {
    return isPlatformBrowser(this.platformId) ? 'user' : 'bot';
  }

  private initFirebase(config: FirebaseConfig | null): Tracking | null {
    if (config !== null) {
      firebase.initializeApp(config);
      return firebase.analytics();
    }
    return null;
  }
}
