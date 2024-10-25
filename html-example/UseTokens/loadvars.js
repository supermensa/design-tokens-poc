// Function to get the value of a variable by its name
function getVariableValue(variableName, jsonData) {
    for (const collection of jsonData.collections) {
        for (const mode of collection.modes) {
            const variable = mode.variables.find(variable => variable.name === variableName);
            if (variable) {
                return variable.value;
            }
        }
    }
    return null;
}

// Fetch the JSON data
fetch('./TokensFromFigma/variables.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Example: Get the value of 'module-max-width' variable
        const titleContent = getVariableValue('module-title-content', data);
        const textContent = getVariableValue('module-text-content', data);

        // Update the starter kit content
        document.querySelector('.starterkit-title').innerHTML = titleContent;
        document.querySelector('.starterkit-text').innerHTML = textContent;

        // example of setting image content from figma
        // const imageUrl = getVariableValue('js-module-image', data);
        // document.querySelector('.starterkit-image').src = imageUrl;
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
