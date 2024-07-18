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
            console.error('Falha ao buscar atividades:', response.status, response.statusText);
            throw new Error(`Falha ao buscar atividades: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Falha ao buscar atividades:', error);
        throw error;
    }
};

export const getAtividadeById = async (id) => {
    try {
        const response = await fetch(`${API_URL}view/${id}`);
        if (!response.ok) {
            console.error('Falha ao buscar atividade com id:', response.status, response.statusText);
            throw new Error(`Falha ao buscar atividade com id: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Falha ao buscar atividade com id:', error);
        throw error;
    }
};

export const createAtividade = async (atividade) => {
    try {
        const response = await fetch(`${API_URL}create`, {
            method: 'POST',
            body: JSON.stringify(atividade),
            headers: { 'Content-Type': 'application/json' },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Falha ao criar atividade:', error);
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
            console.error('Falha ao atualizar atividade:', response.status, response.statusText);
            throw new Error(`Falha ao atualizar atividade: ${response.status} ${response.statusText}`);
        }

        const responseText = await response.text();
        if (responseText) {
            return JSON.parse(responseText);
        } else {
            console.warn('Resposta vazia recebida');
            return {};
        }
    } catch (error) {
        console.error('Falha ao buscar:', error);
        throw error;
    }
};

export const deleteAtividade = async (id) => {
    try {
        const response = await fetch(`${API_URL}delete/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            console.error('Falha ao deletar atividade:', response.status, response.statusText);
            throw new Error(`Falha ao deletar atividade: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Falha ao buscar:', error);
        throw error;
    }
};

export const getProjetos = async () => {
    try {
        const response = await fetch(API_URL_PROJETOS);
        if (!response.ok) {
            throw new Error(`Falha ao buscar projetos: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Falha ao buscar projetos:', error);
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
            throw new Error(`Falha ao criar projeto: ${response.status} ${response.statusText} - ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Falha ao criar projeto:', error);
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
        console.error('Falha ao deletar projeto:', error);
        throw error;
    }
};


export const updateProjeto = async (id, projeto) => {
    try {
        const response = await fetch(`${API_URL_PROJETOS}update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projeto),
        });
        if (!response.ok) {
            console.error('Failed to update projeto:', response.status, response.statusText);
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Falha ao atualizar projeto: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Falha ao atualizar projeto:', error);
        throw error;
    }
};





