const API_URL = 'http://localhost:8000/index.php/atividades/';
const API_URL_PROJETOS = 'http://localhost:8000/index.php/projetos/';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return await response.json();
};
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
        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to create atividade:', error);
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
            return {};
        }
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};

export const deleteAtividade = async (id) => {
    try {
        const response = await fetch(`${API_URL}delete/${id}`, {
            method: 'DELETE'
        });
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
        const response = await fetch(`${API_URL_PROJETOS}create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projeto),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create projeto: ${response.status} ${response.statusText} - ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to create projeto:', error);
        throw error;
    }
};

export const deleteProjeto = async (id) => {
    try {
        const response = await fetch(`${API_URL_PROJETOS}delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Falha ao deletar projeto: ${response.status} ${response.statusText}`);
        }

        const responseText = await response.text();
        if (responseText) {
            return JSON.parse(responseText);
        } else {
            return { status: 'success' };
        }
    } catch (error) {
        console.error('Failed to delete projeto:', error);
        throw error;
    }
};


export const updateProjeto = async (id, projeto) => {
    try {
        const response = await fetch(`${API_URL_PROJETOS}update/${id}`, {  // Ajuste a URL para incluir "update/"
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projeto),
        });
        if (!response.ok) {
            console.error('Failed to update projeto:', response.status, response.statusText);
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Failed to update projeto: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to update projeto:', error);
        throw error;
    }
};





