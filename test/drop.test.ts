import { it, describe, assert } from "vitest"
import { model, run, models } from "../src"
import { Store } from "../src/databases"
import { Model, Field } from "../src/decorators"
import { Create, Read } from "../src/methods"
import { Text } from "../src/types"
import * as lodash from "lodash"

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

it("Drop", async function () {
    let res = await run({
        token: process.env.SYSTEM_TOKEN,
        model: "setting",
        method: "create",
        body: {
            name: "test_1",
            value: {
                a: 1,
            },
        },
        options: {
            drop: 1,
        },
    })
    await sleep(30)
    assert.equal(local.has("setting", "test_1"), false)
})
