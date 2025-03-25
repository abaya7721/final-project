export const initialState = {
  filters: {
    vehicle: '',
    driver: '',
    event: '',
    region: '',
    year: ''
  },
  filteredData: null
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value
        }
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        filteredData: null
      };

    case 'APPLY_FILTERS':
      const { data, dataType } = action.payload;
      let filteredData = [...data];

      // Apply each active filter
      Object.entries(state.filters).forEach(([key, value]) => {
        if (value) {
          filteredData = filteredData.filter(item => {
            // Handle different data types and their specific fields
            switch (key) {
              case 'driver':
                return item.driverName?.toLowerCase().includes(value.toLowerCase());
              case 'event':
                return item.raceName?.toLowerCase().includes(value.toLowerCase());
              case 'vehicle':
                return item.vehicleMake?.toLowerCase().includes(value.toLowerCase());
              case 'region':
                return item.region?.toLowerCase().includes(value.toLowerCase());
              case 'year':
                // Handle year filtering based on data type
                switch (dataType) {
                  case 'results':
                    // For race results, filter by date column
                    const itemDate = new Date(item.date);
                    const itemYear = itemDate.getFullYear().toString();
                    return itemYear === value;
                  case 'vehicle':
                    // For vehicle results, filter by Year string column
                    return item.vehicleYear === value;
                  case 'standings':
                    // For standings, filter by Year column
                    return item.year === value;
                  default:
                    return true;
                }
              default:
                return true;
            }
          });
        }
      });

      return {
        ...state,
        filteredData
      };

    default:
      return state;
  }
}; 