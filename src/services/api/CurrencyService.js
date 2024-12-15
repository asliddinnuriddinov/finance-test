import api from './api';

const CurrencyService = {
    
    getAll: async () => {
        const response = await api.get("/latest/USD");

        return response.data.data;
    },

    
};

export default CurrencyService;