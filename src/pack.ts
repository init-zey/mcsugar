

export class Pack{
    public obj:object = {};
}

export class JENewDatapack extends Pack {
    public function_files:object = {};
    public format({ pack_name="MCSugar", pack_format=48, description="A minecraft datapack created by MCSugar", author="MCSugar", namespace="mcs"}):object {
        let obj = {
            "pack.mcmeta" : JSON.stringify({
                "pack" : {
                    "pack_format" : pack_format,
                    "description" : description,
                }
            }),
            "data" : {
                "minecraft" : {
                    "tags" : {
                        "function" : {
                            "load.json" : JSON.stringify({"values":["{$namespace}:load"]}),
                            "tick.json" : JSON.stringify({"values":["{$namespace}:tick"]}),
                        }
                    }
                },
                [namespace] : {
                    "functions": {},
                }
            }
        };
        for (let fn_name in this.function_files) {
            obj["data"][namespace]["functions"][fn_name+".mcfunction"] = this.function_files[fn_name];
        }
        return {[pack_name]:obj};
    }
}