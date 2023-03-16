import { lifecycle } from "../.."

export default async function (payload, state) {
    let search = [null, undefined]
    let model = ctx.local.get("model", payload.model)
    let keys = payload.method == "create" ? ctx.lodash.keys(model.schema) : ctx.lodash.keys(model.body)
    for (let key of keys) {
        if (model.schema[key].required == true) {
            if (search.includes(payload.body[key])) {
                return false
            }
        }
    }
    return true
}
