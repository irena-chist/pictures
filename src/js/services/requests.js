const postData = async (url, data) => { // ф-я отвечает за отправку запроса, 
    let result = await fetch(url, {
        method: 'POST',
        body: data
    });

    return await result.text();
};

const getResource = async (url) => { // ф-я отвечает за отправку запроса, 
    let result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};

export {postData, getResource};