crop_btn.addEventListener("click", () => {
    let lang = document.getElementsByClassName("selected_ocr_language")[0].getAttribute("id");

    chrome.storage.local.set({ current_lang: lang }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['./content.js']
            });
            window.close();
        });
    });
});

xmark.addEventListener("click", (e) => {
    e.preventDefault();
    window.close();
});

const lang_mapper = {
    'l1': 'afr',
    'l2': 'sqi',
    'l3': 'amh',
    'l4': 'ara',
    'l5': 'hye',
    'l6': 'asm',
    'l7': 'aze',
    'l8': 'aze_cyrl',
    'l9': 'eus',
    'l10': 'bel',
    'l11': 'ben',
    'l12': 'bos',
    'l13': 'bre',
    'l14': 'bul',
    'l15': 'mya',
    'l16': 'cat',
    'l17': 'ceb',
    'l18': 'khm',
    'l19': 'chr',
    'l20': 'chi_sim',
    'l21': 'chi_tra',
    'l22': 'cos',
    'l23': 'hrv',
    'l24': 'ces',
    'l25': 'dan',
    'l26': 'dan_frak',
    'l27': 'nld',
    'l28': 'dzo',
    'l29': 'eng',
    'l30': 'enm',
    'l31': 'epo',
    'l32': 'est',
    'l33': 'fao',
    'l34': 'fil',
    'l35': 'fin',
    'l36': 'fra',
    'l37': 'frm',
    'l38': 'glg',
    'l39': 'kat',
    'l40': 'kat_old',
    'l41': 'deu',
    'l42': 'frk',
    'l43': 'deu_frak',
    'l44': 'grc',
    'l45': 'ell',
    'l46': 'guj',
    'l47': 'hat',
    'l48': 'heb',
    'l49': 'hin',
    'l50': 'hun',
    'l51': 'isl',
    'l52': 'ind',
    'l53': 'iku',
    'l54': 'gle',
    'l55': 'ita',
    'l56': 'ita_old',
    'l57': 'jpn',
    'l58': 'jav',
    'l59': 'kan',
    'l60': 'kaz',
    'l61': 'kir',
    'l62': 'kor',
    'l63': 'kor_vert',
    'l64': 'kur',
    'l65': 'kmr',
    'l66': 'lao',
    'l67': 'lat',
    'l68': 'lav',
    'l69': 'lit',
    'l70': 'ltz',
    'l71': 'mkd',
    'l72': 'msa',
    'l73': 'mal',
    'l74': 'mlt',
    'l75': 'mri',
    'l76': 'mar',
    'l77': 'equ',
    'l78': 'mon',
    'l79': 'nep',
    'l80': 'nor',
    'l81': 'oci',
    'l82': 'osd',
    'l83': 'ori',
    'l84': 'pan',
    'l85': 'fas',
    'l86': 'pol',
    'l87': 'por',
    'l88': 'pus',
    'l89': 'que',
    'l90': 'ron',
    'l91': 'rus',
    'l92': 'san',
    'l93': 'gla',
    'l94': 'srp',
    'l95': 'srp_latn',
    'l96': 'snd',
    'l97': 'sin',
    'l98': 'slk',
    'l99': 'slk_frak',
    'l100': 'slv',
    'l101': 'spa',
    'l102': 'spa_old',
    'l103': 'sun',
    'l104': 'swa',
    'l105': 'swe',
    'l106': 'syr',
    'l107': 'tgl',
    'l108': 'tgk',
    'l109': 'tam',
    'l110': 'tat',
    'l111': 'tel',
    'l112': 'tha',
    'l113': 'bod',
    'l114': 'tir',
    'l115': 'ton',
    'l116': 'tur',
    'l117': 'uig',
    'l118': 'ukr',
    'l119': 'urd',
    'l120': 'uzb',
    'l121': 'uzb_cyrl',
    'l122': 'vie',
    'l123': 'cym',
    'l124': 'fry',
    'l125': 'yid',
    'l126': 'yor'
};

const dropdown = document.getElementById("c_oas_ocr_popup_dropbtn");

const selected_language = document.getElementsByClassName("selected_ocr_language")[0];

const dropdown_caret = document.querySelector("#c_oas_ocr_popup_dropbtn > i");

dropdown.onclick = () => {
    showDropdownContent();
}

selected_language.onclick = (e) => {
    e.stopPropagation();
    showDropdownContent();
}

dropdown_caret.onclick = (e) => {
    e.stopPropagation();
    showDropdownContent();
}

function showDropdownContent() {
    document.getElementsByClassName("c_oas_ocr_popup_dropdown_content")[0].classList.toggle("c_oas_ocr_popup_dropdown_content_show");
}

window.onclick = function (event) {
    if (!event.target.matches('.selected_ocr_language') & !event.target.matches('#c_oas_ocr_popup_dropbtn')) {
        for (let i = 1; i <= Object.keys(lang_mapper).length; i++) {
            let id = '#l' + i.toString();
            if (event.target.matches(id)) {
                document.querySelector("#c_oas_ocr_popup_dropbtn > span").innerText = event.target.innerText;
                document.getElementsByClassName("selected_ocr_language")[0].setAttribute("id", lang_mapper["l" + i.toString()]);
            }
        }
        var dropdowns = document.getElementsByClassName("c_oas_ocr_popup_dropdown_content");
        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('c_oas_ocr_popup_dropdown_content_show')) {
                openDropdown.classList.remove('c_oas_ocr_popup_dropdown_content_show');
            }
        }
    }
}


// CONVERTAPI-JS
"use strict";
var ConvertApi;
(function (ConvertApi_1) {
    function auth(credentials, host) {
        return new ConvertApi(credentials, host);
    }
    ConvertApi_1.auth = auth;
    class ConvertApi {
        constructor(credentials, host = 'v2.convertapi.com') {
            this.credentials = credentials;
            this.host = host;
        }
        createParams(init) {
            return new ConvertApi_1.Params(this.host, init);
        }
        convert(fromFormat, toFormat, params) {
            return Promise.resolve(params.dto)
                .then(dto => {
                    let altConvParam = dto.Parameters.filter(p => p.Name.toLowerCase() == 'converter');
                    let converterPath = (altConvParam === null || altConvParam === void 0 ? void 0 : altConvParam.length) > 0 ? `/converter/${altConvParam[0].Value}` : '';
                    let auth = this.credentials.secret ? `secret=${this.credentials.secret}` : `apikey=${this.credentials.apiKey}&token=${this.credentials.token}`;
                    return fetch(`https://${this.host}/convert/${fromFormat}/to/${toFormat}${converterPath}?${auth}&storefile=true`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(dto) })
                        .then(resp => resp.json())
                        .then(dto => new ConvertApi_1.Result(dto));
                });
        }
    }
})(ConvertApi || (ConvertApi = {}));
var ConvertApi;
(function (ConvertApi) {
    class FileValue {
        constructor(name, fileId) {
            this.name = name;
            this.fileId = fileId;
        }
    }
    ConvertApi.FileValue = FileValue;
    class FileParam {
        constructor(name, file, host) {
            this.name = name;
            this.file = file;
            this.host = host;
        }
        value() {
            if (this.file instanceof FileValue) {
                return Promise.resolve(this.file.fileId);
            }
            else {
                let uploadUrl = `https://${this.host}/upload?`;
                let response = this.file instanceof URL
                    ? fetch(`${uploadUrl}url=${this.file.href}`, { method: 'POST' })
                    : fetch(`${uploadUrl}filename=${this.file.name}`, { method: 'POST', body: this.file });
                return response.then(r => r.json()).then(obj => obj.FileId);
            }
        }
        get dto() {
            return this.value().then(v => ({
                Name: this.name,
                FileValue: { Id: v }
            }));
        }
    }
    ConvertApi.FileParam = FileParam;
})(ConvertApi || (ConvertApi = {}));
var ConvertApi;
(function (ConvertApi) {
    class FilesValue {
        constructor(files) {
            this.files = files;
        }
        asArray() {
            return this.files.map(f => new ConvertApi.FileValue(f.FileName, f.FileId));
        }
    }
    ConvertApi.FilesValue = FilesValue;
    class FilesParam {
        constructor(name, files, host) {
            this.name = name;
            this.fileValPros = [];
            if (files instanceof FileList) {
                this.fileValPros = Array.from(files).map(f => new ConvertApi.FileParam(name, f, host).value().then(i => ({
                    Id: i
                })));
            }
            else if (files instanceof FilesValue) {
                this.fileValPros = files.asArray().map(f => Promise.resolve({
                    Id: f.fileId
                }));
            }
            else {
                this.fileValPros = files.map(f => Promise.resolve(f instanceof URL ? { Url: f.href } : { Id: f }));
            }
        }
        get dto() {
            return Promise.all(this.fileValPros).then(fv => ({
                Name: this.name,
                FileValues: fv
            }));
        }
    }
    ConvertApi.FilesParam = FilesParam;
})(ConvertApi || (ConvertApi = {}));
var ConvertApi;
(function (ConvertApi) {
    class Param {
        constructor(name, value) {
            this.name = name;
            this.value = value;
        }
        get dto() {
            return Promise.resolve({
                Name: this.name,
                Value: this.value
            });
        }
    }
    ConvertApi.Param = Param;
})(ConvertApi || (ConvertApi = {}));
var ConvertApi;
(function (ConvertApi) {
    class Params {
        constructor(host, init) {
            this.host = host;
            this.params = [];
            let param;
            init === null || init === void 0 ? void 0 : init.forEach(p => {
                if (p.isFile) {
                    if (typeof (p.value) === 'string') {
                        param = new ConvertApi.FileParam(p.name, new ConvertApi.FileValue('', p.value), this.host);
                    }
                    else {
                        param = p.value instanceof Array
                            ? new ConvertApi.FilesParam(p.name, p.value, this.host)
                            : param = new ConvertApi.FileParam(p.name, p.value, this.host);
                    }
                }
                else {
                    param = new ConvertApi.Param(p.name, p.value);
                }
                this.params.push(param);
            });
        }
        add(name, value) {
            let param;
            if (value instanceof ConvertApi.FilesValue || value instanceof FileList || value instanceof Array) {
                param = new ConvertApi.FilesParam(name, value, this.host);
            }
            else if (value instanceof ConvertApi.FileValue || value instanceof File || value instanceof URL) {
                param = new ConvertApi.FileParam(name, value, this.host);
            }
            else {
                param = new ConvertApi.Param(name, value);
            }
            this.params.push(param);
            return param;
        }
        get(name) {
            return this.params.find(p => p.name === name);
        }
        delete(name) {
            let idx = this.params.findIndex(p => p.name === name);
            return this.params.splice(idx, 1)[0];
        }
        get dto() {
            let dtoPros = this.params.map(p => p.dto);
            return Promise.all(dtoPros).then(ds => ({ Parameters: ds }));
        }
    }
    ConvertApi.Params = Params;
})(ConvertApi || (ConvertApi = {}));
var ConvertApi;
(function (ConvertApi) {
    class Result {
        constructor(dto) {
            this.dto = dto;
        }
        get duration() {
            return this.dto.ConversionCost;
        }
        get files() {
            return this.dto.Files;
        }
        toParamFile(idx = 0) {
            return new ConvertApi.FileValue(this.dto.Files[idx].FileName, this.dto.Files[idx].FileId);
        }
        toParamFiles() {
            return new ConvertApi.FilesValue(this.dto.Files);
        }
        uploadToS3(region, bucket, accessKeyId, secretAccessKey) {
            return this.dto.Files.map(f => {
                let dto = {
                    region: region,
                    bucket: bucket,
                    accessKeyId: accessKeyId,
                    secretAccessKey: secretAccessKey,
                    fileId: f.FileId
                };
                return fetch(`https://integration.convertapi.com/s3/upload`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(dto)
                });
            });
        }
    }
    ConvertApi.Result = Result;
})(ConvertApi || (ConvertApi = {}));
var ConvertApi;
(function (ConvertApi) {
    function worker(worker, params) {
        let paramPros = params instanceof HTMLFormElement
            ? Array.from(new FormData(params).entries()).map(pair => resolveParam(pair[0], pair[1]))
            : Object.keys(params).map(k => resolveParam(k, params[k]));
        return Promise.all(paramPros).then(p => fetch(worker.href, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'convertapi-params': 'true'
            },
            body: JSON.stringify(p)
        }));
    }
    ConvertApi.worker = worker;
    function resolveParam(name, value) {
        let valPro;
        let isFile;
        if (value instanceof File) {
            valPro = upload(value);
            isFile = true;
        }
        else if (value instanceof FileList || value instanceof Array) {
            valPro = uploadMulti(value);
            isFile = true;
        }
        else {
            valPro = Promise.resolve(value);
        }
        return valPro.then(v => ({
            name: name,
            value: v,
            isFile: isFile
        }));
    }
    function uploadMulti(value) {
        let dtoPros = Array.from(value).filter(f => f instanceof File).map(upload);
        return Promise.all(dtoPros);
    }
    function upload(f) {
        return fetch(`https://v2.convertapi.com/upload?filename=${f.name}`, { method: 'POST', body: f })
            .then(resp => resp.status === 200 ? resp.json() : Promise.reject(`File ${f.name} upload has failed with the status code ${resp.status}`))
            .then(dto => dto.FileId);
    }
})(ConvertApi || (ConvertApi = {}));
//# sourceMappingURL=convertapi.js.map


// FILE CONVERSION CODE
// DOCX TO PDF
let convertApi = ConvertApi.auth({secret: 'sE4pTwA0cN8ULyjW'})
let elResult = document.getElementById('result')
let elResultLink = document.getElementById('resultLink')
elResult.style.display = 'none'

// On file input change, start conversion
document.getElementById('fileInput').addEventListener('change', async e => {
    elResult.style.display = 'none'
    document.documentElement.style.cursor = `wait`
    try {

        // Converting DOCX to PDF file
        let params = convertApi.createParams()
        params.add('file', e.currentTarget.files[0])
        let result = await convertApi.convert('docx', 'pdf', params)

        // Showing link with the result file
        elResultLink.setAttribute('href', result.files[0].Url)
        elResultLink.href = result.files[0].Url
        elResult.style.display = 'block'

    } finally {
        document.documentElement.style.cursor = 'default'
    }
})


// IMAGE TO PDF
let elResult2 = document.getElementById('imageResult')
let elResultLink2 = document.getElementById('resultLinkImage')
elResult2.style.display = 'none'

//On image input change, start conversion
document.getElementById('imageInput').addEventListener('change', async e => {
    elResult2.style.display = 'none'
    document.documentElement.style.cursor = 'wait'
    try {
        //Convert JPG to PDF
        let params2 = convertApi.createParams()
        params2.add('file', e.currentTarget.files[0]);
        let result2 = await convertApi.convert('jpg', 'pdf', params2)

        // Showing link with the result2 file
        elResultLink2.setAttribute('href', result2.files[0].Url)
        elResultLink2.href = result2.files[0].Url
        elResult2.style.display = 'block'

    } finally {
        document.documentElement.style.cursor = 'default'
    }
})


// EXCEL TO PDF
let elResult3 = document.getElementById('excelResult')
let elResultLink3 = document.getElementById('resultLinkExcel')
elResult3.style.display = 'none'

// On file input change, start conversion
document.getElementById('excelInput').addEventListener('change', async e => {
    elResult3.style.display = 'none'
    document.documentElement.style.cursor = 'wait'
    try {
        //Convert EXCEL to PDF
        let params3 = convertApi.createParams()
        params3.add('file', e.currentTarget.files[0]);
        let result3 = await convertApi.convert('xlsx', 'pdf', params3)

        // Showing link with the result3 file
        elResultLink3.setAttribute('href', result3.files[0].Url)
        elResultLink3.href = result3.files[0].Url
        elResult3.style.display = 'block'

    } finally {
        document.documentElement.style.cursor = 'default'
    }
})


// PDF COMPRESSION

let elResult4 = document.getElementById('compressResult')
let elResultLink4 = document.getElementById('resultLinkCompress')
elResult4.style.display = 'none'

// On file input change, start compression
document.getElementById('compressInput').addEventListener('change', async e => {
    elResult4.style.display = 'none'
    document.documentElement.style.cursor = 'wait'
    try {
        //Compress PDF
        let params4 = convertApi.createParams()
        params4.add('file', e.currentTarget.files[0]);
        let result4 = await convertApi.convert('pdf', 'compress', params4)

        // Showing link with the result4 file
        elResultLink4.setAttribute('href', result4.files[0].Url)
        elResultLink4.href = result4.files[0].Url
        elResult4.style.display = 'block'

    } finally {
        document.documentElement.style.cursor = 'default'
    }
})

