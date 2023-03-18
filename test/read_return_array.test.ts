import { it, describe, assert } from "vitest"
import { model, run, models } from "../src"
import { Store } from "../src/databases"
import { Model, Field } from "../src/decorators"
import { Create, Read } from "../src/methods"
import { Text } from "../src/types"
import * as lodash from "lodash"

it("Read return type must be array", async function () {
    let res = await run({
        token: process.env.SYSTEM_TOKEN,
        model: "model",
        method: "read",
        query: {
            filter: {
                name: "model",
            },
        },
    })
    assert.equal(res.status, true)
    assert.equal(lodash.isArray(res.data), true)
})
