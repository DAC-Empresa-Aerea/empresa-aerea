export const fetchAddressByCep = async (cep: string) => {
    try {
        const cleanedCep = cep.replace(/\D/g, "");
        if (cleanedCep.length !== 8) {
            return { error: "Invalid CEP. Please enter 8 digits." };
        }

        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        const data = await response.json();

        if (data.erro) {
            return { error: "CEP not found." };
        } else {
            return { state: data.uf, city: data.localidade, street: data.logradouro, error: "" };
        }
    } catch (error) {
        console.error("Error retrieving the CEP:", error);
        return { error: "Error retrieving the CEP. Please try again." };
    }
};
