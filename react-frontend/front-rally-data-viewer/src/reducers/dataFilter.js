export const initialState = {
  filters: {
    vehicle: '',
    driver: '',
    event: '',
    region: ''
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