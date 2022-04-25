import { ComponentStore } from '@ngrx/component-store';
import { GenericState } from 'src/app/shared/data-access/models';

export type AdvertisementsState = GenericState;

export class AdvertisementsStore extends ComponentStore<AdvertisementsState> {}
