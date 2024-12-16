import api from './api';

const ConversionService = {
    
    getSingle: async (from, to, amount) => {
        const response = await api.get(`/pair/${from}/${to}/${amount}`);

        return response.data;
    },

    
};

export default ConversionService;