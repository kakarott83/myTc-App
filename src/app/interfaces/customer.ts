import { Country } from './country';

export interface Customer {
    id?: string;
    name: string;
    ort: string;
    land: Country;
    logo?: string;
}
