import * as fs from 'fs';
import * as console from 'console';

function _write_file(path:string, data:string):void {
    let split:Array<string> = path.split('/');
    let dir:string = split.slice(0,-1).join('/')+'/';
    let file_name:string = split.at(-1);
    let dist_path:string = dir;
    try {
        if(!fs.existsSync(dist_path)){
            fs.mkdirSync(dist_path, { recursive: true });
        }
        fs.writeFileSync(dist_path+file_name, data);
    } catch (err) {
        console.error(err);
    }
}

export const copy = (source:string, destination:string):void => {
    // TODO: implement
}

function empty_dir(path:string):void {
    const files = fs.readdirSync(path);
    files.forEach(file => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            empty_dir(filePath);
        } else {
            fs.unlinkSync(filePath);
        }
    });
}
 
function rm_empty_dir(path:string, level:number=0):void {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
        let tempFile = 0;
        files.forEach(file => {
            tempFile++;
            rm_empty_dir(`${path}/${file}`, 1);
        });
        if (tempFile === files.length && level !== 0) {
            fs.rmdirSync(path);
        }
    }
    else {
        level !==0 && fs.rmdirSync(path);
    }
}
 
export const clear_dir = (path:string):void => {
    empty_dir(path);
    rm_empty_dir(path);
}

export const construct = (file_structure:Object, base_path:string='/'):void => {
    if(base_path.charAt(-1) != '/'){
        base_path += '/';
    }
    for (let key in file_structure) {
        if (file_structure.hasOwnProperty(key)) {
            let value = file_structure[key];
            if (typeof value === 'object') {
                construct(value, base_path+key+'/');
            } else {
                _write_file(base_path+key, value);
            }
        }
    }
}