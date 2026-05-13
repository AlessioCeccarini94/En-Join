import { EventItem } from '../../services/PAGES/eventService';

export interface AllEvents {
  category: string;
  events: EventItem[];
}
