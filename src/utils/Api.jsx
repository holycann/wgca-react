// Fungsi untuk GET request
export const getData = async (endpoint) => {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Fungsi untuk POST request
export const postData = async (newData, endpoint) => {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

// Fungsi untuk UPDATE request (PUT)
export const updateData = async (id, endpoint, updatedData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL + endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

// Fungsi untuk DELETE request
export const deleteData = async (id, endpoint) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL + endpoint}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return { message: 'Data deleted successfully' };
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};