import { build } from './src/build';
import { JENewDatapack } from './src/pack';

const pack = new JENewDatapack();
pack.function_files["load"] = "say hello!"
build(pack.format({pack_name: "Hello World", description: "Hello World", author:"antizey", namespace:"antizey"}), "D:/Application/minecraft/PCL2/.minecraft/versions/1.21.1-Fabric 0.16.7/saves/void/datapacks");