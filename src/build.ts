import { clear_dir, construct } from './io';
import { Pack } from './pack';

export const build = (packobj:object, build_path="./dist"):void => {
    clear_dir(build_path);
    construct(packobj, build_path);
}