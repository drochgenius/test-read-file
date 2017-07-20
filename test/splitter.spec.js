const shell = require('shelljs');
const { expect } = require('chai');
const { download } = require('@hmh/habitat-epub-export');
const { split } = require('@hmh/hab-epub-splitter');
const expectedResult = require('./expected-result.json');

const EPUB_DOWNLOAD_LINK = 'http://static.tribalnova.com.s3.amazonaws.com/habitat/mx18/hmh_mx18_1u2rti/mx18-g1-dlo2-hmh_mx18_1u2rti-20170720-smil.epub';
const EPUB_FILENAME = 'temp/book.epub';


describe('test epub splitter alone', () => {
    before(() => {
        shell.rm('-rf', 'temp');
        shell.mkdir('-p', 'temp');

        return download(EPUB_DOWNLOAD_LINK, EPUB_FILENAME);
    });

    it('should split epub', () => {
        return split(EPUB_FILENAME).then(result => {
            expect(result).to.deep.equal(expectedResult);
        });
    });
});