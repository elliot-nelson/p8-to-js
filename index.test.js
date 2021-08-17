const p8tojs = require('.');

const PICO8_CARTRIDGE_1 = `pico-8 cartridge // http://www.pico-8.com
version 32
__lua__

__gfx__
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00700700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00077000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00077000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00700700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
__sfx__
011400000f0500f0500c0500f0500c0500f0500c0500f0500c0500f0500c0500f0500c0500f0500f0500c0500f0500c0500f0500f0500c0500f0500c0500f0500c0500f0500c0500f0500f0500f0500f05000000
011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
__music__
00 00424344
`;

describe('p8tojs', () => {
    describe('convert', () => {
        it('creates a JS file with a default export', () => {
            expect(
                p8tojs.convert(PICO8_CARTRIDGE_1)
            ).toMatchSnapshot();
        });

        it('for export=default, creates a JS file with a default export', () => {
            expect(
                p8tojs.convert(PICO8_CARTRIDGE_1, { export: 'default' })
            ).toMatchSnapshot();
        });

        it('for export=commonjs, creates a JS file with a module.exports', () => {
            expect(
                p8tojs.convert(PICO8_CARTRIDGE_1, { export: 'commonjs' })
            ).toMatchSnapshot();
        });

        it('for export=json, creates a JSON file', () => {
            expect(
                p8tojs.convert(PICO8_CARTRIDGE_1, { export: 'json' })
            ).toMatchSnapshot();
        });

        it('creates a JS file with a custom export variable', () => {
            expect(
                p8tojs.convert(PICO8_CARTRIDGE_1, { export: 'Cartridge' })
            ).toMatchSnapshot();
        });

        it('limits the selected sections if sections are specified', () => {
            expect(
                p8tojs.convert(PICO8_CARTRIDGE_1, { sections: ['lua', 'sfx'] })
            ).toMatchSnapshot();
        });

        it('exports with base64 encoding if specified', () => {
            expect(
                p8tojs.convert(PICO8_CARTRIDGE_1, { encoding: 'base64' })
            ).toMatchSnapshot();
        });
    });
});
