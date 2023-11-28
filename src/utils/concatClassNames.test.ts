import { describe, expect, test } from 'vitest'
import concatClassNames from "./concatClassNames"

describe("utils", () => {
    describe("concatClassNames", () => {
      test("should return concatened classNames", () => {
        const classNames = ["a", "", "b"];
        const res = concatClassNames(classNames)

        expect(res).toEqual("a b");
      })
    })
})
