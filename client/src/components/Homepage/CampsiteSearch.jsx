export const CampsiteSearch = ({campsiteSearch, onSelectChange, onReset}) => {

    return (
        <div className="flex items-center">
            <label htmlFor="campsite" className="mr-4">Search By Campsite: </label>
            <select 
                name="campsite"
                id="campsite"
                value={campsiteSearch}
                required
                className="mr-4"
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
            <button type="button" onClick={onReset}>
                View All
            </button>
        </div>
    )
}