exports.handler = async function(event, context) {
    // Разрешаем CORS для всех доменов
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Обрабатываем предварительный OPTIONS запрос
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Обрабатываем POST запрос
    if (event.httpMethod === 'POST') {
        try {
            const { username, password } = JSON.parse(event.body);
            
            // ✅ ЗДЕСЬ УСТАНАВЛИВАЕТЕ СВОЙ ЛОГИН И ПАРОЛЬ
            const correctUsername = "admin";    // ЗАМЕНИТЕ на ваш логин
            const correctPassword = "12345";    // ЗАМЕНИТЕ на ваш пароль
            
            if (username === correctUsername && password === correctPassword) {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ 
                        success: true, 
                        message: "Доступ разрешен" 
                    })
                };
            } else {
                return {
                    statusCode: 401,
                    headers,
                    body: JSON.stringify({ 
                        success: false, 
                        message: "Неверный логин или пароль" 
                    })
                };
            }
        } catch (error) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    success: false, 
                    message: "Ошибка сервера" 
                })
            };
        }
    }

    // Если метод не POST и не OPTIONS
    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ message: "Метод не разрешен" })
    };
};