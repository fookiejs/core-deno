import { it, describe, assert } from "vitest"
import { model, run, models } from "../src"
import { Store } from "../src/databases"
import { Model, Field } from "../src/decorators"
import { Create, Read } from "../src/methods"
import { Text } from "../src/types"
import * as lodash from "lodash"

it("Reactive Delete", async function () {
    model({
        name: "reactive_parent",
        database: Store,
        schema: {
            name: {
                type: Text,
                required: true,
            },
            child: {
                relation: "reactive_child",
                reactive_delete: true,
            },
        },
    })

    model({
        name: "reactive_child",
        database: Store,
        schema: {
            name: {
                type: Text,
                required: true,
            },
        },
    })

    const create_child_res = await run({
        model: "reactive_child",
        method: "create",
        token: process.env.SYSTEM_TOKEN,
        body: {
            name: "child",
        },
    })

    const create_parent_res = await run({
        model: "reactive_parent",
        method: "create",
        token: process.env.SYSTEM_TOKEN,
        body: {
            name: "parent",
            child: create_child_res.data.id,
        },
    })

    await run({
        model: "reactive_parent",
        method: "delete",
        token: process.env.SYSTEM_TOKEN,
        query: {
            filter: {},
        },
    })

    let res = await run({
        model: "reactive_child",
        method: "count",
        token: process.env.SYSTEM_TOKEN,
        query: {
            filter: {},
        },
    })
    assert.equal(res.data, 0)
})
