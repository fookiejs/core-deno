import * as lodash from "lodash"

export default async function (payload, state) {
    let model = payload.model
    let database = model.database
    if (lodash.has(payload.query.filter, "pk")) {
        payload.query.filter = lodash.assign(payload.query.filter, {
            [database.pk]: payload.query.filter.pk,
        })
        payload.query.filter = lodash.omit(payload.query.filter, ["pk"])
    }
}
