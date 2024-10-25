const fs = require('fs');
const path = require('path');

// Path to the JSON file
const jsonFilePath = path.join(__dirname, '../TokensFromFigma/variables.json');
// Path to the output CSS file
const cssFilePath = path.join(__dirname, '../design-tokens.css');

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
        let cssVars = ':root {\n';

        // Traverse the JSON structure to extract variables
        jsonData.collections.forEach(collection => {
            collection.modes.forEach(mode => {
                mode.variables.forEach(variable => {
                    const cssVarName = `--${collection.name.replace(/\s+/g, '-')}-${mode.name.replace(/\s+/g, '-')}-${variable.name.replace(/\s+/g, '-')}`;
                    let cssVarValue = variable.value;

                    // Wrap string values in double quotes, except for color values
                    if (typeof cssVarValue === 'string' && !cssVarValue.startsWith('#')) {
                        cssVarValue = `"${cssVarValue}"`;
                    }

                    cssVars += `  ${cssVarName}: ${cssVarValue};\n`;
                });
            });
        });

        cssVars += '}\n';

        // Write the CSS variables to a file
        fs.writeFile(cssFilePath, cssVars, 'utf8', (err) => {
            if (err) {
                console.error('Error writing CSS file:', err);
                return;
            }
            console.log('CSS variables generated successfully!');
        });
    } catch (parseError) {
        console.error('Error parsing JSON data:', parseError);
    }
});