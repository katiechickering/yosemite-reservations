'use client';

import { ChangeEvent } from 'react';

interface CampsiteSearchProps {
    campsiteSearch: string;
    onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onReset: () => void;
}

export const CampsiteSearch = ({ 
    campsiteSearch, 
    onSelectChange, 
    onReset 
    }: CampsiteSearchProps) => {

    return (
        <div className="flex items-center bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-brand-brown/20">
        <label htmlFor="campsite" className="mr-4 font-bold text-brand-dark-brown">
            Search By Campsite: 
        </label>
        
        <select 
            name="campsite"
            id="campsite"
            value={campsiteSearch}
            required
            className="mr-4 p-2 rounded border border-brand-brown bg-white focus:ring-2 focus:ring-brand-green outline-none transition-all"
            onChange={onSelectChange}
        >
            <option disabled value="">Select a Campsite</option>
            <option value="upperPines">Upper Pines</option>
            <option value="lowerPines">Lower Pines</option>
            <option value="northPines">North Pines</option>
            <option value="wawona">Wawona</option>
            <option value="hodgdonMeadow">Hodgdon Meadow</option>
            <option value="tuolumneMeadows">Tuolumne Meadows</option>
            <option value="bridalveilCreek">Bridalveil Creek</option>
            <option value="craneFlat">Crane Flat</option>
            <option value="tamarackFlat">Tamarack Flat</option>
            <option value="whiteWolf">White Wolf</option>
            <option value="yosemiteCreek">Yosemite Creek</option>
            <option value="porcupineFlat">Porcupine Flat</option>
            <option value="camp4">Camp 4</option>
        </select>

        <button 
            type="button" 
            onClick={onReset}
            className="px-4 py-2 bg-brand-brown text-white rounded hover:bg-brand-dark-brown transition-colors shadow-sm"
        >
            View All
        </button>
        </div>
    );
};
