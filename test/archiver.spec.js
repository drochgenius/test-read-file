const fs = require('fs');
const shell = require('shelljs');
const { download } = require('@hmh/habitat-epub-export');
const { unzipEpub } = require('@hmh/epub-archiver');

var chai = require('chai');
var chaiFiles = require('chai-files');

chai.use(chaiFiles);
const { expect } = chai;
const { file } = chaiFiles;


const EPUB_DOWNLOAD_LINK = 'http://static.tribalnova.com.s3.amazonaws.com/habitat/mx18/hmh_mx18_1u2rti/mx18-g1-dlo2-hmh_mx18_1u2rti-20170720-smil.epub';
const EPUB_FILENAME = 'temp/book.epub';
const EPUB_EXPANDED_PATH = 'temp/expanded';
const FILE = EPUB_EXPANDED_PATH + '/OPS/toc.xhtml';
const FILE_LENGTH = 57142;


function readFile(done) {
    fs.readFile(FILE, 'utf8', (err, data) => {
        expect(err).to.be.null;
        expect(data).not.to.be.undefined;
        expect(typeof data).to.equal('string');
        expect(data.length).to.equal(FILE_LENGTH);
        done();
    });
}


function readFileAsPromise() {
    return new Promise(readFile);
}

describe('test readfile after unzipping the EPUB', () => {
    before(() => {
        shell.rm('-rf', 'temp');
        shell.mkdir('-p', 'temp');

        return download(EPUB_DOWNLOAD_LINK, EPUB_FILENAME)
            .then(() => {
                expect(file(EPUB_FILENAME)).to.exist;
            });
    });

    it('should read toc file after unzipping the epub', (done) => {
        shell.rm('-rf', EPUB_EXPANDED_PATH);
        unzipEpub(EPUB_FILENAME, EPUB_EXPANDED_PATH)
            .then(() => {
                readFile(done);
            })
            .catch(err => { throw err; });
    });

    it('should read toc file after unzipping the epub as promise', () => {
        shell.rm('-rf', EPUB_EXPANDED_PATH);
        return unzipEpub(EPUB_FILENAME, EPUB_EXPANDED_PATH)
            .then(readFileAsPromise);
    });
});