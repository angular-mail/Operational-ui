import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import * as JSZip from 'jszip';

@Injectable({providedIn: 'root'})
export class DownloadService {
    downloadAsZip(file: string, name = 'configuraiton'): Promise<any> {
        if (!file) {
            return;
        }
        const zip = new JSZip();
        zip.file(`${name}.json`, file);

        return zip.generateAsync({type: 'blob'}).then(content => {
            // Force down of the Zip file
            saveAs(content, `${name}.zip`);
        });
    }
}
