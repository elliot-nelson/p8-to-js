const fs = require('fs');
const path = require('path');
const util = require('util');

const p8tojs = {
    async convertFile(inputFile, outputFile, options = {}) {
        const input = await fs.promises.readFile(inputFile, 'utf8');
        const output = `// ${path.basename(inputFile)}\n` + this.convert(input, options);
        await fs.promises.writeFile(outputFile, output, 'utf8');
    },

    convertFileSync(inputFile, outputFile, options = {}) {
        const input = fs.readFileSync(inputFile, 'utf8');
        const output = `// ${path.basename(inputFile)}\n` + this.convert(input, options);
        fs.writeFileSync(outputFile, output, 'utf8');
    },

    /**
     * Converts an input PICO-8 cartridge string into a JS/JSON output.
     */
    convert(input, options = {}) {
        let sections = this._bySection(input);

        if (options.sections && options.sections.length > 0) {
            sections = options.sections.reduce((hash, key) => {
                hash[key] = sections[key];
                return hash;
            }, {});
        }

        if (options.encoding === 'base64') {
            for (let key of Object.keys(sections)) {
                sections[key] = sections[key].split('\n').map(line => Buffer.from(line, 'hex').toString('base64')).join('\n');
            }
        }

        let prefix = '';
        let suffix = ';';
        let formattedData = util.inspect(sections, {
            colors: false,
            maxStringLength: Infinity,
            breakLength: Infinity,
            sorted: true
        });

        switch (options.export) {
            case 'commonjs':
                prefix = 'module.exports = ';
                break;
            case 'default':
            case undefined:
                prefix = 'export default ';
                break;
            case 'json':
                formattedData = JSON.stringify(sections, undefined, 2);
                suffix = '';
                break;
            default:
                prefix = `export const ${options.export} = `
                break;
        }

        return prefix + formattedData + suffix;
    },

    _bySection(content) {
        const lines = content.split(/\r?\n/);
        const result = {};
        let section;

        for (let line of lines) {
            line = line.trim();
            let match = line.match(/^__(.+)__/);
            if (match) {
                section = match[1];
                result[section] = [];
            } else if (section) {
                if (line.length > 0) result[section].push(line);
            }
        }

        for (let key of Object.keys(result)) {
            result[key] = result[key].join('\n');
        }

        return result;
    }
};


module.exports = p8tojs;
