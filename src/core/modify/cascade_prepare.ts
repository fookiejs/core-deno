import * as lodash from "lodash"

export default async function (payload, state) {
    let allModels = ctx.local.all("model", payload.model)
    for (let model of allModels) {
        for (let field in model.schema) {
            if (
                model.schema[field].cascadeDelete &&
                model.schema[field].relation &&
                model.schema[field].relation === payload.model
            ) {
                let res = await ctx.run({
                    token: "system_token",
                    model: payload.model,
                    method: "read",
                    query: payload.query,
                })
                state.cascadeDeleteIds = res.data.map(function (e) {
                    return e[payload.model.database.pk]
                })
            }
        }
    }
}
