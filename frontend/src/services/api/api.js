const API_URL = 'http://localhost:8000/index.php/atividades/';
const API_URL_PROJETOS = 'http://localhost:8000/index.php/projetos/';

export const getAtividades = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error('Failed to fetch atividades:', response.status, response.statusText);
            throw new Error(`Failed to fetch atividades: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch atividades:', error);
        throw error;
    }
};

export const getAtividadeById = async (id) => {
    try {
        const response = await fetch(`${API_URL}view/${id}`);
        if (!response.ok) {
            console.error('Failed to fetch atividade by id:', response.status, response.statusText);
            throw new Error(`Failed to fetch atividade by id: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch atividade by id:', error);
        throw error;
    }
};

export const createAtividade = async (atividade) => {
    try {
        console.log('Sending request to create atividade:', atividade);
        const response = await fetch(`${API_URL}create`, {
            method: 'POST',
            body: JSON.stringify(atividade),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            console.error('Failed to create atividade:', response.status, response.statusText);
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Failed to create atividade: ${response.status} ${response.statusText}`);
        }
        const jsonResponse = await response.json();
        console.log('Response from server:', jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};

export const updateAtividade = async (id, atividade) => {
    try {
        const response = await fetch(`${API_URL}update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(atividade),
        });
        if (!response.ok) {
            console.error('Failed to update atividade:', response.status, response.statusText);
            throw new Error(`Failed to update atividade: ${response.status} ${response.statusText}`);
        }

        const responseText = await response.text();
        if (responseText) {
            return JSON.parse(responseText);
        } else {
            console.warn('Empty response received');
            return {}; // or handle as per your logic
        }
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};

export const deleteAtividade = async (id) => {
    try {
        const response = await fetch(`${API_URL}delete/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            console.error('Failed to delete atividade:', response.status, response.statusText);
            throw new Error(`Failed to delete atividade: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};

export const getProjetos = async () => {
    try {
        const response = await fetch(API_URL_PROJETOS);
        if (!response.ok) {
            console.error('Failed to fetch projetos:', response.status, response.statusText);
            throw new Error(`Failed to fetch projetos: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch projetos:', error);
        throw error;
    }
};

export const createProjeto = async (projeto) => {
    try {
        console.log('Sending request to create projeto:', projeto);
        const response = await fetch(`${API_URL_PROJETOS}create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projeto),
        });
        if (!response.ok) {
            console.error('Failed to create projeto:', response.status, response.statusText);
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Failed to create projeto: ${response.status} ${response.statusText}`);
        }
        const jsonResponse = await response.json();
        console.log('Response from server:', jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};

export const deleteProjeto = async (id) => {
    try {
        const response = await fetch(`${API_URL_PROJETOS}${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error('Failed to delete projeto:', response.status, response.statusText);
            throw new Error(`Failed to delete projeto: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to delete projeto:', error);
        throw error;
    }
};

export const updateProjeto = async (id, projeto) => {
    try {
        const response = await fetch(`${API_URL_PROJETOS}${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projeto),
        });
        if (!response.ok) {
            console.error('Failed to update projeto:', response.status, response.statusText);
            throw new Error(`Failed to update projeto: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to update projeto:', error);
        throw error;
    }
};



