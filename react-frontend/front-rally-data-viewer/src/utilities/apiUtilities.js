const login = async (user) => {
    try {
        // Ensure the login payload matches the backend's expected structure
        const payload = {
            username: user.username,
            password: user.password,  // Send as plain text - backend will handle BCrypt validation
        };

        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                response: {
                    status: response.status,
                    data: errorData,
                    headers: response.headers
                }
            };
        }

        return await response.json();
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}

const signup = async (user) => {
    try {
        // Determine role based on username
        const role = user.username.toLowerCase().includes('admin') ? "ROLE_ADMIN" : "ROLE_USER";
        console.log(`Assigning role ${role} for username: ${user.username}`);

        // Ensure the password is sent as a plain string
        const payload = {
            username: user.username,
            password: user.password,  // Send as plain text - backend will handle BCrypt
            roles: [role]  // Set role based on username
        };

        const response = await fetch("http://localhost:8080/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                response: {
                    status: response.status,
                    data: errorData,
                    headers: response.headers
                }
            };
        }

        return await response.json();
    } catch (error) {
        console.error('Signup API error:', error);
        throw error;
    }
}

const getUsers = () => {
    return fetch("http://localhost:8080/api/users",
        {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('key')},
        }).then(response => response.json());
}
const getMe = () => {
return fetch("http://localhost:8080/rally/api/users/me",
    {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('key')},
    }).then(response => response.json());
}


export {login, signup, getUsers, getMe};