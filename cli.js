#!/usr/bin/env node

const sywac = require('sywac');
const chalk = require('chalk');
const p8tojs = require('.');

sywac
    .positional('<input.p8> <output.js>', {
        params: [
            { desc: 'path to input .p8 file' },
            { desc: 'path to output .js file' }
        ]
    })
    .string('--export <commonjs|default|json|CustomVariableName>', {
        desc: 'specify export style or a custom export variable'
    })
    .string('--encoding <hex|base64>', {
        desc: 'specify encoding for section data (default is hex)'
    })
    .stringArray('--sections', {
        desc: 'specify one or more sections to include (default is all sections)'
    })
    .help('-h, --help', { desc: 'show help' })
    .strict()
    .style(require('sywac-style-chunky'))
    .parseAndExit()
    .then(argv => p8tojs.convertFile(argv['input.p8'], argv['output.js'], argv))
    .catch(error => {
        console.error(chalk.red(error.stack));
        process.exitCode = 1;
    });
