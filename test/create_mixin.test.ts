import { it, describe, assert } from "vitest"
import { model, run, models, mixin } from "../src"
import { Store } from "../src/databases"
import { Model, Field } from "../src/decorators"
import { Create, Read } from "../src/methods"
import { Text } from "../src/types"
import * as lodash from "lodash"

it("mixin", async function () {
    mixin({
        bind: {
            create: {
                preRule: [
                    async function (payload, state) {
                        return true
                    },
                ],
            },
        },
    })
})
